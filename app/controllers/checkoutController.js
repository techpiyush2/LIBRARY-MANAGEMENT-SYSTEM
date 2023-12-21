const Checkout = require("../models/Checkout");
const { errorHandler } = require("../utils/errorHandler");
const Book = require("../models/Book");
const checkoutBook = async (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.user;
  const { returnDate } = req.body;
  try {
    const bookData = new Checkout({ _id: bookId });

    // checking books available in library
    if (bookData.availableCopies <= 0)
      return res.status(401).json({ error: "copies not available" });

    // checking return date
    if (new Date() > new Date(returnDate))
      return res.status(401).json({ error: "return date must be greater" });
    const checkout = new Checkout({
      bookId,
      userId,
      checkoutDate: new Date(),
      returnDate: new Date(returnDate),
      status: "issued",
    });

    await checkout.save();

    // updating book's copies after checkout
    const bookUpdate = await Book.findByIdAndUpdate(
      { _id: bookId },
      { $inc: { availableCopies: -1 } }
    );
    if (bookUpdate)
      if (bookUpdate)
        return res
          .status(200)
          .json({ message: "book checkout successfully", data: checkout });
  } catch (error) {
    errorHandler(error, res);
  }
};

const returnBook = async (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.user;
  try {
    const checkout = await Checkout.findOne({
      userId,
      bookId,
      status: "issued",
    });

    if (checkout) {
      checkout.status = "returned";
      checkout.returnDate = new Date();
      await checkout.save();

      // updating book's copies after return
      const bookUpdate = await Book.findByIdAndUpdate(
        { _id: bookId },
        { $inc: { availableCopies: +1 } }
      );
      if (bookUpdate)
        return res
          .status(200)
          .json({ message: "Book returned successfully", data: checkout });
    } else {
      res
        .status(404)
        .json({ error: "Book not checked out or already returned" });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { checkoutBook, returnBook };
