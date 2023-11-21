const conexao = require('../databases/conexao');
const cidades_case = require('../controllers/cidades_base')
const relatorio_tecnicos_rede_base = ` SELECT cliente.codigo_cliente,
ordem_servico.numero_ordem_servico,
tipo_ordem_servico.descricao,
string_agg(users.name::text, ', '::text) AS tecnicos,
ordem_servico.descricao_servico,
ordem_servico.data_inicio_executado,
ordem_servico.data_termino_executado,
ordem_servico.data_inicio_executado::date AS dia_execucao,
cliente_servico.referencia,
ordem_servico.descricao_fechamento
FROM ordem_servico
 JOIN ordem_servico_tecnico ON ordem_servico.id_ordem_servico = ordem_servico_tecnico.id_ordem_servico
 JOIN users ON users.id = ordem_servico_tecnico.id_usuario
 JOIN usuario_setor ON usuario_setor.id_usuario = users.id
 JOIN setor ON usuario_setor.id_setor = setor.id_setor
 JOIN tipo_ordem_servico ON ordem_servico.id_tipo_ordem_servico = tipo_ordem_servico.id_tipo_ordem_servico
 JOIN cliente_servico ON ordem_servico.id_cliente_servico = cliente_servico.id_cliente_servico
 JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
WHERE setor.descricao::text ~~ ' Rede'::text
GROUP BY cliente.codigo_cliente, ordem_servico.numero_ordem_servico, tipo_ordem_servico.descricao, ordem_servico.descricao_servico, ordem_servico.data_inicio_executado, ordem_servico.data_termino_executado, cliente_servico.referencia, ordem_servico.descricao_fechamento`

const os_tempo_execucao_map_base =` SELECT ordem_servico.numero_ordem_servico,
tipo_ordem_servico.descricao AS tipo_os,
users.name AS tecnico,
setor.descricao AS setor,
ordem_servico.data_inicio_executado::text AS data_inicio_executado,
ordem_servico.data_termino_executado::text AS data_termino_executado,
(ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado)::text AS tempo_execucao,
    CASE
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 197 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 15 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 74 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 109 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 175 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 16 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 137 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 119 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 170 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 36 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 18 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 160 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 24 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 169 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 5 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 102 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 26 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 63 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 93 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 11 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 195 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 37 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 23 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 7 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 103 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 87 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 139 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '03:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 145 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 21 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 94 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 151 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 95 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 41 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 113 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 123 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 164 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 69 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 122 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 33 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '9 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 77 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '9 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 167 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 168 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 34 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 56 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 129 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 10 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 38 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 85 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 190 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 9 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 83 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 29 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 25 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 62 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 105 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 146 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 147 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 42 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 162 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 180 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 157 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 35 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 98 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 6 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 90 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 80 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 76 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 76 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 138 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 84 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '24:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 79 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 86 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 30 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 158 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 12 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 32 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 91 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 124 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 19 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 20 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 144 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 89 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 112 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 39 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 114 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 104 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 163 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 120 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 159 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 27 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 4 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 65 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 78 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 55 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 22 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 140 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 31 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 92 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 71 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 17 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 13 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 165 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 14 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 141 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 106 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 130 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 57 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        ELSE 'Tempo excedido'::text
    END AS situacao,
    CASE
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 197 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 15 THEN '1 hora'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 74 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 109 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 175 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 16 THEN '1 h 30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 137 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 161 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 119 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 170 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 36 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 18 THEN '1 h 30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 160 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 24 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 169 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 5 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 102 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 26 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 63 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 93 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 11 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 195 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 37 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 23 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 7 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 103 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 87 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 139 THEN '180 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 145 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 21 THEN '1 h 30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 94 THEN '72 h min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 151 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 95 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 41 THEN '240 m min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 113 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 123 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 164 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 69 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 122 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 33 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 77 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 167 THEN '2 horas min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 168 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 34 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 56 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 129 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 10 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 38 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 85 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 190 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 9 THEN '2 horas'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 83 THEN '3 dias'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 29 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 25 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 62 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 105 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 146 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 147 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 42 THEN '2h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 162 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 180 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 157 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 35 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 98 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 6 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 90 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 80 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 76 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 138 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 84 THEN '24 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 79 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 86 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 30 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 158 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 12 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 32 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 91 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 124 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 19 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 20 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 144 THEN '2 h 30'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 89 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 112 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 39 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 114 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 104 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 163 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 120 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 159 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 27 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 4 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 65 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 78 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 55 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 22 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 140 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 31 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 92 THEN '48 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 71 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 17 THEN '2 h 30 min min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 13 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 165 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 14 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 141 THEN '-- min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 106 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 130 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 57 THEN '2 h'::text
        ELSE ''::text
    END AS tempo_maximo
FROM ordem_servico
 JOIN ordem_servico_tecnico ON ordem_servico.id_ordem_servico = ordem_servico_tecnico.id_ordem_servico
 JOIN users ON users.id = ordem_servico_tecnico.id_usuario
 JOIN usuario_setor ON usuario_setor.id_usuario = users.id
 JOIN setor ON usuario_setor.id_setor = setor.id_setor
 JOIN tipo_ordem_servico ON ordem_servico.id_tipo_ordem_servico = tipo_ordem_servico.id_tipo_ordem_servico
 JOIN cliente_servico ON ordem_servico.id_cliente_servico = cliente_servico.id_cliente_servico
 JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
WHERE setor.descricao::text ~~ ' Map'::text AND ordem_servico.data_termino_executado IS NOT NULL
ORDER BY users.name`

const os_tempo_execucao_rede_base = ` SELECT ordem_servico.numero_ordem_servico,
tipo_ordem_servico.descricao AS tipo_os,
users.name AS tecnico,
setor.descricao AS setor,
ordem_servico.data_inicio_executado::text AS data_inicio_executado,
ordem_servico.data_termino_executado::text AS data_termino_executado,
(ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado)::text AS tempo_execucao,
    CASE
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 197 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 15 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 74 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 109 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 175 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 16 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 137 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 119 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 170 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 36 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 18 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 160 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 24 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 169 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 5 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 102 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 26 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 63 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 93 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 11 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 195 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 37 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 23 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 7 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 103 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 87 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 139 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '03:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 145 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 21 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 94 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 151 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 95 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 41 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 113 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 123 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 164 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 69 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 122 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 33 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '9 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 77 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '9 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 167 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 168 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 34 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 56 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 129 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 10 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 38 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 85 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 190 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 9 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 83 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 29 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 25 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 62 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 105 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 146 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 147 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 42 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 162 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 180 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 157 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 35 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 98 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 6 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 90 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 80 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 76 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 76 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 138 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 84 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '24:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 79 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 86 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 30 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 158 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 12 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 32 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 91 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 124 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 19 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 20 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 144 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 89 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 112 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 39 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 114 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 104 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 163 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 120 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 159 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 27 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 4 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 65 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 78 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 55 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 22 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 140 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 31 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 92 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 71 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 17 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 13 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 165 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 14 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 141 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 106 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 130 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 57 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        ELSE 'Tempo excedido'::text
    END AS situacao,
    CASE
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 197 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 15 THEN '1 hora'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 74 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 109 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 175 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 16 THEN '1 h 30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 137 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 161 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 119 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 170 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 36 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 18 THEN '1 h 30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 160 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 24 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 169 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 5 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 102 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 26 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 63 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 93 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 11 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 195 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 37 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 23 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 7 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 103 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 87 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 139 THEN '180 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 145 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 21 THEN '1 h 30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 94 THEN '72 h min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 151 THEN '2 h 30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 95 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 41 THEN '240 m min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 113 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 123 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 164 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 69 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 122 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 33 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 77 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 167 THEN '2 horas min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 168 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 34 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 56 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 129 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 10 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 38 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 85 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 190 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 9 THEN '2 horas'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 83 THEN '3 dias'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 29 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 25 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 62 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 105 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 146 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 147 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 42 THEN '2h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 162 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 180 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 157 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 35 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 98 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 6 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 90 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 80 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 76 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 138 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 84 THEN '24 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 79 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 86 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 30 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 158 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 12 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 32 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 91 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 124 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 19 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 20 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 144 THEN '2 h 30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 89 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 112 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 39 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 114 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 104 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 163 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 120 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 159 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 27 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 4 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 65 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 78 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 55 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 22 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 140 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 31 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 92 THEN '48 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 71 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 17 THEN '2 h 30 min min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 13 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 165 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 14 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 141 THEN '-- min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 106 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 130 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 57 THEN '2 h'::text
        ELSE ''::text
    END AS tempo_maximo
FROM ordem_servico
 JOIN ordem_servico_tecnico ON ordem_servico.id_ordem_servico = ordem_servico_tecnico.id_ordem_servico
 JOIN users ON users.id = ordem_servico_tecnico.id_usuario
 JOIN usuario_setor ON usuario_setor.id_usuario = users.id
 JOIN setor ON usuario_setor.id_setor = setor.id_setor
 JOIN tipo_ordem_servico ON ordem_servico.id_tipo_ordem_servico = tipo_ordem_servico.id_tipo_ordem_servico
 JOIN cliente_servico ON ordem_servico.id_cliente_servico = cliente_servico.id_cliente_servico
 JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
WHERE setor.descricao::text ~~ ' Rede'::text AND ordem_servico.data_termino_executado IS NOT NULL
ORDER BY users.name`


const os_tempo_execucao_rede_map_base = ` SELECT ordem_servico.numero_ordem_servico,
tipo_ordem_servico.descricao AS tipo_os,
users.name AS tecnico,
setor.descricao AS setor,
ordem_servico.data_inicio_executado::text AS data_inicio_executado,
ordem_servico.data_termino_executado::text AS data_termino_executado,
(ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado)::text AS tempo_execucao,
    CASE
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 197 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 15 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 74 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 109 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 175 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 16 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 137 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 119 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 170 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 36 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 18 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 160 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 24 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 169 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 5 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 102 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 26 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 63 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 93 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 11 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 195 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 37 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 23 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 7 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 103 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 87 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '23:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 139 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '03:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 145 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 21 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 94 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 151 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 95 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 41 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 113 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 123 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 164 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 69 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 122 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 33 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '9 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 77 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '9 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 167 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 168 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 34 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 56 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 129 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 10 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 38 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 85 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 190 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 9 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 83 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 29 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 25 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 62 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 105 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 146 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 147 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 42 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 162 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 180 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 157 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 35 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 98 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 6 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 90 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 80 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 76 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 76 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 138 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 84 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '24:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 79 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 86 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 30 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 158 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 12 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 32 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 91 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 124 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 19 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 20 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 144 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 89 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 112 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 39 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '04:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 114 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 104 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 163 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 120 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 159 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 27 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 4 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 65 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 78 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 55 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 22 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 140 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 31 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '01:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 92 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 71 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '00:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 17 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:30:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 13 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 165 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 14 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 141 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 106 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 130 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '12:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 57 AND (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado) <= '02:00:00'::time without time zone::interval THEN 'Dentro do tempo estipulado'::text
        ELSE 'Tempo excedido'::text
    END AS situacao,
    CASE
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 197 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 15 THEN '1 hora'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 74 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 109 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 175 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 16 THEN '1 h 30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 137 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 161 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 119 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 170 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 36 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 18 THEN '1 h 30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 160 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 24 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 169 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 5 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 102 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 26 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 63 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 93 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 11 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 195 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 37 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 23 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 7 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 103 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 87 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 139 THEN '180 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 145 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 21 THEN '1 h 30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 94 THEN '72 h min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 151 THEN '2 h 30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 95 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 41 THEN '240 m min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 113 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 123 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 164 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 69 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 122 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 33 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 77 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 167 THEN '2 horas min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 168 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 34 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 56 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 129 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 10 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 38 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 85 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 190 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 9 THEN '2 horas'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 83 THEN '3 dias'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 29 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 25 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 62 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 105 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 146 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 147 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 42 THEN '2h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 162 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 180 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 157 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 35 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 98 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 6 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 90 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 80 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 76 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 138 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 84 THEN '24 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 79 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 86 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 30 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 158 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 12 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 32 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 91 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 124 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 19 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 20 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 144 THEN '2 h 30min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 89 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 112 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 39 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 114 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 104 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 163 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 120 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 159 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 27 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 4 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 65 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 78 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 55 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 22 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 140 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 31 THEN '1 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 92 THEN '48 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 71 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 17 THEN '2 h 30 min min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 13 THEN ' min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 165 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 14 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 141 THEN '-- min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 106 THEN '2 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 130 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 57 THEN '2 h'::text
        ELSE ''::text
    END AS tempo_maximo
FROM ordem_servico
 JOIN ordem_servico_tecnico ON ordem_servico.id_ordem_servico = ordem_servico_tecnico.id_ordem_servico
 JOIN users ON users.id = ordem_servico_tecnico.id_usuario
 JOIN usuario_setor ON usuario_setor.id_usuario = users.id
 JOIN setor ON usuario_setor.id_setor = setor.id_setor
 JOIN tipo_ordem_servico ON ordem_servico.id_tipo_ordem_servico = tipo_ordem_servico.id_tipo_ordem_servico
 JOIN cliente_servico ON ordem_servico.id_cliente_servico = cliente_servico.id_cliente_servico
 JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
WHERE (setor.descricao::text ~~ ' Map'::text OR setor.descricao::text ~~ ' Rede'::text) AND ordem_servico.data_termino_executado IS NOT NULL
ORDER BY users.name`

const os_tempo_total_base = ` SELECT ordem_servico.numero_ordem_servico,
tipo_ordem_servico.descricao AS tipo_os,
users.name AS tecnico,
setor.descricao AS setor,
atendimento.data_cadastro::text AS data_atendimento,
ordem_servico.data_termino_executado::text AS data_termino_executado,
(ordem_servico.data_termino_executado - atendimento.data_cadastro)::text AS tempo_total,
    CASE
    WHEN tipo_ordem_servico.id_tipo_ordem_servico = 197 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '1 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 15 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 74 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 109 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 175 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 16 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 137 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 119 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 170 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 36 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 18 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 160 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '04:00:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 24 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 169 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 5 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 102 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 26 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 63 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 93 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 11 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 195 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 37 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 23 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 7 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 103 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 87 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 139 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 145 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 21 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 94 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 151 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 95 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 41 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '18:00:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 113 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 123 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 164 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 69 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 122 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 33 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '9 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 77 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '9 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 167 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '18:00:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 168 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 34 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 56 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 129 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '1 day'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 10 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '1 day'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 38 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '18:00:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 85 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 190 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 9 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 83 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 29 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '1 day'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 25 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '1 day'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 62 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 105 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '1 day'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 146 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 147 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 42 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '18:00:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 162 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 180 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 157 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 35 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 98 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 6 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 90 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 80 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 76 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 76 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 138 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 84 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 79 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 86 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 30 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '1 day'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 158 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 12 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 32 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 91 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 124 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 19 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 20 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 144 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 89 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 112 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 39 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '18:00:00'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 114 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 104 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 163 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 120 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 159 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 27 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 4 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 65 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 78 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 55 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 22 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 140 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 31 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 92 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 71 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 17 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 13 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 165 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 14 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 141 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '10 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 106 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '3 days'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 130 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '1 day'::interval THEN 'Dentro do tempo estipulado'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 57 AND (ordem_servico.data_termino_executado - atendimento.data_cadastro) <= '2 days'::interval THEN 'Dentro do tempo estipulado'::text
        ELSE 'Tempo excedido'::text
    END AS situacao,
    CASE
    WHEN tipo_ordem_servico.id_tipo_ordem_servico = 197 THEN '1 day'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 15 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 74 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 109 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 175 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 16 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 137 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 161 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 119 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 170 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 36 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 18 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 160 THEN '4 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 24 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 169 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 5 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 102 THEN ' 10 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 26 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 63 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 93 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 11 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 195 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 37 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 23 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 7 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 103 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 87 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 139 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 145 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 21 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 94 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 151 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 95 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 41 THEN '18 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 113 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 123 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 164 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 69 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 122 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 33 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 77 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 167 THEN '18 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 168 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 34 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 56 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 129 THEN '1 day'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 10 THEN '1 day'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 38 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 85 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 190 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 9 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 83 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 29 THEN '1 day'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 25 THEN '1 day'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 62 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 105 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 146 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 147 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 42 THEN '2h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 162 THEN '12 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 180 THEN '30 min'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 157 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 35 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 98 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 6 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 90 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 80 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 76 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 138 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 84 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 79 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 86 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 30 THEN '1 day'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 158 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 12 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 32 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 91 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 124 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 19 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 20 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 144 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 89 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 112 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 39 THEN '18 h'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 114 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 104 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 163 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 120 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 159 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 27 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 4 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 65 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 78 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 55 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 22 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 140 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 31 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 92 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 71 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 17 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 13 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 165 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 14 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 141 THEN '10 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 106 THEN '3 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 130 THEN '2 days'::text
        WHEN tipo_ordem_servico.id_tipo_ordem_servico = 57 THEN '1 day'::text
        ELSE ''::text
    END AS tempo_maximo
FROM ordem_servico
 JOIN ordem_servico_tecnico ON ordem_servico.id_ordem_servico = ordem_servico_tecnico.id_ordem_servico
 JOIN users ON users.id = ordem_servico_tecnico.id_usuario
 JOIN usuario_setor ON usuario_setor.id_usuario = users.id
 JOIN setor ON usuario_setor.id_setor = setor.id_setor
 JOIN tipo_ordem_servico ON ordem_servico.id_tipo_ordem_servico = tipo_ordem_servico.id_tipo_ordem_servico
 JOIN cliente_servico ON ordem_servico.id_cliente_servico = cliente_servico.id_cliente_servico
 JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
 JOIN atendimento ON atendimento.id_atendimento = ordem_servico.id_atendimento
WHERE (setor.descricao::text ~~ ' Rede'::text OR setor.descricao::text ~~ ' Map'::text) AND ordem_servico.data_termino_executado IS NOT NULL
ORDER BY users.name`
exports.getRelatorioTecnicosRede = async(req,res,next)=>{
   
        const query = `select k.codigo_cliente, 
        k.numero_ordem_servico,
         k.descricao, 
         k.tecnicos,
          k.descricao_servico, 
          to_char(k.data_inicio_executado, 'DD/MM/YYYY HH24:MI:SS') as data_inicio_executado,
           to_char(k.data_termino_executado, 'DD/MM/YYYY HH24:MI:SS') as data_termino_executado,
            k.referencia, 
            k.descricao_fechamento
             from (${relatorio_tecnicos_rede_base}) as k where k.dia_execucao >= '${req.body.data_inicial}' and k.dia_execucao <= '${req.body.data_final}' order by k.data_inicio_executado`;
        console.log(query)
        try{
            const resposta = await conexao.query(query);
            console.log(resposta.rows)
            res.status(200).send(resposta.rows)
            }catch(erro){
                res.status(400).send(erro)
            }
    }

exports.getOrdemServicoRedePeriodo = async(req, res, next)=>{
    const query = `SELECT concat(date_part('month',  relatorio_tecnicos_rede.data_inicio_executado), '/', date_part('year', relatorio_tecnicos_rede.data_inicio_executado)) as data, count(*) as quantidade FROM (${relatorio_tecnicos_rede_base}) as relatorio_tecnicos_rede  where relatorio_tecnicos_rede.data_inicio_executado >= '2021/09/01' GROUP BY date_part('year',  relatorio_tecnicos_rede.data_inicio_executado),  date_part('month',  relatorio_tecnicos_rede.data_inicio_executado) ORDER BY date_part('year',  relatorio_tecnicos_rede.data_inicio_executado),  date_part('month',  relatorio_tecnicos_rede.data_inicio_executado)`;
    console.log(query)
    try{
        const resposta = await conexao.query(query);
        console.log(resposta.rows)
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
    }


        exports.geAllTempoMedioOsTecnico = async(req, res, next)=>{
            const query = ` SELECT
            tipo_ordem_servico.descricao as tipo_os,
            users.name AS tecnico,
                setor.descricao as setor,
                (ordem_servico.data_inicio_executado)::text as data_inicio_executado,
                (ordem_servico.data_termino_executado)::text as data_termino_executado,
            (ordem_servico.data_termino_executado - ordem_servico.data_inicio_executado)::TIME as tempo_execucao
           FROM ordem_servico
             JOIN ordem_servico_tecnico ON ordem_servico.id_ordem_servico = ordem_servico_tecnico.id_ordem_servico
             JOIN users ON users.id = ordem_servico_tecnico.id_usuario
             JOIN usuario_setor ON usuario_setor.id_usuario = users.id
             JOIN setor ON usuario_setor.id_setor = setor.id_setor
             JOIN tipo_ordem_servico ON ordem_servico.id_tipo_ordem_servico = tipo_ordem_servico.id_tipo_ordem_servico
             JOIN cliente_servico ON ordem_servico.id_cliente_servico = cliente_servico.id_cliente_servico
             JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
          WHERE (setor.descricao::text ~~ ' Rede'::text or setor.descricao::text ~~ ' Map') and ordem_servico.data_termino_executado is not null and ordem_servico.data_inicio_executado::date >='${req.body.data_inicial}' and ordem_servico.data_inicio_executado::date <='${req.body.data_final}'
           ORDER BY users.name`;
     
            try{
                const resposta = await conexao.query(query);
                console.log(resposta.rows)
                res.status(200).send(resposta.rows)
                }catch(erro){
                    res.status(400).send(erro)
                }
            }


        
            exports.getTempoOsExecutadaMap = async(req, res, next)=>{
          const query = ` SELECT numero_ordem_servico, tipo_os, tecnico, setor, to_char(os_tempo_execucao_map.data_inicio_executado::TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS')	aS data_inicio_executado, to_char(os_tempo_execucao_map.data_termino_executado::TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS') as data_termino_executado, tempo_execucao, situacao, tempo_maximo
           FROM (${os_tempo_execucao_map_base}) as os_tempo_execucao_map WHERE os_tempo_execucao_map.data_inicio_executado::date >='${req.body.data_inicial}' and os_tempo_execucao_map.data_inicio_executado::date <='${req.body.data_final}'`;
                try{
                    const resposta = await conexao.query(query);
                    console.log(resposta.rows)
                    res.status(200).send(resposta.rows)
                    }catch(erro){
                        console.log(erro)
                        res.status(400).send(erro)
                    }
                }


                exports.getTempoOsExecutadaRede = async(req, res, next)=>{
                    const query = ` SELECT numero_ordem_servico, 
                    tipo_os, tecnico, setor,
                     to_char(os_tempo_execucao_rede.data_inicio_executado::TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS')	aS data_inicio_executado, 
                     to_char(os_tempo_execucao_rede.data_termino_executado::TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS') as data_termino_executado, 
                     tempo_execucao, situacao, 
                     tempo_maximo
                     FROM (${os_tempo_execucao_rede_base}) as os_tempo_execucao_rede WHERE os_tempo_execucao_rede.data_inicio_executado::date >='${req.body.data_inicial}' and os_tempo_execucao_rede.data_inicio_executado::date <='${req.body.data_final}'`;
                          try{
                              const resposta = await conexao.query(query);
                              console.log(resposta.rows)
                              res.status(200).send(resposta.rows)
                              }catch(erro){
                                  console.log(erro)
                                  res.status(400).send(erro)
                              }
                          }
                          exports.getTempoOsExecutadaRedeMap = async(req, res, next)=>{
                            const query = ` SELECT numero_ordem_servico, 
                            tipo_os, tecnico, setor,
                             to_char(os_tempo_execucao_rede_map.data_inicio_executado::TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS')	aS data_inicio_executado, 
                             to_char(os_tempo_execucao_rede_map.data_termino_executado::TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS') as data_termino_executado, 
                             tempo_execucao, situacao, 
                             tempo_maximo
                             FROM (${os_tempo_execucao_rede_map_base}) as os_tempo_execucao_rede_map WHERE os_tempo_execucao_rede_map.data_inicio_executado::date >='${req.body.data_inicial}' and os_tempo_execucao_rede_map.data_inicio_executado::date <='${req.body.data_final}'`;
                                  try{
                                      const resposta = await conexao.query(query);
                                      console.log(resposta.rows)
                                      res.status(200).send(resposta.rows)
                                      }catch(erro){
                                          console.log(erro)
                                          res.status(400).send(erro)
                                      }
                                  }
        

            exports.getTempoOSTotal = async(req, res, next)=>{
                const query = ` SELECT numero_ordem_servico, tipo_os, tecnico, setor, to_char(os_tempo_total.data_atendimento::TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS')	aS data_atendimento, to_char(os_tempo_total.data_termino_executado::TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS') as data_termino_executado, tempo_total, situacao, tempo_maximo FROM (${os_tempo_total_base}) as os_tempo_total WHERE os_tempo_total.data_atendimento::date >='${req.body.data_inicial}' and os_tempo_total.data_atendimento::date <='${req.body.data_final}'`;
                try{
                    const resposta = await conexao.query(query);
                    console.log(resposta.rows)
                    res.status(200).send(resposta.rows)
                    }catch(erro){
                        console.log(erro)
                        res.status(400).send(erro)
                    }
            }