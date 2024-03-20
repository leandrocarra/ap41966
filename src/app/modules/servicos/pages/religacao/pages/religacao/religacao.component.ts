import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumOpcoesStatusUC } from 'app/core/models/meus-imoveis/meus-imoveis';
import { Religacao } from 'app/core/models/religacao/religacao';
import { SubRotasReligacao } from 'app/core/models/religacao/sub-rotas-religacao';
import { GrupoTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { ReligacaoService } from 'app/core/services/religacao/religacao.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from 'app/core/services/user/user.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-religacao',
    templateUrl: './religacao.component.html',
    styleUrls: ['./religacao.component.scss']
})
export class ReligacaoComponent implements OnInit {
    grupoTensao: GrupoTensao;
    dados: Religacao;

    constructor(
        private _alertService: CustomSweetAlertService,
        private _userService: UserService,
        private _religacaoService: ReligacaoService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _selecaoImovelService: SelecaoImovelService,
        private _router: Router,
        private _location: Location,

    ) {
        window.scrollTo(0, 0);
        this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao)
        this.dados = this._religacaoService.getDadosReligacao;
    }

    ngOnInit(): void {

        if(this.validarStatusUC())
        this._alertService.alertUcSemEnergia().then((result => {
            if (!result.value) {
                this._router.navigate([PathCompleto.home]);
            } else {
                this._alertService.alertFornecimentoDeEnergia()

            }
        }));
        this._userService.isFluxo = false;
    }

    validarStatusUC(): boolean {
        if ((this._selecaoImovelService.getInformacoesUCSelecionada.situacao.descricao === EnumOpcoesStatusUC.Ligada ||
            this._selecaoImovelService.getInformacoesUCSelecionada.situacao.descricao === EnumOpcoesStatusUC.Cortada) &&
            !this.dados.possuiNotaCorte) {
                return true;
        } else {
            return false;
        }
    }

    continuar(): void {
        if (this.dados.faturas?.length > 0) {
            this._router.navigate([PathCompleto.religacao, SubRotasReligacao.Faturas]);
        } else {
            this.dados.fluxo = 'sem débitos';
            this._religacaoService.setDadosReligacao = this._religacaoService.dadosReligacao;
            this._router.navigate([PathCompleto.religacao, SubRotasReligacao.InformarDados]);
        }
    }

    voltar(): void {
        this._location.back();
    }
}

