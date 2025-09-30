import React, { useState, useEffect } from "react";
import {
  Plus, Edit2, Trash2, Search, Eye, X, Star, Loader2, 
  AlertCircle, Check, Tag, Percent
} from "lucide-react";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { firestoreService } from "../../service/firestoreService";

const AdminDashBoard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "", price: "", offerPrice: "", category: "", 
    rating: 5, image: "", size: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });
  const [shippingFee, setShippingFee] = useState(0);
  const [taxApplicable, setTaxApplicable] = useState(0);
  const [editingShipping, setEditingShipping] = useState(false);
  const [editingTax, setEditingTax] = useState(false);
  const [tempShipping, setTempShipping] = useState('');
  const [tempTax, setTempTax] = useState('');
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerFormData, setOfferFormData] = useState({
    percentage: 0, text: '', productId: null
  });

  const sizes = ["XL - (280mm)", "XXL - (320mm)"];
  const categories = ["Herbal"];

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3000);
  };

  const updateSetting = async (field, value, setter, setEditing) => {
    try {
      const newValue = parseFloat(value);
      if (isNaN(newValue) || newValue < 0) {
        alert('Please enter a valid number');
        return;
      }
      const settingsRef = doc(db, 'settings', 'general');
      await updateDoc(settingsRef, { [field]: newValue });
      setter(newValue);
      setEditing(false);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      alert(`Failed to update ${field}`);
    }
  };

  useEffect(() => {
    loadProducts();
    loadSettings();
  }, []);

  const handleSaveOffer = async () => {
    try {
      setSubmitting(true);
      if (!offerFormData.productId) {
        showNotification("Please select a product", "error");
        return;
      }
      await firestoreService.updateProduct(offerFormData.productId, {
        hasOffer: true,
        offerPercentage: parseFloat(offerFormData.percentage),
        offerText: offerFormData.text
      });
      showNotification("Product offer applied successfully!", "success");
      await loadProducts();
      setIsOfferModalOpen(false);
      setOfferFormData({ percentage: 0, text: '', productId: null });
    } catch (error) {
      console.error('Error saving offer:', error);
      showNotification("Error saving offer", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveProductOffer = async (productId) => {
    try {
      await firestoreService.updateProduct(productId, {
        hasOffer: false, offerPercentage: 0, offerText: ""
      });
      showNotification("Product offer removed", "success");
      await loadProducts();
    } catch (error) {
      console.error('Error removing product offer:', error);
      showNotification("Error removing offer", "error");
    }
  };

  const openOfferModal = (product) => {
    setOfferFormData({
      percentage: product?.offerPercentage || 0,
      text: product?.offerText || '',
      productId: product?.id || null
    });
    setIsOfferModalOpen(true);
  };

  const calculateFinalPrice = (product) => {
    let finalPrice = product.offerPrice;
    let appliedOffer = null;
    
    if (product.hasOffer && product.offerPercentage > 0) {
      finalPrice = product.offerPrice * (1 - product.offerPercentage / 100);
      appliedOffer = { text: product.offerText, percentage: product.offerPercentage };
    }
    
    return { finalPrice: finalPrice.toFixed(2), appliedOffer };
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await firestoreService.getAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading products:", error);
      showNotification("Error loading products. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      await firestoreService.initializeSettings();
      const settings = await firestoreService.getSettings();
      setShippingFee(settings.shippingFee || 0);
      setTaxApplicable(settings.taxApplicable || 0);
    } catch (error) {
      console.error('Error loading settings:', error);
      showNotification('Error loading settings', 'error');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (mode, product = null) => {
    setModalMode(mode);
    setSelectedProduct(product);
    if (product && mode !== "add") {
      setFormData({
        name: product.name || "",
        price: product.price?.toString() || "",
        offerPrice: product.offerPrice?.toString() || "",
        category: product.category || "",
        rating: product.rating || 5,
        image: product.image || "",
        size: product.size || ""
      });
    } else {
      setFormData({ name: "", price: "", offerPrice: "", category: "", rating: 5, image: "", size: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setSubmitting(false);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showNotification("Product name is required", "error");
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      showNotification("Valid original price is required", "error");
      return false;
    }
    if (!formData.offerPrice || parseFloat(formData.offerPrice) <= 0) {
      showNotification("Valid offer price is required", "error");
      return false;
    }
    if (!formData.category || !formData.size) {
      showNotification("Category and size are required", "error");
      return false;
    }
    if (parseFloat(formData.offerPrice) > parseFloat(formData.price)) {
      showNotification("Offer price cannot be greater than original price", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setSubmitting(true);

    try {
      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        offerPrice: parseFloat(formData.offerPrice),
        category: formData.category,
        rating: parseInt(formData.rating),
        image: formData.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
        size: formData.size
      };

      if (modalMode === "add") {
        await firestoreService.addProduct(productData);
        showNotification("Product added successfully!", "success");
      } else if (modalMode === "edit" && selectedProduct?.id) {
        await firestoreService.updateProduct(selectedProduct.id, productData);
        showNotification("Product updated successfully!", "success");
      }

      await loadProducts();
      closeModal();
    } catch (error) {
      console.error("Error saving product:", error);
      showNotification(`Error saving product: ${error.message}`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      try {
        await firestoreService.deleteProduct(productId);
        showNotification("Product deleted successfully!", "success");
        await loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        showNotification("Error deleting product. Please try again.", "error");
      }
    }
  };

  const renderStars = (rating) => Array(5).fill("").map((_, i) => (
    <Star key={i} className={`w-4 h-4 ${rating > i ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
  ));

  const EditableField = ({ label, value, editing, onEdit, onSave, onCancel, tempValue, setTempValue, prefix = "₹", suffix = "" }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      {editing ? (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="text-xl font-bold text-gray-800 border border-gray-300 rounded px-2 py-1 w-24"
            step="0.01"
            min="0"
            autoFocus
          />
          <button onClick={onSave} className="text-green-600 hover:text-green-700">
            <Check className="w-5 h-5" />
          </button>
          <button onClick={onCancel} className="text-red-600 hover:text-red-700">
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold text-gray-800">{prefix}{value.toFixed(2)}{suffix}</p>
          <button onClick={onEdit} className="text-gray-400 hover:text-gray-600">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mx-auto mt-[70px] md:mt-[120px]">
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === "success" ? "bg-green-500" : "bg-red-500"
        } text-white flex items-center gap-2`}>
          {notification.type === "error" && <AlertCircle className="w-5 h-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Made-to-Order Admin Dashboard</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#93B45D] to-[#F18372] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600">Managing products for on-demand manufacturing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600">Total Products</p>
            <p className="text-2xl font-bold text-gray-800">{products.length}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-600">Avg Rating</p>
            <p className="text-2xl font-bold text-gray-800">
              {products.length > 0 ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1) : 0}
            </p>
          </div>

          <EditableField
            label="Shipping Fee"
            value={shippingFee}
            editing={editingShipping}
            onEdit={() => { setTempShipping(shippingFee.toString()); setEditingShipping(true); }}
            onSave={() => updateSetting('shippingFee', tempShipping, setShippingFee, setEditingShipping)}
            onCancel={() => setEditingShipping(false)}
            tempValue={tempShipping}
            setTempValue={setTempShipping}
          />

          <EditableField
            label="Tax Applicable (%)"
            value={taxApplicable}
            editing={editingTax}
            onEdit={() => { setTempTax(taxApplicable.toString()); setEditingTax(true); }}
            onSave={() => updateSetting('taxApplicable', tempTax, setTaxApplicable, setEditingTax)}
            onCancel={() => setEditingTax(false)}
            tempValue={tempTax}
            setTempValue={setTempTax}
            prefix=""
            suffix="%"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => openModal("add")}
              className="bg-gradient-to-r from-[#93B45D] to-[#F18372] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const { finalPrice, appliedOffer } = calculateFinalPrice(product);
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={() => openModal("view", product)} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => openModal("edit", product)} className="bg-green-500 text-white p-2 rounded-full hover:bg-yellow-600">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id, product.name)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">Made to Order</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-1">{product.category}</p>
                  <p className="text-gray-600 mb-1">{product.size}</p>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-bold text-green-600">₹{finalPrice}</span>
                    {appliedOffer && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        {appliedOffer.percentage}% OFF
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500 text-sm line-through">₹{product.price}</span>
                  {appliedOffer && <p className="text-xs text-orange-600 mt-1">{appliedOffer.text}</p>}
                  <div className="mt-2">
                    {product.hasOffer ? (
                      <button
                        onClick={() => handleRemoveProductOffer(product.id)}
                        className="w-full bg-orange-100 text-orange-600 px-3 py-1 rounded text-sm hover:bg-orange-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <Tag className="w-3 h-3" /> Remove Offer
                      </button>
                    ) : (
                      <button
                        onClick={() => openOfferModal(product)}
                        className="w-full bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <Tag className="w-3 h-3" /> Add Offer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your search.</p>
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="mt-4 text-blue-600 hover:text-blue-800">
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                {modalMode === "add" ? "Add Product" : modalMode === "edit" ? "Edit Product" : "View Product"}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700" disabled={submitting}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {modalMode === "view" ? (
              <div className="p-6">
                <div className="text-center mb-6">
                  <img src={selectedProduct?.image} alt={selectedProduct?.name} className="w-32 h-32 object-cover rounded-lg mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct?.name}</h3>
                  <p className="text-gray-600">{selectedProduct?.category}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Original Price:</span>
                    <span className="text-gray-600">₹{selectedProduct?.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Offer Price:</span>
                    <span className="text-green-600 font-bold">₹{selectedProduct?.offerPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Rating:</span>
                    <div className="flex items-center gap-1">
                      {renderStars(selectedProduct?.rating)}
                      <span className="text-sm ml-1">({selectedProduct?.rating})</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Size:</span>
                    <span className="text-blue-600 font-medium">{selectedProduct?.size}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={submitting}
                  />
                  <input
                    type="url"
                    placeholder="Image URL *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    disabled={submitting}
                  />
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    disabled={submitting}
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    disabled={submitting}
                  >
                    <option value="">Select Size</option>
                    {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="MRP Price *"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      disabled={submitting}
                    />
                    <input
                      type="number"
                      placeholder="Offer Price *"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={formData.offerPrice}
                      onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value })}
                      disabled={submitting}
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#93B45D] to-[#F18372] text-white rounded-lg hover:shadow-lg"
                    disabled={submitting}
                  >
                    {submitting ? <><Loader2 className="w-4 h-4 animate-spin inline mr-2" />Saving...</> : modalMode === "add" ? "Add Product" : "Save Changes"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isOfferModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Add Product Offer
              </h2>
              <button onClick={() => setIsOfferModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Offer Text *</label>
                  <input
                    type="text"
                    placeholder="e.g., Festival Sale, Limited Time Offer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    value={offerFormData.text}
                    onChange={(e) => setOfferFormData({ ...offerFormData, text: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsOfferModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveOffer}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg"
                  disabled={submitting}
                >
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin inline mr-2" />Saving...</> : "Apply Offer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;