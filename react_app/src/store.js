import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    productListReducers,
    productDetailReducers,
    productDeleteReducers,
    productReviewCreateReducers
} from "./reducers/productReducers";
import {cartReducer, wishlistReducer} from "./reducers/cartReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userSendVerificationCodeReducer,
    userResetPasswordReducer,
    userCheckCodedReducer,
    phoneNumberReducer
} from "./reducers/userReducers";
import {orderCreateReducer, orderDetailReducer, orderPayReducer, orderListMyReducer} from "./reducers/orderReducers";

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailReducers,
    cart: cartReducer,
    wishlist: wishlistReducer,

    productDelete: productDeleteReducers,
    productReviewCreate: productReviewCreateReducers,

    userLogin: userLoginReducer,
    userResetPassword: userResetPasswordReducer,
    userCheckCode: userCheckCodedReducer,
    userRegister: userRegisterReducer,
    userSendVerificationCode: userSendVerificationCodeReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    phoneNumber: phoneNumberReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const wishlistItemsFromStorage = localStorage.getItem('wishlistItems') ?
    JSON.parse(localStorage.getItem('wishlistItems')): []


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const phoneNumberFromStorage = localStorage.getItem('phone') ?
    JSON.parse(localStorage.getItem('phone')) : null



const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    wishlist: {wishlistItems: wishlistItemsFromStorage},
    userLogin: {userInfo: userInfoFromStorage},
    phoneNumber: phoneNumberFromStorage
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
        composeWithDevTools(applyMiddleware(...middleware)
        )
    )

export default store