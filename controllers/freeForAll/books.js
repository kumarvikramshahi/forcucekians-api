const Books = require('../../models/uploads/books');

exports.getBooks = (req, resp) => {
    Books.fetchAll()
        .then(data => {
            resp.status(200).json({
                data: data
            })
        })
        .catch(error => {
            console.log(error, "error from constrollers/books.js")
            err.statusCode = 500
            err.message = "Internal Server Error"
            next(err)
        })
}