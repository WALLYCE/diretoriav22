
const express = require("express");
const router = express.Router();
const ReincidenciaOSController = require("../controllers/reincidenciaOs-controller")
const auth = require("../middlewares/auth")


router.post('/', auth.authenticated, ReincidenciaOSController.getRencidiencia_os)

module.exports = router;