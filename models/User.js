import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isemail.js";

const User = mongoose.model('User', new Schema({
    id: { type: Schema.ObjectId },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        validate: {
            validator: (value) => isEmail(value),
            message: 'Invalid email'
        }
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: (value)=> value.length >= 5,
            message: 'Phone number must have at least 5 characters'
        }
    },
    address: {
        type: String
    }
}))

export default User;