import express from 'express';
import UserService from './../services/UserService';

const router = express.Router();

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);

export default router;

function authenticate(req, res, next) {
    UserService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    UserService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}