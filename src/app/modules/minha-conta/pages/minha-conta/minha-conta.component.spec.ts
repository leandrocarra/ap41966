// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { CUSTOM_ELEMENTS_SCHEMA, InjectionToken, NO_ERRORS_SCHEMA } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MAT_DATE_LOCALE } from '@angular/material/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TokenService } from 'app/core/services/token/token.service';
// import { UserService } from 'app/core/services/user/user.service';
// import { MinhaContaModule } from '../../minha-conta.module';
// import { EditarDadosComponent } from '../editar-dados/editar-dados.component';

// import { MinhaContaComponent } from './minha-conta.component';

// describe(MinhaContaComponent.name, () => {
//     let component: MinhaContaComponent;
//     let fixture: ComponentFixture<MinhaContaComponent>;


//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             declarations: [
//                 MinhaContaComponent,
//                 EditarDadosComponent
//             ],
//             schemas: [
//                 NO_ERRORS_SCHEMA,
//                 CUSTOM_ELEMENTS_SCHEMA
//             ],

//             imports: [
//                 MinhaContaModule,
//                 RouterTestingModule,
//                 HttpClientTestingModule,
//                 BrowserAnimationsModule
//             ],

//             providers: [
//                 TokenService,
//                 UserService,
//                 {
//                     provide: MAT_DATE_LOCALE,
//                     useValue: 'en-GB'
//                 },
//                 {
//                     provide: InjectionToken,
//                     useValue: '',
//                     multi: true
//                 }
//             ]
//         })
//             .compileComponents();
//     });

//     it(`Deve instanciar ${MinhaContaComponent.name} quando  disparado o fluxo de vida o Angular.`, () => {
//         fixture = TestBed.createComponent(MinhaContaComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//         expect(component).toBeTruthy();
//     });

// });
