
const express = require("express");
const router = express.Router();
const MigracoesController = require("../controllers/migracoes-controller")
const auth = require("../middlewares/auth")


router.post('/cidade',auth.authenticated, MigracoesController.getMigracoesCidade)
    
router.post('/vendedores', auth.authenticated,MigracoesController.getMigracoesVendedores)

module.exports = router