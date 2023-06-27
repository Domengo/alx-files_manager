import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const express = require('express');

const router = express.Router();
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.get('/users', UsersController.postNew);
module.exports = router;
