import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const route = express.Router()

route.get('/', asyncHandler(async (req, res) => {

    const products = await Product.find()
    res.send(products)
}))

route.get('/:id', asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))

export default route