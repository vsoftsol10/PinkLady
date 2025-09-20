import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Package, DollarSign, Eye, X, Star, Clock } from 'lucide-react';

const AdminDashBoard = () => {
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Casual Shoes', 
      category: 'Herbal', 
      price: 100, 
      offerPrice: 80, 
      rating: 4, 
      productionTime: '5-7 days',
      totalOrders: 25,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop' 
    },
    { 
      id: 2, 
      name: 'Running Sneakers', 
      category: 'Herbal', 
      price: 120, 
      offerPrice: 95, 
      rating: 5, 
      productionTime: '3-5 days',
      totalOrders: 45,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop' 
    },
    { 
      id: 3, 
      name: 'Basketball Shoes', 
      category: 'Herbal', 
      price: 150, 
      offerPrice: 120, 
      rating: 4, 
      productionTime: '7-10 days',
      totalOrders: 30,
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop' 
    },
    { 
      id: 4, 
      name: 'Tennis Shoes', 
      category: 'Herbal', 
      price: 90, 
      offerPrice: 70, 
      rating: 3, 
      productionTime: '4-6 days',
      totalOrders: 18,
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=300&fit=crop' 
    },
    { 
      id: 5, 
      name: 'Hiking Boots', 
      category: 'Herbal', 
      price: 180, 
      offerPrice: 140, 
      rating: 5, 
      productionTime: '10-14 days',
      totalOrders: 12,
      image: 'https://images.unsplash.com/photo-1544966503-7ad5ac882d5d?w=300&h=300&fit=crop' 
    },
    { 
      id: 6, 
      name: 'Dress Shoes', 
      category: 'Herbal', 
      price: 200, 
      offerPrice: 160, 
      rating: 4, 
      productionTime: '7-9 days',
      totalOrders: 20,
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=300&h=300&fit=crop' 
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    offerPrice: '',
    category: '',
    rating: 5,
    productionTime: '',
    image: ''
  });

  const categories = ['Herbal', 'Electronics', 'Home & Kitchen', 'Sports', 'Books', 'Clothing', 'Beauty'];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      offerPrice: '',
      category: '',
      rating: 5,
      productionTime: '',
      image: ''
    });
  };

  const openModal = (mode, product = null) => {
    setModalMode(mode);
    setSelectedProduct(product);
    if (product && mode !== 'add') {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        offerPrice: product.offerPrice.toString(),
        category: product.category,
        rating: product.rating,
        productionTime: product.productionTime,
        image: product.image
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
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.offerPrice || !formData.category || !formData.productionTime) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (parseFloat(formData.offerPrice) > parseFloat(formData.price)) {
      alert('Offer price cannot be greater than original price');
      return;
    }

    if (modalMode === 'add') {
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        price: parseFloat(formData.price),
        offerPrice: parseFloat(formData.offerPrice),
        category: formData.category,
        rating: parseInt(formData.rating),
        productionTime: formData.productionTime,
        totalOrders: 0,
        image: formData.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop'
      };
      setProducts([...products, newProduct]);
    } else if (modalMode === 'edit') {
      setProducts(products.map(product =>
        product.id === selectedProduct.id
          ? {
              ...product,
              name: formData.name,
              price: parseFloat(formData.price),
              offerPrice: parseFloat(formData.offerPrice),
              category: formData.category,
              rating: parseInt(formData.rating),
              productionTime: formData.productionTime,
              image: formData.image
            }
          : product
      ));
    }
    closeModal();
  };

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const totalProducts = products.length;
  const totalOrders = products.reduce((sum, product) => sum + (product.totalOrders || 0), 0);
  const totalRevenue = products.reduce((sum, product) => sum + (product.offerPrice * (product.totalOrders || 0)), 0);
  const averageRating = products.length > 0 ? (products.reduce((sum, product) => sum + product.rating, 0) / products.length).toFixed(1) : 0;

  const renderStars = (rating) => {
    return Array(5).fill('').map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${rating > i ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>Made-to-Order Admin Dashboard</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#93B45D] to-[#F18372] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600">Managing products for on-demand manufacturing</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
              </div>
              <Package className="text-blue-500 w-8 h-8" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
              </div>
              <div className="text-green-500 w-8 h-8 flex items-center justify-center">
                <span className="text-lg">📦</span>
              </div>
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
              onClick={() => openModal('add')}
              className="bg-gradient-to-r from-[#93B45D] to-[#F18372] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => openModal('view', product)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openModal('edit', product)}
                    className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                  Made to Order
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-xl font-bold text-green-600">₹{product.offerPrice}</span>
                    <span className="text-gray-500 text-sm line-through ml-2">₹{product.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-blue-600">
                    <Clock className="w-4 h-4" />
                    {product.productionTime}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    Savings: ₹{product.price - product.offerPrice}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {product.totalOrders || 0} orders
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Package className="w-16 h-16 mx-auto mb-4" />
            </div>
            <p className="text-gray-600 text-lg">No products found matching your search.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                {modalMode === 'add' ? 'Add Product' : modalMode === 'edit' ? 'Edit Product' : 'View Product'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {modalMode === 'view' ? (
              <div className="p-6">
                <div className="text-center mb-6">
                  <img
                    src={selectedProduct?.image}
                    alt={selectedProduct?.name}
                    className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct?.name}</h3>
                  <p className="text-gray-600">{selectedProduct?.category}</p>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mt-2 inline-block">
                    Made to Order
                  </div>
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
                    <span className="font-medium text-gray-600">Savings:</span>
                    <span className="text-orange-600 font-medium">₹{selectedProduct?.price - selectedProduct?.offerPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Rating:</span>
                    <div className="flex items-center gap-1">
                      {renderStars(selectedProduct?.rating)}
                      <span className="text-sm ml-1">({selectedProduct?.rating})</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Production Time:</span>
                    <span className="text-blue-600 font-medium">{selectedProduct?.productionTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Total Orders:</span>
                    <span className="font-bold">{selectedProduct?.totalOrders || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Total Revenue:</span>
                    <span className="font-bold">₹{((selectedProduct?.offerPrice || 0) * (selectedProduct?.totalOrders || 0)).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Original Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Offer Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.offerPrice}
                        onChange={(e) => setFormData({...formData, offerPrice: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: e.target.value})}
                      >
                        {[1, 2, 3, 4, 5].map(rating => (
                          <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Production Time *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., 5-7 days"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.productionTime}
                        onChange={(e) => setFormData({...formData, productionTime: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#93B45D] to-[#F18372] text-white rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    {modalMode === 'add' ? 'Add Product' : 'Save Changes'}
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