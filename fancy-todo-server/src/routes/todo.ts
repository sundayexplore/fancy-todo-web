import { Router } from 'express';

const todoRouter = Router();

todoRouter.get('/:userId');
todoRouter.get('/:userId/:todoId');
todoRouter.post('/:userId');
todoRouter.put('/:userId/:todoId');
todoRouter.patch('/:userId/:todoId');
todoRouter.delete('/:userId/:todoId');

export default todoRouter;
