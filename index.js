const express = require('express');
const app = express();
const http = require('http').Server(app);
require('dotenv').config();
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', ws => {
    console.log('se conecto');
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  });
ws.send(JSON.stringify('Hello! Message From Servidor!!'));
});

// const io = require('socket.io')(http, {
//     cors: {
//         origin: "*",
//     }
// });
app.set('PORT', process.env.PORT || 3000);
app.use( express.json() );
app.use( express.urlencoded({extended: false, limit: 1000000000}) );

// require('./socket')(io);


http.listen(app.get('PORT'), () => console.log(`server on port ${app.get('PORT')}`));