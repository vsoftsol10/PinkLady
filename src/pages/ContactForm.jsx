import { useState } from 'react';
import { MapPin, Mail, Phone, User, MessageSquare, Send } from 'lucide-react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for reaching out! We\'ll get back to you soon.');
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

                    {/* Left Side - Contact Form */}
                    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
                        <div className="mb-8">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                Keep in Touch
                            </h1>

                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                                We’re here to listen. Whether it’s about our products or your experience, reach out to us - because every woman’s voice matters.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3  border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="5"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                                    placeholder="Tell us more about your project or question..."
                                    required
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full text-white font-semibold py-4 px-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                            >
                                <Send className="w-5 h-5" />
                                <span>Send Message</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Contact Information */}
                    <div className="space-y-6">
                        {/* Address Card */}
                        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-black" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Our Office</h3>
                                    <div className="text-gray-600 space-y-1">
                                        <p>123 Business Avenue</p>
                                        <p>Suite 456, Floor 12</p>
                                        <p>New York, NY 10001</p>
                                        <p>United States</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support Email Card */}
                        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-black" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Technical Support</p>
                                            <a
                                                href="mailto:support@company.com"
                                                className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors duration-200"
                                            >
                                                support@company.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phone Support Card */}
                        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-Black" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Main Office</p>
                                            <a
                                                href="tel:+1-555-123-4567"
                                                className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors duration-200"
                                            >
                                                +1 (555) 123-4567
                                            </a>
                                        </div>
                                        <div>
                                            <a
                                                href="tel:+1-555-987-6543"
                                                className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors duration-200"
                                            >
                                                +1 (555) 987-6543
                                            </a>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-sm text-gray-500">
                                                <strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}