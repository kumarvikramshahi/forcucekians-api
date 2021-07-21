const router = require('express').Router();

const getNotes = require('../../controllers/freeForAll/notes').getNotes;

router.get('/notes', getNotes);

module.exports = router;