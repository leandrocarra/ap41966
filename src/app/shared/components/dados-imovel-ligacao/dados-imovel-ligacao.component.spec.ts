import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClienteDocumentoInfosResponseDTO, ClienteInfosResponseDTO, UcInfosResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/uc-infos-response-dto';
import { TokenService } from 'app/core/services/token/token.service';

import { DadosImovelLigacaoComponent } from './dados-imovel-ligacao.component';

describe(DadosImovelLigacaoComponent.name, () => {
  let component: DadosImovelLigacaoComponent;
  let fixture: ComponentFixture<DadosImovelLigacaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosImovelLigacaoComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers:[
        TokenService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosImovelLigacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`#${DadosImovelLigacaoComponent.name}
  deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
    expect(component).toBeTruthy();
  });

//   it(`#${DadosImovelLigacaoComponent.name}
//   deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
//     let cliente :  ClienteInfosResponseDTO
//     let ucInfosResponseDTO: UcInfosResponseDTO = new UcInfosResponseDTO("","0064657465", cliente, "", "", [], "",null, null, "", null, null, null, null);
//    component['_selecaoImovelService'].setInformacoesUCSelecionada = ucInfosResponseDTO
   
   
//     expect(component).toBeTruthy();
//   });




  
//   it(`#${DadosImovelLigacaoComponent.prototype..name}
//   deve apresentar alerta, quando houver fio partido`, () => {
//      let routerSpy = spyOn(router, 'navigate')
//      component['_selecaoImovel'] ===  EnumOQueSabeSobreProblema.FioPartido
//      fixture.detectChanges();
//      component.apresentaAlerta();
//      expect(routerSpy).toBeTruthy();
//  });







});
