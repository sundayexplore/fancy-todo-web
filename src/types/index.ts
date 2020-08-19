/**
 * 
 * Model Interfaces
 * 
 */

export interface ITodo {
  _id?: string | any;
  name: string;
  due: string | Date | null;
  dueDate: string | Date | null;
  dueTime: string | Date | null;
  priority: number;
  position: number | null;
  completed: boolean;
}

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface IOAuthUser {
  fullName: string;
  email: string;
}

export interface ISignInData {
  userIdentifier: string;
  password: string;
}

export interface ISignUpData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignInValidations {
  userIdentifier: string;
  password: string;
  [key: string]: string;
}

export interface ISignUpValidations {
  firstName: string | null;
  email: string | null;
  username: string | null;
  password: string | null;
  confirmPassword: string | null;
  [key: string]: string | null;
}


/**
 * 
 * Redux State Interfaces
 * 
 */

export interface IRootState {
  user: IUserReducer;
  todo: ITodoReducer;
  demo: IDemoReducer;
  current: ICurrentReducer;
  error: IErrorReducer;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IUserReducer {
  currentUser: IUser | IOAuthUser | null;
}

export interface ITodoReducer {
  todos: ITodo[];
}

export interface IDemoReducer {
  todos: ITodo[];
}

export interface ICurrentReducer {
  selectedTodoCategory: string;
}

export interface IErrorReducer {
  general: string;
}


/**
 * 
 * Material UI Component Option Interfaces
 * 
 */

export interface IAlertOptions {
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  open: boolean;
}


/**
 * 
 * API Interfaces
 * 
 */

export interface IValidationFromAPI {
  name: string;
  message: string;
}


/**
 * 
 * Utils Interfaces
 * 
 */

export interface ICustomValidator {
  [method: string]: any;
}
