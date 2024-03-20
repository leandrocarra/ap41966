import { environment } from "@environments/environment";
import { Constants } from "app/app.constants";
import { Canal } from "app/core/enums/distribuidoras";
import jwt_decode from "jwt-decode";
import { SelecaoImovelService } from "../selecao-de-imovel/selecao-de-imovel.service";
import { TokenService } from "../token/token.service";

export const toDate = (date: number[]) => {
  return date ? new Date(date[0], date[1] - 1, date[2]) : null;
};

export const toLocalDate = (date: Date) => {
  return date
    ? [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    : null;
};

export const toDateTime = (date: number[]) => {
  return date
    ? new Date(
      date[0],
      date[1] - 1,
      date[2],
      date[3],
      date.length >= 5 ? date[4] : 0,
      date.length == 6 ? date[5] : 0
    )
    : null;
};

export const convertDates = (date: Date): string => {
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let year = date.getFullYear();

  return day + "/" + month + "/" + year;
}

export const convertHours = (date: Date): string =>{
  let hours = String(date.getHours()).padStart(2, '0');
  let minutes =String(date.getMinutes()).padStart(2, '0');;
  return hours + ':' + minutes;
}


export const getDate = () => {
  return new Date();
}

export const checkAndConvertExcelDateToJSDate = (date: any): Date | null | undefined => {
  if (!date) {
    return null;
  } else if (date.toString().includes("/")) {
    date = date.split("/");
    if (date && date.length == 3) {
      // to date pattern DD/MM/YYYY
      let newDate = new Date();
      newDate.setFullYear(parseFloat(date[2]));
      newDate.setMonth(parseFloat(date[1]) - 1);
      newDate.setDate(parseFloat(date[0]));
      return newDate;
    }
  } else if (date.toString().includes("-")) {
    // to date pattern YYYY-MM-DD
    date = date.split("-");
    if (date && date.length == 3) {
      let newDate = new Date();
      newDate.setFullYear(parseFloat(date[0]));
      newDate.setMonth(parseFloat(date[1]) - 1);
      newDate.setDate(parseFloat(date[2]));
      return newDate;
    }
  } else if (date instanceof Date) {
    return date;
  } else if (date > 43000 && date.toString().length == 5) {
    // to excel generic/Date types
    var days = Math.floor(date);
    var hours = Math.floor((date % 1) * 24);
    var minutes = Math.floor(((date % 1) * 24 - hours) * 60);
    return new Date(Date.UTC(0, 0, days, hours - 17, minutes));
  } else if (date.toString().length === 8) {
    // to date pattern YYYYMMDD
    let newDate = new Date();
    date = date.toString();
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6);
    newDate.setFullYear(Number(year));
    newDate.setMonth(Number(month - 1));
    newDate.setDate(Number(day));
    return newDate;
  } else {
    return null;
  }
};

export const formatDateArrayToString = (date: number[]): string => {
  if (date && date.length == 7) {
    return `${date[2]}-${date[1]}-${date[0]} ${date[3]}:${date[4]}:${date[5]}`;
  } else if (date && date.length == 3) {
    return `${date[0]}/${date[1]}/${date[2]}`;
  } else {
    return "";
  }
};

export const convertWeekList = (row: any, keysYearWeek: any): any => {
  let weeksResult: any = {};
  for (let key of keysYearWeek) {
    weeksResult[key] = Number(row[key]);
  }
  return weeksResult;
};

export const getKeysYearWeekFromJson = (headerJson: any): any => {
  return headerJson.filter(function (key: any) {
    return key && key.length == 6 && key.startsWith("20");
  });
};

export const convertMonthDaysList = (row: any, keysMonthDays: any): any => {
  let monthDaysResult: any = {};
  for (let key of keysMonthDays) {
    monthDaysResult[key] = Number(row[key]);
  }
  return monthDaysResult;
};

export const getKeysDayMonthFromJson = (headerJson: any): any => {
  return headerJson.filter(function (key: any) {
    let month = key.substr(0, 2);
    let day = key.substr(2, 2);
    return key && key.length == 4 && day <= 31 && month <= 12;
  });
};

export const showDownloadsButtonsToSAP = (
  tokenService: TokenService
): boolean => {
  return userHasRole(tokenService, [Constants.userRole.Administrator]);
};

export const userHasRole = (
  tokenService: TokenService,
  rolesToCheck: string[]
): boolean => {
  const tokenObj: any = jwt_decode(tokenService.accessToken);
  const userRoles: any = tokenObj["authorities"];

  if (userRoles && rolesToCheck) {
    for (let role of rolesToCheck) {
      if (userRoles.includes(role)) {
        return true;
      }
    }
  }
  return false;
};

export const showMenuPerfomAlignment = (
  tokenService: TokenService
): boolean => {
  return userHasRole(tokenService, [Constants.userRole.Administrator]);
};

export const showMenuViewReport = (tokenService: TokenService): boolean => {
  return userHasRole(tokenService, [Constants.userRole.Administrator]);
};

export const showMenuAdministrator = (tokenService: TokenService): boolean => {
  return userHasRole(tokenService, [Constants.userRole.Administrator]);
};

export const showMenuYourReference = (tokenService: TokenService): boolean => {
  return userHasRole(tokenService, [Constants.userRole.Administrator]);
};

export const showMenuParametrization = (
  tokenService: TokenService
): boolean => {
  return userHasRole(tokenService, [Constants.userRole.Administrator]);
};

export const showPipelineOptimization = (
  tokenService: TokenService
): boolean => {
  return userHasRole(tokenService, [Constants.userRole.Administrator]);
};

export const showActionAdministrator = (
  tokenService: TokenService
): boolean => {
  return userHasRole(tokenService, [Constants.userRole.Administrator]);
};

export const utilsIsArray = (obj: any): boolean => {
  return obj instanceof Date ? true : false;
};

export const formatNumber = (number: any): number => {
  var str = number.toString();
  var transformed = "";

  if (str.includes(",") && str.includes(".")) {
    transformed = str.replace(/\./g, "").replace(/\,/g, ".");
  } else if (str.includes(",")) {
    transformed = str.replace(/\,/g, ".");
  } else if (str.includes(".")) {
    var str_splited = str.split(".");
    if (str_splited.length > 2) {
      transformed = str.replace(/\./g, "");
    } else {
      transformed = str;
    }
  }

  return transformed != "" ? Number(transformed) : number;
};

export const formatMonetaryNumber = (number: any): any => {
  var str = number.toString();
  var transformed = "";

  if (str.includes(".")) {
    transformed = str.replace(/\./g, ",");
  } else {
    transformed = str;
  }

  return transformed;
};

export const validateCpf = (cpf: any): any => {
  if (cpf == null || cpf.length != 11) {
    return false;
  }

  if (
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  ) {
    return false;
  }

  let numero: number = 0;
  let caracter: string = "";
  let numeros: string = "0123456789";
  let j: number = 10;
  let somatorio: number = 0;
  let resto: number = 0;
  let digito1: number = 0;
  let digito2: number = 0;
  let cpfAux: string = "";
  cpfAux = cpf.substring(0, 9);

  for (let i: number = 0; i < 9; i++) {
    caracter = cpfAux.charAt(i);
    if (numeros.search(caracter) == -1) {
      return false;
    }
    numero = Number(caracter);
    somatorio = somatorio + numero * j;
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
    somatorio = somatorio + numero * j;
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
  } else {
    return true;
  }
};

export const validateCnpj = (cnpj: any): any => {
  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  ) {
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
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

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
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) {
    return false;
  } else {
    return true;
  }
};

export const removeFirstAndLastCharacter = (texto: string): string => {
  return texto.substring(1, texto.length - 1);
};

export const formatarMoeda = (valor: number) => {
  if (!valor) return "";
  return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
};

export const MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export const formatarStatus = (texto: string): string => {
  let lower = texto.toLowerCase();
  let firstUpper = lower.charAt(0).toUpperCase() + lower.slice(1);
  return firstUpper.substring(0, firstUpper.length - 1) + "a";
};

export const PATHS = {
  acessoFaturaFacil: "acesso-fatura-facil",
  alterarSenha: "alterar-senha",
  autoleitura: "autoleitura",
  avisos: "avisos",
  cadastro: "cadastro",
  caixaPostal: "caixa-postal",
  configUsuario: "user-settings",
  confiraSeusDados: "confira-seus-dados",
  confirmeReligacao: "confirmacao",
  consultarDebitos: "consultar-debitos",
  dadosContato: "dados-contato",
  debitoAutomatico: "debito-automatico",
  editarDados: "editar-dados",
  enderecoAlternativo: "endereco-alternativo",
  entregaDaFatura: "entrega-da-fatura",
  faltaEnergia: "falta-de-energia",
  faturaEmail: "fatura-por-email",
  faturaEmBraile: "fatura-braile",
  faturaFacil: "fatura-facil",
  historicoConsumo: "historico-de-consumo",
  historicoConsumoANE: "grandes-clientes-ne",
  historicoConsumoASE: "grandes-clientes-se",
  home: "home",
  iluminacaoPublica: "iluminacao-publica",
  imovel: "imovel",
  lgpd: "lgpd",
  login: "login",
  memoriaDeMassa: "memoria-de-massa",
  meusImoveis: "meus-imoveis",
  minhaConta: "minha-conta",
  notFound: "404",
  passos: "passos",
  problema: "problema",
  problemaResolvido: "problema-resolvido",
  recuperarSenha: "recuperar-senha",
  religaAvisos: "avisos",
  religacao: "religacao",
  religacaoInformarDados: "informar-dados",
  servicos: "servicos",
  tipoPessoa: "tipo-pessoa",
  validarSenhas: "validar-senhas",
  trocaTitularidade: 'troca-de-titularidade',
  acompanheSeuPedido: 'acompanhe-seu-pedido'
};

//TODO: Verificar possibilidade de deletar a variável - duplicidade no model segunda-via
export const msgSituacao = {
  avencer:
    "Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.",
  vencida:
    "Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.",
  emprocessamento:
    "O pagamento pode demorar até 48h para ser identificado pelo nosso sistema.",
  vinculada:
    "O valor dessa conta não atingiu a quantia de R$70,00. Este valor será acumulado sem encargos na próxima conta",
};

export const formatTooltip = (texto: string, isMoeda: boolean): string => {
  if (isMoeda) {
    return texto.substring(15, texto.length);
  } else {
    return texto.substring(9, texto.length);
  }
};

export const whatsAppUrl = (message: string): string => {
  const countryCode = '55';
  const whatsappNumber = definirNumeroWhatsapp();
  const msg = message;
  const URL = `https://wa.me/${countryCode}${whatsappNumber}?text=${msg}`;
  return URL;
};


const definirNumeroWhatsapp = (): string => {
  switch (environment.canal) {
    case Canal.AGE: return '1921221696';
    case Canal.AGR: return '8432156001';
    case Canal.AGC: return '7133706350';
    case Canal.AGP: return '8132176990';
    default: return '';
  }
}

export const retornaDataFormatada = (dataFormatada: any): Date => {
  let arrayData = dataFormatada.split('/');
  return new Date(`${arrayData[2]}-${arrayData[1]}-${arrayData[0]}`);
}

export const getEnderecoCompleto = (_selecaoImovelService: SelecaoImovelService): string => {
  return `${_selecaoImovelService.getInformacoesUCSelecionada.local?.endereco}, ${_selecaoImovelService.getInformacoesUCSelecionada.local?.numero}, ${_selecaoImovelService.getInformacoesUCSelecionada.local?.bairro}, ${_selecaoImovelService.getInformacoesUCSelecionada.local?.municipio}, ${_selecaoImovelService.getInformacoesUCSelecionada.local?.uf}, ${_selecaoImovelService.getInformacoesUCSelecionada.local?.cep}`;
}

export const getFormattedTelefone = (_selecaoImovelService: SelecaoImovelService): string => {
  return `${_selecaoImovelService.getInformacoesUCSelecionada.cliente?.contato.telefone?.ddd}${_selecaoImovelService.getInformacoesUCSelecionada.cliente?.contato.telefone?.numero}`
}

export const getFormattedCelular = (_selecaoImovelService: SelecaoImovelService): string => {
  return `${_selecaoImovelService.getInformacoesUCSelecionada.cliente?.contato.celular?.ddd}${_selecaoImovelService.getInformacoesUCSelecionada.cliente?.contato.celular?.numero}`
}
