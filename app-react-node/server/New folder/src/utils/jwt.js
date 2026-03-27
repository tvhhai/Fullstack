const jwt = require('jsonwebtoken');

const signAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '15m'
    });
};

const signRefreshToken = payload => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'})
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {signAccessToken, signRefreshToken, verifyToken};