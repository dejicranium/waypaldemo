const { log } = require("console");
const next = require("next");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});


const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();



let port = 3000;


nextApp.prepare().then(() => {
  


  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });



  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
