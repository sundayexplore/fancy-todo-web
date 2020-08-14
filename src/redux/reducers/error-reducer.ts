import { IErrorReducer, IAction } from '@/types';

const initialState: IErrorReducer = {
  general: '',
};

export default function errorReducer(
  state: IErrorReducer = initialState,
  action: IAction,
) {
  switch (action.type) {
    case 'SET_GENERAL_ERROR':
      return {
        ...state,
        general: action.payload.generalError,
      };

    default:
      return state;
  }
}
