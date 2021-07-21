const { validationResult } = require('express-validator');

const User = require('../../../models/auth/user');

exports.forgotPassword = (req, resp, next) => {

    // first setup email verification by emailing then setup this route..

    // Incoming requests.
    const email = req.body.email
    const password = req.body.password

    // Validation & Response.
    const validationErrors = validationResult(req);;
    if (!validationErrors.isEmpty()) {
        return resp.status(400).json({ errors: validationErrors.array() });
    }

    User.find(email, password)
        .then((user) => {
            if (!user) {
                return resp.status(404).json({ message: "Invalid Email or password. Please try again." })
            }
            resp.status(200).json({ message: "logged in " })
        })
        .catch(err => {
            err.statusCode = 500
            err.message = "Unable to logIn, try after sometime!"
            next(err);
        })
}