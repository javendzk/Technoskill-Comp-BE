const express = require("express");
const employeeController = require("../controllers/employee.controller");
const router = express.Router();

router.post("/add", employeeController.addEmployee);
router.post("/get", employeeController.getEmployee);
// Masukkan rute-rute lain di

module.exports = router;
