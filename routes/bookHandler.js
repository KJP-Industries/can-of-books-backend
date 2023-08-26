'use strict';

const Book = require('../Model/book');
const BookClass = require('../Model/BookClass');

const bookHandler = {};

bookHandler.getBooks = function (req, res, next) {
  Book.find({ 'email': req.user.email })
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err));
};

bookHandler.createBook = async function (req, res, next) {
  const { title, description, status } = req.body;
  const newBook = new BookClass(title, description, status);
  Book.findOneAndUpdate(
    { title: newBook.title },
    { $set: { description: newBook.description, status: newBook.status, email: req.user.email } },
    { upsert: true, new: true }
  )
    .then((doc) => res.status(201).send(doc))
    .catch((err) => next(err));
};

bookHandler.updateBook = async function (req, res, next) {
  const { id } = req.params;

  Book.findOneAndUpdate({ _id: id, email: req.user.email }, req.body, { returnDocument: 'after'})
  .then((data) => res.status(200).send(data))
  .catch((error) => next(error));

  // Book.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
  //   .then((data) => res.status(200).send(data))
  //   .catch((err) => next(err));
};

bookHandler.deleteBook = async function (req, res, next) {
  const { id } = req.params;

  Book.findOneAndDelete({ _id: id, email: req.user.email })
    .then((data) => res.status(204).send())
    .catch((error) => next(error));
};

module.exports = bookHandler;
