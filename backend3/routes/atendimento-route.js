const express = require('express')
const router = express.Router();
const AtendimentoController = require('../controllers/atendimento-controller')
const auth = require("../middlewares/auth")

router.post('/',auth.authenticated, AtendimentoController.getAtendimento)

router.post('/mensagem', auth.authenticated, AtendimentoController.getMensagemAtendimento)

module.exports = router