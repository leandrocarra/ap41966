import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipamentosAdicionadosComponent } from './equipamentos-adicionados.component';


describe(EquipamentosAdicionadosComponent.name, () => {
  let component: EquipamentosAdicionadosComponent;
  let fixture: ComponentFixture<EquipamentosAdicionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipamentosAdicionadosComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentosAdicionadosComponent);
    component = fixture.componentInstance;
 
  });

  it('Deve criar o componente quando iniciado o ciclo de vida do Angular', () => {
      fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${EquipamentosAdicionadosComponent.prototype.cancelar.name}
  Deve setar como falso variavel editar, quando chamado `, () => {
    fixture.detectChanges();
    component.cancelar();
    expect(component.editar).toBeFalse();
  });

  it(`#${EquipamentosAdicionadosComponent.prototype.atualizar.name}
  Deve executar o emit de (@Output salvarAlteracao), quando acionado `, () => {
    let equipamento = {
      "codigoAparelho": "5",
      "codigoSubTipoAparelho": "151",
      "codigoTipoAparelho": "5",
      "descricaoSubTipoAparelho": "APARELHO SOM 25000 WATTS",
      "quantidadeAparelho": "1"
  }
    let spy= spyOn(component.salvarAlteracao, 'emit');
    fixture.detectChanges();
    component.atualizar(equipamento);
    expect(spy).toHaveBeenCalled();
  });




});
