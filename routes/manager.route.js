const express = require("express");
const managerController = require("../controllers/manager.controller");
const router = express.Router();

router.post("/login", managerController.login);
// Masukkan rute-rute lain di sini!

module.exports = router;
