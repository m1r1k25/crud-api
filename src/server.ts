import http from 'http'
import dotenv from "dotenv";
import controller from './users.controller';
import { isUrlHaveUuid } from './utils';

dotenv.config();

const PORT = process.env.PORT || "4000";

const baseUrl = '/api/users'

const server = http.createServer(async (req, res) => {
  try {
    const url: string | undefined = req.url;
    const method: string | undefined = req.method;
    switch(method) {
      case 'GET':
      if (url === baseUrl) {
        controller.showAllUsers(res);
      } else if (isUrlHaveUuid(url)) {
        // if (controller.isUuidValid(url)) {
        //   controller.showUser(res, url);
        // } else {
        //   controller.showWrongIdMsg(res);
        // }
      } else {
        controller.showWrongUrlMsg(res);
      }
        break;
    default:
      controller.showMethodErr(res);
      break;
    }
    res.end()
  } catch(err) {
    if (err) {
      controller.showServerErrMsg(res);
    }
  }
})

const startServer = (): void => {
  server.listen(+PORT, () => console.log(`Server running on port ${PORT}`));
};

export { server, startServer };
