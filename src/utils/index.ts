import { Moment } from "moment";

export { default as userAPI } from "./userAPI";
export { default as todoAPI } from "./todoAPI";
export { default as colors } from "./colors";

export interface User {
  _id: string;
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
}
