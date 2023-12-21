const Book = require("../models/Book");
const { errorHandler } = require("../utils/errorHandler");

const getBooks = async (req, res) => {
  const { page = 1, limit = 10, genre } = req.query;
  const skip = (page - 1) * limit;

  try {
    let query = {};

    if (genre) {
      query = { genre };
    }
    // getting all books
    const books = await Book.find(query).skip(skip).limit(parseInt(limit));

    res.json({
      message: "data fetch successfully",
      data: books,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getBookById = async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);

    if (book) {
      return res.json({
        message: "data fetch successfully",
        data: book,
      });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

const createBook = async (req, res) => {
  const { title, author, genre, publishedDate, totalCopies } = req.body;

  try {
    // existing book check
    const existingBook = Book.findOne({ title });
    if (existingBook)
      return res.status(404).json({ error: "book already exists" });

    const book = new Book({
      title,
      author,
      genre,
      publishedDate,
      totalCopies,
      availableCopies: totalCopies,
    });

    await book.save();

    return res.status(201).json({
      message: "book created successfully",
      data: book,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateBook = async (req, res) => {
  const { bookId } = req.params;
  const { title, author, genre, publishedDate, availableCopies, totalCopies } =
    req.body;

  try {
    const book = await Book.findById(bookId);

    if (book) {
      book.title = title;
      book.author = author;
      book.genre = genre;
      book.publishedDate = publishedDate;
      book.availableCopies = availableCopies;
      book.totalCopies = totalCopies;

      await book.save();

      return res.status(200).json({
        message: "book updated successfully",
        data: book,
      });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

const partiallyUpdateBook = async (req, res) => {
  const { bookId } = req.params;
  const { title, author, genre, publishedDate, availableCopies, totalCopies } =
    req.body;

  try {
    const book = await Book.findById(bookId);

    if (book) {
      if (title) book.title = title;
      if (author) book.author = author;
      if (genre) book.genre = genre;
      if (publishedDate) book.publishedDate = publishedDate;
      if (availableCopies) book.availableCopies = availableCopies;
      if (totalCopies) book.totalCopies = totalCopies;

      await book.save();
      return res.status(200).json({
        message: "book updated successfully",
        data: book,
      });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  partiallyUpdateBook,
};
