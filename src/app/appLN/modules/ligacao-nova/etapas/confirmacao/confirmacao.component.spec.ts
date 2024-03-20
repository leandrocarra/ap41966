import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfirmacaoComponent } from './confirmacao.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

describe(ConfirmacaoComponent.name, () => {
  let component: ConfirmacaoComponent;
  let fixture: ComponentFixture<ConfirmacaoComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmacaoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ConfirmacaoComponent);
    component = fixture.componentInstance;
    component['_ligacaoNovaService'].checkUE = true;
  });

  // it('should create instance', () => {
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });

  // it(`#${ConfirmacaoComponent.prototype.finalizarPedido.name}
  // `, fakeAsync((done) => {
  //   component['_ligacaoNovaService'].checkUE = true;
  //   component['_dadosDaLigacaoService'].dadosDaLigacao.distanciaPoste = "nao";
  //   component['_dadosDoImovelService'].getEndereco.tipoLocalizacao = "";
  //   component['_userService'].protocolo = "0184240496";
  //   let alertUESemPosteUrbanoSpy = spyOn(component['_alert'],'alertUESemPosteUrbano');
  //   let enviarSpy = spyOn(component,'enviar');
  //   component.finalizarPedido();
  //   expect(Swal.isVisible()).toBeTruthy();
  //   Swal.clickConfirm();
  //   jasmine.clock().tick(5000);
  //   fixture.detectChanges();
  //   setTimeout(() => {
  //     expect(alertUESemPosteUrbanoSpy).toHaveBeenCalledWith("0184240496");
  //     expect(enviarSpy).toHaveBeenCalled();    
  //     done();
  //   });
  // }));

  it(`#${ConfirmacaoComponent.prototype.voltar.name}
  deve voltar pagina location quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  // it(`#${ConfirmacaoComponent.prototype.finalizarPedido.name}
  // `, (done) => {
  //   fixture.detectChanges();    
  //   component['_dadosDaLigacaoService'].dadosDaLigacao.distanciaPoste = "nao";
  //   component['_dadosDoImovelService'].getEndereco.tipoLocalizacao = "";
  //   component['_userService'].protocolo = "0184240496";
  //   let alertUESemPosteUrbanoSpy = spyOn(component['_alert'],'alertUESemPosteUrbano');
  //   let enviarSpy = spyOn(component,'enviar');
	//  	component.finalizarPedido();
  //   Swal.clickConfirm();
  //   setTimeout(() => {
  //     expect(alertUESemPosteUrbanoSpy).toHaveBeenCalledWith("0184240496");
  //     expect(enviarSpy).toHaveBeenCalled();    
  //     done();
  //   });
  // });

});
