const express = require('express');
const router = express.Router();
const CidadesController = require('../controllers/cidades-controller');
const auth = require("../middlewares/auth")

router.get('/atendidas', auth.authenticated, CidadesController.getCidadesAtendidas)

module.exports = router 