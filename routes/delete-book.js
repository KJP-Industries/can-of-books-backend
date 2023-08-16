"use strict";

const Book = require("../Model/book");

function deleteBook(request, response, next) {
  const { id } = request.params;
  response.status(204).send();
}

module.exports = deleteBook;
