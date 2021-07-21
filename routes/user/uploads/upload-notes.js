const router = require('express').Router();
const { body } = require('express-validator');

const uploadNotes = require('../../../controllers/user/uploads/upload-notes').upload_Notes;
const isAuth = require('../../../utils/is-auth');

router.post('/uploadNotes',

    // Auth middleware
    isAuth,

    // Validation
    body('subjectShortName')
        .trim()
        .isLength({ max: 5 })
        .withMessage("Subject short name must not exceeds 5 chars")
        .isLength({ min: 2 })
        .withMessage('Subject short name must be at least 2 chars long'),
    body('subjectFullName')
        .trim()
        .isLength({ max: 50 })
        .withMessage("Subject full name shouldn't exceeds 50 words limit")
        .isLength({ min: 5 })
        .withMessage("Subject full name must be at least 5 chars long"),
    body('moduleNum')
        .trim()
        .isLength({ max: 10 })
        .withMessage("Module no. shouldn't exceeds 10 words limit")
        .isLength({ min: 1 })
        .withMessage("Module no. must be at least 1 chars long"),
    body('fileUrl')
        .isURL()
        .withMessage('please enter a valid file URL'),

    //controller middleware
    uploadNotes
);

module.exports = router;