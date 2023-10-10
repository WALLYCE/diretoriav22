
const express = require("express");
const router = express.Router();
const RenovacoesController = require("../controllers/renovacoes-controller")
const auth = require("../middlewares/auth")


router.post('/cidade',auth.authenticated,  RenovacoesController.getRenovacoesCidade)


router.post('/vendedores',auth.authenticated, RenovacoesController.getRenovacoesVendedor);

module.exports = router;