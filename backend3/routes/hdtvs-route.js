const express = require('express');
const router = express.Router();
const Hdtvs = require('../controllers/hdtvs-controller')
const auth = require("../middlewares/auth")


router.post('/cidade',auth.authenticated,Hdtvs.getHdtvCidade)

module.exports = router