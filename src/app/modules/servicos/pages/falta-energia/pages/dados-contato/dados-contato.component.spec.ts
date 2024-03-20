// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TokenService } from 'app/core/services/token/token.service';
// import { UserService } from 'app/core/services/user/user.service';
// import { PATHS } from 'app/core/services/utils/utils.service';
// import { DadosContatoComponent } from './dados-contato.component';

// describe(DadosContatoComponent.name, () => {
//   let component: DadosContatoComponent;
//   let fixture: ComponentFixture<DadosContatoComponent>;
//   let router: Router;

//   let navExtraMockado = {
//     "extras": {
//       "state": {
//         "ondeFaltaEnergia": "",
//         "tipoAlerta": "",
//         "referencia": "",
//         "telefone": "",
//         "oQueSabeProblemaIluminacao": "",
//         "oQueSabeProblemaFaltaEnergia": "",
//         "isIluminacao": true,
//       }
//     }
//   };

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [ DadosContatoComponent ],
//       providers: [
//         UserService,
//         TokenService
//       ],
//       imports: [
//         HttpClientTestingModule,
//         RouterTestingModule.withRoutes([])
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     router = TestBed.inject(Router);
//     spyOn(router, 'getCurrentNavigation').and.returnValue(navExtraMockado as any);
//     fixture = TestBed.createComponent(DadosContatoComponent);
//     component = fixture.componentInstance;
//     component['_user'].dadosUser.telefone = "1155667744";
//   });

//   afterEach(() => {
//     TestBed.resetTestingModule();
//   });

  // it(`#${DadosContatoComponent.name}
  // deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });

//   it(`#${DadosContatoComponent.name}
//   deve aplicar a máscara de celular`, () => {
//     fixture.detectChanges();
//     component.getTelCelMask("99999999999");
//     expect(component.mascaraTelCel).toEqual("(00) 0 0000-0000");
//   });

  // it(`#${DadosContatoComponent.prototype.atributoParaNavExtra.name}
  // deve fazer o DePara e salvar os dados na variável navExtra`, () => {
  //   component.faltaEnergiaDTO.observacoes = "próximo a padaria";
  //   component.problemaResolvido = "Não, meu disjuntor está normal e permaneço sem energia";
  //   component.ondeFaltaEnergia = "Não sei";
  //   component.oQueSabeProblemaIluminacao = "Lâmpada apagada em praça ou jardim";
  //   component.oQueSabeProblemaFaltaEnergia = "Não sei";
  //   component.isIluminacao = true;
  //   fixture.detectChanges();
  //   component.atributoParaNavExtra();
  //   expect(component.navExtra.state.isIluminacao).toBeTrue();
  // });

//   it(`#${DadosContatoComponent.prototype.validaBotoes.name}
//   deve liberar o botão continuar quando o usuário informar o telefone e ponto de referência`, () => {
//     component.faltaEnergiaDTO.observacoes = "próximo ao mercado";
//     fixture.detectChanges();
//     component.validaBotoes();
//     expect(component.isDisabled).toBeFalse();
//   });

//   it(`#${DadosContatoComponent.prototype.validaBotoes.name}
//   deve bloquear o botão continuar quando o campo telefone e ponto de referência estiverem vazios`, () => {
//     component.faltaEnergiaDTO.observacoes = "";
//     component['_user'].dadosUser.telefone = "";
//     fixture.detectChanges();
//     component.validaBotoes();
//     expect(component.isDisabled).toBeTrue();
//   });

  // it(`#${DadosContatoComponent.prototype.voltar.name}
  // deve direcionar para tela anterior, quando `, () => {
   
  //   let routerSpy = spyOn(router, 'navigate');
  //   component.voltar();
  //   fixture.detectChanges();
  //   expect(routerSpy).toHaveBeenCalledOnceWith(["servicos", "falta-de-energia", "problema"], component.navExtra);
  // });

//   it(`#${DadosContatoComponent.prototype.voltar.name}
//   deve direcionar para tela que o usuário informa qual o problema com iluminação pública`, () => {
//     component.faltaEnergiaDTO.observacoes = "próximo a padaria";
//     component.problemaResolvido = "Não, meu disjuntor está normal e permaneço sem energia";
//     component.ondeFaltaEnergia = "Não sei";
//     component.oQueSabeProblemaIluminacao = "Lâmpada apagada em praça ou jardim";
//     component.oQueSabeProblemaFaltaEnergia = "Não sei";
//     component.isIluminacao = true;
//     let routerSpy = spyOn(router, 'navigate');
//     fixture.detectChanges();
//     component.voltar();
//     expect(routerSpy).toHaveBeenCalledOnceWith(["servicos", "falta-de-energia", "iluminacao-publica"], component.navExtra);
//   });

  // it(`#${DadosContatoComponent.prototype.voltar.name}
  // deve direcionar para tela de passos`, () => {
  
  //   let routerSpy = spyOn(router, 'navigate');
  //   component.voltar();
  //   fixture.detectChanges();
  //   expect(routerSpy).toHaveBeenCalledOnceWith(['servicos', 'falta-de-energia', 'problema'], component.navExtra);
  // });

//   it(`#${DadosContatoComponent.prototype.continuar.name}
//   deve direcionar para tela que o usuário irá conferir os dados informados`, () => {
//     component.faltaEnergiaDTO.observacoes = "próximo a padaria";
//     component.problemaResolvido = "Não, meu disjuntor está normal e permaneço sem energia";
//     component.ondeFaltaEnergia = "Não sei";
//     component.oQueSabeProblemaIluminacao = "Lâmpada apagada em praça ou jardim";
//     component.oQueSabeProblemaFaltaEnergia = "Não sei";
//     let routerSpy = spyOn(router, 'navigate');
//     fixture.detectChanges();
//     component.continuar();
//     expect(routerSpy).toHaveBeenCalledOnceWith(["servicos", "falta-de-energia", "confira-seus-dados"], component.navExtra);
//   });

//   it(`#${DadosContatoComponent.prototype.voltar.name}
//   deve voltar para a rota problema, quando a iluminacao publica`, () => {     
//     let routerSpy = spyOn(router, 'navigate');
//     component.isIluminacao = false;
//     fixture.detectChanges();
//     component.voltar();
//     expect(routerSpy).toHaveBeenCalledWith(["servicos", "falta-de-energia", "problema"], component.navExtra);
//   });
// });
