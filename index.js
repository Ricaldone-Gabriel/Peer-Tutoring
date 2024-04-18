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

let optionsFromServer = [];
let queryServer = "SELECT ID_Materia, Nome FROM materia";

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

connection.query(queryServer, (err, result) => {
  if (err) throw err;
  result.forEach((record) => {
    const option = {
      Number: record.ID_Materia,
      Name: record.Nome,
    };
    // Aggiungiamo l'opzione all'array optionsFromServer
    optionsFromServer.push(option);
  });
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
    res.render("home.ejs", { options: optionsFromServer });
  } else {
    res.render("home.ejs", { options: optionsFromServer });
  }
});

app.get("/settings", isAuthenticated, (req, res) => {
  let listaMaterie = [];
  let query = `SELECT ID_Materia FROM tutee WHERE ID_Utente = ${req.session.user}`;
  let materieTutee = [];
  let materieTutor = [];
  connection.query(query, (err, result) => {
    if (err) throw err;
    result.forEach((record) => {
      materieTutee.push(record.ID_Materia);
    });
  });
  query = `SELECT ID_Materia FROM tutor WHERE ID_Utente = ${req.session.user}`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    result.forEach((record) => {
      materieTutor.push(record.ID_Materia);
    });
  });

  if (req.device.type === "desktop") {
    res.render("settings.ejs", { materie: listaMaterie });
  } else {
    res.render("settings.ejs");
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

app.post("/post", isAuthenticated, (req, res) => {
  const { text, materia } = req.body;
  let query = `INSERT INTO post(ID_Autore, Testo, ID_Materia) VALUES (${req.session.user},'${text}',${materia})`;

  connection.query(query, (err, result) => {
    if (err) throw err;
    else {
      res.redirect("/home");
    }
  });
});

app.post("/login", isNotAuthenticated, (req, res) => {
  const { username, password, remember } = req.body;
  let query = `SELECT ID_Utente, Username FROM utente WHERE Username = '${username}' AND Password = '${password}'`;

  connection.query(query, (err, result) => {
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
  const { username, password, email, scuola, tipo, anno } = req.body;
  let AnnoScolastico;
  console.log(req.body);
  let query = `SELECT * FROM utente WHERE Username = '${username}' or Email = '${email}'`;
  //Modificare la query di inserimento per selezionare l'id anno scolastico correttamente dato "scuola" e "anno" es: 0,3 terza media id=0

  connection.query(query, [username, email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.redirect("/register");
    } else {
      query =
        `SELECT ID_AnnoScolastico FROM` +
        "`" +
        "anno scolastico" + //giuro che se qualcuno mi fa vedere queste 5 righe, sbocco sul pavimento, sbraito verso un professore, invoco la madonna e san pietro, e vado a dormire.
        "`" +
        `WHERE Scuola=${scuola} AND Anno=${anno} AND Tipo='${tipo}'`;
      connection.query(query, (err, result) => {
        if (err) throw err;
        else {
          AnnoScolastico = result[0].ID_AnnoScolastico;
          query = `INSERT INTO utente (Username,Password,Email,ID_AnnoScolastico) VALUES ('${username}','${password}','${email}',${AnnoScolastico})`;
          connection.query(query, (err, result) => {
            if (err) throw err;
            else console.log("Utente inserito");
          });

          query = `SELECT Username, ID_Utente FROM utente WHERE Username = '${username}'`;
          connection.query(query, (err, result) => {
            if (err) throw err;
            else {
              req.session.user = result[0].ID_Utente;
              req.session.username = result[0].Username;
              req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
              query = `SELECT DISTINCT ID_Materia FROM composto WHERE ID_AnnoScolastico = ${AnnoScolastico}`;
              connection.query(query, (err, result) => {
                if (err) throw err;
                else {
                  result.forEach((record) => {
                    query = `INSERT INTO tutee(ID_Utente, ID_Materia) VALUES (${req.session.user},${record.ID_Materia})`;
                    connection.query(query, (err, result) => {
                      if (err) throw err;
                      console.log("Valore inserito");
                    });
                  });
                }
              });
              res.redirect("/home");
            }
          });
        }
      });
      /*
      query = `INSERT INTO utente (Username,Password,Email,ID_AnnoScolastico) VALUES ('${username}','${password}','${email}')`;
      ;*/
    }
  });
});

const server = httpServer.listen(httpPort, () => {
  console.log(`Server HTTP listening on port ${httpPort}`);
});

const { Server } = require("ws");
const ws_server = new Server({ server });

ws_server.on("connection", (wsc) => {
  let queryWS =
    "SELECT p.Testo, p.DataPost, u.Username FROM post p, utente u WHERE p.ID_Autore = u.ID_Utente LIMIT 20";
  let message;
  connection.query(queryWS, (err, result) => {
    if (err) throw err;
    else {
      let postList = [];
      result.forEach((record) => {
        let post = {
          text: record.Testo,
          date: record.DataPost,
          author: record.Username,
        };
        postList.push(post);
      });

      message = { type: "sendPosts", posts: postList };
      wsc.send(JSON.stringify(message));
    }
  });

  wsc.on("message", (data) => {
    let message = JSON.parse(data);
    switch (message.type) {
    }
  });
  wsc.on("close", (wsc) => {
    console.log(`Utente ${id} sconnesso`);
  });
});
