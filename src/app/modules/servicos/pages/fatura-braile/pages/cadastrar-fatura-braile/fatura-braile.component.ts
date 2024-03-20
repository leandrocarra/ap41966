import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { configureMenuByWindowSize } from "app/appLN/core/services/utils/neo-utils.service";
import { PathCompleto } from "app/core/enums/servicos";
import { CustomSweetAlertService } from "app/core/services/customsweetalert/custom-sweet-alert.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";

@Component({
    selector: 'app-fatura-braile',
    templateUrl: './fatura-braile.component.html',
    styleUrls: ['./fatura-braile.component.scss']
})

export class FaturaBraileComponent implements OnInit {

    servicoCadastrado: any;
    tipoCadastro!: string;
    mobile: boolean;

    constructor(
        public alert: CustomSweetAlertService,
        public user: UserService,
        private _router: Router,
        private _selecaoImovelService: SelecaoImovelService,
    ) {
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.servicoCadastrado = this._selecaoImovelService.getInformacoesUCSelecionada.servicos!.faturaBraile;
    }

    ngOnInit(): void {
        this.user.breadcrumb = true;
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
            this.servicoCadastrado = false; //TODO: TEM QUE TER ISSO?
        }
    }

    cadastrar(): void {
        window.scrollTo(0, 0);
        this.servicoCadastrado = true;
        this.user.isFluxo = true;
    }

    continuar(): void {
        this.user.breadcrumb = false;
        this.user.isFluxo = false;
        this._router.navigate(['servicos/fatura-braile/solicitacao-enviada']);
    }

    cancelar(): void {
        this.alert.alertConfirmarCancelamento().then((r => {
            if (r.value) {
                this._router.navigate([PathCompleto.home]);
            }
        }))
    }

}
