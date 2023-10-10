const express = require("express");
const router = express.Router();
const AtendimentoSac = require("../controllers/atendimentos_sac-controller")
const auth = require("../middlewares/auth")

router.post('/', auth.authenticated,AtendimentoSac.getAtendimentoSac);
router.post('/periodo', auth.authenticated,AtendimentoSac.getAtendimentoSacPeriodo);

module.exports = router;