import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RemovedLabels } from '../endereco/endereco.component';
import { ConfirmarEnderecoComponent, UcDialogComponent } from './confirmar-endereco.component';


describe(ConfirmarEnderecoComponent.name, () => {
  let component: ConfirmarEnderecoComponent;
  let componentDialog: UcDialogComponent;
  let fixture: ComponentFixture<ConfirmarEnderecoComponent>;
  let fixtureDialog: ComponentFixture<UcDialogComponent>;
  let router: Router;
  let location: Location;

  let listarUcMockado = require('src/app/appLN/shared/mock/responses/response-api-listar-ucs.json');
  let listarDebitosMockado = require('src/app/appLN/shared/mock/responses/response-api-listar-debitos-uc.json');
  let enderecoMockado = require('src/app/appLN/shared/mock/responses/response-api-endereco-residencial.json')
  let sessionUserMockado = require('src/app/appLN/shared/mock/responses/response-session-user-cpf.json');


  let ucMockada = {
    "uc": "17449251",
    "numeroCliente": "925583",
    "documento": "06763573855",
    "complemento": "",
    "fase": "MO",
    "situacao": "LG"
  }

  let paginatorMockado = {
    "previousPageIndex": 0,
    "pageIndex": 1,
    "pageSize": 5,
    "length": 7
  }

  let dataDialogMockado = {
    "UcOptions": [
      {
        "uc": "17449251",
        "numeroCliente": "925583",
        "documento": "06763573855",
        "complemento": "casa d2",
        "fase": "MO",
        "situacao": "LG"
      },
      {
        "uc": "44191448",
        "numeroCliente": "59571486",
        "documento": "",
        "complemento": "",
        "fase": "TR",
        "situacao": "PT"
      },
      {
        "uc": "44191464",
        "numeroCliente": "59571508",
        "documento": "98083941913",
        "complemento": "",
        "fase": "TR",
        "situacao": "PT"
      },
      {
        "uc": "44191430",
        "numeroCliente": "59961225",
        "documento": "",
        "complemento": "",
        "fase": "TR",
        "situacao": "PT"
      },
      {
        "uc": "44191383",
        "numeroCliente": "59571451",
        "documento": "",
        "complemento": "",
        "fase": "TR",
        "situacao": "PT"
      },
      {
        "uc": "44191391",
        "numeroCliente": "59571451",
        "documento": "",
        "complemento": "",
        "fase": "TR",
        "situacao": "PT"
      },
      {
        "uc": "44100728",
        "numeroCliente": "59363212",
        "documento": "",
        "complemento": "",
        "fase": "TR",
        "situacao": "PT"
      }
    ],
    "mobile": false,
    "dadosImovel": {
      "anexos": {
        "Comprovante de Endereço": [],
        "Licença Ambiental": [],
        "Autorizacao da Prefeitura": {
          "arquivos": [],
          "tentativas": 0,
          "maxTentativas": 0,
          "maxAnexos": 1
        }
      },
      "anexosDebitos": {
        "Comprovante de Endereço": [],
        "Comprovante de Pagamento": []
      },
      "apartamento": false,
      "areaAmbiental": "NÃO",
      "bairro": "JD DAS FLORES",
      "cep": "13505511",
      "cepEncontrado": true,
      "cepUnico": false,
      "cidade": "RIO CLARO",
      "codigoBairro": "00310071",
      "codigoLocalidade": "0031",
      "codigoLogradouro": "063665",
      "complemento": "",
      "endereco": "M 55",
      "estado": "SP",
      "latitude": "",
      "longitude": "",
      "numero": "2352",
      "pontoReferencia": "",
      "ruaProjetada": false,
      "ruaSemCep": false,
      "codigoLocalização": "",
      "tipoLogradouro": "AV",
      "trecho": "0001",
      "uc": "",
      "zonaRural": false,
      "licencaAmbientalValidado": false,
      "comprovanteEnderecoValidado": false,
      "tipoLocalizacao": "UB"
    }
  }

  // mock dialog
  const dialogMock = {
    close: jasmine.createSpy('close'),
    afterClosed: jasmine.createSpy('afterClosed'),
    open: jasmine.createSpy('open')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmarEnderecoComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MatDialogModule,
        MatIconModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatPaginatorIntl, useValue: new RemovedLabels() },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: dataDialogMockado },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarEnderecoComponent);
    fixtureDialog = TestBed.createComponent(UcDialogComponent);
    component = fixture.componentInstance;
    componentDialog = fixtureDialog.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    component['_userService'].sessionUser = sessionUserMockado;
  });

  // it(`Deve criar o componente #${ConfirmarEnderecoComponent} quando iniciado o ciclo de vida do Angular`, () => {
  //   expect(component).toBeTruthy();
  // });

  it(`deve direcionar para tela de documento de posse`, () => {
    let navigateSpy = spyOn(router, "navigate");
    component.moveTo("documento-posse");
    expect(navigateSpy).toHaveBeenCalledWith(["ligacao-nova", "pedido", "documento-posse"]);
  });

  it(`#${ConfirmarEnderecoComponent.prototype.voltar.name}
  deve voltar, quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`#${ConfirmarEnderecoComponent.prototype.debitoCep.name}
  deve chamar o serviço que retornar uma lista de ucs vazia`, () => {
    fixture.detectChanges();
    component.dadosDoImovel.endereco = enderecoMockado;
    let componentSpy = spyOn(component, 'verificaFluxoDebitos');
    spyOn(component['_dadosDoImovelService'], 'listarUc').and.returnValue(of([]));
    component.debitoCep();
    expect(componentSpy).toHaveBeenCalled();
  });

  it(`#${ConfirmarEnderecoComponent.prototype.debitoCep.name}
  deve chamar o serviço que uma lista de uc não vazia`, () => {
    fixture.detectChanges();
    component.dadosDoImovel.endereco = enderecoMockado;
    let componentSpy = spyOn(component, 'openUcDialog');
    spyOn(component['_dadosDoImovelService'], 'listarUc').and.returnValue(of(listarUcMockado));
    component.debitoCep();
    expect(componentSpy).toHaveBeenCalled();
  });

  it(`#${ConfirmarEnderecoComponent.prototype.hasDebito.name}
  deve chamar o serviço que retornar lista de faturas vazia`, () => {
    fixture.detectChanges();
    component.dadosDoImovel.endereco = enderecoMockado;
    component.dadosDoImovel.endereco.uc = '000000';
    let componentSpy = spyOn(component, 'verificaFluxoDebitos');
    spyOn(component['_dadosDoImovelService'], 'listDebitoUc').and.returnValue(of([]));
    component.hasDebito();
    expect(componentSpy).toHaveBeenCalled();
  });

  // it(`#${ConfirmarEnderecoComponent.prototype.hasDebito.name}
  // deve chamar o serviço que retornar lista de faturas não vazia`, () => {
  //   component.dadosDoImovel.endereco = enderecoMockado;
  //   component.dadosDoImovel.endereco.uc = '000000';
  //   let routerSpy = spyOn(router, 'navigate');
  //   spyOn(component['_dadosDoImovelService'], 'listDebitoUc').and.returnValue(of(listarDebitosMockado));
  //   fixture.detectChanges();
  //   component.hasDebito();
  //   expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "pedido", "debitos"]);
  // });

  // it(`#${ConfirmarEnderecoComponent.prototype.openUcDialog.name}
  // deve abrir o dialog com a lista de ucs`, () => {
  //   component['_dadosDoImovelService'].setEndereco = enderecoMockado;
  //   let componentSpy = spyOn(component, 'verificarSelecao');
  //   // spyOn(dialogMock, 'afterClosed').and.returnValue(of('naoEncontrado'));
  //   component.openUcDialog(dataDialogMockado);
  //   fixture.detectChanges();
  //   expect(componentSpy).toHaveBeenCalled();
  // })

  // it(`#${ConfirmarEnderecoComponent.prototype.hasDebito.name}
  // deve simular uma chamada errada no serviço de débito`, () => {
  //   fixture.detectChanges();
  //   component.dadosDoImovel.endereco = enderecoMockado;
  //   component.dadosDoImovel.endereco.uc = '';
  //   let componentSpy = spyOn(component, 'verificaFluxoPosse');
  //   spyOn(component['_dadosDoImovelService'], 'listDebitoUc').and.returnValue(of(errorMock));
  //   component.hasDebito();
  //   expect(componentSpy).toHaveBeenCalled();
  // });


///////////////////////

  // it(`#${ConfirmarEnderecoComponent.prototype.verificarSelecao.name}
  // deve chamar o metodo #${ConfirmarEnderecoComponent.prototype.verificaFluxoDebitos.name} quando não é encontrado uma UC`, () => {
  //   component.dadosDoImovel.endereco = enderecoMockado;
  //   let componentSpy = spyOn(component, 'verificaFluxoDebitos');
  //   component.verificarSelecao('naoEncontrado');
  //   fixture.detectChanges();
  //   expect(componentSpy).toHaveBeenCalled();
  // });


  // it(`#${ConfirmarEnderecoComponent.prototype.verificarSelecao.name}
  // deve chamar o metodo #${ConfirmarEnderecoComponent.prototype.verificaFluxoDebitos.name} quando
  // encontrado uma UC`, () => {
  //   fixture.detectChanges();
  //   spyOn(component['_dadosDoImovelService'], 'ligacaoNovaPendente').and.returnValue(of(false));
  //   component.dadosDoImovel.endereco = enderecoMockado;
  //   component.verificarSelecao(listarUcMockado[0]);
  //   fixture.detectChanges();
  //   expect(component['_dadosDoImovelService'].getDadosDoImovel.endereco.uc).toBe(listarUcMockado[0].uc);
  // });

  // it(`#${ConfirmarEnderecoComponent.prototype.verificarSelecao.name}
  // deve chamar o alert para quando imóvel informado possui uma ligação em andamento`, () => {
  //   fixture.detectChanges();
  //   spyOn(component['_dadosDoImovelService'], 'ligacaoNovaPendente').and.returnValue(of(true));
  //   let alertSpy = spyOn(component['_alert'], 'alertAcompanhar');
  //   component.dadosDoImovel.endereco = enderecoMockado;
  //   fixture.detectChanges();
  //   component.verificarSelecao(listarUcMockado[1]);
  //   expect(alertSpy).toHaveBeenCalledWith('Identificamos que já tem um pedido de Ligação Nova para o seu imóvel.');
  // });

////////////////////////////////






  // it(`#${ConfirmarEnderecoComponent.prototype.verificarSelecao.name}
  // deve chamar direcionar para site da Agência Virtual quando informar um imóvel que possui uma ligação em andamento`, () => {
  //   fixture.detectChanges();
  //   spyOn(component['_dadosDoImovelService'], 'ligacaoNovaPendente').and.returnValue(of (true));
  //   spyOn(component['_alert'], 'alertAcompanhar').and.returnValue(Promise.resolve<SweetAlertResult>({
  //     "value": true
  //   }));
  //   let componentSpy = spyOn(window, 'open')
  //   component.dadosDoImovel.endereco = enderecoMockado;
  //   fixture.detectChanges();
  //   component.verificarSelecao(listarUcMockado[1]);
  //   expect(componentSpy).toHaveBeenCalledWith("https://agencia.neoenergiaelektro.com.br/", "_self");
  // });

  // it(`#${ConfirmarEnderecoComponent.prototype.verificarSelecao.name}
  // deve chamar o metodo #${ConfirmarEnderecoComponent.prototype.verificaFluxoDebitos.name} quando
  // não encontrar uma UC`, () => {
  //   fixture.detectChanges();
  //   spyOn(component['_dadosDoImovelService'], 'ligacaoNovaPendente').and.returnValue(of(true));
  //   component.dadosDoImovel.endereco = enderecoMockado;
  //   component.verificarSelecao(listarUcMockado[0]);
  //   let alertSpyOn = spyOn(component['_alert'], 'alertAcompanhar');
  //   fixture.detectChanges();
  //   expect(alertSpyOn).toHaveBeenCalledWith('Identificamos que já tem um pedido de Ligação Nova para o seu imóvel.');
  // });

  // it('should verifica Fluxo Debitos e redirecionar para debitos', () => {
  //   component['userService'].consultarCliente('34518589831').subscribe((data) => {
  //     component['debitoService'].listarFaturas(data.codigo).subscribe((debitos) => {
  //       let navigateSpy = spyOn(router, 'navigate')
  //       expect(navigateSpy).toHaveBeenCalledWith(["ligacao-nova", "pedido", "debitos"])

  //     });
  //   })
  // });

  it(`Deve criar o componente #${UcDialogComponent.name} quando iniciado o ciclo de vida do Angular`, () => {
    fixtureDialog.detectChanges();
    expect(componentDialog).toBeTruthy();
  });

  // it(`Deve criar o componente #${UcDialogComponent} quando iniciado o ciclo de vida do Angular quando UcOptions vazio`, () => {
  //   fixtureDialog.detectChanges();
  //   dataDialogMockado.UcOptions = [];
  //   fixtureDialog.detectChanges();
  //   expect(componentDialog).toBeTruthy();
  // });

  it(`#${UcDialogComponent.prototype.onPageChanged.name}
  deve setar a numeração das páginas`, () => {
    fixtureDialog.detectChanges();
    componentDialog.onPageChanged(paginatorMockado);
    expect(componentDialog.activePageUc.length).toEqual(2)
  })

  it(`#${UcDialogComponent.prototype.escolhaUc.name}
  deve chamar fechar o dialog após escolher uma uc`, () => {
    // let dialogSpy = spyOn(componentDialog.dialogRef, 'close');
    fixtureDialog.detectChanges();
    componentDialog.escolhaUc(ucMockada);
    expect(dialogMock.close).toHaveBeenCalledWith(ucMockada);
  });

  it(`#${UcDialogComponent.prototype.setNaoEncontrei.name}
  deve chamar fechar o dialog após não encontrar nenhuma uc`, () => {
    // let dialogSpy = spyOn(componentDialog.dialogRef, 'close');
    componentDialog.setNaoEncontrei();
    expect(dialogMock.close).toHaveBeenCalledWith('naoEncontrado');
  });

  it(`#${UcDialogComponent.prototype.searchUc.name}
  deve chamar o método #${UcDialogComponent.prototype.ngOnInit.name} quando o campo de busca for vazio`, () => {
    componentDialog.ucFilter = '';
    let dialogSpyn = spyOn(componentDialog, 'ngOnInit');
    fixtureDialog.detectChanges();
    componentDialog.searchUc();
    expect(dialogSpyn).toHaveBeenCalled();
  });

  it(`#${UcDialogComponent.prototype.searchUc.name}
  deve retornar true quando encontrar uma UC com o mesmo complemento informado pelo usuário`, () => {
    componentDialog.ucFilter = 'casa d2';
    fixtureDialog.detectChanges();
    expect(componentDialog.searchUc()).not.toBeNull();
  })

  it(`#${UcDialogComponent.prototype.close.name}
  deve chamar o método close do dialogRef`, () => {
    // let dialogSpy = spyOn(componentDialog.dialogRef, 'close');
    fixtureDialog.detectChanges();
    componentDialog.close();
    expect(dialogMock.close).toHaveBeenCalled();
  })


});
