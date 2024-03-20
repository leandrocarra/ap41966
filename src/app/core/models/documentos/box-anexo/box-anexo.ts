export class BoxAnexo {
    label: string;
    ocr: boolean;
    docName: string;

    constructor(label: string, ocr: boolean, docName: string) {
        this.label = label;
        this.ocr = ocr;
        this.docName = docName;
    }
}
