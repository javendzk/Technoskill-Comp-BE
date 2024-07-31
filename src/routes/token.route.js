const tokenController = require('../controllers/token.controller.js');
const validateMiddleware = require('../middlewares/validate.middleware.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const express = require('express');
const router = express.Router();

router.get('/', [authMiddleware, validateMiddleware], tokenController.fixed);

module.exports = router;
