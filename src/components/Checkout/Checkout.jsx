import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import CartImage from "../../assets/Cart.png";
import { useCart } from "../../context/CartContext";
import AddressModal from "./AddressModal";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { firestoreService } from "../../service/firestoreService";
import OrderSuccessModal from "./OrderSuccessModal";

const Checkout = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isOrderPlacing, setIsOrderPlacing] = useState(false);
  const [taxRate, setTaxRate] = useState(0);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState({
    isOpen: false,
    orderNumber: '',
    total: 0,
    email: ''
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState({
    cod: false,
    upi: false,
    card: false,
  });
  const [shippingSettings, setShippingSettings] = useState({
    withinTN: 0,
    outsideTN: 0
  });

  const navigate = useNavigate();

  // Use cart context
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // Calculate cart values based on Firebase settings
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.offerPrice * item.quantity), 0);
  const calculatedTax = (subtotal * taxRate) / 100;
  
  // Calculate dynamic shipping fee based on selected address state
  // Calculate dynamic shipping fee based on selected address state
const dynamicShippingFee = React.useMemo(() => {
  if (!selectedAddress || !selectedAddress.state) {
    return 0;
  }
  
  const state = selectedAddress.state.toLowerCase().trim();
  // More comprehensive Tamil Nadu check
  const isTamilNadu = state === 'tamil nadu' || 
                      state === 'tamilnadu' || 
                      state === 'tn' ||
                      state === 'tamil-nadu' ||
                      state.includes('tamil nadu');
  
  const fee = isTamilNadu ? shippingSettings.withinTN : shippingSettings.outsideTN;
  
  console.log('Shipping calculation:', {
    state: selectedAddress.state,
    isTamilNadu,
    fee,
    settings: shippingSettings
  });
  
  return fee;
}, [selectedAddress, shippingSettings]);
  
  const total = subtotal + dynamicShippingFee + calculatedTax;

  // Single useEffect to load settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoadingSettings(true);
        await firestoreService.initializeSettings();
        const settings = await firestoreService.getSettings();
        
        console.log('Loaded settings:', settings);
        
        setShippingSettings({
          withinTN: settings.shippingFee.insideTN || 0,
          outsideTN: settings.shippingFee.outsideTN || 0
        });
        setTaxRate(settings.taxApplicable || 0);
        setPaymentOptions(settings.paymentOptions || { cod: false, upi: false, card: false });
      } catch (error) {
        console.error('Error loading settings:', error);
        setShippingSettings({ withinTN: 0, outsideTN: 0 });
        setTaxRate(0);
        setPaymentOptions({ cod: false, upi: false, card: false });
      } finally {
        setLoadingSettings(false);
      }
    };
    
    loadSettings();
  }, []);

  const handleModalClose = () => {
    setOrderSuccess({
      isOpen: false,
      orderNumber: '',
      total: 0,
      email: ''
    });
    navigate("/products");
  };

  useEffect(() => {
    // Set first address as default if none selected
    if (!selectedAddress && savedAddresses.length > 0 && savedAddresses[0].state) {
      setSelectedAddress(savedAddresses[0]);
    }
  }, [savedAddresses, selectedAddress]);

  const handleAddAddress = (newAddressData) => {
    // Ensure the address includes the state field
    const addressWithState = {
      ...newAddressData,
      state: newAddressData.state || '',
      displayString: `${newAddressData.fullName}, ${newAddressData.address}, ${newAddressData.city}, ${newAddressData.state} - ${newAddressData.zipCode}`
    };
    
    console.log("New address added:", addressWithState);
    
    setSavedAddresses(prev => [...prev, addressWithState]);
    setSelectedAddress(addressWithState);
  };

  // Function to send order confirmation email to customer
  // Function to send order confirmation email to customer
const sendOrderConfirmationEmail = async (orderDetails) => {
  try {
    emailjs.init("uHyjQhoh59EySHL4X");

    // Use the order number passed from orderDetails, or generate new one
    const orderNumber = orderDetails.orderNumber || `ORD-${Date.now()}`;
    const orderDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const orderItemsString = orderDetails.items
      .map(
        (item) =>
          `${item.name} - Qty: ${item.quantity} - Price: ₹${
            item.offerPrice * item.quantity
          }`
      )
      .join("\n");

    const templateParams = {
      to_email: orderDetails.customerEmail,
      customer_name: orderDetails.customerName,
      order_number: orderNumber,
      order_date: orderDate,
      order_items: orderItemsString,
      subtotal: orderDetails.subtotal,
      tax: orderDetails.tax,
      shipping_fee: orderDetails.shippingFee, // This now has the correct value
      total_amount: orderDetails.total,
      delivery_address: orderDetails.deliveryAddress,
      payment_method: orderDetails.paymentMethod, // This now has the correct value
      customer_phone: orderDetails.customerPhone,
      item_count: orderDetails.itemCount,
      order_id: orderNumber,
    };

    console.log("Sending customer email with params:", templateParams);

    const result = await emailjs.send(
      "service_8lju8fe",
      "template_3q4176h",
      templateParams
    );

    console.log("Customer email sent successfully!", result);
    return { success: true, result, orderNumber };
  } catch (error) {
    console.error("Failed to send customer email:", error);

    if (error.status) {
      console.error("Error status:", error.status);
      console.error("Error text:", error.text);
    }

    return { success: false, error, orderNumber: orderDetails.orderNumber || `ORD-${Date.now()}` };
  }
};

// Function to send order notification email to admin
const sendAdminNotificationEmail = async (orderDetails, orderNumber) => {
  try {
    emailjs.init("TLgEwU0ofzU-siEfL");

    const orderDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const productDetailsString = orderDetails.items
      .map(
        (item) =>
          `${item.name} - Qty: ${item.quantity} - Price: ₹${
            item.offerPrice * item.quantity
          }`
      )
      .join("\n");

    const adminTemplateParams = {
      order_number: orderNumber,
      order_date: orderDate,
      customer_name: orderDetails.customerName,
      customer_email: orderDetails.customerEmail,
      customer_phone: orderDetails.customerPhone,
      delivery_address: orderDetails.deliveryAddress,
      payment_method: orderDetails.paymentMethod, // This now has the correct value
      item_count: orderDetails.itemCount,
      product_details: productDetailsString,
      subtotal: orderDetails.subtotal,
      shipping_fee: orderDetails.shippingFee, // This now has the correct value
      tax: orderDetails.tax,
      total_amount: orderDetails.total,
    };

    console.log("Sending admin email with params:", adminTemplateParams);

    const result = await emailjs.send(
      "service_bv6gssg",
      "template_rk70gvn",
      adminTemplateParams
    );

    console.log("Admin email sent successfully!", result);
    return { success: true, result };
  } catch (error) {
    console.error("Failed to send admin email:", error);

    if (error.status) {
      console.error("Error status:", error.status);
      console.error("Error text:", error.text);
    }

    return { success: false, error };
  }
};

  // Function to send order notification email to admin
    // const sendAdminNotificationEmail = async (orderDetails, orderNumber) => {
    //   try {
    //     emailjs.init("TLgEwU0ofzU-siEfL");

    //     const orderDate = new Date().toLocaleDateString("en-US", {
    //       year: "numeric",
    //       month: "long",
    //       day: "numeric",
    //     });

    //     const productDetailsString = orderDetails.items
    //       .map(
    //         (item) =>
    //           `${item.name} - Qty: ${item.quantity} - Price: ₹${
    //             item.offerPrice * item.quantity
    //           }`
    //       )
    //       .join("\n");

    //     const adminTemplateParams = {
    //       order_number: orderNumber,
    //       order_date: orderDate,
    //       customer_name: orderDetails.customerName,
    //       customer_email: orderDetails.customerEmail,
    //       customer_phone: orderDetails.customerPhone,
    //       delivery_address: orderDetails.deliveryAddress,
    //       payment_method: orderDetails.paymentMethod,
    //       item_count: orderDetails.itemCount,
    //       product_details: productDetailsString,
    //       subtotal: orderDetails.subtotal,
    //       shipping_fee: orderDetails.shippingFee,
    //       tax: orderDetails.tax,
    //       total_amount: orderDetails.total,
    //     };

    //     console.log("Sending admin email with params:", adminTemplateParams);

    //     const result = await emailjs.send(
    //       "service_bv6gssg",
    //       "template_rk70gvn",
    //       adminTemplateParams
    //     );

    //     console.log("Admin email sent successfully!", result);
    //     return { success: true, result };
    //   } catch (error) {
    //     console.error("Failed to send admin email:", error);

    //     if (error.status) {
    //       console.error("Error status:", error.status);
    //       console.error("Error text:", error.text);
    //     }

    //     return { success: false, error };
    //   }
    // };

const handlePlaceOrder = async () => {
  console.log("=== ORDER PLACEMENT STARTED ===");
  
  if (cartItems.length === 0) {
    alert("Your cart is empty. Please add some items before placing an order.");
    navigate("/products");
    return;
  }

  if (!selectedAddress) {
    alert("Please select or add an address before placing the order.");
    return;
  }

  setIsOrderPlacing(true);
  const orderNumber = `ORD-${Date.now()}`;

  try {
    // Create order details with properly formatted values
    const orderDetails = {
      customerName: selectedAddress.fullName,
      customerEmail: selectedAddress.email,
      customerPhone: selectedAddress.phone,
      deliveryAddress: selectedAddress.displayString,
      deliveryState: selectedAddress.state,
      paymentMethod: paymentMethod, // This will now have the correct value
      items: cartItems,
      subtotal: subtotal.toFixed(2),
      shippingFee: dynamicShippingFee.toFixed(2), // This now has the correct calculated value
      tax: calculatedTax.toFixed(2),
      total: total.toFixed(2),
      itemCount: itemCount,
      status: "pending",
      createdAt: serverTimestamp()
    };

    console.log("Order details being saved:", orderDetails); // Debug log

    // Save order to Firebase
    const docRef = await addDoc(collection(db, "orders"), orderDetails);
    console.log("Order saved to Firebase with ID:", docRef.id);

    // Show success modal FIRST
    setOrderSuccess({
      isOpen: true,
      orderNumber: orderNumber,
      total: total.toFixed(2),
      email: selectedAddress.email
    });

    // Clear cart AFTER showing modal
    clearCart();

    // Try to send emails in background with the SAME orderDetails
    const customerEmailPromise = sendOrderConfirmationEmail({
      ...orderDetails,
      orderNumber: orderNumber // Pass the order number explicitly
    });

    customerEmailPromise
      .then(async (emailResult) => {
        if (emailResult.success) {
          await sendAdminNotificationEmail(orderDetails, emailResult.orderNumber);
          
          await updateDoc(doc(db, "orders", docRef.id), {
            emailSent: true,
            emailSentAt: serverTimestamp(),
            orderNumber: emailResult.orderNumber
          });
          console.log("Customer and admin emails sent successfully");
        }
      })
      .catch((emailError) => {
        console.error("Email sending failed:", emailError);
      });

    console.log("=== ORDER PLACEMENT SUCCESS ===");

  } catch (error) {
    console.error("Error placing order:", error);
    alert(`❌ Order placement failed: ${error.message || 'Unknown error'}. Please try again.`);
  } finally {
    setIsOrderPlacing(false);
  }
};

  // Show empty cart message
  if (cartItems.length === 0 && !orderSuccess.isOpen) {
    return (
      <div className="flex flex-col items-center justify-center py-16 max-w-6xl w-full px-6 mx-auto min-h-[500px]">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <img src={CartImage} alt="Empty Cart" />
          </div>

          <h1 className="text-3xl font-medium mb-4 text-gray-800">
            Your Cart is Empty
          </h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. Start
            shopping to fill it up!
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-[#F18372] text-white px-8 py-3 rounded-lg hover:bg-[#ec543d] transition font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
        {/* Cart Section */}
        <div className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-medium mb-6">
            Shopping Cart{" "}
            <span className="text-lg text-[#93B45D]">{itemCount} Items</span>
          </h1>

          {/* Headers */}
          <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
            <p className="text-left">Product Details</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {/* Products */}
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3 border-b border-gray-200 pb-3"
            >
              <div className="flex items-center md:gap-6 gap-3">
                <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                  <img
                    className="max-w-full h-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Category: {product.category}
                  </p>
                  <div className="font-normal text-gray-500/70">
                    <p>
                      Size: <span>{product.size || "N/A"}</span>
                    </p>
                    <p>{product.pieces} pieces</p>
                    <div className="flex items-center">
                      <p>Qty:</p>
                      <select
                        value={product.quantity}
                        onChange={(e) =>
                          updateQuantity(product.id, parseInt(e.target.value))
                        }
                        className="outline-none ml-1 border border-gray-300 rounded px-1"
                      >
                        {Array(10)
                          .fill("")
                          .map((_, index) => (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                      </select>
                    </div>
                    <p className="text-xs text-gray-400">
                      ₹{product.offerPrice} each
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-center font-semibold text-gray-800">
                ₹{(product.offerPrice * product.quantity).toFixed(2)}
              </p>
              <button
                className="cursor-pointer mx-auto"
                onClick={() => removeFromCart(product.id)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                    stroke="#FF532E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}

          <button
            className="group cursor-pointer flex items-center mt-8 gap-2 text-[#F18372] font-medium"
            onClick={() => navigate("/products")}
          >
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                stroke="#F18372"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Continue Shopping
          </button>
        </div>

        {/* Order Summary */}
        <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
          <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
          <hr className="border-gray-300 my-5" />

          <div className="mb-6">
            {/* Address */}
            <p className="text-sm font-medium uppercase">Delivery Address</p>
            <div className="relative flex justify-between items-start mt-2">
              <div className="flex-1 pr-2">
                <p className="text-gray-800 font-medium text-sm">
                  {selectedAddress
                    ? selectedAddress.displayString
                    : "No address found"}
                </p>
              </div>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-[#F18372] hover:underline cursor-pointer text-sm"
              >
                Add Address
              </button>
              {showAddress && (
                <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10 shadow-lg">
                  <p
                    onClick={() => {
                      setIsAddressModalOpen(true);
                      setShowAddress(false);
                    }}
                    className="text-[#F18372] text-center cursor-pointer p-2 hover:bg-indigo-500/10 border-t"
                  >
                    + Add New Address
                  </p>
                </div>
              )}
            </div>

            {/* Payment */}
            <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            >
              {paymentOptions.cod && <option value="COD">Cash On Delivery</option>}
              {paymentOptions.upi && <option value="UPI">UPI Payment</option>}
              {paymentOptions.card && <option value="Card">Credit/Debit Card</option>}
            </select>

            {/* Show message if no payment options are enabled */}
            {!paymentOptions.cod && !paymentOptions.upi && !paymentOptions.card && (
              <p className="text-red-500 text-xs mt-2">
                No payment methods available. Please contact support.
              </p>
            )}
          </div>

          <hr className="border-gray-300" />

          {/* Price Calculation */}
          <div className="text-gray-500 mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Price ({itemCount} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping Fee</span>
              <span className={dynamicShippingFee === 0 ? "text-green-600" : ""}>
                {dynamicShippingFee === 0 ? 'Free' : `₹${dynamicShippingFee.toFixed(2)}`}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Tax ({taxRate}%)</span>
              <span>₹{calculatedTax.toFixed(2)}</span>
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="flex justify-between text-lg font-medium text-gray-800">
              <span>Total Amount:</span>
              <span>₹{total.toFixed(2)}</span>
            </p>
          </div>

          {/* Place Order */}
          <button
            onClick={handlePlaceOrder}
            disabled={
              isOrderPlacing || 
              loadingSettings || 
              (!paymentOptions.cod && !paymentOptions.upi && !paymentOptions.card)
            }
            className={`w-full py-3 mt-6 cursor-pointer font-medium rounded transition ${
              isOrderPlacing || loadingSettings || (!paymentOptions.cod && !paymentOptions.upi && !paymentOptions.card)
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-[#F18372] text-white hover:bg-[#ec543d]"
            }`}
          >
            {loadingSettings 
              ? "Loading..." 
              : isOrderPlacing 
              ? "Placing Order..." 
              : (!paymentOptions.cod && !paymentOptions.upi && !paymentOptions.card)
              ? "No Payment Methods Available"
              : "Place Order"}
          </button>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddAddress={handleAddAddress}
      />

      <OrderSuccessModal
        isOpen={orderSuccess.isOpen}
        onClose={handleModalClose}
        orderNumber={orderSuccess.orderNumber}
        total={orderSuccess.total}
        email={orderSuccess.email}
      />
    </>
  );
};

export default Checkout;