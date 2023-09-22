const  {StatusCodes} = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    // Create a default error for an unexpected error
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later'
    }

    // Update the error object if it came from mongoose
    if (err.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = Object.values(err.errors)
            .map(item => item.message)
            .join(',');
    }
    if (err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = `
            ${Object.keys(err.keyValue)} is already exists
        `.trim();
    }

    // Send response with the error message
    res.status(defaultError.statusCode).json({
        msg: defaultError.msg
    });
};

module.exports = errorHandler;