const managerController = require('../controllers/manager.controller');
const validateMiddleware = require('../middlewares/validate.middleware.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const express = require('express');
const router = express.Router();

router.post('/login', validateMiddleware, managerController.login);
router.post('/register', validateMiddleware, managerController.register);
router.post('/addEmployee', [authMiddleware, validateMiddleware], managerController.addEmployee);
router.get('/getLogsByManager', [authMiddleware, validateMiddleware], managerController.getLogsByManager);
router.get('/getAllEmployeeByManager', [authMiddleware, validateMiddleware], managerController.getAllEmployeeByManager);
router.get('/getEmployeeByUid/:id', [authMiddleware, validateMiddleware], managerController.getEmployeeByUid);
router.put('/updateEmployeeByUid/:id', [authMiddleware, validateMiddleware], managerController.updateEmployeeByUid);
router.delete('/deleteEmployeeByUid/:id', [authMiddleware, validateMiddleware], managerController.deleteEmployeeByUid);

module.exports = router;
