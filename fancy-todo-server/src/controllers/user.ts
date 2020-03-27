import User from '../models/user';
import { compareSync } from 'bcryptjs';

class UserController {
  static async signUp(req: any, res: any, next: any) {
    try {
      const { firstName, lastName = '', username, email, password } = req.body;
      const newUser = await User.create({ firstName, lastName, username, email, password });
      newUser.userId = newUser._id;
      res.status(201).json({user: newUser, message: 'Successfully signed up!'});
    } catch (err) {
      next(err);
    }
  }

  static async signIn(req: any, res: any, next: any) {
    try {
      const {userIdentifier, password} = req.body;
      const signInUser: any = await User.findOne({
        $or: [
          {
            username: userIdentifier
          },
          {
            email: userIdentifier
          }
        ]
      });
      if (compareSync(password, signInUser.password)) {
        res.status(200).json({user: signInUser, message: `Welcome, ${signInUser.firstName}`});
      }
    } catch (err) {
      next(err);
    }
  }

  static async updatePut(req: any, res: any, next: any) {
    try {
      const { fullName, username, email, password } = req.body;
      const updatedPutUser = await User.updateOne({})
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
