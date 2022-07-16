import mongoose from 'mongoose';
const u = process.env.DB_USERNAME;
const p = process.env.DB_PASSWORD;
let login = '';
if (u && p) {
    login = u + ':' + p + '@';
}
mongoose.connect('mongodb://' + login + 'localhost/' + (process.env.DB_NAME || 'healthapp' + '?authSource=admin'), {useNewUrlParser: true});
mongoose.Promise = global.Promise;
export default mongoose;
