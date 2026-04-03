const ApiError = require('../utils/apiError');

const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        if (err.code === 11000) {
            const message = `Duplicate field value entered`;
            error = new ApiError(400, message);
        }
        else if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ApiError(400, message);
        }
        else if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            error = new ApiError(400, message);
        } else {
            const statusCode = error.statusCode || 500;
            const message = error.message || "Internal Server Error";
            error = new ApiError(statusCode, message, error?.errors || [], err.stack);
        }
    }

    const response = {
        success: false,
        message: error.message,
        errors: error.errors || [],
    };

    if (process.env.NODE_ENV === 'development') {
        response.stack = error.stack;
    }

    return res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
