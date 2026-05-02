"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router();
const { login, refresh, logout } = require('../controllers/auth')
/* ------------------------------------------------------- */

// URL-> /auth

router.post('/login', login);
router.post('/refresh', refresh);
router.route('/logout').get(logout).post(logout);

module.exports = router;