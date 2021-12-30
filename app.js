// Module imports
// require('dotenv').config({ path: '.env.development.local' });
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

// File imports
const mongoConnect = require('./utils/database').mongoConnect;
const getNotes = require('./routes/freeForAll/notes');
const getBooks = require('./routes/freeForAll/books');
const getQuestionPaper = require('./routes/freeForAll/questionPaper');
const uploadNotes = require('./routes/user/uploads/upload-notes');
const uploadBooks = require('./routes/user/uploads/upload-books');
const uploadQuestionPaper = require('./routes/user/uploads/upload-questionPaper');
const logIn = require('./routes/user/auth/logIn');
const signUp = require('./routes/user/auth/signUp');
const notesContributions = require("./routes/user/profile/contributions/notes");
const questionPaperContributions = require('./routes/user/profile/contributions/questionPaper');
const booksContributions = require('./routes/user/profile/contributions/books');

const app = express();

// port declearation
const PORT = process.env.PORT || 8080;

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting CORS Headers
app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    next();
});
app.use(helmet());
app.use(morgan('combined'));

// Routes
app.use(getNotes);
app.use(getBooks);
app.use(getQuestionPaper);
app.use('/user', logIn);
app.use('/user', signUp);
app.use('/user', uploadNotes);
app.use('/user', uploadBooks);
app.use('/user', uploadQuestionPaper);
app.use('/contributions', notesContributions);
app.use('/contributions', booksContributions);
app.use('/contributions', questionPaperContributions);

// Default error handeler
app.use((error, req, resp, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";
    resp.status(statusCode).json({ message: message })
})

// Listening
mongoConnect(() => {
    app.listen(PORT);
})