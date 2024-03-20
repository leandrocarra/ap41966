export class OcrResponse {
    constructor(
        public fields: Array<OcrScore> = []
    ) { }
}

export class OcrScore {
    constructor(
        public name: string = '',
        public value: string = '',
        public score: number = 0
    ) { }
}
