var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
let i = 0;

io.on("connection", (socket) => {
  console.log("We have a new client: " + socket.id);
  socket.on("detect", (msg) => {
    console.log("detected" );
    // i++;
    socket.broadcast.emit("detect", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
