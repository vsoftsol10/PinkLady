import React, { useState, useMemo, useEffect } from "react";
import { Download, Calendar, Search, Package, DollarSign, Clock, Filter, Edit2, Check, X, Eye, ShoppingCart, DownloadIcon, Printer } from "lucide-react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, doc, updateDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { BiRupee } from "react-icons/bi";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStatus, setEditingStatus] = useState(null);
  const [tempStatus, setTempStatus] = useState("");
  const [selectedOrders, setSelectedOrders] = useState(new Set());
  const [viewingOrderDetails, setViewingOrderDetails] = useState(null);

  const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(ordersQuery);
        
        const ordersData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            customerName: data.customerDetails?.name || 'N/A',
            email: data.customerDetails?.email || 'N/A',
            phone: data.customerDetails?.phone || 'N/A',
            orderDate: data.createdAt?.toDate ? data.createdAt.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            status: data.orderStatus || 'pending',
            total: data.pricing?.total || 0,
            items: data.itemCount || 0,
            products: data.items || [],
            orderNumber: data.orderNumber || doc.id,
            paymentMethod: data.paymentMethod || 'N/A',
            paymentStatus: data.paymentStatus || 'pending',
            deliveryAddress: data.deliveryAddress || {}
          };
        });

        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again.");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      const startDate = dateFilter.startDate ? new Date(dateFilter.startDate) : null;
      const endDate = dateFilter.endDate ? new Date(dateFilter.endDate) : null;

      if (startDate && orderDate < startDate) return false;
      if (endDate && orderDate > endDate) return false;
      if (statusFilter && order.status !== statusFilter) return false;
      if (searchTerm && !order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [orders, dateFilter, statusFilter, searchTerm]);

  const handleOrderSelection = (orderId) => {
    const newSelected = new Set(selectedOrders);
    newSelected.has(orderId) ? newSelected.delete(orderId) : newSelected.add(orderId);
    setSelectedOrders(newSelected);
  };

  const handleSelectAll = () => {
    setSelectedOrders(selectedOrders.size === filteredOrders.length ? new Set() : new Set(filteredOrders.map(o => o.id)));
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { orderStatus: newStatus, updatedAt: new Date() });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      setEditingStatus(null);
      setTempStatus("");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const exportOrdersToCSV = (orders, filename) => {
    const escapeCsvField = (field) => {
      if (field === null || field === undefined) return '';
      const str = String(field);
      return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str.replace(/"/g, '""')}"` : str;
    };

    const rows = orders.flatMap(order => {
      const addressDetails = order.deliveryAddress?.addressDetails || {};
      const addressLine = [addressDetails.address, addressDetails.city, addressDetails.state, addressDetails.zipCode].filter(Boolean).join(', ');
      
      if (order.products?.length > 0) {
        return order.products.map((product, idx) => [
          order.orderNumber || order.id, order.customerName, order.email, order.phone || 'N/A',
          order.orderDate, order.status, order.paymentMethod || 'N/A', order.paymentStatus || 'N/A',
          addressLine || 'N/A', idx + 1, product.name || 'N/A', product.size || 'N/A',
          product.quantity || 0, (product.pricePerItem?.toFixed(2) || '0.00'),
          (product.totalPrice?.toFixed(2) || '0.00'), (order.total?.toFixed(2) || '0.00'),
          order.items || 0, new Date(order.orderDate).toLocaleString()
        ].map(escapeCsvField));
      }
      return [[order.orderNumber || order.id, order.customerName, order.email, order.phone || 'N/A',
        order.orderDate, order.status, order.paymentMethod || 'N/A', order.paymentStatus || 'N/A',
        addressLine || 'N/A', 'N/A', 'No products found', 'N/A', 0, '0.00', '0.00',
        (order.total?.toFixed(2) || '0.00'), order.items || 0, new Date(order.orderDate).toLocaleString()
      ].map(escapeCsvField)];
    });

    const headers = ["Order Number", "Customer Name", "Email", "Phone", "Order Date", "Order Status",
      "Payment Method", "Payment Status", "Delivery Address", "Product Sequence", "Product Name",
      "Product Size", "Product Quantity", "Price Per Item (₹)", "Product Total (₹)",
      "Order Total (₹)", "Total Items in Order", "Order Timestamp"];

    const csvContent = '\uFEFF' + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_detailed_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handlePrintOrder = () => {
    const order = viewingOrderDetails;
    const addressDetails = order.deliveryAddress?.addressDetails || {};
    const addressString = [addressDetails.address, addressDetails.city, addressDetails.state, addressDetails.zipCode].filter(Boolean).join(', ');

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order ${order.orderNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #F18372; padding-bottom: 20px; }
            .header h1 { color: #F18372; font-size: 28px; margin-bottom: 10px; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 18px; font-weight: bold; color: #F18372; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #f0f0f0; }
            .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
            .info-label { font-weight: bold; width: 180px; color: #666; }
            .info-value { flex: 1; color: #333; }
            .products-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .products-table th { background-color: #F18372; color: white; padding: 12px; text-align: left; font-weight: bold; }
            .products-table td { padding: 12px; border-bottom: 1px solid #e0e0e0; }
            .products-table tr:hover { background-color: #f9f9f9; }
            .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
            .print-button { background-color: #F18372; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 20px auto; display: block; }
            .print-button:hover { background-color: #E07362; }
            @media print { body { padding: 20px; } .header { margin-bottom: 30px; } button { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Order Details</h1>
            <p style="color: #666; font-size: 14px;">Order Number: ${order.orderNumber}</p>
          </div>
          <div class="section">
            <div class="section-title">Customer Information</div>
            <div class="info-row"><div class="info-label">Customer Name:</div><div class="info-value">${order.customerName}</div></div>
            <div class="info-row"><div class="info-label">Order ID:</div><div class="info-value">${order.orderNumber}</div></div>
            <div class="info-row"><div class="info-label">Payment Status:</div><div class="info-value">${order.paymentStatus}</div></div>
          </div>
          ${addressString ? `<div class="section">
            <div class="section-title">Delivery Address</div>
            <div class="info-row"><div class="info-label">Address:</div><div class="info-value">${addressString}</div></div>
          </div>` : ''}
          <div class="section">
            <div class="section-title">Ordered Products</div>
            <table class="products-table">
              <thead><tr><th style="width: 10%;">#</th><th style="width: 50%;">Product Name</th><th style="width: 20%;">Quantity</th><th style="width: 20%;">Size</th></tr></thead>
              <tbody>
                ${order.products?.map((p, i) => `<tr><td>${i + 1}</td><td>${p.name}</td><td>${p.quantity || 0}</td><td>${p.size || 'N/A'}</td></tr>`).join('') || '<tr><td colspan="4" style="text-align: center; padding: 20px;">No products found</td></tr>'}
              </tbody>
            </table>
          </div>
          <div class="footer"><p>Generated on ${new Date().toLocaleString()}</p></div>
          <button class="print-button" onclick="window.print()">Print / Save as PDF</button>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => printWindow.focus();
  };

  const isAllSelected = filteredOrders.length > 0 && selectedOrders.size === filteredOrders.length;
  const isPartiallySelected = selectedOrders.size > 0 && selectedOrders.size < filteredOrders.length;

  const PageHeader = () => (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Management</h1>
      <div className="flex justify-center items-center">
        {[...Array(3)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="mx-2 text-[#F18372] text-lg">✦</span>
            <span className="w-15 h-[2px] bg-[#F18372]"></span>
          </React.Fragment>
        ))}
        <span className="mx-2 text-[#F18372] text-lg">✦</span>
      </div>
    </div>
  );

  const StatsCard = ({ icon: Icon, color, label, value }) => (
    <div className={`bg-white rounded-lg shadow-lg p-6 border-l-4 border-${color}-500`}>
      <div className="flex items-center">
        <Icon className={`h-8 w-8 text-${color}-500`} />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  if (loading || error) {
    return (
      <div className="min-h-screen mt-[90px] md:mt-[120px] bg-gradient-to-br from-slate-50 to-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <PageHeader />
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F18372] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading orders...</p>
              </>
            ) : (
              <>
                <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 mb-4">{error}</p>
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#F18372] text-white rounded-lg hover:bg-[#e0725f] transition-colors">
                  Retry
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[90px] md:mt-[120px] bg-gradient-to-br from-slate-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <PageHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <StatsCard icon={Package} color="blue" label="Total Orders" value={filteredOrders.length} />
          <StatsCard icon={BiRupee} color="green" label="Total Revenue" 
            value={`₹${filteredOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`} />
          <StatsCard icon={Package} color="purple" label="Avg Order Value" 
            value={`₹${filteredOrders.length > 0 ? (filteredOrders.reduce((sum, o) => sum + o.total, 0) / filteredOrders.length).toFixed(2) : '0.00'}`} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search by customer name, order ID, or email..."
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F18372] focus:border-transparent"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-2">
              {['startDate', 'endDate'].map(type => (
                <div key={type}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{type === 'startDate' ? 'Start' : 'End'} Date</label>
                  <input type="date" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F18372] focus:border-transparent"
                    value={dateFilter[type]} onChange={(e) => setDateFilter(prev => ({ ...prev, [type]: e.target.value }))} />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F18372] focus:border-transparent"
                value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Status</option>
                {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>

            <div className="flex gap-2">
              {selectedOrders.size > 0 && (
                <button onClick={() => setSelectedOrders(new Set())}
                  className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  Clear Selection
                </button>
              )}
              <button onClick={() => exportOrdersToCSV(selectedOrders.size > 0 ? filteredOrders.filter(o => selectedOrders.has(o.id)) : filteredOrders, selectedOrders.size > 0 ? 'selected_orders' : 'all_orders')}
                className="px-4 py-3 bg-[#F18372] text-white rounded-lg hover:bg-[#e0725f] transition-colors flex items-center gap-2">
                <Download className="h-4 w-4" />
                {selectedOrders.size > 0 ? `Export Selected (${selectedOrders.size})` : 'Export All'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['', 'Order ID', 'Customer', 'Date', 'Status', 'Items', 'Total', 'Actions'].map((h, i) => (
                    <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {i === 0 ? (
                        <input type="checkbox" checked={isAllSelected}
                          ref={input => { if (input) input.indeterminate = isPartiallySelected; }}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-[#F18372] focus:ring-[#F18372] focus:ring-offset-0" />
                      ) : h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className={`hover:bg-gray-50 transition-colors ${selectedOrders.has(order.id) ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" checked={selectedOrders.has(order.id)}
                        onChange={() => handleOrderSelection(order.id)}
                        className="rounded border-gray-300 text-[#F18372] focus:ring-[#F18372] focus:ring-offset-0" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingStatus === order.id ? (
                        <div className="flex items-center gap-2">
                          <select value={tempStatus} onChange={(e) => setTempStatus(e.target.value)}
                            className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-[#F18372] focus:border-transparent">
                            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <button onClick={() => updateOrderStatus(order.id, tempStatus)} className="p-1 text-green-600 hover:text-green-800">
                            <Check className="h-4 w-4" />
                          </button>
                          <button onClick={() => { setEditingStatus(null); setTempStatus(""); }} className="p-1 text-red-600 hover:text-red-800">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setViewingOrderDetails(order)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                          <Eye className="h-4 w-4" />View Items
                        </button>
                        {editingStatus !== order.id && (
                          <button onClick={() => { setEditingStatus(order.id); setTempStatus(order.status); }}
                            className="text-[#F18372] hover:text-[#e0725f] flex items-center gap-1">
                            <Edit2 className="h-4 w-4" />Edit Status
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search criteria.</p>
            </div>
          )}
        </div>

        {viewingOrderDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full h-[85vh] overflow-hidden flex flex-col">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Order Details - {viewingOrderDetails.orderNumber}</h2>
                <button onClick={() => setViewingOrderDetails(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Customer Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ['Name', viewingOrderDetails.customerName],
                      ['Email', viewingOrderDetails.email],
                      ['Phone', viewingOrderDetails.phone],
                      ['Order Date', new Date(viewingOrderDetails.orderDate).toLocaleDateString()]
                    ].map(([label, value], i) => (
                      <div key={i}>
                        <span className="text-gray-600">{label}: </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Order Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-gray-600">Status: </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingOrderDetails.status)}`}>
                        {viewingOrderDetails.status}
                      </span>
                    </div>
                    {[
                      ['Payment Method', viewingOrderDetails.paymentMethod],
                      ['Payment Status', viewingOrderDetails.paymentStatus]
                    ].map(([label, value], i) => (
                      <div key={i}>
                        <span className="text-gray-600">{label}: </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {viewingOrderDetails.deliveryAddress?.addressDetails && Object.keys(viewingOrderDetails.deliveryAddress.addressDetails).length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Delivery Address</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900">
                        {[viewingOrderDetails.deliveryAddress.addressDetails.address,
                          viewingOrderDetails.deliveryAddress.addressDetails.city,
                          viewingOrderDetails.deliveryAddress.addressDetails.state,
                          viewingOrderDetails.deliveryAddress.addressDetails.zipCode && `- ${viewingOrderDetails.deliveryAddress.addressDetails.zipCode}`
                        ].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-[#F18372]" />
                    Ordered Products ({viewingOrderDetails?.products?.length || 0} items)
                  </h3>
                  <div className="space-y-4">
                    {viewingOrderDetails?.products?.length > 0 ? viewingOrderDetails.products.map((product, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                            ) : (
                              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Package className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm">
                              {[
                                ['Price', `₹${product.pricePerItem?.toFixed(2) || '0.00'}`],
                                ['Quantity', product.quantity || 0],
                                ['Size', product.size || 'N/A'],
                                ['Subtotal', `₹${product.totalPrice?.toFixed(2) || '0.00'}`, 'text-[#F18372]']
                              ].map(([label, value, colorClass], i) => (
                                <div key={i}>
                                  <span className="text-gray-600">{label}: </span>
                                  <span className={`font-medium ${colorClass || ''}`}>{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8 text-gray-500">
                        <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <p>No products found for this order</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#F18372] bg-opacity-10 rounded-lg p-4 border border-[#F18372] border-opacity-30">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Order Total:</span>
                    <span className="text-2xl font-bold text-[#F18372]">₹{viewingOrderDetails.total?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 gap-5 px-6 py-4 border-t border-gray-200 flex justify-end">
                <button onClick={handlePrintOrder}
                  className="px-6 py-2 bg-[#F18372] text-white rounded-lg hover:bg-[#E07362] transition-colors flex items-center gap-2">
                  <Printer className="h-4 w-4" />Print Order
                </button>
                <button onClick={() => setViewingOrderDetails(null)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;