const employeeController = require("../controllers/employee.controller.js");
const validateMiddleware = require("../middlewares/validate.middleware.js");
const express = require("express");
const router = express.Router();

router.post("/login", validateMiddleware, employeeController.login);
router.get("/getByUid", validateMiddleware, employeeController.getByUid);
router.put("/UpdateByUid", validateMiddleware, employeeController.UpdateByUid);

module.exports = router;
