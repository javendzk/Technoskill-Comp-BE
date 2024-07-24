const express = require("express");
const employeeController = require("../controllers/employee.controller");
const router = express.Router();

router.post("/add", employeeController.addEmployee);

module.exports = router;
