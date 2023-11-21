const express = require('express');
const router = express.Router();
const reagendamento_os_dataController = require('../controllers/reagendamento_os_data-controller')
const auth = require("../middlewares/auth")

router.post('/', auth.authenticated,reagendamento_os_dataController.getReagendamentos)

module.exports = router 