export class DebitoJustificativa {
    constructor(
        public justificativa?: string,
        public documentoComprovante?: any
    ) {
        this.justificativa = justificativa ? justificativa : '';
        this.documentoComprovante = documentoComprovante ? documentoComprovante : null;
    }
}