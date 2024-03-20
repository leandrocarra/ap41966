import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { configureMenuByWindowSize } from "app/appLN/core/services/utils/neo-utils.service";
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
    selector: 'app-descadastrar-fatura-braile',
    templateUrl: './descadastrar-fatura-braile.component.html',
    styleUrls: ['./descadastrar-fatura-braile.component.scss']
})

export class DescadastrarFaturaBraileComponent implements OnInit {
    descadastrando: boolean = false;
    mobile: boolean;
    constructor(
        private _alertService: CustomSweetAlertService,
        private _router: Router,
        public user: UserService
        ) {
            this.mobile = configureMenuByWindowSize(window.screen.width);
        }

    ngOnInit(): void {
        this.user.breadcrumb = true;
        this._alertService.closeLoading();
        this.user.isFluxo = false;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    voltar(indexPage: any): void {
        if (indexPage == '0') {
            this._router.navigate(['home']);
        } else {
            this.descadastrando = false;
        }
    }

    descadastrar(indexPage: any): void {
        if (indexPage == '0') {
            window.scrollTo(0, 0);
            this.descadastrando = true;
            this.user.isFluxo = true;
        } else {
            this.user.breadcrumb = false;
            this.user.isFluxo = false;
            this._router.navigate(['servicos/fatura-braile/solicitacao-enviada']);
        }
    }

    cancelar(): void {
        this._alertService.alertConfirmarCancelamento().then(( r=> {
            if (r.value) {
              this._router.navigate(["home"]);
            }
        }));
    }
}
