import { Timestamp } from 'bson'
import mongooes from 'mongoose'
import bcrypt from 'bcryptjs'

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

userSchema.methods.matchPassword = async function (enterPassword) {
    console.log(this)
    return await bcrypt.compare(enterPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
        console.log('here')
    }

    console.log('here 2')

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    console.log(this.password)
})

const User = mongooes.model('User', userSchema)

export default User