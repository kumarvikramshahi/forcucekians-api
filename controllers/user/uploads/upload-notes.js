const { validationResult } = require('express-validator');
const fs = require('fs');
const util = require('util');

const Notes = require('../../../models/uploads/notes');
const { uploadFile } = require('../../../utils/S3_Bucket');

exports.upload_Notes = async (req, resp, next) => {

    //incoming requests.
    const shortName = req.body.subjectShortName;
    const subjectFullName = req.body.subjectFullName;
    const moduleNum = req.body.moduleNum
    const notesFile = req.file
    const notesBy = req.body.notesBy
    const userId = req.userId;
    var fileUrl;

    if (!notesFile) {
        resp.status(400).json({
            message: "Please Upload a file"
        })
    }

    // // TO DO: see for file upload in proper way
    const fileUploadResult = await uploadFile(notesFile);
    fileUrl = fileUploadResult.Location;
    // const unlink = util.promisify(fs.unlink);
    // await unlink(notesFile.path)
    if (!fileUrl) resp.status(400).json({ message: "Not able to upload file, Try again!" })

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