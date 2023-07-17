import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isemail.js";

const Student = mongoose.model('Student', new Schema({
    id: {
        type: Schema.ObjectId
    },
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
    languages: {
        type: [String]
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ['Male','Female'],
            message:'{VALUE} is not supported'
        },
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: (value)=> value.length >= 5 && value.length <= 50,
            message: 'Phone number must have at least 5 characters'
        }
    },
    address: {
        type: String
    }
}))

export default Student;