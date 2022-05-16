import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM, SAVE_PAYMENT_METHOD,
    SAVE_SHIPPING_ADDRESS, WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM
} from '../constants/cartConstants'
import {useSelector, useDispatch} from "react-redux";


export const orderCart = (cartItems) => (dispatch, getState) => {

    for (let item of cartItems) {
        dispatch(addToCart(item.product, item.qty, true, false))
    }

}


export const addToCart = (id, qty, update=false, toast_info=true) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/detail/${id}`)


    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            item:{
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            },
            update: update,
            info: toast_info

        }

    })


    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFormCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))

}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data) )
}


export const addToWishlist = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/detail/${id}`)


    dispatch({
        type: WISHLIST_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,

        }
    })

    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}


export const removeFromWishlist = (id) => (dispatch, getState) => {
    dispatch({
        type: WISHLIST_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}



