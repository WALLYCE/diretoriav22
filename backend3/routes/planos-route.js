const express = require("express");
const router = express.Router();
const PlanosController= require("../controllers/planos-controller")
const auth = require("../middlewares/auth")

router.post('/ativo/cidade', auth.authenticated, PlanosController.getPlanosAtivosCidade)


module.exports = router