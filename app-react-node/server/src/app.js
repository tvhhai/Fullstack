const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/cors');
const config = require('./config');
const { validateJwtConfig } = require('./config/jwt');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');
const AppError = require('./utils/AppError');

validateJwtConfig();

const app = express();

// Security
app.use(helmet());
app.use(cors(corsOptions));
app.use(
    rateLimit({
        windowMs: config.rateLimit.windowMs,
        max: config.rateLimit.max,
        standardHeaders: true,
        legacyHeaders: false,
        message: { status: 'fail', message: 'Too many requests, please try again later.' },
    })
);

// Request logging
app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.url}`, { ip: req.ip });
    next();
});

// Parsing
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api', routes);

// 404 — unmatched routes
app.all('/{*splat}', (req, _res, next) => {
    next(new AppError(`Cannot ${req.method} ${req.url}`, 404));
});

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;


