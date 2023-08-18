'use strict';

const Book = require('../Model/book');
const BookClass = require('../Model/BookClass');

const bookHandler = {};

bookHandler.getBooks = function (request, response, next) {
  Book.find({})
    .then((data) => response.status(200).send(data))
    .catch((err) => next(err));
};

bookHandler.createBook = async function (req, res, next) {
  const { title, description, status } = req.body;
  const newBook = new BookClass(title, description, status);
  Book.findOneAndUpdate(
    { title: newBook.title },
    { $set: { description: newBook.description, status: newBook.status } },
    { upsert: true, new: true }
  )
    .then((doc) => res.status(201).send(doc))
    .catch((err) => next(err));
};

bookHandler.updateBook = async function (request, response, next) {
  const { id } = request.params;

  Book.findByIdAndUpdate(id, request.body, { returnDocument: 'after' })
    .then((data) => response.status(200).send(data))
    .catch((err) => next(err));
};

bookHandler.deleteBook = async function (request, response, next) {
  const { id } = request.params;

  Book.findByIdAndDelete(id)
    .then((data) => response.status(204).send())
    .catch((error) => next(error));
};

module.exports = bookHandler;
