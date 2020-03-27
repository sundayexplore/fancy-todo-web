import { Schema, model } from 'mongoose';

const TodoSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Todo name cannot be empty!']
  },
  dueDate: {
    type: Date
  }
});

TodoSchema.pre('save', function (next: any) {
  this.createdAt = new Date();
  next();
});

TodoSchema.pre('update', function (next: any) {
  this.updatedAt = new Date();
  next();
})

export default model('Todo', TodoSchema);
