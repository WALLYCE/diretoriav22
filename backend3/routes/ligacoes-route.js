const express = require("express");
const router = express.Router();
const LigacoesController = require("../controllers/ligacoes-controller")
const auth = require("../middlewares/auth");


router.post('/realizadas', auth.authenticated,  LigacoesController.getLigacoesRealizadas)
router.post('/realizadas/vendas', auth.authenticated,  LigacoesController.getLigacoesRealizadasVendas)

router.post('/realizadas/vendas/bruto', auth.authenticated,  LigacoesController.getLigacoesRealizadasVendasBruto)
router.post('/realizadas/sac', auth.authenticated,  LigacoesController.getLigacoesRealizadasSac)
router.post('/realizadas/cobranca', auth.authenticated,  LigacoesController.getLigacoesRealizadasCobranca)
router.post('/realizadas/cobranca/bruto', auth.authenticated,  LigacoesController.getLigacoesRealizadasCobrancaBruto)
router.post('/recebidas', auth.authenticated,  LigacoesController.getLigacoesRecebidas)

router.post('/recebidas/sac', auth.authenticated,  LigacoesController.getLigacoesRecebidasSac)

router.post('/recebidas/cobranca', auth.authenticated,  LigacoesController.getLigacoesRecebidasCobranca)

router.post('/recebidas/vendas', auth.authenticated,  LigacoesController.getLigacoesRecebidasVendas)
router.post('/realizadas/qualidade', auth.authenticated,  LigacoesController.getLigacoesRealizadasQualidade)
router.post('/gravacoes', auth.authenticated,  LigacoesController.getGravacoes)
router.post('/solicitacoes_gravacoes', auth.authenticated, LigacoesController.getSolicitacoesGravacoes)
module.exports = router