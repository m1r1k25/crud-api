import { IUser } from "./interfaces";

class UserService {
  data: IUser[];

  constructor() {
    this.data = [];
  }

  getUser = (uuid: string | undefined): IUser | null => {
    return this.data.find((item) => uuid === item.id) as IUser
  };

  addNewUser = (user: IUser | undefined): void => {
    this.data.push(user as IUser);
  };

  updateUser = (updatingUser: IUser | undefined): void => {
    this.data.forEach((user) => {
      if (user.id === updatingUser?.id) {
        user = updatingUser;
      }
    });
  };
  
}

const userService = new UserService();

export default userService;