const Joi = require("joi");
const { errorHandler } = require("./errorHandler");

// Validation for user signup
const validateSignUp = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

// Validation for user signin
const validateSignIn = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

// Validation for creating a new book
const validateCreateBook = (req, res, next) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      genre: Joi.string().required(),
      publishedDate: Joi.date().required(),
      availableCopies: Joi.number().required(),
      totalCopies: Joi.number().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

// Validation for updating a book
const validateUpdateBook = (req, res, next) => {
  const { title, author, genre, publishedDate, availableCopies, totalCopies } =
    req.body;
  try {
    if ((title, author, genre, publishedDate, availableCopies, totalCopies)) {
      const schema = Joi.object({
        title: Joi.string(),
        author: Joi.string(),
        genre: Joi.string(),
        publishedDate: Joi.date(),
        availableCopies: Joi.number(),
        totalCopies: Joi.number(),
      }).min(1);

      const result = schema.validate(req.body);

      if (result.error) {
        return res
          .status(400)
          .json({ message: result.error.details[0].message });
      }

      next();
    } else {
      return res
        .status(400)
        .json({ message: "update with all required fields" });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

// Validation for partially updating a book
const validatePartiallyUpdateBook = (req, res, next) => {
  try {
    const schema = Joi.object({
      title: Joi.string(),
      author: Joi.string(),
      genre: Joi.string(),
      publishedDate: Joi.date(),
      availableCopies: Joi.number(),
      totalCopies: Joi.number(),
    }).min(1);

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

// Validation for checking out a book
const validateCheckoutBook = (req, res, next) => {
  try {
    const schema = Joi.object({
      returnDate: Joi.date().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

// Validation for returning a checked-out book
const validateReturnBook = (req, res, next) => {
  try {
    const schema = Joi.object({
      //   bookId: Joi.string().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  validateSignUp,
  validateSignIn,
  validateCreateBook,
  validateUpdateBook,
  validatePartiallyUpdateBook,
  validateCheckoutBook,
  validateReturnBook,
};
