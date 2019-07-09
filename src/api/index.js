import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from './utils/jwt';
import errorHandler from './utils/errorHandler';

import UserController from './controllers/UserController';

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', jwt());

// api routes
app.use('/api/users', UserController);

// global error handler
app.use(errorHandler);

app.get('/api/ping', (req, res) => {
    return res.json({
        message: 'pong'
    });
});

app.get('/api/version', (req, res) => {
    return res.json({
        version: process.env.APP_VERSION
    });
});

export default app;