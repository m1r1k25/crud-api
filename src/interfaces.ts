export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface IMessage {
  incorrectURL: string,
  incorrectId: string,
  incorrectReqBody: string,
  serverError: string,
  userNotExist: string,
  notImplemented: string,
}