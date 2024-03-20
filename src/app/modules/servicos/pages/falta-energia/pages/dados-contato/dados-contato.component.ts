import { Location } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { PathCompleto } from "app/core/enums/servicos";
import { EnumDadosContatoCorpo, FluxoFaltaDeEnergia } from "app/core/models/falta-de-energia/falta-de-energia";
import { SubRotasFaltaDeEnergia } from "app/core/models/falta-de-energia/sub-rotas-falta-de-energia";
import { FaltaDeEnergiaService } from "app/core/services/falta-de-energia/falta-de-energia.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";

@Component({
    selector: "app-dados-contato",
    templateUrl: "./dados-contato.component.html",
    styleUrls: ["./dados-contato.component.scss"],
})
export class DadosContatoComponent {
    textoTitulo: string;
    textoSubtitulo: string;
    textoLegendaDica: string;
    textoDica: string;
    textoExemplo: string;
    textoTituloInputs: string;

    groupColor: string;
    faltaDeEnergia: FluxoFaltaDeEnergia;
    isDisabled: boolean;
    mobile: boolean;

    dadosContato: FormGroup;

    constructor(
        private _faltaDeEnergiaService: FaltaDeEnergiaService,
        private _selecaoImovelService: SelecaoImovelService,
        private _router: Router,
        private _location: Location,
        private _user: UserService,
        private _formBuilder: FormBuilder
    ) {
        this._user.breadcrumb = true;
        this.textoTitulo = EnumDadosContatoCorpo.Titulo;
        this.textoSubtitulo = EnumDadosContatoCorpo.Subtitulo;
        this.textoLegendaDica = EnumDadosContatoCorpo.DicaLegenda;
        this.textoDica = EnumDadosContatoCorpo.DicaTexto;
        this.textoExemplo = EnumDadosContatoCorpo.DicaExemplo;
        this.textoTituloInputs = EnumDadosContatoCorpo.TituloInputs;

        window.scrollTo(0, 0);
        this.groupColor = this._user.group;
        this.isDisabled = true;
        this.mobile = configureMenuByWindowSize(window.screen.width);


        this.faltaDeEnergia = this._faltaDeEnergiaService.fluxoFaltaDeEnergia;

        this.dadosContato = this.createForm();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    createForm(): FormGroup {
        return this._formBuilder.group({
            celular: new FormControl(
                this._faltaDeEnergiaService.fluxoFaltaDeEnergia.telefone ?? this._selecaoImovelService.getContato,
                [
                    Validators.required,
                    Validators.maxLength(16),
                    Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/)
                ]
            ),
            referencia: [
                this._faltaDeEnergiaService.fluxoFaltaDeEnergia.referencia,
                [
                    Validators.required,
                    Validators.maxLength(this.calculaMaxLength())

                ]]
        });
    }

    get celular() { return this.dadosContato.get('celular'); }

    calculaMaxLength(): number {
        if (environment.regiao === Regiao.SE) {
            return 100 - this._faltaDeEnergiaService.getLengthObservacoes;
        }
        return 150;
    }

    voltar(): void {
        this._location.back();
    }

    atualizaDados(): void {
        this._faltaDeEnergiaService.fluxoFaltaDeEnergia.telefone = this.dadosContato.value.celular;
        this._faltaDeEnergiaService.fluxoFaltaDeEnergia.referencia = this.dadosContato.value.referencia;
    }

    continuar(): void {
        this.atualizaDados();
        this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.ConfiraSeusDados]);
    }
}
