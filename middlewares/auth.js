import jwt from 'jsonwebtoken';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';

const checkToken = (req, res, next) => {
    const route = req.url.toLowerCase().trim();
    switch (route) {
        case '/users/login':
        case '/users/register':
            next();
            return;
    }

    const token = req.headers?.authorization?.split(" ")[1];
    try {
        const jwtObject = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const isExpired = Date.now() >= jwtObject.exp * 1000;

        if (isExpired) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message: 'Token is expired.'
            })
        }
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: error.message
        })
    }
}

export default checkToken;