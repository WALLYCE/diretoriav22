const express = require("express");
const router = express.Router();
const UpgradeController = require("../controllers/upgrade-controller")
const auth = require("../middlewares/auth")

router.post('/cidade', auth.authenticated,UpgradeController.getUpgradeCidade)
    
router.post('/vendedores',auth.authenticated,  UpgradeController.getUpgradeVendedores)
        

module.exports = router;