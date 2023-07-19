const { validationResult } = require('express-validator');
const fs = require('fs');
const util = require('util');

const QuestionPaper = require('../../../models/uploads/questionPaper');
const { uploadFile } = require('../../../utils/S3_Bucket');

exports.upload_QuestionPaper = async (req, resp, next) => {

    //incoming requests.
    const questionPaperName = req.body.questionPaperName;
    const subjectFullName = req.body.subjectFullName;
    const examType = req.body.examType
    const questionPaperFile = req.file
    const userId = req.userId;
    var fileUrl;

    if (!questionPaperFile) {
        resp.status(400).json({
            message: "Please Upload a file"
        })
    }

    const fileUploadResult = await uploadFile(questionPaperFile);
    fileUrl = fileUploadResult.Location;
    // const unlink = util.promisify(fs.unlink);
    // await unlink(questionPaperFile.path)
    if (!fileUrl) resp.status(400).json({ message: "Not able to upload file, Try again!" })

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