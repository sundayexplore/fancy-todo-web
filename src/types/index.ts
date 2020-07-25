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
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  [key: string]: string;
}


/**
 * 
 * Redux State Interfaces
 * 
 */

export interface IRootState {
  demo: IDemoReducer;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IUserReducer {
  currentUser: IUser | IOAuthUser;
}

export interface ITodoReducer {
  todos: ITodo[];
}

export interface IDemoReducer {
  todos: ITodo[];
}
