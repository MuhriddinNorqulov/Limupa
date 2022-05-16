import {
    CART_ADD_ITEM,
    CART_CLEAR_ITEMS,
    CART_REMOVE_ITEM,
    SAVE_PAYMENT_METHOD,
    SAVE_SHIPPING_ADDRESS,

    WISHLIST_ADD_ITEM,
    WISHLIST_REMOVE_ITEM
} from "../constants/cartConstants";

import {toast} from "react-toastify";



export const cartReducer = (state = {cartItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload.item
            const update = action.payload.update
            const info = action.payload.info


            const existItem = state.cartItems.find(x => x.product === item.product)


            if (existItem) {

                if (!update) {
                    item.qty += existItem.qty
                }
                if (item.qty > item.countInStock && item.countInStock > 0){
                    if(info){
                        toast.warning('Mahsulot soni cheklangan')
                    }
                    item.qty = item.countInStock
                }

                return {
                    ...state,
                    cartItems: state.cartItems.map(
                        x => x.product === existItem.product ? item: x
                    )
                }

            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state
    }
}


export const wishlistReducer = (state = {wishlistItems: []}, action) => {
    switch (action.type) {
        case WISHLIST_ADD_ITEM:
            const item = action.payload

            const existItem = state.wishlistItems.find(x => x.product === item.product)

            if (existItem) {

                return {
                    ...state,
                    wishlistItems: state.wishlistItems
                }
            }
            else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item]
                }
            }

        case WISHLIST_REMOVE_ITEM:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter(x => x.product !== action.payload)
            }

        default:
            return state
    }
}

