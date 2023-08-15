const Book = require("../Model/book");

function createBooks(req, res, next) {
    console.log(req.body.title)
    res.status(201).send('Book recieved')
}
module.exports = createBooks;