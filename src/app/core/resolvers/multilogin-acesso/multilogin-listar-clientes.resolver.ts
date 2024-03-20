import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { ValidaRelacaoDTORequest } from 'app/core/models/multilogin/request/multilogin-dto';
import { ValidaRelacaoDTOResponse } from 'app/core/models/multilogin/response/multilogin-dto';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';
import { UserService } from 'app/core/services/user/user.service';
@Injectable({
    providedIn: 'root'
})
export class MultiloginListarClientesResolver implements Resolve<ValidaRelacaoDTOResponse> {


    constructor(
        private _multiLoginAcessoService: MultiloginAcessoService,
        private _loading: LoadingService,
        private _userService: UserService,
        private _router: Router
    ) { }

    resolve(): Promise<ValidaRelacaoDTOResponse> {
        this._loading.start();
        return new Promise((listarCliente) => {
            let validaRelacaoRequest: ValidaRelacaoDTORequest = new ValidaRelacaoDTORequest();

            validaRelacaoRequest.canalSolicitante = environment.canal;
            validaRelacaoRequest.documentoRepresentante = this._userService.dadosUser.documento;
            validaRelacaoRequest.tipoRelacao = "R";
            validaRelacaoRequest.userName = `${environment.name}/${this._userService.dadosUser.documento}`;
            validaRelacaoRequest.usuario = environment.USUARIO_UE;

            this._multiLoginAcessoService.getValidaRelacao(validaRelacaoRequest).then((clientesListados) => {
                this._loading.stop();
                listarCliente(clientesListados);
            }).catch((error) => {
                this._loading.stop();
                listarCliente(error);
                this._router.navigate([PathCompleto.aviso],{queryParams: { titulo: EnumTitulosPadroes.Inesperado }})
            });
        });
    }
}
