import mongoose, { Schema } from "mongoose";

const UniversityClass = new mongoose.model('UniversityClass', new Schema({
    id: {
        type: Schema.ObjectId
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length >= 4,
            message: "Class name must have at least 4 characters. Eg: C2110I"
        }
    }
}))

export default UniversityClass;