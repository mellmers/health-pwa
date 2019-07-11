import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/healthapp', {useNewUrlParser: true});
mongoose.Promise = global.Promise;
export default mongoose;