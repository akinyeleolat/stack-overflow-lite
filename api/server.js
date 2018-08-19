// server settings
/*const http=require('http');
const app=require('./app');
const port=process.env.PORT || 3000;
const server=http.createServer(app);
//server.listen(port);
server.listen(port,()=>console.log(`listening  on port ${port}...`));

module.exports=server;*/

//server
import http from 'http';

import app from './app';
const port=process.env.PORT || 3000;
const server=http.createServer(app);
//server.listen(port);
server.listen(port,()=>console.log(`listening  on port ${port}...`));

export default server;