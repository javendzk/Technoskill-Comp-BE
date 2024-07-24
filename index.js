const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const managerRoute = require("./routes/manager.route");
const employeeRoute = require("./routes/employee.route");

const cors = require("cors");
dotenv.config();

const port = 8000; // Isi nomor port di sini;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/manager", managerRoute);
app.use("/employee", employeeRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}!`);
});
