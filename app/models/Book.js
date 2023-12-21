const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publishedDate: { type: Date },
  availableCopies: { type: Number, default: 0 },
  totalCopies: { type: Number, required: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
