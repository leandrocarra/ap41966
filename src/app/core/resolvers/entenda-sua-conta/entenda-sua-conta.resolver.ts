import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { PathCompleto } from "app/core/enums/servicos";
import { EntendaSuaContaDTORequest, EntendaSuaContaQualidadeDTORequest } from "app/core/models/entenda-sua-conta/request/entenda-sua-conta-dto";
import { EntendaSuaContaDTOResponse, EntendaSuaContaQualidadeDTOResponse } from "app/core/models/entenda-sua-conta/response/entenda-sua-conta-dto";
import { EnumTitulosPadroes } from "app/core/models/exibir-aviso/exibir-aviso";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { EntendaSuaContaService } from "app/core/services/entenda-sua-conta/entenda-sua-conta.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";

@Injectable({
    providedIn: 'root'
})
export class EntendaSuaContaResolver implements Resolve<EntendaSuaContaDTOResponse>{
    constructor(
        private _entendaSuaContaService: EntendaSuaContaService,
        private _loadingService: LoadingService,
        private _user: UserService,
        private _router: Router,
    ) { }

    resolve(): Promise<EntendaSuaContaDTOResponse> {
        this._loadingService.start();
        return new Promise((resolve) => {
            let entendaSuaConta = new EntendaSuaContaDTORequest(
                environment.canal,
                environment.USUARIO_UE,
                this._entendaSuaContaService.getFatura.numeroFatura.toString(),
            );

            if (environment.regiao == Regiao.SE) {
                entendaSuaConta.protocoloSonda = this._user.getProtocolo.protocoloLegado.toString();
                entendaSuaConta.gerarSSOS = 'S';
            }

            this._entendaSuaContaService.getConsultarEntendaSuaConta(entendaSuaConta).then((entendaSuaConta: EntendaSuaContaDTOResponse) => {
                resolve(entendaSuaConta);
            }).catch(() => {
                this._loadingService.stop();
                this._router.navigate(
                    [PathCompleto.entendaSuaConta, 'aviso'],
                    { queryParams: { titulo: EnumTitulosPadroes.Indisponivel } }
                )
            }).finally(() => {
                this._loadingService.stop();
            });
        });
    }
}

@Injectable({
    providedIn: 'root'
})
export class EntendaSuaContaQualidadeResolver implements Resolve<EntendaSuaContaQualidadeDTOResponse>{
    constructor(
        private _entendaSuaContaService: EntendaSuaContaService,
        private _loadingService: LoadingService,
        private _user: UserService,
        private _selecaoImovelService: SelecaoImovelService,
        private _router: Router,
    ) { }
    resolve(): Promise<EntendaSuaContaQualidadeDTOResponse> {
        this._loadingService.start();
        return new Promise((resolve) => {
            let entendaSuaContaQualidade = new EntendaSuaContaQualidadeDTORequest(
                environment.canal,
                environment.USUARIO_UE,
                this._entendaSuaContaService.getFatura.numeroFatura!.toString()
            );

            if (environment.regiao == Regiao.NE) {
                entendaSuaContaQualidade.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
            } else {
                entendaSuaContaQualidade.gerarSSOS = 'S';
            }

            this._entendaSuaContaService.consultarEntendaSuaContaQualidade(entendaSuaContaQualidade).then((entendaSuaContaQualidade: EntendaSuaContaQualidadeDTOResponse) => {
                resolve(entendaSuaContaQualidade);
            }).catch(() => {
                this._router.navigate(
                    [PathCompleto.entendaSuaConta, 'aviso'],
                    { queryParams: { titulo: EnumTitulosPadroes.Indisponivel } }
                )
            }).finally(() => {
                this._loadingService.stop();
            });
        });
    }
}
