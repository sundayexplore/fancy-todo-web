import { Document, Model } from 'mongoose';
interface ITodoModel extends Document {
    todoId: any;
    userId: any;
    name: string;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const Todo: Model<ITodoModel>;
export default Todo;
