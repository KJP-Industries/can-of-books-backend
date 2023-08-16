"use strict";

const Book = require("../Model/book");

function deleteBook(request, response, next) {
  const { id } = request.params;

  Book.findByIdAndDelete(id)
    .then((data) => response.status(204).send())
    .catch((error) => next(error));
}

module.exports = deleteBook;
