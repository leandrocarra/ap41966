import { Injectable } from "@angular/core";
import { CanActivate, CanLoad } from '@angular/router';
import { TokenService } from "../services/token/token.service";
import { UserService } from "../services/user/user.service";
import { AgenciaVirtualService } from "../services/utils/admin/agencia-virtual.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private _agenciaVirtualService: AgenciaVirtualService,
        private _tokenService: TokenService,
        private _userService: UserService
        ) { }

    canActivate(): boolean {
        return this.verificarAcesso();
    }

    canLoad(): boolean {
        return this.verificarAcesso();
    }

    private verificarAcesso(): boolean {
        if (this._tokenService.idToken) {
            this._userService.dadosUser = this._tokenService.decodePayloadJwt(true);
            this._agenciaVirtualService.verificarSeExisteProtocolo()
            return true;
        } else {
            return false;
        }
    }
}
