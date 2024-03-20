
/**
 * [GET]/UCS/{FATURA}/ENTENDA-CONTA
 * Retorna informações dos valores de consumo e cobrança que compõe a fatura selecionada, bandeira tarifária, consumo e leitura.
 */
export class EntendaSuaContaDTORequest{
    constructor(
        public canalSolicitante: string,
        public usuario: string,
        public fatura: string,
        public gerarSSOS?: string, // Sonda Obrigatório, SAP N/A
        public protocoloSonda?: string, // Sonda obrigatório
    ) { }
}


//[GET]/UCS/{FATURA}/ENTENDA-CONTA-QUALIDADE
export class EntendaSuaContaQualidadeDTORequest{
    constructor(
        public canalSolicitante: string,
        public usuario: string,
        public fatura: string,
        public gerarSSOS?: string, // Sonda Obrigatório, SAP N/A
        public codigo?: string, // Sonda N/A, SAP obrigatório
    ) { }
}



