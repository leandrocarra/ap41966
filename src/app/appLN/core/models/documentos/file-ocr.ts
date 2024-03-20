export class FileOcr {
    constructor(
        public imageToOcr?: any,
        public imageToAttach?: any,
        public file?: any
    ) {
        this.imageToOcr = imageToOcr;
        this.imageToAttach  = imageToAttach;
        this.file = file;
    }
}