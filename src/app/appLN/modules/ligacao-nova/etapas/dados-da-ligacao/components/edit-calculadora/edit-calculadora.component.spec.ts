import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Equipamento } from '../../../../../../core/models/dados-da-ligacao/dados-da-ligacao';

import { EditCalculadoraComponent } from './edit-calculadora.component';

describe(EditCalculadoraComponent.name, () => {
  let component: EditCalculadoraComponent;
  let fixture: ComponentFixture<EditCalculadoraComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [EditCalculadoraComponent],
      declarations: [EditCalculadoraComponent],
      imports: [ReactiveFormsModule]

    })
      .compileComponents();
    fixture = TestBed.createComponent(EditCalculadoraComponent);
    component = fixture.componentInstance;
  });


  // it('should create', () => {
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });



  // it(`#${EditCalculadoraComponent.prototype.ngOnChanges.name} `, () => {
  //   fixture.detectChanges();
  //   component.potencias.changes['equipamento'].patchValue('teste');
  //   component.equipamentoForm.controls['quantidade'].patchValue(1);
  // });

  it(`#${EditCalculadoraComponent.prototype.diminuirQuantidade.name}
  deve diminuir quantidade de equipamento e atualizar formulário`, () => {
    fixture.detectChanges();
    component.diminuirQuantidade();
    component.equipamentoForm.controls['quantidade'].patchValue(1);
    expect(component.equipamentoForm.controls['quantidade'].value).toEqual(1);
  });

  it(`#${EditCalculadoraComponent.prototype.aumentarQuantidade.name}
  deve aumentar quantidade de equipamento e atualizar formulário`, () => {
    fixture.detectChanges();
    component.aumentarQuantidade();
    component.equipamentoForm.controls['quantidade'].patchValue(2);
    expect(component.equipamentoForm.controls['quantidade'].value).toEqual(2);
  });


  // it(`#${EditCalculadoraComponent.prototype.adicionar.name}
  // deve emitir valores do formatarEquipamento quando chamado`, () => {
  //   spyOn(component.add, 'emit');
  //   let equipamentoMockado = {
  //     "equipamento": "AR-CONDICIONADO",
  //     "class": "ar-condicionado",
  //     "selected": true
  //   }
  //   spyOn(component, 'ngOnChanges').and.returnValue(equipamentoMockado);
  //   let selecSpy = spyOn(component.selecionarEquipamento, 'emit');
  //   fixture.detectChanges();
  //   component.equipamentoForm.patchValue({
  //     "nome": "",
  //     "potencia": {
  //       "key": "10000BTU",
  //       "value": 1400,
  //       "codigoAparelho": "1",
  //       "codigoSubTipoAparelho": "27",
  //       "codigoTipoAparelho": "1",
  //       "descricaoSubTipoAparelho": "AR CONDICIONADO 10.000 BTU"
  //     },
  //     "quantidade": 1
  //   })
  //   fixture.detectChanges();
  //   component.adicionar();
  //   expect(component.add.emit).toHaveBeenCalled();
  //   expect(selecSpy).toHaveBeenCalled();
  // });

});
