import { Schema, model } from 'mongoose';
import validator from 'validator';
import {hashSync} from 'bcryptjs';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name cannot be empty!']
  },
  lastName: {
    type: String
  },
  username: {
    type: String,
    required: [true, 'Username cannot be empty!'],
    unique: [true, 'Username is not available.']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty!'],
    unique: [true, 'Email is not available.'],
    validate: [validator.isEmail, 'Invalid email address!']
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty!'],
    minlength: [8, 'Minimum length is 8 characters!']
  }
});

UserSchema.pre('save', function (next: any) {
  this.password = hashSync(this.password, 10);
  this.createdAt = new Date();
  next();
});

UserSchema.pre('update', function (next: any) {
  this.password = hashSync(this.password, 10);
  this.updatedAt = new Date();
  next();
});

export default model('User', UserSchema);
