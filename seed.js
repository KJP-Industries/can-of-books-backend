"use strict";

const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_CONNECT);

const BookModel = require("./Model/book");

async function seed() {
  const books = [
    {
      title: "Repeating 301",
      description: "Why you need to manage your time better",
      status: "Available",
    },
    {
      title: "From Japan With Love",
      description: "Japan is the bomb",
      status: "Unavailable",
    },
    {
      title: "It always sunny in Seattle",
      description: "Sea-tac is terrific",
      status: "Backorder",
    },
  ];

  await BookModel.create(books)
    .then(() => console.log("Books saved"))
    .catch((err) => console.error(err));
}

seed();
