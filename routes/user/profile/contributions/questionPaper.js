const router = require('express').Router();

const isAuth = require("../../../../utils/is-auth");
const questionPaperContributions = require('../../../../controllers/user/profile/contributions/questionPaper').questionPaperContributions;
const deleteContribution = require('../../../../controllers/user/profile/contributions/questionPaper').deleteContribution;

router.post('/questionPaper', isAuth, questionPaperContributions);

router.delete('/questionPaper/:materialId', isAuth, deleteContribution);

module.exports = router;