import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  setDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const PRODUCTS_COLLECTION = 'products';
const SETTINGS_COLLECTION = 'settings';

export const firestoreService = {
  // =====================
  // PRODUCTS METHODS
  // =====================
  
  // Get all products
  getAllProducts: async () => {
    try {
      const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (productId) => {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, productId);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        return {
          id: productSnap.id,
          ...productSnap.data()
        };
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Add new product
  addProduct: async (productData) => {
    try {
      const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
        ...productData,
        totalOrders: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (productId, productData) => {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, productId);
      await updateDoc(productRef, {
        ...productData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    try {
      await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Increment product order count (for analytics)
  incrementProductOrder: async (productId, quantity = 1) => {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, productId);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        const currentOrders = productSnap.data().totalOrders || 0;
        await updateDoc(productRef, {
          totalOrders: currentOrders + quantity,
          updatedAt: serverTimestamp()
        });
      }
      return true;
    } catch (error) {
      console.error('Error updating product orders:', error);
      throw error;
    }
  },

  // =====================
  // GENERAL SETTINGS METHODS
  // =====================
  

  // Add this new method to firestoreService
initializeSettings: async () => {
  try {
    const settingsRef = doc(db, SETTINGS_COLLECTION, 'general');
    const settingsSnap = await getDoc(settingsRef);
    
    if (!settingsSnap.exists()) {
      // Create the document with default values
      await setDoc(settingsRef, {
        shippingFee: 0,
        taxApplicable: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log('Settings document created');
    }
    return true;
  } catch (error) {
    console.error('Error initializing settings:', error);
    throw error;
  }
},

  // Get general settings (shipping fee, tax, etc.)
  getSettings: async () => {
    try {
      const settingsRef = doc(db, SETTINGS_COLLECTION, 'general');
      const settingsSnap = await getDoc(settingsRef);
      
      if (settingsSnap.exists()) {
        return settingsSnap.data();
      } else {
        // Return default settings if none exist
        const defaultSettings = {
          shippingFee: 0,
          taxApplicable: 0
        };
        return defaultSettings;
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  },

  // Update general settings (will create if doesn't exist)
  updateSettings: async (settingsData) => {
    try {
      const settingsRef = doc(db, SETTINGS_COLLECTION, 'general');
      
      // Use setDoc with merge to create or update
      await setDoc(settingsRef, {
        ...settingsData,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      return true;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },

  // =====================
  // SHIPPING SETTINGS METHODS
  // =====================
  
  // Get shipping settings
  getShippingSettings: async () => {
    try {
      const settingsRef = doc(db, SETTINGS_COLLECTION, 'shipping');
      const settingsSnap = await getDoc(settingsRef);
      
      if (settingsSnap.exists()) {
        return settingsSnap.data();
      } else {
        // Return default settings if none exist
        const defaultSettings = {
          standardShipping: 50,
          expressShipping: 100,
          freeShippingThreshold: 500,
          isActive: true,
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp()
        };
        // Create default settings in Firestore
        await setDoc(settingsRef, defaultSettings);
        return defaultSettings;
      }
    } catch (error) {
      console.error('Error fetching shipping settings:', error);
      throw error;
    }
  },

  // Update shipping settings
  updateShippingSettings: async (settingsData) => {
    try {
      const settingsRef = doc(db, SETTINGS_COLLECTION, 'shipping');
      await setDoc(settingsRef, {
        ...settingsData,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error updating shipping settings:', error);
      throw error;
    }
  },

  // Calculate shipping for checkout
  calculateShipping: async (orderTotal, shippingType = 'standard') => {
    try {
      const shippingSettings = await firestoreService.getShippingSettings();
      
      if (!shippingSettings.isActive) {
        return {
          shippingFee: 0,
          shippingType: 'free',
          isFreeShipping: true,
          message: 'Shipping is currently disabled'
        };
      }

      // Check if order qualifies for free shipping
      if (orderTotal >= shippingSettings.freeShippingThreshold) {
        return {
          shippingFee: 0,
          shippingType: 'free',
          isFreeShipping: true,
          message: `Free shipping on orders above ₹${shippingSettings.freeShippingThreshold}`
        };
      }

      // Calculate shipping fee based on type
      let shippingFee = 0;
      let deliveryTime = '';
      
      switch (shippingType) {
        case 'express':
          shippingFee = shippingSettings.expressShipping;
          deliveryTime = '2-3 business days';
          break;
        case 'standard':
        default:
          shippingFee = shippingSettings.standardShipping;
          deliveryTime = '5-7 business days';
          break;
      }

      return {
        shippingFee,
        shippingType,
        isFreeShipping: false,
        deliveryTime,
        message: `${shippingType.charAt(0).toUpperCase() + shippingType.slice(1)} shipping - ${deliveryTime}`,
        freeShippingThreshold: shippingSettings.freeShippingThreshold,
        amountForFreeShipping: Math.max(0, shippingSettings.freeShippingThreshold - orderTotal)
      };
    } catch (error) {
      console.error('Error calculating shipping:', error);
      throw error;
    }
  },

  // Get shipping options for checkout page
  getShippingOptions: async (orderTotal) => {
    try {
      const shippingSettings = await firestoreService.getShippingSettings();
      
      if (!shippingSettings.isActive) {
        return [{
          id: 'free',
          name: 'Free Shipping',
          fee: 0,
          deliveryTime: 'Standard delivery',
          selected: true
        }];
      }

      const isFreeShipping = orderTotal >= shippingSettings.freeShippingThreshold;
      
      if (isFreeShipping) {
        return [{
          id: 'free',
          name: 'Free Shipping',
          fee: 0,
          deliveryTime: '5-7 business days',
          selected: true,
          message: `Free shipping on orders above ₹${shippingSettings.freeShippingThreshold}`
        }];
      }

      return [
        {
          id: 'standard',
          name: 'Standard Shipping',
          fee: shippingSettings.standardShipping,
          deliveryTime: '5-7 business days',
          selected: true
        },
        {
          id: 'express',
          name: 'Express Shipping',
          fee: shippingSettings.expressShipping,
          deliveryTime: '2-3 business days',
          selected: false
        }
      ];
    } catch (error) {
      console.error('Error getting shipping options:', error);
      throw error;
    }
  },
  // Add to your firestoreService
async initializeSettings() {
  try {
    const settingsRef = doc(db, 'settings', 'general');
    const settingsDoc = await getDoc(settingsRef);
    
    if (!settingsDoc.exists()) {
      await setDoc(settingsRef, {
        shippingFee: 0,
        taxApplicable: 0,
        globalOfferEnabled: false,
        globalOfferPercentage: 0,
        globalOfferText: ""
      });
    }
  } catch (error) {
    console.error('Error initializing settings:', error);
    throw error;
  }
}
};