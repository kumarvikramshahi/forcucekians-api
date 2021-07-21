const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const User = require('../../../models/auth/user');

exports.logIn = (req, resp, next) => {

    // Incoming requests.
    const email = req.body.email
    const password = req.body.password
    const rememberMe = req.body.rememberMe ? '30d' : '6h';
    let loadUser;

    // Validation & Response.
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return resp.status(400).json({ errors: validationErrors.array() });
    }

    User.find(email)
        .then((user) => {
            if (!user) {
                const error = new Error("Invalid Email or password. Please try again.");
                error.statusCode = 401;
                throw error;
            }
            loadUser = user
            return bcrypt.compare(password, user.passwd)
        })
        .then(doMatch => {
            if (!doMatch) {
                const error = new Error("Invalid Email or password. Please try again.");
                error.statusCode = 401;
                throw error;
            }
            const token = JWT.sign(
                {
                    email: loadUser.email,
                    userId: loadUser._id.toString()
                },
                'JoEsLineKoCopyKreWoDuniyaKaSbseBraWalaBhosriwalaSamjhaReRandiyaWala',
                { expiresIn: rememberMe }
            )
            return resp.status(200).json({
                userId: loadUser._id.toString(),
                token: token,
                expiresIn: rememberMe
            })
        })
        .catch(err => {
            if (!err.message) {
                err.message = "Unable to LogIn. try after sometime! "
            }
            next(err);
        })
}