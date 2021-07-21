const { validationResult } = require('express-validator')

const Books = require('../../../models/uploads/books');

exports.upload_Books = (req, resp, next) => {

    //incoming requests.
    const name = req.body.bookName
    const author = req.body.author
    const genre = req.body.genre
    const fileUrl = req.body.fileUrl
    const userId = req.userId;

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