const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const ws = require("express-ws");
const http = require("http");
const mysql = require("mysql");
const path = require("path");
const device = require("express-device");
const ejs = require("ejs");
//PI pi
const app = express();
const httpServer = http.createServer(app);
const httpPort = 3000;

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
    cookie: { secure: false }, // Il cookie ancora non viene utilizzato per "salvare" la sessione. Quindi... si risolve dopo
  })
);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "peer tutoring",
});

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    // L'utente è autenticato, procedi all'endpoint successivo
    return next();
  } else {
    // L'utente non è autenticato, reindirizzalo alla pagina di login
    res.redirect("/login");
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

app.get("/", isNotAuthenticated, (req, res) => {
  if (req.device.type === "desktop") {
    res.render("indexDesktop.ejs");
  } else {
    res.render("indexMobile.ejs");
  }
});

app.get("/home", isAuthenticated, (req, res) => {
  if (req.device.type === "desktop") {
    res.render("home.ejs");
  } else {
    res.render("home.ejs");
  }
});

app.get("/login", isNotAuthenticated, (req, res) => {
  if (req.device.type === "desktop") {
    res.render("login.ejs");
  } else {
    res.render("login.ejs");
  }
});

app.get("/register", isNotAuthenticated, (req, res) => {
  if (req.device.type === "desktop") {
    res.render("register.ejs");
  } else {
    res.render("register.ejs");
  }
});

/*
CREATE TABLE `utente` (
  `ID_Utente` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` text NOT NULL,
  `Email` text NOT NULL,
  `Esperienza` int(11) NOT NULL DEFAULT 0 COMMENT 'Automatico',
  `Livello` int(11) NOT NULL DEFAULT 0 COMMENT 'Automatico',
  `Data_Creazione` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Automatico'
) 
*/

app.post("/login", isNotAuthenticated, (req, res) => {
  const { username, password, remember } = req.body;
  console.log(username + " " + password + " " + remember);
  query = `SELECT ID_Utente, Username FROM utente WHERE Username = '${username}' AND Password = '${password}'`;

  connection.query(query, [username, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const user = result[0];
      req.session.user = user.ID_Utente;
      req.session.username = user.Username;

      if (remember == "on") {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 giorni
      } else {
        req.session.cookie.maxAge = 24 * 60 * 60 * 1000; // 1 gg
      }

      res.redirect("/home");
    } else {
      res.redirect("/login");
    }
  });
});

app.post("/register", isNotAuthenticated, (req, res) => {
  const { username, password, email } = req.body;
  console.log(req.body);
  /*
  query = "SELECT * FROM utente WHERE Username = ? or Email = ?";
  //Modificare la query di inserimento per selezionare l'id anno scolastico correttamente dato "scuola" e "anno" es: 0,3 terza media id=0
  connection.query(query, [username, email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.redirect("/register");
    } else {
      query = `INSERT INTO utente (Username,Password,Email) VALUES ('${username}','${password}','${email}')`;
      connection.query(query, (err, result) => {
        if (err) throw err;
        else console.log("Utente inserito");
      });
      query = `SELECT Username,ID_Utente FROM utente WHERE Username = '${username}'`;
      connection.query(query, (err, result) => {
        if (err) throw err;
        else {
          req.session.user = result[0].ID_Utente;
          req.session.username = result[0].Username;
          req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
          res.redirect("/home");
        }
      });
    }
  });*/
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
    switch (message.type) {
    }
  });
  wsc.on("close", (wsc) => {
    console.log(`Utente ${id} sconnesso`);
  });
});
