import env from 'dotenv/config';
import Server from "../Server.js";
const server = new Server();
// server.listen();
export default server.app;