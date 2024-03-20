import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BoxAnexo } from '../../models/documentos/box-anexo/box-anexo';
import { UserServiceLN } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})

export class NeoUtilsService {
    constructor(
        private _userServiceLN: UserServiceLN
    ) { }
    DOC_OFICIAL: BoxAnexo = new BoxAnexo('DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)', true, 'Doc Oficial');
    DOC_CNPJ: BoxAnexo = new BoxAnexo('CADASTRO NACIONAL DA PESSOA JURÍDICA (CNPJ)', true, 'CNPJ');
    DOC_CTTSOCIAL: BoxAnexo = new BoxAnexo('CONTRATO SOCIAL OU ESTATUTO SOCIAL OU CCMEI', false, 'CTT Social ou CCMEI');
    DOC_AUTORIZACAO_PREFEITURA: BoxAnexo = new BoxAnexo('AUTORIZAÇÃO DA PREFEITURA', false, 'Autorizacao da Prefeitura');
    EXTENSOES_ACEITAS = ['.pdf', '.jpeg', '.jpg', '.png'];

    DOCUMENTOS_RESIDENCIAL: Array<BoxAnexo> = [
        this.DOC_OFICIAL
    ];

    DOCUMENTOS_COMERCIAL: Array<BoxAnexo> = [
        this.DOC_OFICIAL,
        this.DOC_CNPJ,
        this.DOC_CTTSOCIAL
    ];

    DDD_INVALIDOS: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "20",
        "23", "25", "29", "30", "36", "39", "40", "50", "52", "56", "57", "58",
        "59", "60", "63", "70", "72", "76", "78", "80", "90"]

    ESTADOS: any[] = [
        { key: 'AC', value: 'Acre (AC)' },
        { key: 'AL', value: 'Alagoas (AL)' },
        { key: 'AP', value: 'Amapá (AP)' },
        { key: 'AM', value: 'Amazonas (AM)' },
        { key: 'BA', value: 'Bahia (BA)' },
        { key: 'CE', value: 'Ceará (CE)' },
        { key: 'DF', value: 'Distrito Federal (DF)' },
        { key: 'ES', value: 'Espírito Santo (ES)' },
        { key: 'GO', value: 'Goiás (GO)' },
        { key: 'MA', value: 'Maranhão (MA)' },
        { key: 'MT', value: 'Mato Grosso (MT)' },
        { key: 'MS', value: 'Mato Grosso do Sul (MS)' },
        { key: 'MG', value: 'Minas Gerais (MG)' },
        { key: 'PA', value: 'Pará (PA)' },
        { key: 'PB', value: 'Paraíba (PB)' },
        { key: 'PR', value: 'Paraná (PR)' },
        { key: 'PE', value: 'Pernambuco (PE)' },
        { key: 'PI', value: 'Piauí (PI)' },
        { key: 'RJ', value: 'Rio de Janeiro (RJ)' },
        { key: 'RN', value: 'Rio Grande do Norte (RN)' },
        { key: 'RS', value: 'Rio Grande do Sul (RS)' },
        { key: 'RO', value: 'Rondônia (RO)' },
        { key: 'RR', value: 'Roraima (RR)' },
        { key: 'SC', value: 'Santa Catarina (SC)' },
        { key: 'SP', value: 'São Paulo (SP)' },
        { key: 'SE', value: 'Sergipe (SE)' },
        { key: 'TO', value: 'Tocantins (TO)' }
    ];

    PERFIS: Array<string> = ['RESIDENCIAL', 'BENEFÍCIO RURAL', 'COMERCIAL', 'INDUSTRIAL']

    DOCUMENTOS_POSSE: any[] = [
        { label: 'Matrícula do Imóvel' },
        { label: 'Escritura Pública' },
        { label: 'Contrato de Compra e Venda com número de matrícula' },
        { label: 'Contrato de Compra e Venda sem número de matrícula desde que contenha o descritivo da área ou mapa topográfico' },
        { label: 'Termo de Cessão de Direitos Possessórios' },
        { label: 'Documento de Compromisso de Compra e Venda com número de matrícula' },
        { label: 'Documento de Compromisso de Compra e Venda sem número de matrícula desde que contenha o mapa topográfico' },
        { label: 'Documento de Promessa de Compra e Venda com número de matrícula' },
        { label: 'Documento de Promessa de Compra e Venda sem número de matrícula desde que contenha o mapa topográfico' },
        { label: 'Contrato de Permuta com número de matrícula dos terrenos permutados junto com a cópia das escrituras dos mesmos' },
        { label: 'ITR (Imposto Territorial Rural) no nome do solicitante' },
        { label: 'CAR (Cadastro Ambiental Rural) no nome do solicitante' }
    ];

    getDoc(subPerfil: string): any {
        return this.PERFIS[parseInt(subPerfil)];
    }
}

export const ORGAO_EMISSORES: any[] = [
    { key: "SSP", value: "SECRETARIA DA SEGURANÇA PÚBLICA" },
    { key: "PFE", value: "POLÍCIA FEDERAL" },
    { key: "PMP", value: "POLÍCIA MILITAR" },
    { key: "CART", value: "CARTÓRIO" },
    { key: "DPF", value: "DEPARTAMENTO DE POLÍCIA FEDERAL" },
    { key: "MAE", value: "MINISTÉRIO DA AERONÁUTICA" },
    { key: "MDS", value: "MINISTÉRIO DA DEFESA SOCIAL" },
    { key: "MEX", value: "MINISTÉRIO DO EXÉRCITO" },
    { key: "MMA", value: "MINISTÉRIO DA MARINHA" },
    { key: "SDS", value: "SECRETARIA DE DEFESA SOCIAL" },
];

export const fileToBase64 = (file: any): any => {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result!.toString().replace(/^data:image\/[a-z]+;base64,/, "").replace(/^data:application\/pdf+;base64,/, ""));
        }
    });
}

export const validarCpfOuCnpjControl = (cpfCnpj: AbstractControl): { [key: string]: boolean } | null => {
    if (!cpfCnpj.value) return null;
    let valido = true;
    const value = cpfCnpj.value.toString().replace(/\D/g, '');
    if (value.length > 0 && value.length <= 11) {
        valido = validarCPF(value);
        return valido ? null : { cpf: true };
    } else if (value.length > 11 && value.length <= 14) {
        valido = validarCNPJ(value);
        return valido ? null : { cnpj: true };
    }
    return null;
};

export const validarCPF = (cpf: string): boolean => {
    if (cpf == null) {
        return false;
    }
    if (cpf.length != 11) {
        return false;
    }
    if (
        (cpf == '00000000000') ||
        (cpf == '11111111111') ||
        (cpf == '22222222222') ||
        (cpf == '33333333333') ||
        (cpf == '44444444444') ||
        (cpf == '55555555555') ||
        (cpf == '66666666666') ||
        (cpf == '77777777777') ||
        (cpf == '88888888888') ||
        (cpf == '99999999999')
    ) {
        return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
            return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
        digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
        digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
        return false;
    }
    else {
        return true;
    }
}

export const validarCNPJ = (cnpj: string): boolean => {
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999") {
        return false;
    }
    // Valida DVs
    // Validando primeiro dígito
    let tamanho: number = cnpj.length - 2;
    let numeros: any = cnpj.substring(0, tamanho);
    let digitos: any = cnpj.substring(tamanho);
    let soma: number = 0;
    let pos: number = tamanho - 7;
    for (let i: number = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) {
        return false;
    }
    // Validando segundo dígito
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i: number = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
        return false;
    } else {
        return true;
    }
}

export const convertParaData = (data: string): Date => {
    //remover o separador / da data
    if (data.includes("/")) {
        data = data.replace(/[/]/g, "")
    }
    let dia = parseInt(data.substring(0, 2));
    let mes = parseInt(data.substring(2, 4));
    let ano = parseInt(data.substring(4, 8));
    return new Date(ano, mes - 1, dia);
}

export const configureMenuByWindowSize = (width: any, tamanhoTelaDiferente?: number): boolean => {
    if (tamanhoTelaDiferente) {
        return (width <= tamanhoTelaDiferente) ? true : false;
    }
    return (width <= 768) ? true : false;
}

export const validarPrazo = (data: any): boolean => {
    const hoje = new Date();

    const day = data?.replaceAll('/', '').substr(0, 2);
    const month = data?.replaceAll('/', '').substring(2, 4);
    const year = data?.replaceAll('/', '').substr(4, 8);

    const dtCompare = new Date(month + '/' + day + '/' + year);
    return dtCompare > hoje ? false : true;
}


export const removerCaracteresEspeciais = (valorParaRemoverCaracteres: string): string => {
    if (valorParaRemoverCaracteres) {
        return valorParaRemoverCaracteres.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
    } else {
        return '';
    }
}
