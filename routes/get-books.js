"use strict";
const Book = require("../Model/book");

function getBooks(request, response, next) {
    Book.find({})
    .then(data => response.status(200).send(data))
    .catch(err => next (err))
}
module.exports = getBooks;
