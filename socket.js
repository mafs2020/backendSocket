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