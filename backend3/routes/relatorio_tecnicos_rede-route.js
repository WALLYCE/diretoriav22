
const express = require("express");
const router = express.Router();
const RelatorioTecnicosRede = require("../controllers/relatorio_tecnicos_rede-controller")
const auth = require("../middlewares/auth")


router.post('/',  RelatorioTecnicosRede.getRelatorioTecnicosRede)

router.post('/ordem_servico/periodo',  RelatorioTecnicosRede.getOrdemServicoRedePeriodo)


router.post('/ordem_servico/media_tempo',  RelatorioTecnicosRede.geAllTempoMedioOsTecnico);
router.post('/ordem_servico/tempo_execucao', RelatorioTecnicosRede.getTempoOsExecutadaRedeMap);
router.post('/ordem_servico/tempo_execucao/map', RelatorioTecnicosRede.getTempoOsExecutadaMap);
router.post('/ordem_servico/tempo_execucao/rede', RelatorioTecnicosRede.getTempoOsExecutadaRede);
router.post('/ordem_servico/tempo_total', RelatorioTecnicosRede.getTempoOSTotal);
module.exports = router;