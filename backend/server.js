const express = require('express')
const products = require('./data/products')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.send('App is running.........')
})

app.get('/api/products', (req, res) => {
    res.send(products)
})

app.get('/api/products/:id', (req, res) => {

    const product = products.find((p) => p._id === req.params.id)
    res.send(product)
})

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'development'

app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`))