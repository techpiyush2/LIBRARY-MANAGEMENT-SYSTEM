const express = require('express');
const { checkoutBook, returnBook } = require('../controllers/checkoutController');
const { authenticateToken } = require('../utils/authMiddleware');
const { validateCheckoutBook, validateReturnBook } = require('../utils/validation');

const router = express.Router();

router.post('/checkout/:bookId', authenticateToken, validateCheckoutBook, checkoutBook);
router.post('/checkout/return-book/:bookId', authenticateToken, validateReturnBook, returnBook);

module.exports = router;
