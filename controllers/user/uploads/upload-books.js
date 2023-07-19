const { validationResult } = require('express-validator')
const fs = require('fs');
const util = require('util');

const Books = require('../../../models/uploads/books');
const { uploadFile } = require('../../../utils/S3_Bucket');

exports.upload_Books = async (req, resp, next) => {

    //incoming requests.
    const name = req.body.bookName
    const author = req.body.author
    const genre = req.body.genre
    const userId = req.userId;
    const bookFile = req.file;
    var fileUrl;

    if (!bookFile) {
        resp.status(400).json({
            message: "Please Upload a file"
        })
    }

    const fileUploadResult = await uploadFile(bookFile);
    fileUrl = fileUploadResult.Location;
    // const unlink = util.promisify(fs.unlink);
    // await unlink(bookFile.path)
    if(!fileUrl) resp.status(400).json({message: "Not able to upload file, Try again!"})

    // Validation & Response.
    const validationErrors = validationResult(req);;
    if (!validationErrors.isEmpty()) {
        return resp.status(400).json({ errors: validationErrors.array() });
    }

    const newUploadBooks = new Books(name, author, genre, fileUrl, userId)
    newUploadBooks.save()
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