"use strict";

require("dotenv").config();
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("./routes/bookHandler");

const verifyUser = require('./middleware/Authorize');

const PORT = process.env.PORT || 3001;

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_CONNECT);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongoose connection error!"));
db.once("open", () => console.log("Mongoose connected!"));

app.use(verifyUser);

app.get("/books", getBooks);
app.post("/books", createBook);
app.put("/books/:id", updateBook);
app.delete("/books/:id", deleteBook);

app.get("*", (req, res, next) =>
  res.status(404).send(`Resource not found :'(`)
);
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
