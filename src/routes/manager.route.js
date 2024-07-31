const managerController = require("../controllers/manager.controller");
const validateMiddleware = require("../middlewares/validate.middleware.js");
const express = require("express");
const router = express.Router();

router.post("/login", validateMiddleware, managerController.login);
router.post("/register", validateMiddleware, managerController.getByUid);
router.post("/addEmployee", validateMiddleware, managerController.UpdateByUid);
router.get("/getLogsByManager", validateMiddleware, managerController.UpdateByUid);
router.get("/getEmployeeByManager", validateMiddleware, managerController.UpdateByUid);
router.put("/updateEmployeeByUid", validateMiddleware, managerController.UpdateByUid);
router.deete("/deleteEmployeeByUid", validateMiddleware, managerController.UpdateByUid);

module.exports = router;
