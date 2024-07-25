const express = require("express");
const employeeController = require("../controllers/employee.controller");
const router = express.Router();

router.post("/add", employeeController.addEmployee);
router.get("/", employeeController.getEmployee);
router.get("/:id", employeeController.getOneEmployee);

module.exports = router;
