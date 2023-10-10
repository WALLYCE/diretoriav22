const express = require('express')
const router = express.Router();
const ClientesContratosController = require('../controllers/clientes_contratos-controller')
const auth = require("../middlewares/auth")
router.get('/',auth.authenticated, ClientesContratosController.getClientesContratos)


module.exports = router