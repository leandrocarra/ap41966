import { Component, OnDestroy, OnInit } from '@angular/core';
import { Aviso } from 'app/core/models/exibir-aviso/exibir-aviso';
import { UserService } from 'app/core/services/user/user.service';
import { ExibirAvisoService } from 'app/shared/pages/exibir-aviso/exibir-aviso.service';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-exibir-aviso',
    templateUrl: './exibir-aviso.component.html',
    styleUrls: ['./exibir-aviso.component.scss']
})
export class ExibirAvisoComponent implements OnInit, OnDestroy {
    private queryParamsSubscription!: Subscription;
    dadosDoAviso!: Aviso;
    grupoDoUsuario: string;

    constructor(
        private _user: UserService,
        private _avisoService: ExibirAvisoService,
        private _activatedRoute: ActivatedRoute,
    ) {
        this._user.breadcrumb = false;
        this.grupoDoUsuario = this._user.group;
    }

    ngOnInit(): void {
        this.queryParamsSubscription = this._activatedRoute.queryParams.subscribe(params => {
            if (params?.codigoAviso)  {
                this.dadosDoAviso = this._avisoService.retornarAvisoCompleto(params.codigoAviso, params.titulo, params.mensagem);
            } else {
                this.dadosDoAviso = this._avisoService.retornarAvisoSomenteTitulo(params.titulo);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.queryParamsSubscription) {
            this.queryParamsSubscription.unsubscribe();
        }
    }
}
