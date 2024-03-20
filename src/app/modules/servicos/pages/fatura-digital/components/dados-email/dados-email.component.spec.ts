import { DadosEmailComponent } from './dados-email.component';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FaturaDigitalService } from 'app/core/services/fatura-digital/fatura-digital.service';
import { TokenService } from 'app/core/services/token/token.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe(DadosEmailComponent.name, () => {
  let component: DadosEmailComponent;
  let fixture: ComponentFixture<DadosEmailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosEmailComponent ],
      imports:[
        FormsModule,
        MatInputModule,
				MatFormFieldModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers:[
        FaturaDigitalService,
        TokenService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Deve-se iniciar o ciclo de vida do angular`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${DadosEmailComponent.prototype.onResize.name}
  deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${DadosEmailComponent.prototype.changeInputEmail.name} deve chamar o método #changeInputEmail com dados inválidos`, () => {
    const changeInputEmailSpy = spyOn(component, "changeInputEmail").and.callThrough();
    
    let domElement = fixture.debugElement.query(By.css('#email'));
    domElement.nativeElement.value = "teste@teste.com";
    domElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(changeInputEmailSpy).toHaveBeenCalled();
  });

  it(`#${DadosEmailComponent.prototype.changeInputEmail.name} deve chamar o método #changeInputEmail com dados válido`, () => {
    const changeInputEmailSpy = spyOn(component, "changeInputEmail").and.callThrough();
    
    let domElementEmail = fixture.debugElement.query(By.css('#email'));
    domElementEmail.nativeElement.value = "teste@teste.com";
    domElementEmail.nativeElement.dispatchEvent(new Event('input'));

    let domElementConfirmarEmail = fixture.debugElement.query(By.css('#confirmarEmail'));
    domElementConfirmarEmail.nativeElement.value = "teste@teste.com";
    domElementConfirmarEmail.nativeElement.dispatchEvent(new Event('input'));


    fixture.detectChanges();
    expect(changeInputEmailSpy).toHaveBeenCalled();
  });


});
