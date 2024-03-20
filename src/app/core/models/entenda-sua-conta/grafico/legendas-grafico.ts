export enum LegendasGrafico {
    perdas = 'Perdas',
    geracaoDeEnergia = 'Geração de Energia',
    tributos = 'Tributos',
    encargos = 'Encargos',
    transmissao = 'Transmissão',
    demaisItens = 'Demais itens',
    servicoDeDistribuicao = 'Serviços de Distribuição',
}


export enum CorLegendaGrafico {
    perdas = '#E3850D',
    geracaoDeEnergia = '#26BF64',
    tributos = '#FFB536',
    encargos = '#B0A9A3',
    transmissao = '#0792E5',
    demaisItens = '#3CC2FF',
    servicoDeDistribuicao = '#008C39',
}

export enum DescricaoLegendasComposicaoFatura {
    perdas = "As perdas podem ser segmentadas entre Perdas na Rede Básica, externas ao sistema de distribuição da concessionária de origem técnica, e as Perdas na Distribuição que podem ser de natureza técnica ou não técnica (irregularidades e erros de medição).",
    geracaoDeEnergia = "Custos relativos à compra de energia junto ao gerador.",
    tributos = "São pagamentos compulsórios devidos ao poder público, a partir de determinação legal, e que asseguram recursos para que o Governo desenvolva suas atividades. Nas contas de energia estão incluídos tributos federais (PIS/COFINS), estaduais (ICMS) e municipais (CIP). As distribuidoras de energia recolhem e repassam esses tributos às autoridades competentes.",
    encargos = "São custos não gerenciáveis suportados pelas concessionárias de distribuição, instituídos por Lei, cujo repasse aos consumidores é decorrente da garantia do equilíbrio econômico-financeiro contratual, para viabilizar a implantação de políticas públicas no setor elétrico brasileiro, a exemplo da CDE, PROINFA, TFSEE, etc.",
    transmissao = "Os custos com transmissão de energia elétrica são aqueles relacionados ao transporte da energia desde as unidades geradoras até os sistemas de distribuição.",
    demaisItens = "Itens que são cobrados na conta de energia e que compõem o total da fatura. Nos demais itens dessa fatura incluem-se, quando aplicáveis, outros tributos, produtos e serviços, abatimentos e devoluções.",
    servicoDeDistribuicao = "Os custos com distribuição de energia elétrica são aqueles referentes aos serviços prestados pela distribuidora para entrega da energia a unidade consumidora.",
}
