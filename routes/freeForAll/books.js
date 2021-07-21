const router = require('express').Router();

const getBooks = require('../../controllers/freeForAll/books').getBooks;

router.get('/books', getBooks);

module.exports = router;