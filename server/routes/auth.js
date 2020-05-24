const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const verify = require('../middleware/auth');

// api/auth
router.post('/',
    authController.authUser
);

router.get('/',
    verify,
    authController.userAuth
);

module.exports = router;