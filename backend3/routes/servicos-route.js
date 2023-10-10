const express = require("express");
const router = express.Router();
const ServicosController = require("../controllers/servicos-controller")
const auth = require("../middlewares/auth")

router.get('/', auth.authenticated,ServicosController.getServicos);
router.post('/quantidade', auth.authenticated,ServicosController.getQuantidadeServicos);
module.exports = router;