import { UsuarioDAO } from "./usuarioDAO";

describe (UsuarioDAO.name, () => {
    it ('should create an instance', () => {
        expect(new UsuarioDAO()).toBeTruthy();
    });
});