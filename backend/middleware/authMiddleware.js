import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const filterRequest = asyncHandler(async (req, res, next) => {
    let token
    console.log('test')
    console.log(req.headers.authorization)

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            console.log(token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            if (!req.user) {
                throw new Error('User does not exist')
            }
            next()

        } catch (error) {
            res.status(401)
            throw new Error(error.message)
        }
    } else {
        throw new Error('Unauthorized user')
    }

})

export { filterRequest }