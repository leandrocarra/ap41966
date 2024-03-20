import { Retorno } from "app/shared/models/retorno/retorno";

export class UserResponseDTO {
    public documento: string;

    constructor(
        documento?: string,
        public nome: string = "", // EXCLUSIVO CPF
        public dataNascimento?: Date, // EXCLUSIVO CPF
        public distribuidora?: string,
        public email?: string, // EXCLUSIVO CPF
        public family_name?: string,
        public protocolo?: string,
        public regiao?: string,
        public sub?: string,
        public telefone?: string,
        public usuarioAcesso: string = "",
        public atividadeFiscal: string = "", // EXCLUSIVO CNPJ
        public celularSolicitante: string = "", // EXCLUSIVO CNPJ
        public dataNascimentoSolicitante : string = "", // EXCLUSIVO CNPJ
        public docSecundarioSolicitante: string = "", // EXCLUSIVO CNPJ
        public documentoSolicitante: string = "", // EXCLUSIVO CNPJ
        public emailSolicitante: string = "", // EXCLUSIVO CNPJ
        public inscricaoEstadual: string = "", // EXCLUSIVO CNPJ
        public inscricaoMunicipal: string = "", // EXCLUSIVO CNPJ
        public nomeFantasia: string = "", // EXCLUSIVO CNPJ
        public nomeSolicitante: string = "", // EXCLUSIVO CNPJ
        public razaoSocial: string = "", // EXCLUSIVO CNPJ
        public tipoDocSecundarioSolicitante: string = "" // EXCLUSIVO CNPJ
    ) {
        this.documento = documento ?? "";
        this.dataNascimento = dataNascimento;
        this.distribuidora = distribuidora;
        this.email = email;
        this.family_name = family_name;
        this.protocolo = protocolo;
        this.regiao = regiao;
        this.sub = sub;
        this.telefone = telefone;
    }
}
