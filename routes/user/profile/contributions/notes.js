const router = require('express').Router();

const isAuth = require("../../../../utils/is-auth");
const notesContributions = require('../../../../controllers/user/profile/contributions/notes').notesContributions;
const deleteContribution = require('../../../../controllers/user/profile/contributions/notes').deleteContribution;

router.post('/notes', isAuth, notesContributions);

router.delete('/notes/:materialId', isAuth, deleteContribution);

module.exports = router;