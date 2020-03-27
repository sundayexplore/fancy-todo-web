import { Router } from 'express';

const userRouter = Router();

userRouter.post('/signin');
userRouter.post('/signup');
userRouter.put('/:userId');
userRouter.patch('/:userId');
userRouter.delete('/:userId');

export default userRouter;
