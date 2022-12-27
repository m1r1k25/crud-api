import {ServerResponse} from 'http'
import messages from './messages';
import service from './users.service';

class UserController {
  showAllUsers = async (res: ServerResponse): Promise<void> => {
    try {
      res.writeHead(200, { "Content-type": "application/json" });
      res.write(JSON.stringify(service.data));
      res.end();
    } catch (err) {
      if (err) {
        this.showServerErrMsg(res);
      }
    }
  };

  isUrlHaveUuid = (url: string | undefined): boolean => {
    if (url !== undefined) {
      const splittedUrl = url.split("/");

      if (
        splittedUrl[splittedUrl.length - 3] === "api" &&
        splittedUrl[splittedUrl.length - 2] === "users"
      ) {
        return true;
      }
    }

    return false;
  };

  showWrongUrlMsg = (res: ServerResponse): void => {
    res.writeHead(404, { "Content-type": "application/json" });
    res.write(JSON.stringify({ code: 404, message: messages.incorrectURL }));
    res.end();
  };

  showServerErrMsg = (res: ServerResponse): void => {
    res.writeHead(500, { "Content-type": "application/json" });
    res.write(JSON.stringify({ code: 500, message: messages.serverError }));
    res.end();
  };

  showMethodErr = (res: ServerResponse): void => {
    res.writeHead(501, { "Content-type": "application/json" });
    res.write(JSON.stringify({ code: 501, message: messages.notImplemented }));
    res.end();
  };
}

const controller = new UserController()

export default controller;