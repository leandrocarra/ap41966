import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { Estado, OrgaoEmissor } from 'app/shared/models/utils/agencia-virtual-utils';

@Injectable({
    providedIn: 'root'
})
export class NeoUtilsService {
    constructor() { }
}

export const ESTADOS: any[] = [
    { key: 'AC', value: 'Acre' },
    { key: 'AL', value: 'Alagoas' },
    { key: 'AP', value: 'Amapá' },
    { key: 'AM', value: 'Amazonas' },
    { key: 'BA', value: 'Bahia' },
    { key: 'CE', value: 'Ceará' },
    { key: 'DF', value: 'Distrito Federal' },
    { key: 'ES', value: 'Espirito Santo' },
    { key: 'GO', value: 'Goiás' },
    { key: 'MA', value: 'Maranhão' },
    { key: 'MS', value: 'Mato Grosso do Sul' },
    { key: 'MT', value: 'Mato Grosso' },
    { key: 'MG', value: 'Minas Gerais' },
    { key: 'PA', value: 'Pará' },
    { key: 'PB', value: 'Paraíba' },
    { key: 'PR', value: 'Paraná' },
    { key: 'PE', value: 'Pernambuco' },
    { key: 'PI', value: 'Piauí' },
    { key: 'RJ', value: 'Rio de Janeiro' },
    { key: 'RN', value: 'Rio Grande do Norte' },
    { key: 'RS', value: 'Rio Grande do Sul' },
    { key: 'RO', value: 'Rondônia' },
    { key: 'RR', value: 'Roraima' },
    { key: 'SC', value: 'Santa Catarina' },
    { key: 'SP', value: 'São Paulo' },
    { key: 'SE', value: 'Sergipe' },
    { key: 'TO', value: 'Tocantins' }
];

export const ESTADOS_BRASILEIROS: Array<Estado> = [
    new Estado('AC', 'Acre'),
    new Estado('AL', 'Alagoas'),
    new Estado('AP', 'Amapá'),
    new Estado('AM', 'Amazonas'),
    new Estado('BA', 'Bahia'),
    new Estado('CE', 'Ceará'),
    new Estado('DF', 'Distrito Federal'),
    new Estado('ES', 'Espirito Santo'),
    new Estado('GO', 'Goiás'),
    new Estado('MA', 'Maranhão'),
    new Estado('MS', 'Mato Grosso do Sul'),
    new Estado('MT', 'Mato Grosso'),
    new Estado('MG', 'Minas Gerais'),
    new Estado('PA', 'Pará'),
    new Estado('PB', 'Paraíba'),
    new Estado('PR', 'Paraná'),
    new Estado('PE', 'Pernambuco'),
    new Estado('PI', 'Piauí'),
    new Estado('RJ', 'Rio deJaneiro'),
    new Estado('RN', 'Rio Grande do Norte'),
    new Estado('RS', 'Rio Grande do Sul'),
    new Estado('RO', 'Rondônia'),
    new Estado('RR', 'Roraima'),
    new Estado('SC', 'Santa Catarina'),
    new Estado('SP', 'São Paulo'),
    new Estado('SE', 'Sergipe'),
    new Estado('TO', 'Tocantins')
];

export const ORGAOS_EMISSORES: Array<OrgaoEmissor> = [
    { sigla: "CART", nomeExtenso: "CARTÓRIO" },
    { sigla: 'DETRAN', nomeExtenso: 'DEPARTAMENTO ESTADUAL DE TRÂNSITO' },
    { sigla: "DPF", nomeExtenso: "DEPARTAMENTO DE POLÍCIA FEDERAL" },
    { sigla: "MAE", nomeExtenso: "MINISTÉRIO DA AERONÁUTICA" },
    { sigla: "MDS", nomeExtenso: "MINISTÉRIO DA DEFESA SOCIAL" },
    { sigla: "MEX", nomeExtenso: "MINISTÉRIO DO EXÉRCITO" },
    { sigla: "MMA", nomeExtenso: "MINISTÉRIO DA MARINHA" },
    { sigla: "PFE", nomeExtenso: "POLÍCIA FEDERAL" },
    { sigla: "PMP", nomeExtenso: "POLÍCIA MILITAR" },
    { sigla: "SDS", nomeExtenso: "SECRETARIA DE DEFESA SOCIAL" },
    { sigla: "SSP", nomeExtenso: "SECRETARIA DE SEGURANÇA PÚBLICA" }
];

export const GENERO: any[] = [
    { key: "MASCULINO" },
    { key: "FEMININO" },
    { key: "NÃO INFORMAR" },
];

export enum Meses {
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
}

/*
 * Mascaras para telefone, celular, cpf e cnpj
 */
export const aplicarMascaraTelefoneCelular = (value: string): string => {
    const telefone = value.replace(/\D/g, '');
    if (telefone.length == 11) {
        return '(00) 0 0000-0000';
    } else {
        return '(00) 0000-00009';
    }
}

export const aplicarMascaraTelefone = (): string => {
    return '(00) 0000-0000';
}

export const aplicarMascaraCelular = (): string => {
    return '(00) 0 0000-0000';
}

export const cpfCnpj = (value: string): string => {
    if (value.length > 11) {
        return "00.000.000/0000-00";
    } else {
        return "000.000.000-009";
    }
}

export const configureMenuByWindowSize = (width: any, tamanhoTelaDiferente?: number): boolean => {
    if (tamanhoTelaDiferente) {
        return (width <= tamanhoTelaDiferente) ? true : false;
    }
    return (width < 768) ? true : false; //Alterado para < 768 para testes de responsividade valor anterior(<=768)
}

/**
 * data formato: aaaa:mm:ddThh:mm:ss
 * saida: dd/mm/aaaa
 */
export const converterData = (data: string): string => {
    let diaCompleto = new Date(data);
    const dia = diaCompleto.getDate().toString().padStart(2, '0')
    const mes = (diaCompleto.getMonth() + 1).toString().padStart(2, '0')
    const ano = diaCompleto.getFullYear()
    return `${dia}/${mes}/${ano}`
}

/**
 * data formato entrada: AAAAMMDD
 * saida: variavel do tipo Date
 */

export const retornaFormatoDate = (data: string): Date => {
    let ano = parseInt(data.substring(0, 4));
    let mes = parseInt(data.substring(5, 6));
    let dia = parseInt(data.substring(7, 8));
    return new Date(ano, mes - 1, dia);
}

/**
 * data formato: aaaa:mm:ddThh:mm:ss
 * saida: hh:mm
 */
export const converterHora = (data: string): string => {
    let dia = new Date(data);
    const hora = dia.getHours().toString().padStart(2, '0');
    const minutos = dia.getMinutes().toString().padStart(2, '0');
    return `${hora}:${minutos}`
}

/**
 * data formato: aaaa:mm:ddThh:mm:ss
 * saida: YYYY-MM-DD
 */
export const converterDataYMD = (data: string): string => {
    let diaCompleto = new Date(data);
    const dia = diaCompleto.getDate().toString().padStart(2, '0')
    const mes = (diaCompleto.getMonth() + 1).toString().padStart(2, '0')
    const ano = diaCompleto.getFullYear()
    return `${ano}-${mes}-${dia}`
}

/**
 * primeira letra maiúscula
 */
export const initialCapitalize = (valor: string): string => {
    return valor.charAt(0).toUpperCase() + valor.slice(1).toLocaleLowerCase();
}

export const converterParaReais = (entrada: string): string => {
    if (entrada === '-' || environment.regiao === Regiao.SE) {
        return entrada
    } else {
        let entradaFloat: number = parseFloat(entrada);
        return entradaFloat?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }
}

/**
 * Remover DD do telefone
 */

export const removeDDI = (numeroDeTelefone: any): string => {
    return numeroDeTelefone?.toString()?.includes("55")
        ? numeroDeTelefone?.toString()?.split("55")[1]
        : numeroDeTelefone?.toString();
};

export const adicionaDDI = (numeroTelefone: any): string => {
    return numeroTelefone.toString().includes("55")
        ? numeroTelefone?.toString()
        : `55${numeroTelefone?.toString()}`;
};

export const formatarSeparadoresNumericos = (valor: string): string => {
    return parseFloat(valor).toLocaleString('pt-br');
};
