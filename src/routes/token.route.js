const tokenController = require("../controllers/employee.controller.js");
const validateMiddleware = require("../middlewares/validate.middleware.js");
const express = require("express");
const router = express.Router();

router.post("/", validateMiddleware, tokenController.fixed);

module.exports = router;
