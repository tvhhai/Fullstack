require('dotenv').config();
const app = require('./app');
const { connectDB, disconnectDB } = require('./config/db');
const config = require('./config');
const logger = require('./utils/logger');

const gracefulShutdown = (server, signal) => {
    logger.info(`${signal} received — shutting down gracefully`);

    server.close(async () => {
        logger.info('HTTP server closed');
        await disconnectDB();
        process.exit(0);
    });

    // Force-kill if server hasn't closed in 10s
    setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
    }, 10_000).unref();
};

const startServer = async () => {
    await connectDB();

    const server = app.listen(config.port, () => {
        logger.info('Server started', {
            port: config.port,
            env: config.env,
            node: process.version,
        });
    });

    server.on('error', (err) => {
        logger.error(err.code === 'EADDRINUSE' ? `Port ${config.port} already in use` : 'Server error', err);
        process.exit(1);
    });

    process.on('SIGTERM', () => gracefulShutdown(server, 'SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown(server, 'SIGINT'));

    process.on('uncaughtException', (err) => {
        logger.error('Uncaught Exception:', err);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
        logger.error('Unhandled Rejection:', reason);
        process.exit(1);
    });
};

startServer().catch((err) => {
    logger.error('Failed to start server:', err);
    process.exit(1);
});