const { log } = require("console");
const next = require("next");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

io.on("connection", (socket) => {
  socket.on("join_room", async (room) => {
    socket.join(room);
  });
  socket.on("trip_route", async (tripData) => {
    if (tripData.id) {
      socket.to(tripData.id).emit("trip", tripData);
    }
  });
});

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
