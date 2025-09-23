import React, { useState, useMemo } from "react";
import { Download, Calendar, Search, Package, DollarSign, Clock, Filter, Edit2, Check, X, Eye, ShoppingCart } from "lucide-react";

const OrderManagement = () => {
  // Sample order data with products
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customerName: "John Smith",
      email: "john@example.com",
      orderDate: "2024-09-20",
      status: "Completed",
      total: 299.99,
      items: 3,
      products: [
        { name: "Wireless Headphones", price: 129.99, quantity: 1, image: "/api/placeholder/50/50" },
        { name: "Phone Case", price: 29.99, quantity: 2, image: "/api/placeholder/50/50" },
        { name: "USB Cable", price: 15.99, quantity: 3, image: "/api/placeholder/50/50" }
      ]
    },
    {
      id: "ORD-002",
      customerName: "Sarah Johnson",
      email: "sarah@example.com",
      orderDate: "2024-09-21",
      status: "Processing",
      total: 156.50,
      items: 2,
      products: [
        { name: "Bluetooth Speaker", price: 89.99, quantity: 1, image: "/api/placeholder/50/50" },
        { name: "Screen Protector", price: 19.99, quantity: 2, image: "/api/placeholder/50/50" }
      ]
    },
    {
      id: "ORD-003",
      customerName: "Mike Wilson",
      email: "mike@example.com",
      orderDate: "2024-09-22",
      status: "Shipped",
      total: 89.99,
      items: 1,
      products: [
        { name: "Laptop Stand", price: 89.99, quantity: 1, image: "/api/placeholder/50/50" }
      ]
    },
    {
      id: "ORD-004",
      customerName: "Emily Davis",
      email: "emily@example.com",
      orderDate: "2024-09-23",
      status: "Pending",
      total: 445.75,
      items: 5,
      products: [
        { name: "Gaming Mouse", price: 79.99, quantity: 1, image: "/api/placeholder/50/50" },
        { name: "Mechanical Keyboard", price: 149.99, quantity: 1, image: "/api/placeholder/50/50" },
        { name: "Monitor Stand", price: 69.99, quantity: 1, image: "/api/placeholder/50/50" },
        { name: "Desk Lamp", price: 45.99, quantity: 2, image: "/api/placeholder/50/50" }
      ]
    },
    {
      id: "ORD-005",
      customerName: "David Brown",
      email: "david@example.com",
      orderDate: "2024-09-19",
      status: "Completed",
      total: 123.45,
      items: 2,
      products: [
        { name: "Power Bank", price: 39.99, quantity: 1, image: "/api/placeholder/50/50" },
        { name: "Car Charger", price: 24.99, quantity: 3, image: "/api/placeholder/50/50" }
      ]
    }
  ]);

  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: ""
  });
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStatus, setEditingStatus] = useState(null);
  const [tempStatus, setTempStatus] = useState("");
  const [selectedOrders, setSelectedOrders] = useState(new Set());
  const [viewingOrderDetails, setViewingOrderDetails] = useState(null);

  const statusOptions = ["Pending", "Processing", "Shipped", "Completed"];

  // Filter orders based on date range, status, and search term
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      const startDate = dateFilter.startDate ? new Date(dateFilter.startDate) : null;
      const endDate = dateFilter.endDate ? new Date(dateFilter.endDate) : null;

      // Date filtering
      if (startDate && orderDate < startDate) return false;
      if (endDate && orderDate > endDate) return false;

      // Status filtering
      if (statusFilter && order.status !== statusFilter) return false;

      // Search filtering
      if (searchTerm && !order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;

      return true;
    });
  }, [orders, dateFilter, statusFilter, searchTerm]);

  // Handle individual order selection
  const handleOrderSelection = (orderId) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  // Handle select all functionality
  const handleSelectAll = () => {
    if (selectedOrders.size === filteredOrders.length) {
      // If all are selected, deselect all
      setSelectedOrders(new Set());
    } else {
      // Select all filtered orders
      setSelectedOrders(new Set(filteredOrders.map(order => order.id)));
    }
  };

  // Check if all orders are selected
  const isAllSelected = filteredOrders.length > 0 && selectedOrders.size === filteredOrders.length;
  const isPartiallySelected = selectedOrders.size > 0 && selectedOrders.size < filteredOrders.length;

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setEditingStatus(null);
    setTempStatus("");
  };

  // Start editing status
  const startEditingStatus = (orderId, currentStatus) => {
    setEditingStatus(orderId);
    setTempStatus(currentStatus);
  };

  // Cancel editing status
  const cancelEditingStatus = () => {
    setEditingStatus(null);
    setTempStatus("");
  };

  // View order details
  const viewOrderDetails = (order) => {
    setViewingOrderDetails(order);
  };

  // Close order details modal
  const closeOrderDetails = () => {
    setViewingOrderDetails(null);
  };

  // Export selected orders to Excel function
  const exportSelectedToExcel = () => {
    const selectedOrdersData = filteredOrders.filter(order => selectedOrders.has(order.id));
    
    if (selectedOrdersData.length === 0) {
      alert("Please select at least one order to export.");
      return;
    }

    const headers = ["Order ID", "Customer Name", "Email", "Order Date", "Status", "Total", "Items"];
    const csvContent = [
      headers.join(","),
      ...selectedOrdersData.map(order => [
        order.id,
        `"${order.customerName}"`,
        order.email,
        order.orderDate,
        order.status,
        order.total,
        order.items
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `selected_orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export all orders to Excel function
  const exportAllToExcel = () => {
    const headers = ["Order ID", "Customer Name", "Email", "Order Date", "Status", "Total", "Items"];
    const csvContent = [
      headers.join(","),
      ...filteredOrders.map(order => [
        order.id,
        `"${order.customerName}"`,
        order.email,
        order.orderDate,
        order.status,
        order.total,
        order.items
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `all_orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Shipped": return "bg-purple-100 text-purple-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const clearFilters = () => {
    setDateFilter({ startDate: "", endDate: "" });
    setStatusFilter("");
    setSearchTerm("");
    setSelectedOrders(new Set()); // Clear selections when clearing filters
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Management</h1>
          <div className="flex justify-center items-center">
            <span className="mx-2 text-[#F18372] text-lg">✦</span>
            <span className="w-15 h-[2px] bg-[#F18372]"></span>
            <span className="mx-2 text-[#F18372] text-lg">✦</span>
            <span className="w-15 h-[2px] bg-[#F18372]"></span>
            <span className="mx-2 text-[#F18372] text-lg">✦</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredOrders.filter(order => order.status === "Pending").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{filteredOrders.length > 0 ? (filteredOrders.reduce((sum, order) => sum + order.total, 0) / filteredOrders.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Info and Export Bar */}
        {selectedOrders.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-blue-800 font-medium">
                  {selectedOrders.size} order{selectedOrders.size !== 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={() => setSelectedOrders(new Set())}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Clear selection
                </button>
              </div>
              <button
                onClick={exportSelectedToExcel}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Selected ({selectedOrders.size})
              </button>
            </div>
          </div>
        )}

        {/* Filters and Export */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by customer name, order ID, or email..."
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F18372] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="flex gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F18372] focus:border-transparent"
                  value={dateFilter.startDate}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F18372] focus:border-transparent"
                  value={dateFilter.endDate}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F18372] focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Clear
              </button>
              <button
                onClick={exportAllToExcel}
                className="px-4 py-3 bg-[#F18372] text-white rounded-lg hover:bg-[#e0725f] transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export All
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={input => {
                        if (input) input.indeterminate = isPartiallySelected;
                      }}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-[#F18372] focus:ring-[#F18372] focus:ring-offset-0"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className={`hover:bg-gray-50 transition-colors ${
                      selectedOrders.has(order.id) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedOrders.has(order.id)}
                        onChange={() => handleOrderSelection(order.id)}
                        className="rounded border-gray-300 text-[#F18372] focus:ring-[#F18372] focus:ring-offset-0"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingStatus === order.id ? (
                        <div className="flex items-center gap-2">
                          <select
                            value={tempStatus}
                            onChange={(e) => setTempStatus(e.target.value)}
                            className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-[#F18372] focus:border-transparent"
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => updateOrderStatus(order.id, tempStatus)}
                            className="p-1 text-green-600 hover:text-green-800"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={cancelEditingStatus}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.items}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewOrderDetails(order)}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          View Items
                        </button>
                        {editingStatus !== order.id && (
                          <button
                            onClick={() => startEditingStatus(order.id, order.status)}
                            className="text-[#F18372] hover:text-[#e0725f] flex items-center gap-1"
                          >
                            <Edit2 className="h-4 w-4" />
                            Edit Status
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

        {/* Order Details Modal */}
        {viewingOrderDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <p className="text-gray-600">{viewingOrderDetails.id}</p>
                </div>
                <button
                  onClick={closeOrderDetails}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                {/* Customer Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Package className="h-5 w-5 text-[#F18372]" />
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{viewingOrderDetails.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{viewingOrderDetails.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-medium">{new Date(viewingOrderDetails.orderDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingOrderDetails.status)}`}>
                        {viewingOrderDetails.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-[#F18372]" />
                    Ordered Products ({viewingOrderDetails.products.length} items)
                  </h3>
                  <div className="space-y-4">
                    {viewingOrderDetails.products.map((product, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Package className="h-8 w-8 text-gray-400" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                              <div>
                                <span className="text-gray-600">Price: </span>
                                <span className="font-medium">₹{product.price.toFixed(2)}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Quantity: </span>
                                <span className="font-medium">{product.quantity}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Subtotal: </span>
                                <span className="font-medium text-[#F18372]">₹{(product.price * product.quantity).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="bg-[#F18372] bg-opacity-10 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Order Total:</span>
                      <span className="text-2xl font-bold text-[#F18372]">₹{viewingOrderDetails.total.toFixed(2)}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Total Items: {viewingOrderDetails.products.reduce((sum, product) => sum + product.quantity, 0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-1 border-t border-gray-200">
                <button
                  onClick={closeOrderDetails}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // You can add print or export functionality here
                    window.print();
                  }}
                  className="px-4 py-2 bg-[#F18372] text-white rounded-lg hover:bg-[#e0725f] transition-colors flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Print Order
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