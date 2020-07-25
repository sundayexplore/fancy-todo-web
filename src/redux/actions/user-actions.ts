import { IAction, IUser } from '@/types';

export const setUser = (user: IUser): IAction => ({
  type: 'SET_USER',
  payload: {
    user
  }
});
