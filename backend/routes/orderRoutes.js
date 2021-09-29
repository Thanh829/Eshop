import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid } from '../controllers/orderController.js'
import { filterRequest } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').post(filterRequest, addOrderItems)
router.route('/:id').get(filterRequest, getOrderById)
router.route('/:id/pay').put(filterRequest, updateOrderToPaid)

export default router