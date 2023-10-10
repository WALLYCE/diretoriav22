const express = require("express");
const router = express.Router();
const ProspectoController = require("../controllers/prospecto_completo-controller")
const auth = require("../middlewares/auth")

router.post('/', auth.authenticated, ProspectoController.getProspecto)


module.exports = router