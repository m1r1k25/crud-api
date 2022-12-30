import http from 'http'
import dotenv from "dotenv";

import userController from './users.controller';
import { baseUrl } from './constants';
import { isUuidValid } from './utils';

dotenv.config();

const PORT = process.env.PORT || "4000";

const server = http.createServer(async (req, res) => {
  try {
    const url: string | undefined = req.url;
    const method: string | undefined = req.method;

    switch(method) {
      case 'GET':
      if (url === baseUrl) {
        userController.showAllUsers(res);
      } else if (url?.startsWith(baseUrl + '/')) {
        if (isUuidValid(url)) {
          userController.showUser(res, url);
        } else {
          userController.showWrongIdMsg(res);
        }
      } else {
        userController.showWrongUrlMsg(res);
      }
      break;

      case 'POST': 
      if (url === "/api/users") {
        userController.createUser(req, res);
      } else {
        userController.showWrongUrlMsg(res);
      }
      break;  

      case 'PUT':
      if (url?.startsWith(baseUrl + '/')) {
        if (isUuidValid(url)) {
          userController.updateUser(req, res, url);
        } else {
          userController.showWrongIdMsg(res);
        }
      } else {
        userController.showWrongUrlMsg(res);
      }
      break;
        
    default:
      userController.showMethodErr(res);
      break;
    }
  } catch(err) {
    if (err) {
      userController.showServerErrMsg(res);
    }
  }
})

const startServer = (): void => {
  server.listen(+PORT, () => console.log(`Server running on port ${PORT}`));
};

export { server, startServer };
