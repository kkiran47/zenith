const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const errorHandler = require('./middleware/error.middleware');
const ApiError = require('./utils/apiError');

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Too many requests from this IP, please try again in 15 minutes.'
});

app.use('/api', limiter);

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morgan('dev'));

app.use('/api/v1', routes);

app.use('*', (req, res, next) => {
    next(new ApiError(404, `Cannot find ${req.originalUrl} on this server!`));
});

app.use(errorHandler);

module.exports = app;
