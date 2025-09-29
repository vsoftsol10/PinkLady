import React from 'react'
import { Package, RefreshCw, CreditCard, Mail, Phone, Truck } from 'lucide-react';
const ReturnAndRefund = () => {
 return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Package className="w-16 h-16 text-pink-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Refund, Return & Shipping Policy</h1>
          <p className="text-lg text-gray-600">
            Your guide to our shipping, returns, and refund processes at PinkLady.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Shipping */}
          <section>
            <div className="flex items-center mb-4">
              <Truck className="w-6 h-6 text-pink-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Shipping</h2>
            </div>
            <ul className="space-y-2 text-gray-700 ml-9">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Orders are usually processed and shipped within <span className="font-semibold">2 business days</span>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Delivery timelines may vary depending on location.</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Customers will receive tracking details once the order is dispatched.</span>
              </li>
            </ul>
          </section>

          {/* Return & Exchange Policy */}
          <section>
            <div className="flex items-center mb-4">
              <RefreshCw className="w-6 h-6 text-pink-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Return & Exchange Policy</h2>
            </div>
            <ul className="space-y-2 text-gray-700 ml-9">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Due to the <span className="font-semibold">personal and hygienic nature</span> of our products, we <span className="font-semibold">do not accept returns once the package is opened</span>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>In case you receive a <span className="font-semibold">damaged, defective, or wrong product</span>, please contact us on <span className="font-semibold">same day of delivery</span> with proof (photo/video). We will arrange for a replacement.</span>
              </li>
            </ul>
          </section>

          {/* Refund Policy */}
          <section>
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-pink-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Refund Policy</h2>
            </div>
            <ul className="space-y-2 text-gray-700 ml-9">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Refunds are only applicable if the product is not available or is cancelled before shipping.</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Once approved, refunds will be processed within <span className="font-semibold">5–7 business days</span> to the original payment method.</span>
              </li>
            </ul>
          </section>

          {/* Contact Us */}
          <section className="bg-pink-50 rounded-lg p-6 border border-pink-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              For any shipping, return, or refund concerns, please contact:
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 text-pink-500 mr-3" />
                <a href="mailto:paapatchienterprises@gmail.com" className="hover:text-pink-600 transition-colors">
                  paapatchienterprises@gmail.com
                </a>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="w-5 h-5 text-pink-500 mr-3" />
                <a href="tel:+919080895118" className="hover:text-pink-600 transition-colors">
                  +91 9080895118
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
}

export default ReturnAndRefund