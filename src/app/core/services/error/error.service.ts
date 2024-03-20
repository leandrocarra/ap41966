import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { Observable } from 'rxjs';
import { CustomSweetAlertService } from '../customsweetalert/custom-sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private _router: Router,
    private _alert: CustomSweetAlertService,
  ) { }

  handleError<T>() {
    return (error: any): Observable<T> => {
      if (error && error.error && error.error.message === 'Authorization has been denied for this request.') {
        this._alert.closeLoading();
        this._alert.alertError('Sessão expirada, favor efetuar o login novamente.');
        this.logout();
      }

      return error;
    };
  }

  logout() {
    this._router.navigate(['/']);
  }

  tratamentoDeErro(error: any): string {
    if (environment.regiao === Regiao.SE) {
      return this.selecionarErroSE(error);
    } else {
      if (error.error && error.error.retorno) return error.error.retorno.mensagem ?? MensagemDeErro.Default;
    }
    return MensagemDeErro.Default;
  }

  private selecionarErroSE(error: any): string {
    let mensagemDeErro: string;
    switch (error.status) { // TODO: verificar se essas mensagens são gerais ou se são inerentes apenas ao fluxo do falta-de-energia.
      case 400: {
        mensagemDeErro = error.error.retorno.mensagem;
        break;
      }
      case 401: {
        mensagemDeErro = MensagemDeErro.Erro401;
        this._router.navigate([PathCompleto.home]);
        break;
      }
      case 403: {
        mensagemDeErro = MensagemDeErro.Erro403;
        break;
      }
      case 404: {
        mensagemDeErro = MensagemDeErro.Erro404;
        break;
      }
      case 502: {
        mensagemDeErro = MensagemDeErro.Erro502;
        break;
      }
      default: {
        mensagemDeErro = MensagemDeErro.Default;
        break;
      }
    }
    console.log(mensagemDeErro);
    return mensagemDeErro;
  }
}

enum MensagemDeErro {
  Erro401 = 'Não autorizado.',
  Erro403 = 'Usuário com o perfil inativo!',
  Erro404 = 'Usuário não encontrado.',
  Erro502 = 'Sistema fora do ar. Por favor, tente novamente mais tarde.',
  Default = 'Erro no sistema.',
}

export enum MatErrorMensagens {
    EmailIncorreto = 'E-mail inválido! Por favor, tente novamente.',
    EmailIncorretoMobile = "Este e-mail não é válido.",
    EmailDiferente = "Os e-mails não conferem! Por favor, tente novamente.",
    EmailDiferenteMobile = "Os e-mails não conferem.",
    DocumentoInvalido = "CPF/CNPJ inválido! Por favor, tente novamente.",
    CPFInvalido = "CPF inválido! Por favor, tente novamente.",
    DataNascimentoInvalida = "Data de nascimento inválida! Por favor, tente novamente.",
    SelecaoDocumentoSecundario = "Por favor, selecione qual documento será fornecido!",
    DocumentoSecundario = "Número de documento inválido! Por favor, tente novamente.",
    Celular = "Número de celular inválido! Por favor, tente novamente.",
    Telefone = "Número de telefone inválido! Por favor, tente novamente.",
    CampoObrigatorio = "Campo Obrigatório!",
    CodigoDoCliente = "O código do cliente deve conter 12 dígitos.",
    CodigoDeAtivacao = "Esse código não é válido. Tente novamente.",
    CodigoIncorreto = "Código incorreto. Tente novamente.",
    OrgaoEmissor = "Por favor, selecione qual órgão emissor será fornecido!",
    EstadoEmissor = "Por favor, selecione qual estado emissor será fornecido!",
    NomeEmpresa = "Nome da empresa deve ser preenchido.",
    TecnicoEngResponsavel = "Técnico ou Eng. Responsável deve ser preenchido.",
    EmailContato = "E-mail de Contato deve ser preenchido.",
    TelefoneContato = "Telefone de Contato deve ser preenchido.",
    Cliente = "Cliente deve ser preenchido.",
    MunicipioProjeto = "Município do Projeto deve ser preenchido"
}
