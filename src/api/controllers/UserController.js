import express from 'express';
import UserModel from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();

// routes
router.post('/authenticate', authenticate);
router.post('/register', create);
router.get('/', getAll);

export default router;

// Controller methods
function authenticate(req, res, next) {
    const { email, password } = req.body;
    UserModel.findOne({email: email}, function(err, user) {
        if (err) {
            next(err);
            return;
        }
        if (user) {
            if (password === user.password) {
                const expiresIn = 60 * 60; // 1h
                const token = jwt.sign({id: user._id}, process.env.API_SECRET, {expiresIn: expiresIn});
                res.json({status: "success", message: "Authentication successful", data: {token: token, expiresIn: expiresIn}});
            } else {
                res.status(400).json({ status: 'error', message: 'Username or password is incorrect' });
            }
        } else {
            res.status(400).json({ status: 'error', message: 'Username or password is incorrect' });
        }
    });
}

function create(req, res, next) {
    const { name, email, password } = req.body;
    UserModel.create({ name: name, email: email, password: password }, (err, user) => {
        if (err) {
            res.status(400).json({ status: 'error', message: 'Cannot register user' });
        } else if (user) {
            res.status(201).json({status: "success", message: "User added successfully", data: {user: user}});
        }
    });
}

function getAll(req, res, next) {
    UserModel.find({}, (err, users) => {
        if (err) {
            res.status(400).json({ status: 'error', message: 'Cannot get all users' });
        } else if (users) {
            res.json({status: "success", message: "Got all users", data: {users: users}});
        }
    });
}