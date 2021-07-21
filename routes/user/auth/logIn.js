const router = require('express').Router();
const { body } = require('express-validator')

const logIn = require('../../../controllers/user/auth/logIn').logIn;

router.post('/login',

    // Validation
    body('email')
        .isEmail()
        .withMessage("please enter valid email id")
        .normalizeEmail(),

    // controller middleware
    logIn
)

module.exports = router;