import { IUser } from "./interfaces";

class UserService {
  public data: IUser[];

  constructor() {
    this.data = [];
  }

  public getUser = (uuid: string): IUser | null => {
    let result = null;

    this.data.forEach((user) => {
      if (user.id === uuid) {
        result = user;
      }
    });

    return result;
  };
  
}

const userService = new UserService();

export default userService;