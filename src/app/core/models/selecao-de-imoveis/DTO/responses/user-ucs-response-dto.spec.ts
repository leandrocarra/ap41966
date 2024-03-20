import { LocalResponseDTO, RetornoDTO, UCResponseDTO, UserUcsResponseDTO } from './user-ucs-response-dto';

describe(UserUcsResponseDTO.name, () => {
  it(`Deve criar instância de ${UserUcsResponseDTO.name} quando chamado`, () => {
    expect(new UserUcsResponseDTO([])).toBeTruthy();
  });
});

describe(RetornoDTO.name, () => {
  it(`Deve criar instância de ${RetornoDTO.name} quando chamado`, () => {
    expect(new RetornoDTO('', '', 1, '')).toBeTruthy();
  });
});

describe(UCResponseDTO.name, () => {
  it(`Deve criar instância de ${UCResponseDTO.name} quando chamado`, () => {
    expect(new UCResponseDTO(
      false,
      "B",
      false,
      new LocalResponseDTO(
        "PC JOSE INACIO 15",
        "CENTRO-JUAZEIRO",
        "JUAZEIRO",
        "48924-999",
        "BA"
      ),
      "LIGADA",
      "000000469084",
      "0002885382",
      "CELIA RIBEIRO BRANDAO",
      "grupo 1",
      // false
    )).toBeTruthy();
  });
});

describe(LocalResponseDTO.name, () => {
  it(`Deve criar instância de ${LocalResponseDTO.name} quando chamado`, () => {
    expect(new LocalResponseDTO(
      "PC JOSE INACIO 15",
      "CENTRO-JUAZEIRO",
      "JUAZEIRO",
      "48924-999",
      "BA"
    )).toBeTruthy();
  });
});
