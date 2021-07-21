const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');

const User = require('../../../models/auth/user');

exports.signUp = (req, resp, next) => {

    // Incoming requests.
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const rememberMe = req.body.rememberMe ? '30d' : '6h';

    // Validation & Response.
    const validationErrors = validationResult(req);;
    if (!validationErrors.isEmpty()) {
        return resp.status(400).json({ errors: validationErrors.array() });
    }

    User.find(email)
        .then(user => {
            if (user) {
                const error = new Error("Email already exists!");
                error.statusCode = 400;
                throw error;
            }
            return bcrypt.hash(password, 12)
        })
        .then(hashPassword => {
            const newUser = new User(name, email, hashPassword);
            return newUser.create()
        })
        .then(userData => {
            if (!userData) {
                const error = new Error("Internal server error");
                error.statusCode = 500;
                throw error;
            }
            userData.map(item => {
                const token = JWT.sign(
                    {
                        email: item.email,
                        userId: item._id.toString()
                    },
                    'JoEsLineKoCopyKreWoDuniyaKaSbseBraWalaBhosriwalaSamjhaReRandiyaWala',
                    { expiresIn: rememberMe }
                )
                return resp.status(201).json({
                    userId: item._id.toString(),
                    token: token,
                    expiresIn: rememberMe
                })
            })
        })
        .catch(err => {
            console.log(err.message)
            if (!err.message) {
                err.message = "Unable to SignUp. try after sometime! "
            }
            next(err);
        })

}