const { verifyToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(new AppError('Not authenticated', 401));

    const decoded = verifyToken(token);
    if (!decoded) return next(new AppError('Invalid or expired token', 401));

    req.user = decoded;
    next();
};

module.exports = { authMiddleware };