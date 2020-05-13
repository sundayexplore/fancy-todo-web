import { Moment } from "moment";

export { default as userAPI } from "./userAPI";
export { default as todoAPI } from "./todoAPI";
export { default as colors } from "./colors";
export { default as Validate } from "./validate";

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface Todo {
  _id: string;
  name?: string;
  Name?: string;
  Todo?: string;
  dueDate: Moment | Date | string;
  dueTime?: Moment | Date | string;
  "Due Date"?: Moment | Date | string;
  "Due Time"?: Moment | Date | string;
  displayDueDate?: Moment | Date | string;
  displayDueTime?: Moment | Date | string;
}

export interface SyncData {
  user: User;
  todos: Array<Todo>;
}
