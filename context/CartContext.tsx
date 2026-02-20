"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface CartItem {
  name: string;
  quantity: number;
  price: string;
  category?: string;
  description?: string;
  number?: number | string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (itemName: string) => void;
  clearCart: () => void;
  getItemQuantity: (itemName: string) => number;
  getTotalItems: () => number;
  cartBounce: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "pizzeria-messina-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartBounce, setCartBounce] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // Trigger bounce animation
  const triggerBounce = useCallback(() => {
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 300);
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.name === item.name);
      if (existing) {
        return prevCart.map((c) =>
          c.name === item.name ? { ...c, quantity: c.quantity + (item.quantity || 1) } : c
        );
      }
      return [...prevCart, { ...item, quantity: item.quantity || 1 }];
    });
    triggerBounce();
  }, [triggerBounce]);

  const removeFromCart = useCallback((itemName: string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.name === itemName);
      if (existing && existing.quantity > 1) {
        return prevCart.map((c) =>
          c.name === itemName ? { ...c, quantity: c.quantity - 1 } : c
        );
      }
      return prevCart.filter((c) => c.name !== itemName);
    });
    triggerBounce();
  }, [triggerBounce]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getItemQuantity = useCallback((itemName: string) => {
    return cart.find((c) => c.name === itemName)?.quantity || 0;
  }, [cart]);

  const getTotalItems = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getItemQuantity,
        getTotalItems,
        cartBounce,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
