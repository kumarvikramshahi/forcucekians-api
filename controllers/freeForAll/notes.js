const Notes = require('../../models/uploads/notes');

exports.getNotes = (req, resp, next) => {
    Notes.fetchAll()
        .then(data => {
            resp.status(200).json({
                data: data
            })
        })
        .catch(err => {
            console.log(err, "err from controller/notes.js")
            err.statusCode = 500
            err.message = "Internal Server Error"
            next(err)
        })
}