const router = require('express').Router();
const { body } = require('express-validator');

const uploadBooks = require('../../../controllers/user/uploads/upload-books').upload_Books;
const isAuth = require('../../../utils/is-auth');

router.post('/uploadBooks',

    // Auth middleware
    isAuth,

    // Validation
    body('bookName')
        .trim()
        .isLength({ max: 50 })
        .withMessage("Book name shouldn't exceeds 50 words")
        .isLength({ min: 1 })
        .withMessage('Book name should be atleast of 1 word'),
    body('author')
        .trim()
        .isLength({ max: 20 })
        .withMessage("Author name shouldn't exceeds 20 words")
        .isLength({ min: 3 })
        .withMessage("Author name should be atleast of 3 words"),
    body('genre')
        .trim()
        .isLength({ max: 15 })
        .withMessage("Genre shouldn't exceeds 15 words")
        .isLength({ min: 3 })
        .withMessage("Genre should be atleast of 3 words"),
    body('fileUrl')
        .isURL()
        .withMessage('please enter a valid file URL'),

    //controller middleware
    uploadBooks
);

module.exports = router;