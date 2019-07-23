import mongoose from 'mongoose';
//Define a schema
const Schema = mongoose.Schema;
const BalanceDataSchema = new Schema({
    weight: {
        type: Number,
        trim: true,
        required: true,
    },

}, { timestamps: {} });
export default mongoose.model('BalanceData', BalanceDataSchema);