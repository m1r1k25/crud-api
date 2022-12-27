import http from 'http'
import model from './dateModel';

class UserController {
  showAllUsers = async (res: http.ServerResponse): Promise<void> => {
    try {
      res.writeHead(200, { "Content-type": "application/json" });
      res.write(JSON.stringify(model.data));
      res.end();
    } catch (err: any) {
      console.log(err.message)
    }
  };
}

const controller = new UserController()

export default controller;