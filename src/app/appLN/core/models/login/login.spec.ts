import { LoginRequestDTO } from "./login";

describe(LoginRequestDTO.name, () => {
    it ('should create an instance', () => {
        expect(new LoginRequestDTO()).toBeTruthy();
    });
});