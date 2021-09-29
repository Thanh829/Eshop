import axios from "axios"
import { ORDER_CREATE_FAILED, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAILED, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/OrderConstant"

export const createOrder = (order) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/order/', order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error.message)
        dispatch({ type: ORDER_CREATE_FAILED, payload: error.response && error.response.data.message ? error.response.data.message : error.message })

    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/order/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error.message)
        dispatch({ type: ORDER_DETAILS_FAILED, payload: error.response && error.response.data.message ? error.response.data.message : error.message })

    }
}

export const orderPay = (id, paymentResult) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/order/${id}/pay`, paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error.message)
        dispatch({ type: ORDER_PAY_FAILED, payload: error.response && error.response.data.message ? error.response.data.message : error.message })

    }
}