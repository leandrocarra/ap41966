import { Component, OnInit } from '@angular/core';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { LoadingService } from "../../../../../../../core/services/customsweetalert/loading.service";

@Component({
    selector: 'neo-bem-vindo',
    templateUrl: './bem-vindo.component.html',
    styleUrls: ['./bem-vindo.component.scss']
})
export class BemVindoComponent implements OnInit {
    constructor(
        private _userServiceLN: UserServiceLN,
        private _loading: LoadingService
    ) { }

    ngOnInit(): void {
        this._loading.stop();
    }

    setProtocolo(): void {
        this._userServiceLN.PROTOCOLO_SESSAO = this._userServiceLN.protocolo;
    }

}
