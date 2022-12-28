import {ServerResponse} from 'http'
import events from "events";

import { StatusCodes } from './constants';
import messages from './messages';
import userService from './users.service';
import { IUser } from './interfaces';
import { parseReqBody } from './utils';

class UserController {
  showAllUsers = async (res: ServerResponse): Promise<void> => {
    try {
      res.writeHead(StatusCodes.OK, { "Content-type": "application/json" });
      res.write(JSON.stringify(userService.data));
      res.end();
    } catch (err) {
      if (err) {
        this.showServerErrMsg(res);
      }
    }
  };

  showUser = async (res: ServerResponse, url: string | undefined): Promise<void> => {
    try {
      if (url !== undefined) {
        const uuid = url.split('/').pop()
        const user = userService.getUser(uuid as string);

        if (user) {
          res.writeHead(StatusCodes.OK, { "Content-type": "application/json" });
          res.write(JSON.stringify(user));
          res.end();
        } else {
          res.writeHead(StatusCodes.NOT_FOUND, { "Content-type": "application/json" });
          res.write(JSON.stringify({ message: messages.userNotExist }));
          res.end();
        }
      }
    } catch (err) {
      if (err) {
        this.showServerErrMsg(res);
      }
    }
  };

  createUser = async (req: events.EventEmitter, res: ServerResponse): Promise<void> => {
    try {
      let reqBody: string = "";

      req.on("data", (chunk) => {
        reqBody += chunk.toString();
      }).on("end", () => {
        const newUser: IUser | undefined = parseReqBody(res, reqBody);
        const id: string | undefined = newUser?.id;

        if (newUser !== undefined && id !== undefined) {
          userService.addNewUser(newUser);
        
          res.writeHead(StatusCodes.CREATED, { "Content-type": "application/json" });
          res.write(JSON.stringify({code: StatusCodes.CREATED, ...userService.getUser(id)}));
          res.end();
        }
      });
    } catch (err) {
      if (err) {
        this.showServerErrMsg(res);
      }
    }
  };

  updateUser = async(req: events.EventEmitter, res: ServerResponse): Promise<void> => {
    // try {
    //   let reqBody: string = "";

    //   req.on("data", (chunk) => {
    //     reqBody += chunk.toString();
    //   }).on("end", () => {
    //     const newUser: IUser | undefined = parseReqBody(res, reqBody);
    //     const id: string | undefined = newUser?.id;

    //     if (newUser !== undefined && id !== undefined) {
    //       userService.addNewUser(newUser);
        
    //       res.writeHead(StatusCodes.CREATED, { "Content-type": "application/json" });
    //       res.write(JSON.stringify({code: StatusCodes.CREATED, ...userService.getUser(id)}));
    //       res.end();
    //     }
    //   });
      
    // } catch(err) {
    //   if (err) {
    //     this.showServerErrMsg(res);
    //   }
    // }
  }

  showWrongIdMsg = (res: ServerResponse): void => {
    res.writeHead(StatusCodes.BAD_REQUEST, { "Content-type": "application/json" });
    res.write(JSON.stringify({ code: StatusCodes.BAD_REQUEST, message: messages.incorrectId }));
    res.end();
  };

  showWrongUrlMsg = (res: ServerResponse): void => {
    res.writeHead(StatusCodes.NOT_FOUND, { "Content-type": "application/json" });
    res.write(JSON.stringify({ code: StatusCodes.NOT_FOUND, message: messages.incorrectURL }));
    res.end();
  };

  showServerErrMsg = (res: ServerResponse): void => {
    res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, { "Content-type": "application/json" });
    res.write(JSON.stringify({ code: StatusCodes.INTERNAL_SERVER_ERROR, message: messages.serverError }));
    res.end();
  };

  showMethodErr = (res: ServerResponse): void => {
    res.writeHead(StatusCodes.NOT_IMPLEMENTED, { "Content-type": "application/json" });
    res.write(JSON.stringify({ code: StatusCodes.NOT_IMPLEMENTED, message: messages.notImplemented }));
    res.end();
  };
}

const controller = new UserController()

export default controller;