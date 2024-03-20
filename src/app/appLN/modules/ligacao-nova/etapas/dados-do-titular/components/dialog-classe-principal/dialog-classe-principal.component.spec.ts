import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DadosDoTitularModule } from '../../dados-do-titular.module';
import { DialogClassePrincipalComponent } from './dialog-classe-principal.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// describe(DialogClassePrincipalComponent.name, () => {
//   let component: DialogClassePrincipalComponent;
//   let fixture: ComponentFixture<DialogClassePrincipalComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       providers:[ DialogClassePrincipalComponent ],
//       declarations: [ DialogClassePrincipalComponent ],
//       imports: [DadosDoTitularModule],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//     .compileComponents();
//     fixture = TestBed.createComponent(DialogClassePrincipalComponent);
//     component = fixture.componentInstance;
//   });

//   // it('should create', () => {
//   //   fixture.detectChanges();
//   //   expect(component).toBeTruthy();
//   // });

  
//   it(`#${DialogClassePrincipalComponent.prototype.close.name}
//   Deve fechar, quando acionado`, () => {
//     let spy = spyOn(component['_matDialogRef'],'close')
//     fixture.detectChanges();
//     component.close();
//     expect(spy).toHaveBeenCalled();
//   });



// });
