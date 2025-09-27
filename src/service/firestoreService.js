import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const PRODUCTS_COLLECTION = 'products';

export const firestoreService = {
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

  async getProductById(productId) {
    try {
      const productRef = doc(db, 'products', productId);
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
  
  async getShippingSettings() {
    try {
      const settingsRef = doc(db, 'settings', 'shipping');
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
          updatedAt: new Date(),
          createdAt: new Date()
        };
        // Create default settings in Firestore
        await this.updateShippingSettings(defaultSettings);
        return defaultSettings;
      }
    } catch (error) {
      console.error('Error fetching shipping settings:', error);
      throw error;
    }
  }
,
  async updateShippingSettings(settingsData) {
    try {
      const settingsRef = doc(db, 'settings', 'shipping');
      await setDoc(settingsRef, {
        ...settingsData,
        updatedAt: new Date()
      }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error updating shipping settings:', error);
      throw error;
    }
  },

  // Method for checkout page to calculate shipping
  async calculateShipping(orderTotal, shippingType = 'standard') {
    try {
      const shippingSettings = await this.getShippingSettings();
      
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
  async getShippingOptions(orderTotal) {
    try {
      const shippingSettings = await this.getShippingSettings();
      
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

  // Method to update product order count (for analytics)
  async incrementProductOrder(productId, quantity = 1) {
    try {
      const productRef = doc(db, 'products', productId);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        const currentOrders = productSnap.data().totalOrders || 0;
        await updateDoc(productRef, {
          totalOrders: currentOrders + quantity,
          updatedAt: new Date()
        });
      }
      return true;
    } catch (error) {
      console.error('Error updating product orders:', error);
      throw error;
    }
  }

};