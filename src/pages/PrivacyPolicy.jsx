import React from 'react';
import { Shield, Lock, UserCheck, Mail, Phone } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-pink-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            At PinkLady, we respect your privacy and are committed to protecting your personal information.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Information We Collect */}
          <section>
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-pink-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
            </div>
            <ul className="space-y-2 text-gray-700 ml-9">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Name, email address, phone number, and shipping address.</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Payment details (processed securely via Razorpay – we do not store card/bank information).</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Order history and preferences.</span>
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-pink-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
            </div>
            <ul className="space-y-2 text-gray-700 ml-9">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>To process and deliver your orders.</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>To communicate order updates, offers, and promotions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>To improve our products and services.</span>
              </li>
            </ul>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your information. Payments are processed securely via <span className="font-semibold text-pink-600">Razorpay</span> using encryption and industry-standard safeguards.
            </p>
          </section>

          {/* Sharing of Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sharing of Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell or trade your personal data. Information may only be shared with trusted third parties (e.g., courier partners, payment gateways) for fulfilling orders.
            </p>
          </section>

          {/* Contact Us */}
          <section className="bg-pink-50 rounded-lg p-6 border border-pink-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              For any privacy-related queries, please contact us at:
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 text-pink-500 mr-3" />
                <a href="mailto:suganthisundarrajan@gmail.com" className="hover:text-pink-600 transition-colors">
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
};

export default PrivacyPolicy;