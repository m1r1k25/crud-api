import http from 'http'
import dotenv from "dotenv";
import controller from './controller';

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
      } 

        break;
  
    }
    res.end()
  } catch(err: any) {
    console.log(err.message)
  }
})

const startServer = (): void => {
  server.listen(+PORT, () => console.log(`Server running on port ${PORT}`));
};

export { server, startServer };
