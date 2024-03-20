import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { environmentLN } from '@environments/environmentsLN/environment';
import { LoginComponent } from '../login/login.component';
import { ValidarSenhasModule } from '../shared/components/validar-senhas/validar-senhas.module';
import { CadastroComponent } from './cadastro.component';

describe(CadastroComponent.name, () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatRadioModule,
        ValidarSenhasModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
  });

  it(`Deve criar componente quando iniciado fluxo de vida do angular`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${CadastroComponent.prototype.ngOnInit.name} deve setar
  environment.production para true e setar false na variavel isHomologacao`, () => {
    fixture.detectChanges();
    environmentLN.production = true;
    component.ngOnInit()
    expect(component.isHomologacao).toBeFalse();
  });


  it(`#${CadastroComponent.prototype.validarFormPessoa.name}
  deve chamar alerta cpf inválida quando for pessoaFisica e documento inválido`, () => {
    fixture.detectChanges();
    component.formCadastroDados.patchValue({
      documento: "99999999999"
    });
    component.tipoPessoa = "pessoaFisica";
    component.validarFormPessoa();
    expect(component.checkPessoa).toEqual(true);
  });

  it(`#${CadastroComponent.prototype.validarFormPessoa.name}
  deve chamar alerta cpf inválida quando for pessoaFisica e documento inválido`, () => {
    fixture.detectChanges();
    component.formCadastroDados.patchValue({
      username: "Ana Maria",
      documento: "99999999999"
    });
    spyOn(component['_alert'], 'alertError');
    component.tipoPessoa = "pessoaFisica";
    component.validarFormPessoa();
    expect(component['_alert'].alertError).toHaveBeenCalledWith("CPF inválida");
    expect(component.checkPessoa).toEqual(true);
  });


  it(`#${CadastroComponent.prototype.validarFormPessoa.name}
  deve chamar alerta cnpj inválida quando for pessoaFisica e documento inválido`, () => {
    fixture.detectChanges();
    component.formCadastroDados.patchValue({

      documento: "99999999999999"
    });
    spyOn(component['_alert'], 'alertError');
    component.tipoPessoa = "pessoaJuridica";
    component.validarFormPessoa();
    expect(component['_alert'].alertError).toHaveBeenCalledWith("CNPJ inválida");
    expect(component.checkPessoa).toEqual(true);
  });


  it(`#${CadastroComponent.prototype.validarForms.name}
  deve exibir alerta quando senha for invalido`, () => {
    fixture.detectChanges();
    spyOn(component['_alert'], 'alertError');
    component.checkNome = true;
    component.checkPessoa = true;
    component.validarForms();
    expect(component['_alert'].alertError).toHaveBeenCalledWith("Senha inválida");
  });

  it(`#${CadastroComponent.prototype.validarForms.name}
  deve exibir alerta quando senha for invalido`, () => {
    fixture.detectChanges();
    component.tipoPessoa = "pessoaFisica";
    component.getPassword("123456");
    component.validarForms();
    expect(component.checkForm).toBeFalse();
  });

  it(`#${CadastroComponent.prototype.validarNome.name}
  deve setar checkName como false quando houve norme e sobrenome`, () => {
    fixture.detectChanges();
    component.validarNome('Roberto d Almeida')
    expect(component.checkNome).toBeFalse();
  })

  it(`#${CadastroComponent.prototype.deParaUsuarioDao.name}
  deve validar quando chamado`, () => {
    fixture.detectChanges();
    component.formCadastroDados.patchValue({
      username: "Ana Maria",
      documento: "85782976012",
      email: "teste@teste.com",
      celular: "1199999999"
    });
    component.deParaUsuarioDao();
    expect(component.usuarioDAO.username).toBe('Ana Maria');
    expect(component.usuarioDAO.email).toBe('teste@teste.com');
  });


  it(`#${CadastroComponent.prototype.cadastrar.name}
  deve chamar alerta quando conta já estiver cadastrada`, () => {
    fixture.detectChanges();
    component.tipoPessoa = "pessoaFisica";
    component.getPassword("123456");
    component.formCadastroDados.patchValue({
      username: "Teste CNPJ",
      documento: "33991294000110",
      email: "teste@teste.com",
      celular: "1199999999"
    });

    spyOn(component['_cadastroService'], 'criarUsuario').and.returnValue(of("Registro existente"))
    let alertaSpy = spyOn(component['_alert'], 'alertInfo');
    component.cadastrar();
    expect(alertaSpy).toHaveBeenCalledWith('CPF informado já possui cadastro.');
  });

  it(`#${CadastroComponent.prototype.cadastrar.name}
  deve chamar alerta de sucesso quando conta for cadastrada com e-mail`, () => {
    fixture.detectChanges();
    component.tipoPessoa = "pessoaFisica";
    component.getPassword("123456");
    component.formCadastroDados.patchValue({
      username: "Teste CNPJ",
      documento: "33991294000110",
      email: "teste@teste.com",
      celular: "1199999999"
    });

    spyOn(component['_cadastroService'], 'criarUsuario').and.returnValue(of("OK"))
    let alertaSpy = spyOn(component['_alert'], 'alertSuccess');
    component.cadastrar();
    expect(alertaSpy).toHaveBeenCalled();

  });

  it(`#${CadastroComponent.prototype.cadastrar.name}
  deve chamar alerta de sucesso quando conta for cadastrada com SMS`, () => {
    fixture.detectChanges();
    component.tipoPessoa = "pessoaFisica";
    component.getPassword("123456");
    component.usuarioDAO.tipoEnviado = '2';
    component.formCadastroDados.patchValue({
      username: "Teste CNPJ",
      documento: "33991294000110",
      email: "teste@teste.com",
      celular: "1199999999"
    });

    spyOn(component['_cadastroService'], 'criarUsuario').and.returnValue(of("OK"))
    let alertaSpy = spyOn(component['_alert'], 'alertSuccess');
    component.cadastrar();
    expect(alertaSpy).toHaveBeenCalled();
  });

  it(`#${CadastroComponent.prototype.cadastrar.name}
  deve chamar alerta Erro ao cadastrar quando data retornar erro na requisição`, () => {
    fixture.detectChanges();
    component.tipoPessoa = "pessoaFisica";
    component.getPassword("123456");
    component.usuarioDAO.tipoEnviado = '2';
    component.formCadastroDados.patchValue({
      username: "Teste CNPJ",
      documento: "33991294000110",
      email: "teste@teste.com",
      celular: "1199999999"
    });

    spyOn(component['_cadastroService'], 'criarUsuario').and.returnValue(of("ErroNoData"))
    let alertaSpy = spyOn(component['_alert'], 'alertInfo');
    component.cadastrar();
    expect(alertaSpy).toHaveBeenCalledOnceWith('Ocorreu um erro ao cadastrar');
  });

  it(`#${CadastroComponent.prototype.cadastrar.name}
  deve chamar alerta Erro ao cadastrar quando retornar problema error no httpResponse`, () => {
    fixture.detectChanges();
    component.tipoPessoa = "pessoaFisica";
    component.getPassword("123456");
    component.usuarioDAO.tipoEnviado = '2';
    component.formCadastroDados.patchValue({
      username: "Teste CNPJ",
      documento: "33991294000110",
      email: "teste@teste.com",
      celular: "1199999999"
    });

    spyOn(component['_cadastroService'], 'criarUsuario').and.returnValue(throwError(() => new Error('')));

    let alertaSpy = spyOn(component['_alert'], 'alertInfo');

    component.cadastrar();
    expect(alertaSpy).toHaveBeenCalledOnceWith('Ocorreu um erro ao cadastrar');
  });


  it(`#${CadastroComponent.prototype.cancelar.name}
  deve chamar login quando chamado`, () => {
    fixture.detectChanges();
    let spy = spyOn(component['_loginService'], 'redirectToLogin');
    component.cancelar();
    expect(spy).toHaveBeenCalled();
  });
});
