// import { TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { LoginService } from 'app/core/services/login/login.service';
// import { UserService } from 'app/core/services/user/user.service';
// import { AutoleituraGuard } from './autoleitura.guard';

// describe(AutoleituraGuard.name, () => {
//   let autoleituraGuard: AutoleituraGuard;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
      
//       // imports:[
//       //   RouterTestingModule,

//       // ],
      
      
      
//       providers: [
//         AutoleituraGuard,
//         // { provide: Router, useClass: { navigate: () => null} },
//         // { provide: LoginService, useClass: { } },
//         // { provide: UserService, useClass: { } }
//       ]
//     });

//     autoleituraGuard = TestBed.inject(AutoleituraGuard)
//   });

//   // it('should not be activated when disconnected', () => {
//   //   const loginService = TestBed.inject(LoginService);

//   //   loginService.usuarioAutenticado = false;
//   //   const response = autoleituraGuard.canActivate(null, null);

//   //   expect(response).toBeFalsy();
//   // });

//   // it('should be activate when logged in', () => {
//   //   const loginService = TestBed.inject(LoginService);

//   //   loginService.usuarioAutenticado = true;
//   //   const response = autoleituraGuard.canActivate(null, null);

//   //   expect(response).toBeTruthy();
//   // });

//   // it('should be activate when it is group B', () => {
//   //   const userService = TestBed.inject(UserService);

//   //   userService.group = 'B';
//   //   const response = autoleituraGuard.canActivate(null, null);

//   //   expect(response).toBeTruthy();
//   // });

//   // it('should be activate when it is group A', () => {
//   //   const userService = TestBed.inject(UserService);

//   //   userService.group = 'A';
//   //   const response = autoleituraGuard.canActivate(null, null);

//   //   expect(response).toBeFalsy();
//   // });

// });
