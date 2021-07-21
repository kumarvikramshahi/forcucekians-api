const QuestionPaper = require('../../models/uploads/questionPaper');

exports.questionPaper = (req, resp) => {
    QuestionPaper.fetchAll()
        .then(data => {
            resp.status(200).json({
                data: data
            })
        })
        .catch(error => {
            console.log(error, "error from controller/questionPaper.js")
            err.statusCode = 500
            err.message = "Internal Server Error"
            next(err)
        })
}