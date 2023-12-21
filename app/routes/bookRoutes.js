const express = require('express');
const { getBooks, getBookById, createBook, updateBook, partiallyUpdateBook } = require('../controllers/bookController');
const { authenticateToken, authenticateAdminToken } = require('../utils/authMiddleware');
const { validateCreateBook, validateUpdateBook, validatePartiallyUpdateBook } = require('../utils/validation');

const router = express.Router();

router.get('/books', authenticateToken, getBooks);
router.get('/books/:bookId', authenticateToken, getBookById);
router.post('/book', authenticateAdminToken, validateCreateBook, createBook);
router.put('/:bookId', authenticateAdminToken, validateUpdateBook, updateBook);
router.patch('/:bookId', authenticateAdminToken, validatePartiallyUpdateBook, partiallyUpdateBook);

module.exports = router;
