const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
    }
});
app.set('PORT', process.env.PORT || 3000);
app.use( express.json() );
app.use( express.urlencoded({extended: false, limit: 1000000000}) );

// require('./socket')(io);
io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");
    socket.on("message", (data) => {
        console.log('data :>> ', data)
        socket.broadcast.emit('todos', { data });
    });
    socket.on("messageChat", (data) => {
        console.log('data :>> ', data)
        socket.broadcast.emit('todosChat', { data });
    });
});

http.listen(3000, () => console.log(`server on port ${app.get('PORT')}`));