/**
 * Wraps async route handlers to eliminate repetitive try/catch blocks.
 * Any thrown error (including AppError) is forwarded to Express error middleware.
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsync;
