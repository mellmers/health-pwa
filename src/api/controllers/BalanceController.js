import express from 'express';

import BalanceData from "../models/BalanceData";

const router = express.Router();

// routes
router.post('/', create);

export default router;

// Controller methods
function create(req, res, next) {
    const {weight, fat, muscle, visceralFat} = req.body;
    BalanceData.create({weight: weight, fat: fat, muscle: muscle, visceralFat: visceralFat, user: req.user.id}, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: 'Cannot create data. Reason: ' + err.message || err.errmsg
            });
        } else if (data) {
            res.status(201).json({status: "success", message: "Balance data added successfully", data: {balanceData: data}});
        }
    });
}
