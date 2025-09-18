import React, { useState } from 'react';
import LocationIcon from "../assets/icon/LocationIcon.png"
import CallIcon from "../assets/icon/PhoneIcon.png"
import MailIcon from "../assets/icon/MailIcon.png"
import BreadCrumsContact from '../components/Contact/BreadCrumsContact';

const ContactInputBox = ({ type, placeholder, name, value, onChange, error, touched }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded border px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300 ${
          error && touched 
            ? 'border-red-500 dark:border-red-500' 
            : 'border-gray-300 dark:border-gray-600'
        }`}
      />
      {error && touched && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

const ContactTextArea = ({ placeholder, name, value, onChange, error, touched }) => {
  return (
    <div className="mb-4">
      <textarea
        rows={4}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full resize-none rounded border px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300 ${
          error && touched 
            ? 'border-red-500 dark:border-red-500' 
            : 'border-gray-300 dark:border-gray-600'
        }`}
      />
      {error && touched && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

const ContactForm = () => {
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

  // Validation functions
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

    // Real-time validation
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

    // Mark field as touched when user starts typing
    if (!touched[name]) {
      setTouched(prev => ({
        ...prev,
        [name]: true
      }));
    }

    // Clear submit status when user starts typing
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
    
    // Mark all fields as touched
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you! Your message has been sent successfully.' 
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
      setSubmitStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900">
      <BreadCrumsContact/>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <img src={LocationIcon} alt="Location-Icon" className='w-12 rounded-3xl' />
              </div>
              <div>
                <h4 className="font-extrabold">Address</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">99 S.t Jomblo Park Pekanbaru 28292. Indonesia</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <img src={CallIcon} alt="Phone-Icon" className='w-12 rounded-3xl' />
              </div>
              <div>
                <h4 className="font-bold">Phone</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">(+62)81 414 257 9980</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <img src={MailIcon} alt="Mail-Icon" className='w-12 rounded-3xl' />
              </div>
              <div>
                <h4 className="font-bold">Email</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">info@yourdomain.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 dark:bg-gray-800 text-black p-6 rounded-lg">
          <form onSubmit={handleSubmit} noValidate>
            <ContactInputBox
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
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
            />
            
            <ContactInputBox
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
            />
            
            <ContactTextArea
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.message}
              touched={touched.message}
            />

            {/* Submit Status Message */}
            {submitStatus && (
              <div className={`mb-4 p-3 rounded text-sm ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded font-medium transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#F18372] hover:bg-[#e6725f]'
              } text-white`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;