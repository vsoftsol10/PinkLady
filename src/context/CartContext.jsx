import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Context
const CartContext = createContext();

// Cart Actions
const cartActions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case cartActions.ADD_TO_CART:
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      };

    case cartActions.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case cartActions.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case cartActions.CLEAR_CART:
      return {
        ...state,
        items: []
      };

    case cartActions.LOAD_CART:
      return {
        ...state,
        items: action.payload || []
      };

    default:
      return state;
  }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from sessionStorage on initialization
  useEffect(() => {
    try {
      const savedCart = sessionStorage.getItem('shopping_cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: cartActions.LOAD_CART, payload: parsedCart });
      }
    } catch (error) {
      console.error('Error loading cart from session storage:', error);
    }
  }, []);

  // Save cart to sessionStorage whenever cart changes
  useEffect(() => {
    try {
      sessionStorage.setItem('shopping_cart', JSON.stringify(cartState.items));
    } catch (error) {
      console.error('Error saving cart to session storage:', error);
    }
  }, [cartState.items]);

  // Cart actions
  const addToCart = (product) => {
    dispatch({ type: cartActions.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: cartActions.REMOVE_FROM_CART, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: cartActions.UPDATE_QUANTITY, payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: cartActions.CLEAR_CART });
  };

  // Calculate totals
  const cartTotals = {
    itemCount: cartState.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: cartState.items.reduce((sum, item) => sum + (item.offerPrice * item.quantity), 0),
    tax: Math.round(cartState.items.reduce((sum, item) => sum + (item.offerPrice * item.quantity), 0) * 0.02),
    total: cartState.items.reduce((sum, item) => sum + (item.offerPrice * item.quantity), 0) + Math.round(cartState.items.reduce((sum, item) => sum + (item.offerPrice * item.quantity), 0) * 0.02)
  };

  const value = {
    cartItems: cartState.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    ...cartTotals
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};