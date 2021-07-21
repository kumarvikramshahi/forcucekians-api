const QuestionPaper = require('../../../../models/uploads/questionPaper');

exports.questionPaperContributions = (req, resp, next) => {

    // Incoming requests
    const userId = req.userId;

    // Responses
    QuestionPaper.findByUser(userId)
        .then(data => {
            if (!data) {
                const error = new Error("Unable to fetch questionPaper.")
                throw error;
            }
            resp.status(200).json({
                questionPaperList: data
            });
        })
        .catch(err => {
            console.log(err, "err from controller/notes.js")
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
    QuestionPaper.delete(itemId, userId)
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