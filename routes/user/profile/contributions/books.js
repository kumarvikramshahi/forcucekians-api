const router = require('express').Router();

const isAuth = require("../../../../utils/is-auth");
const booksContributions = require('../../../../controllers/user/profile/contributions/book').booksContributions;
const deleteContribution = require('../../../../controllers/user/profile/contributions/book').deleteContribution;

router.post('/books', isAuth, booksContributions);

router.delete('/books/:materialId', isAuth, deleteContribution);

module.exports = router;