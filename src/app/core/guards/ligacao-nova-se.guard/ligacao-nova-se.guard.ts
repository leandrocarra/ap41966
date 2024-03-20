import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { TokenService } from 'app/appLN/core/services/token/token.service';
import { UserServiceLN } from 'app/appLN/core/services/user/user.service';
import { EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { PerfisDeAcesso } from 'app/core/models/multilogin/multilogin-acesso';
import { LigacaoNovaSEService } from 'app/core/services/ligacao-nova-se/ligacao-nova-se.service';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';
import { UserService } from 'app/core/services/user/user.service';
import { LoadingService } from "../../services/customsweetalert/loading.service";

@Injectable({
    providedIn: 'root'
})
export class LigacaoNovaSEGuard implements CanActivate {
    constructor(
        private _tokenLN: TokenService,
        private _userService: UserService,
        private _userServiceLN: UserServiceLN,
        private _alert: CustomSweetAlertService,
        private _ligacaoNovaSEService: LigacaoNovaSEService,
        private _multiloginAcessoService: MultiloginAcessoService,
        private _loading: LoadingService
    ) { }

    async canActivate(): Promise<boolean> {
        const acessoComum = this.verificarPerfilDeAcesso();
        if (acessoComum) {
            const tokenValido = await this.obterToken();
            const documentoValido = await this.verificarDocumento();
            return (tokenValido && documentoValido);
        } else {
            return Promise.resolve(false);
        }
    }

    obterToken(): Promise<boolean> {
        this._loading.start();
        return new Promise((resolve) => {
            this._tokenLN.getToken().subscribe({
                next: (responseDTO) => {
                    if (this._userServiceLN.usuarioBloqueado !== this._userService.dadosUser.documento) { // ver documentos.service: this._userService.usuarioBloqueado = this._userService.sessionUser.documento;
                        this._ligacaoNovaSEService.salvarToken(responseDTO);
                        resolve(true);
                    } else {
                        this._ligacaoNovaSEService.alertUsuarioBloqueado();
                        resolve(false);
                    }
                },
                error: () => {
                    this._loading.stop();
                    resolve(false);
                }
            });
        });
    }

    verificarDocumento(): Promise<boolean> {
        if (this._userServiceLN.sessionUser) {
            this._loading.stop();
            return Promise.resolve(true);
        } else {
            const documento = this._userService.dadosUser.documento;
            return (documento.length > 11) ? this.validarCNPJ(documento) : this.validarCPF(documento);
        }
    }

    validarCNPJ(documento: string): Promise<boolean> {
        this._loading.start();
        return new Promise((resolve) => {
            this._userServiceLN.consultarCNPJ(documento).subscribe({
                next: (responseDTO) => {
                    if (responseDTO[0].OnlineCertificates.BaseStatus === 'ATIVA') {
                        var cnae = responseDTO[0].OnlineCertificates.AdditionalOutputData.Cnae;
                        this._userServiceLN.cnae = cnae;
                        this._ligacaoNovaSEService.definirDadosDoUsuario();
                        this._loading.stop()
                        resolve(true);
                    } else {
                        this._ligacaoNovaSEService.alertReceitaFederal();
                        this._loading.stop()
                        resolve(false);
                    }
                },
                error: () => {
                    this._loading.stop();
                    resolve(false);
                }
            });
        });
    }

    validarCPF(documento: string): Promise<boolean> {
        return new Promise((resolve) => {
            this._userServiceLN.consultarCPF(documento).subscribe({
                next: (responseDTO) => {
                    if (this._ligacaoNovaSEService.ocrRetornouErro(responseDTO)) {
                        this._ligacaoNovaSEService.alertReceitaFederal();
                        resolve(false);
                    }
                    const isCpfRegular = (responseDTO && responseDTO.length > 0) ? responseDTO[0].BasicData : { TaxIdStatus: 'REGULAR' };
                    if (isCpfRegular.TaxIdStatus === 'REGULAR') {
                        this._ligacaoNovaSEService.definirDadosDoUsuario();
                        resolve(true);
                    } else {
                        this._ligacaoNovaSEService.alertReceitaFederal();
                        resolve(false);
                    }
                },
                error: () => {
                    this._ligacaoNovaSEService.definirDadosDoUsuario();
                    resolve(true);
                }
            });
        });
    }

    verificarPerfilDeAcesso(): boolean {
        const perfisPermitidos = [
            PerfisDeAcesso.acessoComum,
            PerfisDeAcesso.B,
            PerfisDeAcesso.A,
            // PerfisDeAcesso.representanteLegal, // TODO: Quando se tratar do novo serviço de Ligação Nova, descomentar essas linhas.
            // PerfisDeAcesso.atendenteCredenciado,
            // PerfisDeAcesso.corretor,
            // PerfisDeAcesso.projetista,
            // PerfisDeAcesso.padronista
        ];
        if (perfisPermitidos.includes(this._multiloginAcessoService.getMultiloginAcesso.perfilDeAcesso)) {
            return true;
        } else {
            this._alert.alertWarningWithText('', EnumTitulosPadroes.PerfilDeAcessoNaoPermitido);
            return false;
        }
    }
}
