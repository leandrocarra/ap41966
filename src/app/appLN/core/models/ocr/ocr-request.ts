export class OcrRequest {
    constructor(
        public image?: string,
        public return_deskew_img?: boolean
    ) {
        this.image = image;
        this.return_deskew_img = return_deskew_img;
    }
}