import mongoose from 'mongoose';
//Define a schema
const Schema = mongoose.Schema;
const BalanceDataSchema = new Schema({
    weight: {
        type: Number,
        trim: true,
        required: true,
    },
    fat: {
        type: Number,
        trim: true,
        required: true,
    },
    muscle: {
        type: Number,
        trim: true,
        required: true,
    },
    visceralFat: {
        type: Number,
        trim: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: {} });
export default mongoose.model('BalanceData', BalanceDataSchema);
