

const express = require("express");
const router = express.Router();
const OsRealizadaConcluidaMapController = require("../controllers/os_realizada_concluida_map-controller")


router.post('/', OsRealizadaConcluidaMapController.getOsRealizadasTecnicosMap)

router.post('/cidade', OsRealizadaConcluidaMapController.getOsRealizadasTecnicosMapCidade)

router.post('/manutencao',OsRealizadaConcluidaMapController.getOsManutencaoClientes)

module.exports = router