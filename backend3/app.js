const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors");

//Importando as Rotas
const VendasRoute = require('./routes/vendas-route');
const UpgradeRoute = require('./routes/upgrade-route');
const ServicosRoute = require('./routes/servicos-route');
const RenovacoesRoute = require('./routes/renovacoes-route');
const ReincidenciaOsRoute = require('./routes/reincidenciaOs-route');
const OsRealizadaConcluidaMapRoute = require('./routes/os_realizada_concluida_map-route');
const MigracoesRoute = require("./routes/migracoes-route")
const MetasRoute = require("./routes/metas-route")
const HdtvsRoute = require("./routes/hdtvs-route")
const ErroProcedimentoRoute = require("./routes/erro_procedimento-route")
const ClientesServicosOnusRetiradasRoute = require("./routes/clientes_servicos_onus_retiradas-route")
const ClientesInativosProspectoRoute = require("./routes/clientes_inativos_prospecto-route")
const ClientesEmInadimplenciaRoute = require("./routes/clientes_em_inadimplencia-route")
const ClientesContratosRoute = require("./routes/clientes_contratos-route")
const CidadesRoute = require("./routes/cidades-route")
const CancelamentosRoute = require("./routes/cancelamentos-route")
const AtendimentoRoute = require("./routes/atendimento-route")
const UsersRoute = require("./routes/users-route")
const PagesRoute = require("./routes/pages-route")
const AtendimentosSacRoute = require("./routes/atendimentos_sac-route")
const ProspectoCompletoRoute = require('./routes/prospecto_completo-route')
const TicketMedioPFRoute = require('./routes/ticket_medio_pf-route')
const PlanoRoute = require('./routes/planos-route')
const LigacoesRoute = require('./routes/ligacoes-route')
const RelatorioTecnicosRedeRoute = require('./routes/relatorio_tecnicos_rede-route')
const OSTecnicosRedeRoute = require('./routes/os_tecnicos_rede')
const Reagendamento_os_dataRoute = require('./routes/reagendamento_os_data-route')
const CobrancaRoute = require('./routes/cobranca-route')
const EstoqueRoute = require('./routes/estoque-route')
const QualidadeRoute = require('./routes/qualidade-route')
//Habilitando cors
app.use(bodyParser.json());
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.use(bodyParser.urlencoded({extended: true}));

//Usando as Rotas
app.use('/vendas', VendasRoute);
app.use('/upgrade', UpgradeRoute);
app.use('/servicos', ServicosRoute);
app.use('/renovacoes', RenovacoesRoute);
app.use('/reincidencia_os', ReincidenciaOsRoute);
app.use('/os_realizada_concluida_map', OsRealizadaConcluidaMapRoute);
app.use('/migracoes', MigracoesRoute);
app.use('/metas', MetasRoute);
app.use('/hdtvs', HdtvsRoute);
app.use('/erro_procedimento', ErroProcedimentoRoute);
app.use('/clientes_servicos_onus_retiradas', ClientesServicosOnusRetiradasRoute);
app.use('/clientes_inativos_prospecto', ClientesInativosProspectoRoute);
app.use('/clientes_em_inadimplencia', ClientesEmInadimplenciaRoute);
app.use('/clientes_contratos', ClientesContratosRoute);
app.use('/cidades', CidadesRoute);
app.use('/cancelamentos', CancelamentosRoute);
app.use('/atendimento', AtendimentoRoute);
app.use('/users', UsersRoute)
app.use('/pages', PagesRoute)
app.use('/atendimentos_sac', AtendimentosSacRoute)
app.use('/prospecto_completo', ProspectoCompletoRoute)
app.use('/ticket_medio_pf',TicketMedioPFRoute)
app.use('/plano', PlanoRoute)
app.use('/ligacoes', LigacoesRoute)
app.use('/relatorio_tecnicos_rede', RelatorioTecnicosRedeRoute)
app.use('/os_tecnicos_rede', OSTecnicosRedeRoute)
app.use('/reagendamento_os_data', Reagendamento_os_dataRoute )
app.use('/cobranca', CobrancaRoute)
app.use('/estoque', EstoqueRoute)
app.use('/qualidade', QualidadeRoute)
module.exports = app;