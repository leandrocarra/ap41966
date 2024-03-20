import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DocumentosAceitosComponent } from './documentos-aceitos.component';

describe(DocumentosAceitosComponent.name, () => {
  let component: DocumentosAceitosComponent;
  let fixture: ComponentFixture<DocumentosAceitosComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentosAceitosComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ]

    })
      .compileComponents();
    fixture = TestBed.createComponent(DocumentosAceitosComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should create instance', () => {
  fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${DocumentosAceitosComponent.prototype.voltar.name}
  deve voltar a pagina, quando for chamado`, () =>{
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`#${DocumentosAceitosComponent.prototype.onResize.name}
  deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

});
