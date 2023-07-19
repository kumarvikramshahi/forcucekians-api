const router = require('express').Router();
const { body } = require('express-validator');
const multer = require('multer');
// const uploadFiles = multer({ dest: "incomingFileUpload/" });

const uploadQuestionPaper = require('../../../controllers/user/uploads/upload-questionPaper').upload_QuestionPaper;
const isAuth = require('../../../utils/is-auth');

router.post('/uploadQuestionPaper',

    // Auth middleware
    isAuth,
    // uploadFiles.single("questionPaperFile"),

    // Validation
    body('questionPaperName')
        .trim()
        .isLength({ max: 60 })
        .withMessage("Question paper name shouldn't exceeds 60 words limit")
        .isLength({ min: 5 })
        .withMessage('Question paper name should be atleast of 5 words'),
    body('subjectFullName')
        .trim()
        .isLength({ max: 50 })
        .withMessage("Subject full name shouldn't exceeds 50 words limit")
        .isLength({ min: 5 })
        .withMessage("Subject full name should be atleast of 5 words"),
    body('examType')
        .trim()
        .isLength({ max: 9 })
        .withMessage("Exam type shouldn't exceeds 9 words limit")
        .isLength({ min: 3 })
        .withMessage("Exam type should be atleast of 3 words"),

    //controller middleware
    uploadQuestionPaper
);

module.exports = router;