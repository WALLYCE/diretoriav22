const express = require("express");
const router = express.Router();
const MetasController = require("../controllers/metas-controller")
const auth = require("../middlewares/auth")

router.post('/', auth.authenticated, MetasController.getMetasCidade)
    
router.patch('/', auth.authenticated, MetasController.updateMetas)

module.exports = router