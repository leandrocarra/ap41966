export enum SubRotasCadastro {
    identificacao = "identifique-se",
    dadosPessoaisPessoaFisica = "dados-pessoais-pessoa-fisica",
    identificacaoDadosCadastro = "identificacao-dados-cadastro",
    dadosPessoaisPessoaFisicaEmail = "dados-pessoais-pessoa-fisica-email",
    dadosPessoaJuridicaUC = "dados-pessoa-juridica-uc",
    dadosPessoaJuridicaEmpresa = "dados-pessoa-juridica-empresa",
    dadosPessoaJuridicaRepresentante = "dados-pessoa-juridica-representante",
    dadosPessoaJuridicaRepresentanteContato = "dados-pessoa-juridica-representante-contato",
    dadosPessoaJuridicaRepresentanteEmail = "dados-pessoa-juridica-representante-email",
    senha = "defina-sua-senha",
    validarCodigoDeAtivacao = "validar-codigo-de-ativacao",
    aviso = "aviso",
    avisoComStepper = "cadastro-finalizado",
    pathAviso = "/login/cadastro/"
}

export function isPessoaFisica(documento: string): boolean {
    return (documento.length === 14) ? false : true;
}

// TODO (Guerra) - A funções abaixo foram criadas de acordo com a regra de tipagem de dataNasc de cada distribuidora;
// Elektro
export function converterStringParaRequestValida(input: string): string {
    let output: Array<string> = [];
    output.push(input.slice(0,2));
    output.push(input.slice(2,4));
    output.push(input.slice(4));
    return output.join('/');
}

// demaisDistribuidoras
export function converterStringParaDate(input: string): Date {
    let output: Array<string> = [];
    output.push(input.slice(2,4));
    output.push(input.slice(0,2));
    output.push(input.slice(4));
    return new Date(output.join('-'));
}
