import { Injectable } from '@angular/core';
import {
    Resolve
} from '@angular/router';
import { environment } from '@environments/environment';
import { ObterVinculosDTORequest } from 'app/core/models/multilogin/request/multilogin-dto';
import { ObterVinculosDTOResponse } from 'app/core/models/multilogin/response/multilogin-dto';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';
import { UserService } from 'app/core/services/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class MultiloginCompartilharAcessoResolver implements Resolve<boolean> {

    constructor(
        private _multiloginAcessoService: MultiloginAcessoService,
        private _loading: LoadingService,
        private _userService: UserService,
    ) { }


    resolve(): Promise<ObterVinculosDTORequest | any> {
        return new Promise((vinculosConcedidos) => {
            this._loading.start();
            let request: ObterVinculosDTORequest = new ObterVinculosDTORequest(
                `${environment.name}/${this._userService.dadosUser.documento}`,
                this._multiloginAcessoService.definirDocumento()
            );

            this._multiloginAcessoService.getObterVinculoConcedido(request).then((vinculos: ObterVinculosDTOResponse    ) => {
                this._loading.stop();
                this._multiloginAcessoService.definirGrupos(vinculos);
                vinculosConcedidos(vinculos);
            }).catch(() => {
                this._loading.stop();
                vinculosConcedidos([]);
            });
        });
    }

}
