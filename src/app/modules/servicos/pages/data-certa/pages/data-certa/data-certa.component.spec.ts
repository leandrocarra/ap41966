// import { Location } from '@angular/common';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatOptionModule } from '@angular/material/core';
// import { MatSelectModule } from '@angular/material/select';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Servicos } from 'app/core/enums/servicos';
// import { UcInfosResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/uc-infos-response-dto';
// import { DataCertaService } from 'app/core/services/data-certa/data-certa.service';
// import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
// import { TokenService } from 'app/core/services/token/token.service';
// import { DadosImovelLigacaoModule } from 'app/shared/components/dados-imovel-ligacao/dados-imovel-ligacao.module';
// import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
// import { DataCertaComponent } from './data-certa.component';

// describe(DataCertaComponent.name, () => {
//   let component: DataCertaComponent;
//   let fixture: ComponentFixture<DataCertaComponent>;
//   let router: Router;
//   let location: Location;
//   let dataCertaService: DataCertaService;

//   let tokenServiceMockado: jasmine.SpyObj<TokenService>;

//   let selecaoImovelService: SelecaoImovelService;
//   let ucSelecionadoMockado: UcInfosResponseDTO = <UcInfosResponseDTO>require('app/shared/mock/responses/response-api-ucs.json');

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [DataCertaComponent],
//       imports: [
//         RouterTestingModule,
//         HttpClientTestingModule,
//         DadosImovelLigacaoModule,
//         NeoButtonModule,
//         MatSelectModule,
//         MatOptionModule,
//         MatCheckboxModule,
//         FormsModule
//       ],
//       providers: [
//         TokenService
//       ]
//     })
//       .compileComponents();

//     fixture = TestBed.createComponent(DataCertaComponent);
//     component = fixture.componentInstance;

//     router = TestBed.inject(Router);
//     location = TestBed.inject(Location);

//     tokenServiceMockado = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
//     selecaoImovelService.setInformacoesUCSelecionada = ucSelecionadoMockado;
//   });

//   it(`Deve-se iniciar o ciclo de vida do angular`, () => {
//     fixture.detectChanges();
//     expect(component).toBeTruthy();
//   });

//   it(`#${DataCertaComponent.prototype.voltar.name}
//   deve navegar de volta para a página anterior.`, () => {
//     fixture.detectChanges();
//     let locationSpy = spyOn(component['_location'], 'back');
//     component.voltar();
//     expect(locationSpy).toHaveBeenCalled();
//   });

  



//   it(`#${DataCertaComponent.prototype.alterarData.name}
//   deve redirecionar exibir alerta confirmacao de categoria`, () => {
//     let routerSpy = spyOn(component['_router'], 'navigate');
//     dataCertaService.setFluxoDoClienteDataCerta = Servicos.trocaDeTitularidade;
//     fixture.detectChanges();
//     component.alterarData();
//     expect(routerSpy).toHaveBeenCalled(); // With([PathCompleto.alterarDataDeVencimento, SubRotasDataCerta.alterar]);
//   });

// });
