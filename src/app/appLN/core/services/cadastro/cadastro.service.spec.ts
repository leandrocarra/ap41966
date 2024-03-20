import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioDAO } from '../../models/user/usuarioDAO';
import { CadastroService } from './cadastro.service';



describe(CadastroService.name, () => {
  let service: CadastroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CadastroService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(CadastroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it(`#${CadastroService.name} deve criar service quando chamado`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${CadastroService.prototype.criarUsuario.name}
  deve realizar um post e criar usuário quando chamado`, () => {
    let usuario = new UsuarioDAO("Testes", "teste@teste.com", 11999999, 96700905044, "testeLN6", "1", false);

    service.criarUsuario(usuario).subscribe((response) => {
      expect(response).toBe("OK")
    });
  });

  it(`#${CadastroService.prototype.criarUsuario.name}
  deve limpar os dados salvos no localStorege`, () => {
    let localSpy = spyOn(localStorage, 'clear');
    let sessionSpy = spyOn(sessionStorage, 'clear');
    service.clearSession();
    expect(localSpy).toHaveBeenCalled();
    expect(sessionSpy).toHaveBeenCalled();
  });

});
