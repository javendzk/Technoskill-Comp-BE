const employeeController = require('../controllers/employee.controller.js');
const validateMiddleware = require('../middlewares/validate.middleware.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const express = require('express');
const router = express.Router();

router.post('/login', validateMiddleware, employeeController.login);
router.get('/getByUid/:id', [authMiddleware, validateMiddleware], employeeController.getByUid);
router.put('/updateByUid/:id', [authMiddleware, validateMiddleware], employeeController.UpdateByUid);
router.put('/changePassword/:id', [authMiddleware, validateMiddleware], employeeController.changePassword);

module.exports = router;
