import { Document, Model } from 'mongoose';
interface IUserModel extends Document {
    userId: any;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const User: Model<IUserModel>;
export default User;
