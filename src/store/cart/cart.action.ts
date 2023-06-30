import { CartItemModel } from "../../models/cart-item";
import { Product } from "../../models/product";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

export const setIsCartOpen = (bool: boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)

export const addItemToCart = (cartItems: [], productToAdd: any) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems: [], cartItemToRemove: CartItemModel) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems: [], cartItemToRemove: CartItemModel) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};