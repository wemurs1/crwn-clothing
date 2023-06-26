import { ReactNode, createContext, useEffect, useState } from 'react';
import { CartItemModel } from '../models/cart-item';
import { Product } from '../models/product';

interface Props {
  children: ReactNode;
}

interface ContextProps {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  cartItems: CartItemModel[];
  addItemToCart: (productToAdd: Product) => void;
  removeItemFromCart: (cartItemToRemove: CartItemModel) => void;
  clearItemFromCart: (cartItemToRemove: CartItemModel) => void;
  cartCount: number;
  cartTotal: number;
}

export const CartContext = createContext<ContextProps>({
  isCartOpen: false,
  setIsCartOpen: (value: boolean) => null,
  cartItems: [],
  addItemToCart: (productToAdd: Product) => null,
  removeItemFromCart: (cartItemToRemove: CartItemModel) => null,
  clearItemFromCart: (cartItemToRemove: CartItemModel) => null,
  cartCount: 0,
  cartTotal: 0,
});

const addCartItem = (cartItems: CartItemModel[], productToAdd: Product) => {
  const existingCartitem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartitem)
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItemModel[],
  cartItemToRemove: CartItemModel
) => {
  const existingCartitem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartitem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: CartItemModel[],
  cartItemToRemove: CartItemModel
) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export const CartProvider = ({ children }: Props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd: Product) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove: CartItemModel) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToRemove: CartItemModel) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
