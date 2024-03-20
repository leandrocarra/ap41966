// import { Location } from '@angular/common';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { QueryList } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialogModule } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Servicos } from 'app/core/enums/servicos';
// import { DataCertaService } from 'app/core/services/data-certa/data-certa.service';
// import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
// import { TokenService } from 'app/core/services/token/token.service';
// import { AlterarDataCertaComponent } from './alterar-data-certa.component';

// describe(AlterarDataCertaComponent.name, () => {
//   let component: AlterarDataCertaComponent;
//   let fixture: ComponentFixture<AlterarDataCertaComponent>;
//   let router: Router;
//   let location: Location;
//   let dataCertaService: DataCertaService;
//   let selecaoImovelService: SelecaoImovelService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ AlterarDataCertaComponent ],

//       imports: [
//         MatDialogModule,
//         HttpClientTestingModule,
//         RouterTestingModule.withRoutes([])],

//         providers:[
//           TokenService,
//         ]
//     })
//       .compileComponents();
//     fixture = TestBed.createComponent(AlterarDataCertaComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
  
//   it(`Deve iniciar o ciclo de vida do Angular.`, () => {
//     expect(component).toBeTruthy();
//   });
  
//   it(`#${AlterarDataCertaComponent.prototype.closeMenu.name}
//   deve ser chamado ao disparar evento de scroll e fechar os elementos da checkbox.`, () => {
//     component.matSelectList = new QueryList();
//     component.closeMenu();
//     expect(component.matSelectList.length).toBe(1);
//   });

//   it(`#${AlterarDataCertaComponent.prototype.onResize.name}
//   deve ser retornar verdadeiro chamado quando emitir resize da tela
//   for menor que 768`, () => {
//     fixture.detectChanges();
//     spyOnProperty(window, 'innerWidth').and.returnValue(760);
//     window.dispatchEvent(new Event('resize'));
//     expect(component.mobile).toBeTrue();
//   });
  
//   it(`#${AlterarDataCertaComponent.prototype.ngOnInit.name}
//   deve executar o método exibirPopupSemDataFixa.`, () => {
//     let methodSpy = spyOn(component, "exibirPopupSemDataFixa");
//     component.ngOnInit();
//     expect(methodSpy).toHaveBeenCalled();
//   });

//    it(`#${AlterarDataCertaComponent.prototype.voltar.name}
//   deve navegar de volta para a página anterior.`, () => {
//     fixture.detectChanges();
//     let locationSpy = spyOn(component['_location'], 'back');
//     component.voltar();
//     expect(locationSpy).toHaveBeenCalled();
//   });

//   // FIXME: Ajustar teste quando estiver implementada a rota para a qual navega o método
//   it(`#${AlterarDataCertaComponent.prototype.continuar.name}
//   deve direcionar o fluxo da execução para a rota 'servicos/troca-de-titularidade'.`, () => {
//     dataCertaService.setFluxoDoClienteDataCerta = Servicos.trocaDeTitularidade;
//     let locationSpy = spyOn(router, 'navigate');
//     fixture.detectChanges();
//     component.continuar();
//     expect(locationSpy).toHaveBeenCalled();
//   });

//   it(`#${AlterarDataCertaComponent.prototype.continuar.name}
//   deve executar o método 'salvarAlteracao()'.`, () => {
//     let methodSpy = spyOn(component, 'salvarAlteracao');
//     fixture.detectChanges();
//     component.continuar();
//     expect(methodSpy).toHaveBeenCalled();
//   });

//   it(`#${AlterarDataCertaComponent.prototype.salvarAlteracao.name}
//   deve redirecionar exibir alerta confirmacaode categoria`, () => {
//       component.podeAlterarDataFixa = false;
//       let routerSpy = spyOn(component['_router'], 'navigate');
//       fixture.detectChanges();
//       component.salvarAlteracao();
//       expect(routerSpy).toHaveBeenCalled(); //With(['servicos', 'data-certa', 'solicitacao-enviada']);
//   });

//   it(`#${AlterarDataCertaComponent.prototype.desbloquearBotao.name}
//   deve setar 'isDisabled' para 'false'.`, () => {
//     component.checkDeclaracao = true;
//     component.dataCerta = 'mock';
//     fixture.detectChanges();
//     component.desbloquearBotao();
//     expect(component.isDisabled).toBeFalse();
//   });

//   it(`#${AlterarDataCertaComponent.prototype.desbloquearBotao.name}
//   deve setar 'isDisabled' para 'true'.`, () => {
//     component.checkDeclaracao = false;
//     component.dataCerta = '';
//     fixture.detectChanges();
//     component.desbloquearBotao();
//     expect(component.isDisabled).toBeTrue();
//   });

//   it(`#${AlterarDataCertaComponent.prototype.exibirPopupSemDataFixa.name}
//   deve exibir dialogRef, quando não houver opção de data fixa`, () => {
//     let Spy = spyOn(component['dialog'], 'open');
//     component.podeAlterarDataFixa = false;
//     fixture.detectChanges();
//     component.exibirPopupSemDataFixa();
//     expect(Spy).toHaveBeenCalled();
//   });

// });
