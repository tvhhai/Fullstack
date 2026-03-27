const logger = require('../utils/logger');
const AppError = require('../utils/AppError');
const config = require('../config');

const normalizeError = (err) => {
    // Mongoose bad ObjectId
    if (err.name === 'CastError') return new AppError('Resource not found', 404);
    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || 'field';
        return new AppError(`${field} already exists`, 400);
    }
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
            .map((e) => e.message)
            .join(', ');
        return new AppError(message, 400);
    }
    // JWT errors
    if (err.name === 'JsonWebTokenError') return new AppError('Invalid token', 401);
    if (err.name === 'TokenExpiredError') return new AppError('Token expired', 401);
    return err;
};

const errorHandler = (err, req, res, _next) => {
    const normalized = normalizeError(err);
    const statusCode = normalized.statusCode || 500;
    const isOperational = normalized instanceof AppError;

    // Log non-operational (unexpected) errors at error level
    if (!isOperational) {
        logger.error('Unexpected error', {
            message: err.message,
            stack: err.stack,
            url: req.url,
            method: req.method,
            ip: req.ip,
        });
    } else {
        logger.warn('Operational error', {
            message: normalized.message,
            statusCode,
            url: req.url,
            method: req.method,
        });
    }

    res.status(statusCode).json({
        status: normalized.status || 'error',
        message: isOperational ? normalized.message : 'Something went wrong',
        ...(config.isDevelopment && { stack: err.stack }),
    });
};

module.exports = errorHandler;
