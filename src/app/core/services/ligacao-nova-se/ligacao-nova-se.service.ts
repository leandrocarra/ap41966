import { Injectable } from '@angular/core';
import { CustomSweetAlertService } from 'app/appLN/core/services/sweet-alert/custom-sweet-alert.service';
import { TokenService } from 'app/appLN/core/services/token/token.service';
import { UserServiceLN } from 'app/appLN/core/services/user/user.service';
import { LoadingService } from '../customsweetalert/loading.service';
import { UserService } from '../user/user.service';
import { AgenciaVirtualService } from '../utils/admin/agencia-virtual.service';

@Injectable({
    providedIn: 'root'
})
export class LigacaoNovaSEService {
    constructor(
        private _userService: UserService,
        private _userServiceLN: UserServiceLN,
        private _customSwalLNService: CustomSweetAlertService,
        private _tokenServiceLN: TokenService,
        private _loadingService: LoadingService,
        private _agenciaVirtualService: AgenciaVirtualService
    ) { }

    definirDadosDoUsuario(): void {
        this._loadingService.stop();
        this._userServiceLN.tipoDocumento = (this._userService.dadosUser.documento.length === 11) ? 'CPF' : 'CNPJ';
        this._userServiceLN.sessionUser = this._userServiceLN.sessionUser ?? this.transferirDadosDaAV(this._userServiceLN.tipoDocumento);
    }

    transferirDadosDaAV(tipoDocumento: string): DadosUsuarioLN {
        let dadosDoUserService = this._userService.dadosUser;
        let dadosDoUsuario = new DadosUsuarioLN();
        dadosDoUsuario.documento = dadosDoUserService.documento;
        dadosDoUsuario.telefone = dadosDoUserService.telefone;
        dadosDoUsuario.celular = dadosDoUserService.celular;
        dadosDoUsuario.data = dadosDoUserService.dataCriacao;
        dadosDoUsuario.dataAtualizacao = dadosDoUserService.DataUltimaAtualizacao;
        dadosDoUsuario.ativo = true;
        if (tipoDocumento === 'CPF') {
            dadosDoUsuario.nome = dadosDoUserService.nome;
            dadosDoUsuario.email = dadosDoUserService.email;
            dadosDoUsuario.dataNascimento = new Date(dadosDoUserService.dataNascimento).toISOString();
        } else {
            dadosDoUsuario.nome = dadosDoUserService.razaoSocial;
            dadosDoUsuario.email = dadosDoUserService.emailSolicitante;
        }
        return dadosDoUsuario;
    }

    salvarToken(data: any): void {
        this._tokenServiceLN.accessToken = data.access_token;
        this._tokenServiceLN.idToken = data.id;
        this._tokenServiceLN.refreshToken = data.refresh_token;
    }

    ocrRetornouErro(data: string): boolean {
        let arrayDeErros: Array<string> = [
            "The remote server returned an error: (400) Bad Request.",
            "The remote server returned an error: (500) Internal Server Error."
        ];
        return arrayDeErros.includes(data) ? true : false;
    }

    alertUsuarioBloqueado(): void {
        this._loadingService.stop();
        this._customSwalLNService.alertError("Usuário bloqueado. Tente novamente mais tarde!");
        setInterval(() => {
            this._userServiceLN.usuarioBloqueado = '';
        }, 7200000);
    }

    alertReceitaFederal(): void {
        this._loadingService.stop();
        this._customSwalLNService.alertCpfIrregular().then(r => {
            if (r.value) {
                let otherWindow = window.open('https://www.gov.br/receitafederal/pt-br', '_blank');
                if (otherWindow) { otherWindow.opener = null }
            }
        });
    }

    obterProtocolo(recaptcha:string): void {
        if (this._userServiceLN.protocolo) {
            this._userServiceLN.protocolo = this._userServiceLN.protocolo;
        } else {
            this._loadingService.start();
            this._agenciaVirtualService.obterProtocolo(recaptcha).subscribe({
                next: (responseDTO) => {
                    this._userServiceLN.protocolo = responseDTO.protocoloLegadoStr;
                },
                error: () => {
                    // TODO: Confirmar se a falta de um protocolo deve ou não ser impeditiva ao fluxo.
                    this._userServiceLN.protocolo = '';
                }
            });
            this._loadingService.stop();
        }
    }

    get getTokenLN(): string {
        return this._tokenServiceLN.accessToken;
    }
}

export class TokenLNDTOResponse {
    constructor(
        public access_token: string = '',
        public refresh_token: string = ''
    ) { }
}

export class DadosUsuarioLN {
    constructor(
        public codUsuario: number = 0, // não usado
        public codTipoUsuario: number = 0, // não usado
        public codImobiliaria: number = 0, // não usado
        public nome: string = '',
        public documento: string = '',
        public telefone: string = '',
        public celular: string = '',
        public email: string = '',
        public senha: string = '', // ?
        public recebeEmail: boolean = false, // ?
        public recebeSMS: boolean = false, // ?
        public data: string = '', // ?
        public ativo: boolean = false, // ?
        public dataAtualizacao: string = '', // ?
        public blacklist: boolean = false, // ?
        public isRepositorio: boolean = false, // ?
        public dataRepositorio: string = '', // ?
        public dataNascimento: string = '',
        public tipoEnvio: number = 0 // ?
    ) { }
}
