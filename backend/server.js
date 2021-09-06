import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFoundUrl } from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()
connectDB()


app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
    res.send('App is running.........')
})


app.use(notFoundUrl)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'development'

app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`))