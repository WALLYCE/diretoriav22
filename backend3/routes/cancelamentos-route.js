const express = require('express');
const router = express.Router();
const CancelamentosController = require('../controllers/cancelamentos-controller')
const auth = require("../middlewares/auth")
router.post('/cidade',auth.authenticated, CancelamentosController.getCancelamentosPorCidade)

router.post('/periodo',auth.authenticated, CancelamentosController.getCancelamentosPorPeriodo)

module.exports = router;
