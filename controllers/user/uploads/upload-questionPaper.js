const { validationResult } = require('express-validator')

const QuestionPaper = require('../../../models/uploads/questionPaper');

exports.upload_QuestionPaper = (req, resp, next) => {

    //incoming requests.
    const questionPaperName = req.body.questionPaperName;
    const subjectFullName = req.body.subjectFullName;
    const examType = req.body.examType
    const fileUrl = req.body.fileUrl
    const userId = req.userId;

    // Validation & Response.
    const validationErrors = validationResult(req);;
    if (!validationErrors.isEmpty()) {
        return resp.status(400).json({ errors: validationErrors.array() });
    }

    const name = questionPaperName + " " + examType
    const newUploadQuestionPaper = new QuestionPaper(name, subjectFullName, examType, fileUrl, userId)
    newUploadQuestionPaper.save()
        .then(() => {
            resp.status(201).json({
                message: 'Uploaded successfully'
            })
        })
        .catch(err => {
            if (!err.message) {
                err.message = "Unable to upload, try after sometime!"
            }
            next(err);
        })
}