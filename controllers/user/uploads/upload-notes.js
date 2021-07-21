const { validationResult } = require('express-validator')

const Notes = require('../../../models/uploads/notes');

exports.upload_Notes = (req, resp, next) => {

    //incoming requests.
    const shortName = req.body.subjectShortName;
    const subjectFullName = req.body.subjectFullName;
    const moduleNum = req.body.moduleNum
    const fileUrl = req.body.fileUrl
    const notesBy = req.body.notesBy
    const userId = req.userId;

    // Validation & Response.
    const validationErrors = validationResult(req);;
    if (!validationErrors.isEmpty()) {
        return resp.status(400).json({ errors: validationErrors.array() });
    }

    const name = subjectFullName + " Module_" + moduleNum + " by " + notesBy
    const newUploadNotes = new Notes(name, shortName, fileUrl, userId)
    newUploadNotes.save()
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