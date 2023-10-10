const express = require('express');
const router = express.Router();
const usersController = require("../controllers/users-controller")
const auth = require("../middlewares/auth")

router.post('/cadastro',auth.authenticated, usersController.addUser)
router.post('/login', usersController.loginUser)
router.post('/pages', usersController.getPages)
module.exports = router