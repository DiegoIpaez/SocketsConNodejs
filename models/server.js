const express = require("express");
const cors = require("cors");
const { socketController } = require('../sockets/controller')

class Server {
  constructor() {
    //le asigno a app los metodos de express
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    //Paths
    this.paths = {};

    //Middlewares
    this.middlewares();
    //Rutas
    this.routes();
    //Sockets
    this.sockets();
  }

  middlewares() {
    //Public
    this.app.use(express.static("public"));
    //Cors
    this.app.use(cors());
    // //Parser
    // this.app.use(express.json());
  }

  routes() {
    // this.app.use(this.paths.auth, require("../routes/auth"));
  }

  sockets() {
    this.io.on("connection",socketController );
  }

  //Se monto el servidor en el port
  listen() {
    this.server.listen(this.port, () =>
      console.log("Servidor en el puerto", this.port)
    );
  }
}

module.exports = Server;
