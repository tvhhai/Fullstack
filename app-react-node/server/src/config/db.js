const mongoose = require('mongoose');
const config = require('./index');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        await mongoose.connect(config.db.uri, config.db.options);

        logger.info('MongoDB connected', {
            db: mongoose.connection.name,
            host: mongoose.connection.host,
        });

        mongoose.connection.on('error', (err) => logger.error('MongoDB error:', err));
        mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'));
        mongoose.connection.on('reconnected', () => logger.info('MongoDB reconnected'));
    } catch (err) {
        logger.error('MongoDB connection failed:', err);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        logger.info('MongoDB disconnected');
    } catch (err) {
        logger.error('MongoDB disconnection error:', err);
    }
};

module.exports = { connectDB, disconnectDB };
