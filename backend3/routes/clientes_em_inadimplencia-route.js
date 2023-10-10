const express = require('express');
const router = express.Router();
const ClientesEmInadimplenciaController = require('../controllers/clientes_em_inadimplencia-controller')
const auth = require("../middlewares/auth")
router.post('/',auth.authenticated, ClientesEmInadimplenciaController.getClientesInadimplentes)

module.exports = router