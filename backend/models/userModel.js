import { Timestamp } from 'bson'
import mongooes from 'mongoose'

const userSchema = mongooes.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamp: true
    }
)

const User = mongooes.model('User', userSchema)

export default User