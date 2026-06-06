import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { userDataContext } from './UserContext';
import { toast } from 'react-toastify';

export const shopDataContext = createContext();

const CART_STORAGE_KEY = 'onecart_cart';

const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItemState] = useState({});
  // buyNowItem: { product, size, quantity } — used for direct checkout
  const [buyNowItem, setBuyNowItem] = useState(null);

  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);

  const currency = '$';
  const delivery_fee = 40;

  // Keep localStorage in sync whenever cart changes
  const setCartItem = (data) => {
    setCartItemState(data);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage quota exceeded — silently ignore
    }
  };

  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/product/list', {
        withCredentials: true,
      });
      setProducts(result.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const addtoCart = async (itemId, size) => {
    if (!size) {
      toast.warn('Please select a size first');
      return;
    }

    const cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(
          serverUrl + '/api/cart/add',
          { itemId, size },
          { withCredentials: true }
        );
        toast.success('Added to cart');
      } catch (error) {
        console.error('Cart sync error:', error);
      }
    }
  };

  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + '/api/cart/get',
        {},
        { withCredentials: true }
      );
      // Server cart takes priority over localStorage
      if (result.data && Object.keys(result.data).length > 0) {
        setCartItem(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    // Remove the key entirely when qty hits 0
    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }
    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(
          serverUrl + '/api/cart/update',
          { itemId, size, quantity },
          { withCredentials: true }
        );
      } catch (error) {
        console.error('Cart update error:', error);
      }
    }
  };

  const clearCart = () => {
    setCartItem({});
  };

  const getCartCount = () => {
    let total = 0;
    for (const id in cartItem) {
      for (const size in cartItem[id]) {
        const qty = cartItem[id][size];
        if (typeof qty === 'number' && qty > 0) total += qty;
      }
    }
    return total;
  };

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItem) {
      const product = products.find((p) => p._id === id);
      if (!product) continue;
      for (const size in cartItem[id]) {
        const qty = cartItem[id][size];
        if (typeof qty === 'number' && qty > 0) {
          total += product.price * qty;
        }
      }
    }
    return total;
  };

  // Load cart from localStorage as an initial fallback before server responds
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          setCartItemState(parsed);
        }
      }
    } catch {
      // corrupted storage — ignore
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (userData) getUserCart();
  }, [userData]);

  const value = {
    currency,
    delivery_fee,
    products,
    getProducts,
    showSearch,
    setShowSearch,
    search,
    setSearch,
    cartItem,
    setCartItem,
    addtoCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartAmount,
    buyNowItem,
    setBuyNowItem,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
};

export default ShopContext;