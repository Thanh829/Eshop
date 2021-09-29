import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/CartReducer'
import { orderDetailsReducer, orderReducer, orderUpdateToPaidReducer } from './reducers/orderReducer'
import { productDetailsReducer, productListReducer } from './reducers/productReducer'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/UserRecuder'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderUpdateToPaidReducer
})

const cartItemsInStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoInStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressInStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { cartItems: cartItemsInStorage, shippingAddress: shippingAddressInStorage },
    userLogin: { userInfo: userInfoInStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store