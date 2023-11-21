const express = require("express");
const router = express.Router();
const QualidadeController = require("../controllers/qualidade-controller")
const auth = require("../middlewares/auth")

router.get('/retencao', auth.authenticated, QualidadeController.getRetencao)

router.get('/meta/retencao', auth.authenticated, QualidadeController.getMetaRetencao)

router.get('/ligacoes_cobranca', auth.authenticated, QualidadeController.getLigacoesCobranca)

router.get('/meta/ligacoes_cobranca', auth.authenticated, QualidadeController.getMetaLigacoesCobranca)

router.get('/meta/ligacoes_vendas', auth.authenticated, QualidadeController.getMetaLigacoesVendas)

router.get('/ligacoes_vendas', auth.authenticated, QualidadeController.getLigacoesVendas)

router.get('/meta/ligacoes_suporte', auth.authenticated, QualidadeController.getMetaLigacoesSuporte)

router.get('/ligacoes_suporte', auth.authenticated, QualidadeController.getLigacoesSuporte)

module.exports = router