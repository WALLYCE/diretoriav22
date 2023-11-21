const cidades_case = `
WHEN upper(cidade.nome) :: TEXT = 'JUIZ DE FORA' :: TEXT 
AND upper(endereco_numero.bairro) = 'VALADARES' :: TEXT THEN
'VALADARES':: CHARACTER VARYING 
WHEN upper(cidade.nome) :: TEXT = 'LIMA DUARTE' :: TEXT 
AND upper(endereco_numero.bairro) like '%IBITIPOCA%' :: TEXT THEN
'IBITIPOCA':: CHARACTER VARYING 
    WHEN upper(cidade.nome) :: TEXT = 'LIMA DUARTE' :: TEXT 
    AND upper(endereco_numero.bairro) = 'ORVALHO' :: TEXT THEN
        'ORVALHO' :: CHARACTER VARYING 
        WHEN upper(cidade.nome) :: TEXT = 'LIMA DUARTE' :: TEXT 
        AND upper(endereco_numero.bairro) = 'MANEJO' :: TEXT THEN
            'MANEJO' :: CHARACTER VARYING 
            WHEN upper(cidade.nome) :: TEXT = 'LIMA DUARTE' :: TEXT 
            AND upper(endereco_numero.bairro) = 'VILA S_O GERALDO' :: TEXT THEN
                'VILA SAO GERALDO' :: CHARACTER VARYING 
                    WHEN upper(cidade.nome) :: TEXT = 'RIO PRETO' :: TEXT 
                    AND upper(endereco_numero.bairro) ~~ '%FUNIL%' :: TEXT THEN
                        'FUNIL' :: CHARACTER VARYING 
                        WHEN upper(cidade.nome) :: TEXT = 'RIO PRETO' :: TEXT 
                        AND upper(endereco_numero.bairro) ~~ 'S_O CRISTOV_O' :: TEXT THEN
                            'SÃO CRISTOVÃO' :: CHARACTER VARYING 
                            WHEN upper(cidade.nome) :: TEXT = 'RIO PRETO' :: TEXT 
                            AND upper(endereco_numero.bairro) ~~ '%SANTO ANT_NIO%' :: TEXT THEN
                                'SANTO ANTONIO'  :: CHARACTER VARYING 
                                WHEN upper(cidade.nome) :: TEXT = 'RIO PRETO' :: TEXT 
                                AND upper(endereco_numero.bairro) ~~ 'S_O BENTO' :: TEXT THEN
                                    'SAO BENTO' :: CHARACTER VARYING 
                                    WHEN upper(cidade.nome) :: TEXT = 'RIO PRETO' :: TEXT 
                                    AND upper(endereco_numero.bairro) ~~ 'S_O LUIZ' :: TEXT THEN
                                        'SAO LUIZ' :: CHARACTER VARYING 
                                        WHEN upper(cidade.nome) :: TEXT = 'RIO PRETO' :: TEXT 
                                        AND upper(endereco_numero.bairro) ~~ 'S_O PEDRO' :: TEXT THEN
                                            'SÃO PEDRO' :: CHARACTER VARYING 
                                            WHEN upper(cidade.nome) :: TEXT = 'SANTA RITA DE JACUTINGA' :: TEXT 
                                            AND upper(endereco_numero.bairro) ~~ '%BANANAL%' :: TEXT THEN
                                                'BANANAL' :: CHARACTER VARYING 
                                                WHEN upper(cidade.nome) :: TEXT = 'SANTA RITA DE JACUTINGA' :: TEXT 
                                                AND upper(endereco_numero.bairro) ~~ '%CRUZEIRO%' :: TEXT THEN
                                                    'CRUZEIRO' :: CHARACTER VARYING 
                                                    WHEN upper(cidade.nome) :: TEXT = 'BARRA DO PIRA_' :: TEXT THEN
                                                    'TURVO' :: CHARACTER VARYING 
                                                    WHEN upper(cidade.nome) :: TEXT = 'BARRA MANSA' :: TEXT THEN
                                                    'AMPARO' :: CHARACTER VARYING 
                                                    WHEN upper(cidade.nome) :: TEXT = 'VALENÇA' :: TEXT 
                                                    AND ( upper(endereco_numero.bairro) ~~ '%CONSERVAT_RIA%' :: TEXT) THEN
                                                        'CONSERVATORIA' :: CHARACTER VARYING 
                                                        WHEN upper(cidade.nome) :: TEXT = 'VALENÇA' :: TEXT 
                                                        AND upper(endereco_numero.bairro) ~~ '%SANTA ISABEL DO RIO PRETO%' :: TEXT THEN
                                                            'SANTA ISABEL DO RIO PRETO' :: CHARACTER VARYING 
                                                            WHEN upper(cidade.nome) :: TEXT = 'VALENÇA' :: TEXT 
                                                            AND ( upper(endereco_numero.bairro) ~~ '%PARAPE_NA%' :: TEXT ) THEN
                                                                'PARAPEUNA' :: CHARACTER VARYING 
                                                                ELSE upper(cidade.nome)                                                       
`
module.exports = cidades_case;