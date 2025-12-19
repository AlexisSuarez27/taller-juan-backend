const express = require('express');
const configController = require('../controllers/configController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(['admin']), configController.getConfig);

module.exports = router;