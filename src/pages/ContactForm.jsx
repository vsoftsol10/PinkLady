import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, User, MessageSquare, Sparkles } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactInputBox = ({ type, placeholder, name, value, onChange, onBlur, error, touched, icon: Icon }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-6 relative group">
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#F18372] transition-colors duration-200">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(e);
          }}
          onFocus={() => setFocused(true)}
          className={`w-full rounded-xl border-2 ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 text-sm text-gray-700 outline-none transition-all duration-200 transform hover:scale-[1.02] focus:scale-[1.02] dark:bg-gray-800 dark:text-gray-300 ${
            error && touched 
              ? 'border-red-400 dark:border-red-500 shadow-lg shadow-red-100 dark:shadow-red-900/20' 
              : focused
              ? 'border-[#F18372] shadow-lg shadow-orange-100 dark:shadow-orange-900/20'
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
          } ${focused ? 'bg-white dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-800'}`}
        />
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#F18372] to-orange-400 transition-all duration-300 ${
          focused ? 'w-full' : 'w-0'
        }`}></div>
      </div>
      {error && touched && (
        <div className="flex items-center mt-2 text-xs text-red-500 animate-slide-in">
          <AlertCircle size={14} className="mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

const ContactTextArea = ({ placeholder, name, value, onChange, onBlur, error, touched }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-6 relative group">
      <div className="relative">
        <div className="absolute left-3 top-3 text-gray-400 group-focus-within:text-[#F18372] transition-colors duration-200">
          <MessageSquare size={18} />
        </div>
        <textarea
          rows={4}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(e);
          }}
          onFocus={() => setFocused(true)}
          className={`w-full resize-none rounded-xl border-2 pl-12 pr-4 py-3 text-sm text-gray-700 outline-none transition-all duration-200 transform hover:scale-[1.02] focus:scale-[1.02] dark:bg-gray-800 dark:text-gray-300 ${
            error && touched 
              ? 'border-red-400 dark:border-red-500 shadow-lg shadow-red-100 dark:shadow-red-900/20' 
              : focused
              ? 'border-[#F18372] shadow-lg shadow-orange-100 dark:shadow-orange-900/20'
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
          } ${focused ? 'bg-white dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-800'}`}
        />
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#F18372] to-orange-400 transition-all duration-300 ${
          focused ? 'w-full' : 'w-0'
        }`}></div>
      </div>
      {error && touched && (
        <div className="flex items-center mt-2 text-xs text-red-500 animate-slide-in">
          <AlertCircle size={14} className="mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 bg-[#F18372] rounded-full opacity-20 animate-float`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

const ContactForm = () => {
  // EmailJS Configuration - Replace with your actual IDs
  const EMAILJS_CONFIG = {
    serviceId: 'service_8lju8fe',
    templateId: 'template_r7q9fre',
    publicKey: 'uHyjQhoh59EySHL4X'
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }, []);

  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return 'Phone number is required';
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    return '';
  };

  const validateMessage = (message) => {
    if (!message.trim()) return 'Message is required';
    if (message.trim().length < 10) return 'Message must be at least 10 characters';
    if (message.trim().length > 500) return 'Message must be less than 500 characters';
    return '';
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      message: validateMessage(formData.message)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    let error = '';
    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    if (!touched[name]) {
      setTouched(prev => ({
        ...prev,
        [name]: true
      }));
    }

    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });

    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fill the required fields before submitting.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: 'Paapatchienterprises@gmail.com',
        reply_to: formData.email
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      console.log('Email sent successfully:', response);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon!' 
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setTouched({});
      setErrors({});
      
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Oops! Something went wrong. Please try again or contact us directly at Paapatchienterprises@gmail.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-[70px] md:mt-[120px] min-h-screen dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#F18372]/10 to-orange-200/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>

      <div className={`max-w-6xl mx-auto p-8 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F18372] to-orange-400 rounded-full mb-6 animate-pulse">
            <Sparkles className="text-white" size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#F18372] to-orange-400 dark:from-white dark:via-[#F18372] dark:to-orange-400 mb-4">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have a question? We'd love to hear from you. 
            <span className="text-[#F18372] font-semibold"> Drop us a line</span> and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 transform hover:scale-105 transition-all duration-300">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                Get In Touch
                <div className="ml-3 w-3 h-3 bg-[#F18372] rounded-full animate-pulse"></div>
              </h2>
              
              <div className="space-y-6">
                <div className="group flex items-start p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#F18372] to-orange-400 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Visit Us</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">768/E, Suthamalli, Tirunelveli, TamilNadu-627604</p>
                  </div>
                </div>
                
                <div className="group flex items-start p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#F18372] to-orange-400 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Call Us</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">(+91) 90 808 95118</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Mon-Fri from 8am to 5pm</p>
                  </div>
                </div>
                
                <div className="group flex items-start p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#F18372] to-orange-400 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Email Us</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Paapatchienterprises@gmail.com</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Online support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F18372]/20 to-orange-200/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <ContactInputBox
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name}
                    touched={touched.name}
                    icon={User}
                  />
                  
                  <ContactInputBox
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    icon={Mail}
                  />
                </div>
                
                <ContactInputBox
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone}
                  touched={touched.phone}
                  icon={Phone}
                />
                
                <ContactTextArea
                  placeholder="Tell us about your project or ask us anything..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.message}
                  touched={touched.message}
                />

                {submitStatus && (
                  <div className={`mb-6 p-4 rounded-xl text-sm flex items-center animate-slide-in ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                      : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                  }`}>
                    {submitStatus.type === 'success' ? (
                      <CheckCircle size={18} className="mr-2 flex-shrink-0" />
                    ) : (
                      <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                    )}
                    {submitStatus.message}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full py-4 px-8 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#F18372] to-orange-400 hover:from-[#e6725f] hover:to-orange-500 shadow-lg hover:shadow-xl'
                  } overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-5deg); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;