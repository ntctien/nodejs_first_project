import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Exception from '../exceptions/Exception.js';

const login = async ({ email, pw }) => {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
        const matched = await bcrypt.compare(pw, existingUser.password);
        if (matched) {
            const token = jwt.sign(existingUser.toObject(), process.env.JWT_PRIVATE_KEY, {
                expiresIn: '30 days'
            })

            const { password, ...data } = existingUser.toObject();
            return {
                ...data,
                token
            }
        }
        else {
            throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
        }
    }
    else {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }
}

const register = async ({ name, email, pw, phoneNumber, address }) => {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
        throw new Exception(Exception.USER_EXISTED);
    }

    const hashedPassword = await bcrypt.hash(pw, 10);

    //Insert to db
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address
    })

    const { password, ...returningUser } = newUser._doc;
    return returningUser;
}

export default { login, register }