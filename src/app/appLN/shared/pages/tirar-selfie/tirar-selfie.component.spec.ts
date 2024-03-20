import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import Swal from 'sweetalert2';
import { TirarSelfieComponent } from './tirar-selfie.component';

describe(TirarSelfieComponent.name, () => {
  let component: TirarSelfieComponent;
  let fixture: ComponentFixture<TirarSelfieComponent>;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TirarSelfieComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TirarSelfieComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
  });

  it(`#${TirarSelfieComponent.prototype.onResize.name}
  deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

 
  it(`#${TirarSelfieComponent.prototype.voltar.name}
  deve voltar pagina location quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });


  //  it(`#${TirarSelfieComponent.prototype.compararFaces.name}
  // deve chamar alerta quando  chamado`, (done) =>{
  //   let Spy = spyOn(component['_alert'],'alertError');

  //   fixture.detectChanges();
  //   component.compararFaces();

  //   Swal.clickConfirm();
  //   setTimeout(() =>{
  //     expect(Spy).toHaveBeenCalledWith('loadCameras');
  //     done();

  //   });
  // });


  // it('should create', () => {
  //   fixture.detectChanges();
  //   setTimeout(() => {
  //     let fecharSwal: HTMLElement = fixture.nativeElement.querySelector('.swal2-confirm swal2-styled');
  //     fecharSwal.click();
  //     expect(component).toBeTruthy();
  //   }, 100); 
  // });


  // it('should call voltar', () => {
  //   fixture.detectChanges();
  //   setTimeout(() => {
  //     let fecharSwal: HTMLElement = fixture.nativeElement.querySelector('.swal2-confirm swal2-styled');
  //     fecharSwal.click();

  // it(`#${TirarSelfieComponent.prototype.voltar.name}
  // deve voltar pagina location quando chamado`, () => {
  //   fixture.detectChanges();
  //   component.voltar();
  //   expect(location.back()).toBe();
  // });
 


});
