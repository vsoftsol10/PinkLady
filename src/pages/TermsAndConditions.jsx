import React from 'react'
import { Package, Mail, Phone } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Package className="w-16 h-16 text-pink-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms & Conditions</h1>
          <p className="text-lg text-gray-600">
            Welcome to PinkLady. By using our website and placing an order, you agree to the following terms.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Product Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Product Information</h2>
            <p className="text-gray-700 ml-4">
              We aim to provide accurate product descriptions. However, minor variations may occur.
            </p>
          </section>

          {/* Pricing & Payment */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Pricing & Payment</h2>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>All prices are listed in INR.</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Payments are processed securely via Razorpay.</span>
              </li>
            </ul>
          </section>

          {/* Order Confirmation */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Order Confirmation</h2>
            <p className="text-gray-700 ml-4">
              Orders will be confirmed only after successful payment.
            </p>
          </section>

          {/* Returns & Refunds */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Returns & Refunds</h2>
            <p className="text-gray-700 ml-4">
              Governed by our <span className="font-semibold">Refund, Return & Shipping Policy</span>.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p className="text-gray-700 ml-4">
              All content, images, and logos on this website are the property of PinkLady. Unauthorized use is prohibited.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-700 ml-4">
              PinkLady shall not be held responsible for indirect or consequential damages arising from the use of our products.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Governing Law</h2>
            <p className="text-gray-700 ml-4">
              These terms are governed by the laws of India.
            </p>
          </section>

          {/* Contact Us */}
          <section className="bg-pink-50 rounded-lg p-6 border border-pink-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              For any questions or concerns regarding these terms, please contact:
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

export default TermsAndConditions;