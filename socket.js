module.exports = (io) => {
    io.on("connection", function (socket) {
        console.log("Un cliente se ha conectado");
        socket.emit("messages", messages);
    });
}