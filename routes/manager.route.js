const express = require("express");
const managerController = require("../controllers/manager.controller");
const router = express.Router();

router.get("/login", managerController.login);


module.exports = router;
