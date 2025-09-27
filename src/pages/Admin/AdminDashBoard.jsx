import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Package,
  DollarSign,
  Eye,
  X,
  Star,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { firestoreService } from "../../service/firestoreService";

const AdminDashBoard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const sizes = [ "XL - (280mm) ", "XXL - (320mm)"];
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    offerPrice: "",
    category: "",
    rating: 5,
    image: "",
    size: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const categories = [
    "Herbal",
    "Electronics",
    "Home & Kitchen",
    "Sports",
    "Books",
    "Clothing",
    "Beauty",
    "Personal Care",
    "Health & Wellness",
  ];

  const productStatuses = [
    {
      value: "available",
      label: "Available",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "coming-soon",
      label: "Coming Soon",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "out-of-stock",
      label: "Out of Stock",
      color: "bg-red-100 text-red-800",
    },
  ];

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Load products from Firestore on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await firestoreService.getAllProducts();
      console.log("Loaded products:", productsData); // Check if products have IDs
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading products:", error);
      showNotification("Error loading products. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      offerPrice: "",
      category: "",
      rating: 5,
      image: "",
      size: "",
    });
  };

  const openModal = (mode, product = null) => {
    console.log("Opening modal with mode:", mode, "and product:", product); // Debug log
    setModalMode(mode);
    setSelectedProduct(product);
    if (product && mode !== "add") {
      console.log("Setting form data for existing product:", product); // Debug log
      setFormData({
        name: product.name || "",
        price: product.price ? product.price.toString() : "",
        offerPrice: product.offerPrice ? product.offerPrice.toString() : "",
        category: product.category || "",
        rating: product.rating || 5,
        image: product.image || "",
        size: product.size || "",
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    resetForm();
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
    if (!formData.category) {
      showNotification("Category is required", "error");
      return false;
    }
    if (!formData.size) {
      showNotification("Size is required", "error");
      return false;
    }
    if (parseFloat(formData.offerPrice) > parseFloat(formData.price)) {
      showNotification(
        "Offer price cannot be greater than original price",
        "error"
      );
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
        image:
          formData.image ||
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
        size: formData.size,
      };

      if (modalMode === "add") {
        await firestoreService.addProduct(productData);
        showNotification("Product added successfully!", "success");
      } else if (modalMode === "edit" && selectedProduct?.id) {
        // In your handleSubmit function, replace the update call with:
        console.log(
          "Updating product with ID:",
          selectedProduct.id,
          "and data:",
          productData
        );
        const result = await firestoreService.updateProduct(
          selectedProduct.id,
          productData
        );
        console.log("Update result:", result);
        showNotification("Product updated successfully!", "success");
      } else {
        throw new Error("Product ID not found for update operation");
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

  const getStatusDisplay = (status) => {
    const statusConfig =
      productStatuses.find((s) => s.value === status) || productStatuses[0];
    return statusConfig;
  };

  const handleDeleteProduct = async (productId, productName) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${productName}"? This action cannot be undone.`
      )
    ) {
      try {
        // Replace: await mockFirestoreService.deleteProduct(productId);
        await firestoreService.deleteProduct(productId);
        showNotification("Product deleted successfully!", "success");
        await loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        showNotification("Error deleting product. Please try again.", "error");
      }
    }
  };

  const totalProducts = products.length;
  const totalOrders = products.reduce(
    (sum, product) => sum + (product.totalOrders || 0),
    0
  );
  const totalRevenue = products.reduce(
    (sum, product) => sum + product.offerPrice * (product.totalOrders || 0),
    0
  );
  const averageRating =
    products.length > 0
      ? (
          products.reduce((sum, product) => sum + product.rating, 0) /
          products.length
        ).toFixed(1)
      : 0;

  const renderStars = (rating) => {
    return Array(5)
      .fill("")
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            rating > i ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ));
  };

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
    <div className="min-h-screen bg-gray-50  mx-auto mt-[70px] md:mt-[120px]">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          } flex items-center gap-2`}
        >
          {notification.type === "error" && <AlertCircle className="w-5 h-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Made-to-Order Admin Dashboard
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#93B45D] to-[#F18372] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600">
            Managing products for on-demand manufacturing
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">
                  {totalProducts}
                </p>
              </div>
              <Package className="text-blue-500 w-8 h-8" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-800">
                  {averageRating}
                </p>
              </div>
              <Star className="text-yellow-500 w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Controls */}
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
              className="bg-gradient-to-r from-[#93B45D] to-[#F18372] text-white  px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const statusConfig = getStatusDisplay(product.status);
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => openModal("view", product)}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal("edit", product)}
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteProduct(product.id, product.name)
                      }
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                    Made to Order
                  </div>
                  <div
                    className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs ${statusConfig.color}`}
                  >
                    {statusConfig.label}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-1">{product.category}</p>
                  <p className="text-gray-600 mb-1">{product.size}</p>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-600 ml-1">
                      ({product.rating})
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="text-xl font-bold text-green-600">
                        ₹{product.offerPrice}
                      </span>
                      <span className="text-gray-500 text-sm line-through ml-2">
                        ₹{product.price}
                      </span>
                      
                    </div>
                    
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                      Savings: ₹{product.price - product.offerPrice}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Package className="w-16 h-16 mx-auto mb-4" />
            </div>
            <p className="text-gray-600 text-lg">
              No products found matching your search.
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
  <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
    <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                {modalMode === "add"
                  ? "Add Product"
                  : modalMode === "edit"
                  ? "Edit Product"
                  : "View Product"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                disabled={submitting}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {modalMode === "view" ? (
              <div className="p-6">
                <div className="text-center mb-6">
                  <img
                    src={selectedProduct?.image}
                    alt={selectedProduct?.name}
                    className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedProduct?.name}
                  </h3>
                  <p className="text-gray-600">{selectedProduct?.category}</p>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mt-2 inline-block">
                    Made to Order
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Original Price:
                    </span>
                    <span className="text-gray-600">
                      ₹{selectedProduct?.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Offer Price:
                    </span>
                    <span className="text-green-600 font-bold">
                      ₹{selectedProduct?.offerPrice}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Savings:</span>
                    <span className="text-orange-600 font-medium">
                      ₹{selectedProduct?.price - selectedProduct?.offerPrice}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Rating:</span>
                    <div className="flex items-center gap-1">
                      {renderStars(selectedProduct?.rating)}
                      <span className="text-sm ml-1">
                        ({selectedProduct?.rating})
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Size:
                    </span>
                    <span className="text-blue-600 font-medium">
                      {selectedProduct?.size}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        getStatusDisplay(selectedProduct?.status).color
                      }`}
                    >
                      {getStatusDisplay(selectedProduct?.status).label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Total Orders:
                    </span>
                    <span className="font-bold">
                      {selectedProduct?.totalOrders || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Total Revenue:
                    </span>
                    <span className="font-bold">
                      ₹
                      {(
                        (selectedProduct?.offerPrice || 0) *
                        (selectedProduct?.totalOrders || 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                  {selectedProduct?.description && (
                    <div className="pt-4 border-t">
                      <span className="font-medium text-gray-600">
                        Description:
                      </span>
                      <p className="text-gray-700 mt-2">
                        {selectedProduct.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL *
                    </label>
                    <input
                      type="url"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      disabled={submitting}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size *
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.size}
                      onChange={(e) =>
                        setFormData({ ...formData, size: e.target.value })
                      }
                      disabled={submitting}
                    >
                      <option value="">Select a size</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({ ...formData, rating: e.target.value })
                      }
                      disabled={submitting}
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} Star{rating > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Size:</span>
                    <span className="text-gray-600 font-medium">
                      {selectedProduct?.size}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        MRP Price * (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Offer Price * (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.offerPrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            offerPrice: e.target.value,
                          })
                        }
                        disabled={submitting}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#93B45D] to-[#F18372] text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    disabled={submitting}
                  >
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {submitting
                      ? "Saving..."
                      : modalMode === "add"
                      ? "Add Product"
                      : "Save Changes"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;
