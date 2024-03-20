import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttachedFileComponent } from './attached-file.component';


describe(AttachedFileComponent.name, () => {
  let component: AttachedFileComponent;
  let fixture: ComponentFixture<AttachedFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachedFileComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AttachedFileComponent);
    component = fixture.componentInstance;
  });

  it(`Deve crair o componente`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${AttachedFileComponent.prototype.remove.name}
  deve disparar (@Output arquivoRemovido) quando chamado`, () => {
    spyOn(component.arquivoRemovido, 'emit');
    fixture.detectChanges();
    component.remove(0);
    expect(component.arquivoRemovido.emit).toHaveBeenCalled();
  });

});
