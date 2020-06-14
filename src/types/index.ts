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


/**
 * 
 * Redux State Interfaces
 * 
 */

export interface IDemoReducer {
  todos: ITodo[];
}

export interface IRootState {
  demo: IDemoReducer;
}

export interface IAction {
  type: string;
  payload: any;
}
