import { createSelector } from "reselect";

const selectCartReducer = (state: any) => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => {
        console.log(`isCartOpen ${cart.isCartOpen}`);
        return cart.isCartOpen
    }
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total: number, cartItem: any) => total + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total: number, cartItem: any) => total + cartItem.quantity * cartItem.price, 0)
)