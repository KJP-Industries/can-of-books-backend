const Book = require("../Model/book");
const BookClass = require("../Model/BookClass")

async function createBooks(req, res, next) {
    const { title, description, status } = req.body
    const newBook = new BookClass(title, description, status)
    try {
        const doc = await Book.findOneAndUpdate(
            { title: newBook.title },
            { $set: { description: newBook.description, status: newBook.status } },
            { upsert: true, new: true }
        )
        .catch((err) => console.log(err))
        //console.log(doc)
        res.status(201).send(doc)
    } catch (err) {
        console.log('Error creating new book.')
        res.status(500).send('Error adding new Book.')
    }
}
module.exports = createBooks;