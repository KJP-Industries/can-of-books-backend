"use strict";
//const getBooks = require("./routes/get-books");
//const createBooks = require("./routes/create-books");
const { getBooks, createBooks } = require('./routes/bookHandler')
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_CONNECT);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("mongoose connected"));

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/books", getBooks);

app.post("/books", createBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
