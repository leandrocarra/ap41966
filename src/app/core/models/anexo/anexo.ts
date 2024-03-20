export class Anexo {
    constructor (
        public fileExtension: FileExtension, 
        public fileName: string, 
        public fileSize: number, 
        public fileData: string) {
        return {
            'fileExtension': fileExtension,
            'fileName': fileName,
            'fileSize': fileSize,
            'fileData': fileData
        }
    }
}

export type FileExtension = '.jpg' | '.jpeg' | '.png' | '.pdf' | 'invalido';