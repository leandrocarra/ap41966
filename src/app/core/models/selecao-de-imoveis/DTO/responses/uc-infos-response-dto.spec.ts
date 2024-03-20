import {
  CaracteristicasInfosResponseDTO,
  CelularResponseDTO,
  ClassePrincipalUCInfosResponseDTO,
  ClassificacaoConsumoUCInfosResponseDTO, ClienteDocumentoInfosResponseDTO, ClienteInfosResponseDTO, ContatoResponseDTO, DocumentoInfosResponseDTO, FaturamentoUCInfosResponseDTO,
  GrupoFaturamentoUCInfosResponseDTO,
  GrupoOriginalUCInfosResponseDTO,
  GrupoUCInfosResponseDTO,
  ListaMedidoresResponseDTO,
  LocalizacaoUCInfosResponseDTO,
  LocalUCInfosResponseDTO,
  OrgaoExpedidorResponseDTO,
  PrincipalUCInfosResponseDTO,
  RetornoDTO, SegundoDocumentoResponseDTO, ServicoInfosResponseDTO, SituacaoUCInfosResponseDTO,
  SubGrupoUCInfosResponseDTO,
  TelefoneResponseDTO,
  TipoDocumentoInfosResponseDTO,
  TipoTarifaUCInfosResponseDTO,
  UcInfosResponseDTO
} from './uc-infos-response-dto';

// describe(UcInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${UcInfosResponseDTO.name} quando chamado`, () => {
//     expect(new UcInfosResponseDTO('','')).toBeTruthy();
//   });
// });

// describe(ListaMedidoresResponseDTO.name, () => {
//   it(`Deve criar instância de ${ListaMedidoresResponseDTO.name} quando chamado`, () => {
//     expect(new ListaMedidoresResponseDTO()).toBeTruthy();
//   });
// });

// // describe(LocalUCInfosResponseDTO.name, () => {
// //   it(`Deve criar instância de ${LocalUCInfosResponseDTO.name} quando chamado`, () => {
// //     expect(new LocalUCInfosResponseDTO()).toBeTruthy();
// //   });
// // });

// describe(LocalizacaoUCInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${LocalizacaoUCInfosResponseDTO.name} quando chamado`, () => {
//     expect(new LocalizacaoUCInfosResponseDTO()).toBeTruthy();
//   });
// });

// describe(SituacaoUCInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${SituacaoUCInfosResponseDTO.name} quando chamado`, () => {
//     expect(new SituacaoUCInfosResponseDTO()).toBeTruthy();
//   });
// });

// describe(FaturamentoUCInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${FaturamentoUCInfosResponseDTO.name} quando chamado`, () => {
//     expect(new FaturamentoUCInfosResponseDTO()).toBeTruthy();
//   });
// });

// // describe(ClienteInfosResponseDTO.name, () => {
// //   it(`Deve criar instância de ${ClienteInfosResponseDTO.name} quando chamado`, () => {
// //     expect(new ClienteInfosResponseDTO('','','',{},{},{},'')).toBeTruthy();
// //   });
// // });

// describe(DocumentoInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${DocumentoInfosResponseDTO.name} quando chamado`, () => {
//     expect(new DocumentoInfosResponseDTO({},'')).toBeTruthy();
//   });
// });

// describe(TipoDocumentoInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${TipoDocumentoInfosResponseDTO.name} quando chamado`, () => {
//     expect(new TipoDocumentoInfosResponseDTO()).toBeTruthy();
//   });
// });

// describe(ClienteDocumentoInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${ClienteDocumentoInfosResponseDTO.name} quando chamado`, () => {
//     expect(new ClienteDocumentoInfosResponseDTO()).toBeTruthy();
//   });
// });

// describe(SegundoDocumentoResponseDTO.name, () => {
//   it(`Deve criar instância de ${SegundoDocumentoResponseDTO.name} quando chamado`, () => {
//     expect(new SegundoDocumentoResponseDTO('',{},{},'')).toBeTruthy();
//   });
// });

// // describe(OrgaoExpedidorResponseDTO.name, () => {
// //   it(`Deve criar instância de ${OrgaoExpedidorResponseDTO.name} quando chamado`, () => {
// //     expect(new OrgaoExpedidorResponseDTO()).toBeTruthy();
// //   });
// // });

// // describe(ContatoResponseDTO.name, () => {
// //   it(`Deve criar instância de ${ContatoResponseDTO.name} quando chamado`, () => {
// //     expect(new ContatoResponseDTO()).toBeTruthy();
// //   });
// // });

// // describe(CelularResponseDTO.name, () => {
// //   it(`Deve criar instância de ${CelularResponseDTO.name} quando chamado`, () => {
// //     expect(new CelularResponseDTO()).toBeTruthy();
// //   });
// // });

// describe(TelefoneResponseDTO.name, () => {
//   it(`Deve criar instância de ${TelefoneResponseDTO.name} quando chamado`, () => {
//     expect(new TelefoneResponseDTO()).toBeTruthy();
//   });
// });

// // describe(ServicoInfosResponseDTO.name, () => {
// //   it(`Deve criar instância de ${ServicoInfosResponseDTO.name} quando chamado`, () => {
// //     expect(new ServicoInfosResponseDTO(false,false,false,false,false,false,false,false,false,false,false)).toBeTruthy();
// //   });
// // });

// describe(CaracteristicasInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${CaracteristicasInfosResponseDTO.name} quando chamado`, () => {
//     expect(new CaracteristicasInfosResponseDTO(false, false, false, false, false, false)).toBeTruthy();
//   });
// });

// describe(ClassePrincipalUCInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${ClassePrincipalUCInfosResponseDTO.name} quando chamado`, () => {
//     expect(new ClassePrincipalUCInfosResponseDTO()).toBeTruthy();
//   });
// });

// describe(PrincipalUCInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${PrincipalUCInfosResponseDTO.name} quando chamado`, () => {
//     expect(new PrincipalUCInfosResponseDTO()).toBeTruthy();
//   });
// });

// describe(ClassificacaoConsumoUCInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${ClassificacaoConsumoUCInfosResponseDTO.name} quando chamado`, () => {
//     expect(new ClassificacaoConsumoUCInfosResponseDTO()).toBeTruthy();
//   });
// });

// describe(GrupoFaturamentoUCInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${GrupoFaturamentoUCInfosResponseDTO.name} quando chamado`, () => {
//     expect(new GrupoFaturamentoUCInfosResponseDTO()).toBeTruthy();
//   });
// });

// describe(GrupoUCInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${GrupoUCInfosResponseDTO.name} quando chamado`, () => {
//     expect(new GrupoUCInfosResponseDTO()).toBeTruthy();
//   });
// });

// describe(SubGrupoUCInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${SubGrupoUCInfosResponseDTO.name} quando chamado`, () => {
//     expect(new SubGrupoUCInfosResponseDTO()).toBeTruthy();
//   });
// });

// describe(RetornoDTO.name, () => {
//   it(`Deve criar instância de ${RetornoDTO.name} quando chamado`, () => {
//     expect(new RetornoDTO('', '', 1, '', '')).toBeTruthy();
//   });
// });

// describe(GrupoOriginalUCInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${GrupoOriginalUCInfosResponseDTO.name} quando chamado`, () => {
//     expect(new GrupoOriginalUCInfosResponseDTO()).toBeTruthy();
//   });
// });

// describe(TipoTarifaUCInfosResponseDTO.name, () => {
//   it(`Deve criar instância de ${TipoTarifaUCInfosResponseDTO.name} quando chamado`, () => {
//     expect(new TipoTarifaUCInfosResponseDTO()).toBeTruthy();
//   });
// });




