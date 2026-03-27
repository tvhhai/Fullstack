const config = require('./index');
const logger = require('../utils/logger');

const jwtConfig = config.jwt;

const validateJwtConfig = () => {
    if (!process.env.JWT_SECRET) {
        logger.warn('JWT_SECRET not set — using insecure default');
    }
    if (!process.env.JWT_REFRESH_SECRET) {
        logger.warn('JWT_REFRESH_SECRET not set — using insecure default');
    }
    if (process.env.JWT_SECRET === process.env.JWT_REFRESH_SECRET) {
        logger.warn('JWT_SECRET and JWT_REFRESH_SECRET should be different');
    }
    if (config.isProduction) {
        if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
            throw new Error('JWT secrets must be set in production');
        }
    }
};

module.exports = { jwtConfig, validateJwtConfig };
