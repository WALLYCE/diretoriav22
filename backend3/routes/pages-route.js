const express = require("express");
const router = express.Router();
const PagesController = require("../controllers/pages-controller")
const auth = require("../middlewares/auth")

router.post('/nivel_acesso', auth.authenticated, PagesController.getPagesAcesso)

router.get('/', auth.authenticated, PagesController.getPages)


module.exports = router