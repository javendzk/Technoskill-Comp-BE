const express = require("express");
const managerController = require("../controllers/manager.controller");
const router = express.Router();

router.get("/login", managerController.login);
router.post("/register", managerController.register);

module.exports = router;
