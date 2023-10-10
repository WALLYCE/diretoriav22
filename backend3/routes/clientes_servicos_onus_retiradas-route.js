const express = require('express');
const router = express.Router();
const ClientesServicosOnusRetiradasController = require('../controllers/clientes_servicos_onus_retiradas-controller')
const auth = require("../middlewares/auth")


router.post('/',auth.authenticated, ClientesServicosOnusRetiradasController.getClientesServicosOnusRetiradas)

module.exports = router