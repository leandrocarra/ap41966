// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

// import { MatDialog, MatDialogModule} from '@angular/material/dialog';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TokenService } from 'app/core/services/token/token.service';

// import { DebitoAutomaticoCadastradoComponent } from './debito-automatico-cadastrado.component';

// describe('DebitoAutomaticoCadastradoComponent', () => {
//   let component: DebitoAutomaticoCadastradoComponent;
//   let fixture: ComponentFixture<DebitoAutomaticoCadastradoComponent>;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [ DebitoAutomaticoCadastradoComponent ],

//       imports:[
//         MatDialogModule,
//         FormBuilder,
//         ReactiveFormsModule,
//         HttpClientTestingModule,
//         RouterTestingModule.withRoutes([])],
      
     
//       providers: [
//         TokenService
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DebitoAutomaticoCadastradoComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it(`Deve se iniciar o ciclo de vida do angular`, () => {
//     expect(component).toBeTruthy();
//   });

//   it(`#${DebitoAutomaticoCadastradoComponent.prototype.voltar.name}
//   deve navegar de volta para a página anterior teste blablabla.`, () => {
//     fixture.detectChanges();
//     let locationSpy = spyOn(component['_location'], 'back');
//     component.voltar();
//     expect(locationSpy).toHaveBeenCalled();
//   });

// });
