module.exports = (io) => {
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
}


// const WebSocket = require('ws')

// const wss = new WebSocket.Server({ port: 8000 })

// wss.on('connection', ws => {
//   ws.on('message', message => {
//     console.log(`Received message => ${message}`)
//   })
//   ws.send('Hello! Message From Server!!')
// })