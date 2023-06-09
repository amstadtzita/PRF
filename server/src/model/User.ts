import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    name: string;
    address: string
  }

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true }
  },
      {collection:"users"}
  );
  



const SALT_FACTOR = 10;

UserSchema.pre('save', function preSaveCallback(next) {
    const _this = this as any;

    bcrypt.genSalt(SALT_FACTOR, function genSaltCallback(error, salt) {
        if (error) {
            return next(error);
        }

        bcrypt.hash(_this.password, salt, function hashCallback(error2, hash) {
            if (error2) {
                return next(error2);
            }
            _this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function comparePassword(password, cb) {
    const _this = this as any;
    bcrypt.compare(password, _this.password, function compareCallback(error, isMatch) {
        if (error) {
            return cb(error);
        }
        cb(null, isMatch);
    });
}

export const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', UserSchema);

/* export class User {

    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

} */
