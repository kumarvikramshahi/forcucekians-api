const router = require('express').Router();

const questionPaper = require('../../controllers/freeForAll/questionPaper').questionPaper;

router.get('/questionPaper', questionPaper);

module.exports = router;