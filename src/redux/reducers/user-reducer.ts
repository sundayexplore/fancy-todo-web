import { IUserReducer, IUser, IAction } from '@/types';

const initialState: IUserReducer = {
  currentUser: {} as IUser,
};

export default function userReducer(
  state = initialState,
  action: IAction,
): IUserReducer {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload.user },
      };

    default:
      return state;
  }
}
