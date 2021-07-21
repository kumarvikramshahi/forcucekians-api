const router = require('express').Router();
const { body } = require('express-validator');

const signUp = require('../../../controllers/user/auth/signUp').signUp;

router.post("/signup",

    // Validation
    body('name')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 chars long')
        .isLength({ max: 20 })
        .withMessage("Name should not excced 20 words limit"),
    body('email')
        .isEmail()
        .withMessage("please enter valid email id")
        .normalizeEmail(),
    body('password')
        .isLength({ min: 5 })
        .withMessage("password must be at least 5 chars long"),

    // controller middleware
    signUp
)

module.exports = router;