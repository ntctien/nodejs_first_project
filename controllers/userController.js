import { validationResult } from "express-validator";
import { EventEmitter } from 'node:events'
import userRepository from '../repositories/userRepository.js';
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const event = new EventEmitter();
event.on('event.register.user', (params) => {
    console.log(JSON.stringify(params))
})

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        const user = await userRepository.login({ email, pw: password })
        res.status(HttpStatusCode.OK).json({
            message: 'Login user successfully',
            data: user
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.toString()
        })
    }
}

const register = async (req, res) => {
    // event.emit('event.register.user', { x: 1, y: 2 })
    const { name, email, password, phoneNumber, address } = req.body;
    try {
        const user = await userRepository.register({
            name,
            email,
            pw: password,
            phoneNumber,
            address
        });
        res.status(HttpStatusCode.CREATED).json({
            message: 'Register user successfully',
            data: user
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.toString()
        })
    }
}

const getUser = async (req, res) => {

}

export default { login, register, getUser };