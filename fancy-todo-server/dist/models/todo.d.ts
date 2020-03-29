import { Document, Model } from 'mongoose';
interface ITodoModel extends Document {
    todoId: string;
    userId: string;
    name: string;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const Todo: Model<ITodoModel>;
export default Todo;
