import { IUser } from "./interfaces";

class UserService {
  data: IUser[];

  constructor() {
    this.data = [];
  }

  getUser = (uuid: string | undefined): IUser | null => {
    return this.data.find((id) => id) as IUser
  };

  public addNewUser = (user: IUser | undefined): void => {
    this.data.push(user as IUser);
  };
  
}

const userService = new UserService();

export default userService;