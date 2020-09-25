import { IAction } from '@/types';

export const setInfo = (info: string): IAction => ({
  type: 'SET_INFO',
  payload: {
    info,
  },
});

export const setWarning = (warning: string): IAction => ({
  type: 'SET_WARNING',
  payload: {
    warning,
  },
});

export const setError = (error: string): IAction => ({
  type: 'SET_ERROR',
  payload: {
    error,
  },
});

export const setSuccess = (success: string): IAction => ({
  type: 'SET_SUCCESS',
  payload: {
    success,
  },
});

export const resetSnackbar = (): IAction => ({
  type: 'RESET_SNACKBAR',
});
