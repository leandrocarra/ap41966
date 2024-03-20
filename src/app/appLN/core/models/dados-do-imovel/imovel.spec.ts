import { Imovel } from "./imovel";

describe(Imovel.name, () => {

    let imovelMocakado: Imovel = {
        "tipoLogradouro": "ACS",
        "codigoLogradouro": "063364",
        "nomeLogradouro": "DO TREVO SP 127 E 310",
        "codigoBairro": "00310010",
        "nomeBairro": "JD BOM SUCESSO",
        "codigoLocalidade": "0031",
        "nomeLocalidade": "RIO CLARO",
        "codigoMunicipio": "00354390",
        "nomeMunicipio": "RIO CLARO",
        "uf": "SP",
        "cep": "13500000",
        "tipoLocalizacao": "RR",
        "trecho": "0003"
    }

    it('should create an instance', () => {
        expect(new Imovel()).toBeTruthy();
    });

    it(`Deve crair model preenchido quando chamado`, () => {
        expect(new Imovel(
            imovelMocakado.cep,
            imovelMocakado.codigoBairro,
            imovelMocakado.codigoLocalidade,
            imovelMocakado.codigoLogradouro,
            imovelMocakado.codigoMunicipio,
            imovelMocakado.nomeBairro,
            imovelMocakado.nomeLocalidade,
            imovelMocakado.nomeLogradouro,
            imovelMocakado.nomeMunicipio,
            imovelMocakado.tipoLocalizacao,
            imovelMocakado.tipoLogradouro,
            imovelMocakado.trecho,
            imovelMocakado.uf
        )).toBeTruthy();
    })
});