const jwt = require('jsonwebtoken');
const config = require('../config');

const { accessSecret, refreshSecret, accessExpiresIn, refreshExpiresIn } = config.jwt;

const signAccessToken = (payload) =>
    jwt.sign(payload, accessSecret, { expiresIn: accessExpiresIn });

const signRefreshToken = (payload) =>
    jwt.sign(payload, refreshSecret, { expiresIn: refreshExpiresIn });

const verifyToken = (token) => {
    try {
        return jwt.verify(token, accessSecret);
    } catch {
        return null;
    }
};

const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, refreshSecret);
    } catch {
        return null;
    }
};

module.exports = { signAccessToken, signRefreshToken, verifyToken, verifyRefreshToken };