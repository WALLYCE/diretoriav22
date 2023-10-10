const express = require('express');
const router = express.Router();
const ClientesInativosProspectoController = require('../controllers/clientes_inativos_prospecto-controller')
const auth = require("../middlewares/auth")
router.post('/',auth.authenticated, ClientesInativosProspectoController.getClientesInativosProspecto)

module.exports = router