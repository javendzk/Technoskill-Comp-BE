const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const corsConfig = require('./src/configs/cors.config.js');
const dbConfig = require('./src/configs/pool.config.js'); 
const welcomeMessage = require('./src/services/welcome.services.js');

const managerRoute = require("./src/routes/manager.route.js");
//const employeeRoute = require("./src/routes/employee.route.js");
//const tokenRoute = require("./src/routes/token.route.js");

dbConfig.connect();
require('dotenv').config()

const app = express();
const PORT = process.env.PORT; 

app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  try { res.status(200).send(welcomeMessage); }
  catch (err) { res.status(503).send('[!] Server tidak tersedia'); }
});

app.use("/manager", managerRoute);
//app.use("/employee", employeeRoute);
//app.use("/token", tokenRoute);

app.listen(PORT, () => {
  console.log(`[v] Server running di port ${PORT}!`);
});
