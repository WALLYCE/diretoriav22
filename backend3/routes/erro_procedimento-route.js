const express = require('express');
const router = express.Router();
const ErroProcedimentoController = require('../controllers/erro_procedimento-controller')
const auth = require("../middlewares/auth")

router.get('/', auth.authenticated,ErroProcedimentoController.getErroProcedimento)

module.exports = router