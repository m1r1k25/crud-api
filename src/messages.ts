import { IMessage } from "./interfaces";

const messages: IMessage = {
  serverError: "Some problems with server",
  incorrectURL: "Resource doesn't exist",
  incorrectId: "Incorrect request, please enter correct uuid",
  incorrectReqBody: "Incorrect request body",
  userNotExist: "Person with this uuid doesn't exist",
  notImplemented: "This method is not implemented on this server, please use GET, POST, PUT or DELETE methods",
};

export default messages;