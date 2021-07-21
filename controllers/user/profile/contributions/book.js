const Books = require('../../../../models/uploads/books');

exports.booksContributions = (req, resp, next) => {

    // Incoming requests
    const userId = req.userId;

    // Responses
    Books.findByUser(userId)
        .then(data => {
            if (!data) {
                const error = new Error("Unable to fetch books.")
                throw error;
            }
            resp.status(200).json({
                booksList: data
            });
        })
        .catch(err => {
            err.statusCode = 500
            err.message = "Internal Server Error"
            next(err)
        })
}

exports.deleteContribution = (req, resp, next) => {

    // Incoming requests
    const itemId = req.params.materialId;
    const userId = req.userId;

    // Responses
    Books.delete(itemId, userId)
        .then((result) => {
            if (result) {
                return resp.status(200).json({ message: "Deleted successfully" });
            }
            return resp.status(404).json({ message: "Item not found" });
        })
        .catch(err => {
            console.log(err.message)
            err.statusCode = 500
            err.message = "Unable to delete. Try again later!"
            next(err)
        })
}