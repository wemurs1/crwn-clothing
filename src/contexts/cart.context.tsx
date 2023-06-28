import { ReactNode, createContext, useReducer } from 'react';
import { CartItemModel } from '../models/cart-item';
import { Product } from '../models/product';
import { createAction } from '../utils/reducer/reducer.utils';

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

interface ActionProps {
  type: string;
  payload: any;
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

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state: any, action: ActionProps) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled type ${type} received in cartReducer`);
  }
};

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
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartitemsReducer = (newCartItems: CartItemModel[]) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const addItemToCart = (productToAdd: Product) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartitemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove: CartItemModel) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartitemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToRemove: CartItemModel) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    updateCartitemsReducer(newCartItems);
  };

  const setIsCartOpen = (value: boolean) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, value));
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
