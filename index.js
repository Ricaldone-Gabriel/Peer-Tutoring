const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const ws = require("express-ws");
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(device.capture());

app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // In un ambiente di produzione, imposta a true in caso di HTTPS
  })
);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "verifica",
});

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    // L'utente è autenticato, procedi all'endpoint successivo
    return next();
  } else {
    // L'utente non è autenticato, reindirizzalo alla pagina di login
    res.redirect("/loginPage");
  }
}
function isNotAuthenticated(req, res, next) {
  if (!req.session.user) {
    // L'utente non è autenticato, procedi all'endpoint successivo
    return next();
  } else {
    // L'utente è già autenticato, reindirizzalo alla pagina protetta
    res.redirect("/");
  }
}

/*connection.query(QueryPosIniziale, (err, result) => {
  if (err) throw err;
  if (result.length > 0) {
    PosXQuadrato = parseInt(result[0].initx);
  } else {
    PosXQuadrato = 0;
  }
});*/

//Query per determinare la posizione del quadrato dopo n Query

app.get("/", isAuthenticated, (req, res) => {
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
