const express = require('express');
const router = express.Router();
const EstoqueController = require('../controllers/estoque-controller')
const auth = require("../middlewares/auth")

router.post('/compras_realizadas', auth.authenticated, EstoqueController.getCompras)
router.post('/produto_compra/estoque', auth.authenticated, EstoqueController.getProdutoCompraNaoAgrupadoEstoque)
router.post('/produto_compra/comodato', auth.authenticated, EstoqueController.getProdutoCompraNaoAgrupadoComodato)
router.post('/produto_compra/usuario', auth.authenticated, EstoqueController.getProdutoCompraNaoAgrupadoUsuario)
router.post('/produto_compra/perdido', auth.authenticated, EstoqueController.getProdutoCompraNaoAgrupadoPerdido)
router.post('/produto_compra/outros', auth.authenticated, EstoqueController.getProdutoCompraNaoAgrupadoOutros)
module.exports = router