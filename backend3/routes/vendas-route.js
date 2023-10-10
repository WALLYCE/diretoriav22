const express = require("express");
const router = express.Router();
const VendasController = require("../controllers/vendas-controller")
const auth = require("../middlewares/auth")

router.post('/cidade', auth.authenticated, VendasController.getVendaPorCidade);

router.post('/cidade/total',auth.authenticated,  VendasController.getVendaPorCidadeTotal)

router.post('/periodo',auth.authenticated, VendasController.getVendasPorPeriodo);

router.get('/vendedores/ativos',auth.authenticated,VendasController.getVendedoresAtivos)

router.post('/vendedores',auth.authenticated, VendasController.getVendasPorVendedores)

router.post('/setor',auth.authenticated, VendasController.getVendasPorSetor)


module.exports = router;