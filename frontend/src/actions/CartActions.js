import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/CartConstants"


export const addToCart = (id, qty) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            countInStock: data.countInStock,
            price: data.price,
            qty
        }
    })

    console.log(qty)

    console.log(getState().cart.cartItems)

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeItem = (id) => async (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}