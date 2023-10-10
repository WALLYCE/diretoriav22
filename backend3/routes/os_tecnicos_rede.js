const express = require("express");
const router = express.Router();
const OSTecnicosRede = require("../controllers/os_tecnicos_rede-controller")
const auth = require("../middlewares/auth")

router.post('/', auth.authenticated, OSTecnicosRede.getOSTecnicoRede)



module.exports = router 