import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true,
        select: false,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false
    }
}, { timestamps: {} });
// hash user password before saving into database
UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
UserSchema.set('autoIndex', false);
export default mongoose.model('User', UserSchema);
