export class ConversorData {}

export function retornaDataConvertida(date: string): Date {
    let arrDataExclusao = date.split('/');
    let stringFormatada = `${arrDataExclusao[1]}-${arrDataExclusao[0]}-${arrDataExclusao[2]}`;
    return new Date(stringFormatada);
}
