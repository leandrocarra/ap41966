import { Injectable } from "@angular/core";
import { ProtocoloDTOResponse } from "app/core/models/protocolo/response/protocolo-dto";
import { UserResponseDTO } from "app/core/models/UserDTO/userResponseDTO.model";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: "root",
})
export class UserService {

    updateDadosUser(user: UserResponseDTO, usarUsuarioAcessoStorage: boolean = false) {
        if (usarUsuarioAcessoStorage && this.storage.usuarioAcesso != undefined) {
            user.usuarioAcesso = this.storage.usuarioAcesso;
        } else {
            this.storage.setItem('usuarioAcesso', user.usuarioAcesso)
        }
        this.stageDadosUser.next(user)
    }

    private stageDadosUser = new BehaviorSubject<UserResponseDTO>(new UserResponseDTO())
    dadosUser: any;
    storage: Storage = sessionStorage;

    constructor() {

        if (!this!.group) {
            this.group = "B";
        }
        this.dadosUser = this.stageDadosUser.asObservable();
        console.log('v0.4.0');
    }

    isFluxo: boolean = false;
    breadcrumb: boolean = true;

    group: string;
    pageSelected!: boolean;
    isHistorico!: boolean;

    uc: any;
    enderecoCompleto: any;
    statusUc: any;

    /**
     * Getters e Setters ↓↓
     */

    get user(): any {
        return this.storage.user ? JSON.parse(this.storage.user) : null;
    }

    set user(val: any) {
        console.log(val);
        if (!val) this.storage.removeItem("user");
        else this.storage.setItem("user", val);
    }

    set setProtocolo(val: ProtocoloDTOResponse) {
        if (!val) this.storage.protocolo.removeItem("protocolo");
        else this.storage.protocolo = JSON.stringify(val);
    }

    get getProtocolo(): ProtocoloDTOResponse {
        return this.storage.protocolo ? JSON.parse(this.storage.protocolo) : null;
    }

    setGrupo() {
        return this.group;
    }
}
