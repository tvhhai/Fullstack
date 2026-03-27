const {verifyToken} = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({message: 'No token, authorization denied'});
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({message: 'Invalid token'});
    }

    req.user = decoded;
    next();
};

module.exports = {authMiddleware};