const { log } = require("console");
const next = require("next");
const app = require("express")();
const server = require("http").Server(app);
const expsession = require('express-session');
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const sessionMiddleware = expsession({
  secret: 'ra23432#@#fewrwo',
  saveUninitialized: true,
  resave: true
});

app.use(sessionMiddleware);

io.use(function(socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
})


let port = 3000;

io.on("connection", (socket) => {
  socket.request.session.socketio = socket.id;
  socket.request.session.save();  
  socket.on("join_room", async (room) => {
    socket.join(room);
  });
  socket.on("trip_route", async (tripData) => {
    if (tripData.id) {
      socket.to(tripData.id).emit("trip", tripData);
    }
  });
});

app.use(function(req, res, next) {
  const session = req.session;
  if (!session.cntr) session.cntr = 0;
  ++session.cntr;
  next();
})

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
