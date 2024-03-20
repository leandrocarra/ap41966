import { FileOcr } from "./file-ocr";

describe(FileOcr.name, () => {
    it ('should create an instance', () => {
        expect(new FileOcr()).toBeTruthy();
    });
});