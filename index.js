const express = require("express");
const http = require("http");
const mysql = require("mysql");
const path = require("path");
const device = require("express-device");
const ejs = require("ejs");

const app = express();
const httpServer = http.createServer(app);
const httpPort = 80;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", express.static(__dirname + "/views"));
app.set("views", path.join(__dirname, "views"));
app.use(device.capture());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "verifica",
});

/*connection.query(QueryPosIniziale, (err, result) => {
  if (err) throw err;
  if (result.length > 0) {
    PosXQuadrato = parseInt(result[0].initx);
  } else {
    PosXQuadrato = 0;
  }
});*/

//Query per determinare la posizione del quadrato dopo n Query

app.get("/", (req, res) => {
  if (req.device.type === "desktop") {
    res.render("indexDesktop.ejs");
  } else {
    res.render("indexMobile.ejs");
  }
});

const server = httpServer.listen(httpPort, () => {
  console.log(`Server HTTP listening on port ${httpPort}`);
});

const { Server } = require("ws");
const ws_server = new Server({ server });

ws_server.on("connection", (wsc) => {
  wsc.send(JSON.stringify(messageMove));

  wsc.on("message", (data) => {
    let message = JSON.parse(data);
    let spostamento;
    switch (message.type) {
    }
  });
  wsc.on("close", (wsc) => {
    console.log(`Utente ${id} sconnesso`);
  });
});
