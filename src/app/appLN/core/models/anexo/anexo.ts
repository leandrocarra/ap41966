export class Anexos {
    constructor(
        public art: Array<Anexo> = [],
        public comprovanteEndereco: Array<Anexo> = [],
        public licencaAmbiental: Array<Anexo> = [],
        public comprovanteDePosse:Array<Anexo> = [],
        public comprovanteDePagamento: Array<Anexo> = [],
        public comprovanteEnderecoDebitos: Array <Anexo> = []
    ) { }
}

// export class Anexo { // TODO: Verificar se a implementação feita dessa forma é estritamente necessária para o fluxo funcionar corretamente, ou se podemos fazer da maneira Shorthand declarada abaixo.
//     public fileData?: string;
//     public fileExtension?: string;
//     public fileSize?: number;
//     public fileName?: string;

//     constructor (fileExtension: string, fileName: string, fileSize: number, fileData: string) {
//         return {
//             'fileExtension': fileExtension,
//             'fileName': fileName,
//             'fileSize': fileSize,
//             'fileData': fileData
//         }
//     }
// }

export class Anexo {
    constructor (
        public fileData: string = '',
        public fileExtension: string = '',
        public fileSize: number = 0,
        public fileName: string = ''
    ) { }
}
