import { Anexo } from "../anexo/anexo";
import { BoxAnexo } from "../documentos/box-anexo/box-anexo";
import { PerfisDeAcesso } from "./multilogin-acesso";

export enum SubRotasMultiloginCadastro {
    Imobiliaria = "imobiliario",
    Credenciado = "estabelecimento-credenciado",
    Compartilhamento = "compartilhar-acesso",
    Avisos = "avisos",
    ImobiliariaANL = "cadastro-imobiliario",
    CredenciadoANL = "cadastro-credenciado",
    CadastroDeParceiros = "cadastro-de-parceiros"
}

export class MultiloginCompartilharAcesso {
    constructor(
        public tipoAtribuicao: string,
        public nomeFiscalSecundario: string,
        public documentoFiscalSecundario: string,
        public dataVigenciaContrato: string,
        public boxAnexo?: BoxAnexo,
        public comprovantes?: Array<Anexo>,
        public tipoEmailBO?: string,
        public customerKey?: string,
    ) {
        this.boxAnexo = new BoxAnexo('DOCUMENTO DE COMPROVAÇÃO', false, 'DOCUMENTO DE COMPROVAÇÃO');
        this.comprovantes= [];
    }
}

export class InformacoesUsuario {
    constructor(
        public cpf: string,
        public nome: string,
        public inicio: string,
        public fim: string,
        public button: string,
        public isValid: boolean,
    ) {}
}

export const ValidaRelacao: any[] = [
    { key: 'C', value: PerfisDeAcesso.conjuge },
    { key: 'R', value: PerfisDeAcesso.representanteLegal }
]

export const AcessoComumCompartilhaCom: any[] = [
    { key: 'ACESSO COMUM COM REPRESENTANTE LEGAL', value: PerfisDeAcesso.representanteLegal },
    { key: 'ACESSO COMUM COM PADRONISTA', value: PerfisDeAcesso.padronista },
    { key: 'ACESSO COMUM COM PROJETISTA',  value: PerfisDeAcesso.projetista },
    { key: 'ACESSO COMUM COM CONJUGE',  value: PerfisDeAcesso.conjuge },
    { key: 'ACESSO COMUM COM ACESSO COMPARTILHADO', value: PerfisDeAcesso.perfilDeAcesso },
    { key: 'ACESSO COMUM COM IMOBILIARIA', value: PerfisDeAcesso.imobiliaria },
    { key: 'ACESSO COMUM COM ACESSO COMPARTILHADO', value: PerfisDeAcesso.acessoCompartilhado },
];

export const RepresetanteLegalCompartilhaCom: any[] = [
    { key: 'REPRESENTANTE LEGAL COM PADRONISTA',  value: PerfisDeAcesso.padronista },
    { key: 'REPRESENTANTE LEGAL COM PROJETISTA',  value: PerfisDeAcesso.projetista },
    { key: 'REPRESENTANTE LEGAL COM ACESSO COMPARTILHADO', value: PerfisDeAcesso.perfilDeAcesso },
    { key: 'REPRESENTANTE LEGAL COM IMOBILIARIA', value: PerfisDeAcesso.imobiliaria },
    { key: 'REPRESENTANTE LEGAL COM ACESSO COMPARTILHADO', value: PerfisDeAcesso.acessoCompartilhado },
];

export const ConjugeCompartilhaCom: any[] = [
    { key: 'CONJUGE COM IMOBILIARIA', value: PerfisDeAcesso.imobiliaria },
];

export const ImobiliariaCompartilhaCom: any[] = [
    { key: 'IMOBILIARIA COM CORRETOR', value: PerfisDeAcesso.corretor },
];

export const CredenciadoCompartilhaCom: any[] = [
    { key: 'CREDENCIADO COM ATENDENTE CREDENCIADO', value: PerfisDeAcesso.atendenteCredenciado },
];


export enum emailsBO {
    imobiliaria = 'acesso-imob@neoenergia',
    represetanteLegal = 'representanteLegal@neoenergia',
    representanteLegalCNPJ = 'representanteLegal_Corp@neoenergia'
}

export enum servicosMKTAutomation {
    segundaViaFatura = '2A VIA - FATURA',
    solicitacaoServico = 'SOLICITACAO SERVICO',
    kitBoasVindas = 'KIT BOAS-VINDAS',
    informativoBO = 'INFORMATIVO BACKOFFICE',
    trocaAntigoTitular = 'TROCA ANTIGO TITULAR',
    avisoInclusao = 'AVISO INCLUSAO',
    validacao = 'VALIDACAO',
    expiracao = 'EXPIRACAO',
    esqueciSenha = 'ESQUECI SENHA',
    codigoVerificador = 'CODIGO VERIFICADOR',
    ativacao = 'ATIVACAO'
}
