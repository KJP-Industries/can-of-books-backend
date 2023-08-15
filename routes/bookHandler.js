'use strict';
const Book = require("../Model/book");
const BookClass = require("../Model/BookClass");

const bookHandler = {}

bookHandler.getBooks = function (request, response, next) {
    Book.find({})
    .then(data => response.status(200).send(data))
    .catch(err => next (err))
}

bookHandler.createBooks = async function (req, res, next) {
    const { title, description, status } = req.body
    const newBook = new BookClass(title, description, status)
    try {
        const doc = await Book.findOneAndUpdate(
            { title: newBook.title },
            { $set: { description: newBook.description, status: newBook.status } },
            { upsert: true, new: true }
        )
        .catch((err) => console.log(err))
        res.status(201).send(doc)
    } catch (err) {
        console.log('Error creating new book.')
        next(err)
    }
}

module.exports = bookHandler;