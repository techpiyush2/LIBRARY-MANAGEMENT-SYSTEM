const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  checkoutDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ["issued", "returned"], default: "issued" },
  lateReturnFine: { type: Number, default: 0 },
});

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = Checkout;
