import express from 'express'
import { getProfile, login, registerUser, updateProfile } from '../controllers/userController.js'
import { filterRequest } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(login)
router.route('/register').post(registerUser)
router.route('/profile').get(filterRequest, getProfile)
router.route('/update').put(filterRequest, updateProfile)



export default router