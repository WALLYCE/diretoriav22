const express = require("express");
const router = express.Router();
const Cobranca = require("../controllers/cobranca-controller")
const auth = require("../middlewares/auth")

router.post('/faturas_atrasadas', auth.authenticated,Cobranca.getFaturasAtraso);
router.post('/atendimentos', auth.authenticated, Cobranca.getAtendimentos);
router.post('/atendimentos/cobranca', auth.authenticated, Cobranca.getAtendimentosTipoCobranca);
module.exports = router;