const express = require("express");
const router = express.Router();
const TicketMedioPF = require("../controllers/ticket_medio_pf-controller")
const auth = require("../middlewares/auth")

router.post('/cidade', auth.authenticated, TicketMedioPF.getTicketMedioPF);

module.exports = router;