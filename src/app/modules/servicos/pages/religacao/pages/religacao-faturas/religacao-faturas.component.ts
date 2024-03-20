import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasReligacao } from 'app/core/models/religacao/sub-rotas-religacao';
import { FaturaDTO } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { Status } from 'app/core/models/segunda-via/segunda-via.model';
import { GrupoTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { ReligacaoService } from 'app/core/services/religacao/religacao.service';
import { SegundaViaService } from 'app/core/services/segunda-via/segunda-via.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { converterParaReais } from 'app/core/services/utils/neo-utils.service';
import { whatsAppUrl } from 'app/core/services/utils/utils.service';
import { take } from 'rxjs';
import { DialogPagamentoComponent } from '../../components/dialog-pagamento/dialog-pagamento.component';
import { Religacao } from 'app/core/models/religacao/religacao';

@Component({
    selector: 'app-religacao-faturas',
    templateUrl: './religacao-faturas.component.html',
    styleUrls: ['./religacao-faturas.component.scss']
})
export class ReligacaoFaturasComponent {
    grupoTensao: string;
    faturas: Array<FaturaDTO>;
    textoInformativoFaturas: string;
    valorTotalFaturas: number;
    dados: Religacao;
    regiao: Regiao;
    constructor(
        private _religacaoService: ReligacaoService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _router: Router,
        private _location: Location,
        private _dialog: MatDialog,
        private _alert: CustomSweetAlertService,
        private _segundaViaService: SegundaViaService
    ) {
        this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao);
        this.dados = this._religacaoService.getDadosReligacao;
        this.regiao = environment.regiao;
        this.faturas = this._religacaoService.getDadosReligacao.faturas;
        this.textoInformativoFaturas = (this.faturas.length === 1) ? `${this.faturas.length} fatura atrasada` : `${this.faturas.length} faturas atrasadas`;
        this.valorTotalFaturas = this.faturas.reduce(function (total, fatura) {
            fatura.selecionado = true;
            let valorFatura = (environment.regiao === Regiao.SE) ? fatura.valorEmissao.replace(".", "").replace(",", ".") : fatura.valorEmissao;
            return total + parseFloat(valorFatura);
        }, 0);
    }

    valorFatura(valor: string): string {
		return (environment.regiao === Regiao.NE) ? converterParaReais(valor) : `R$ ${valor}`;
	}

    getStatus(statusFatura: string): Status {
		return this._segundaViaService.getStatus(statusFatura);
	}

    voltar(): void {
        this._religacaoService.setDadosReligacao = this.dados;
        this._location.back();
    }

    faturasPaga(): void {
        this.dados.fluxo = 'pagamento comprovante';
        this.dados.falhasNoPagamento = this.faturas;
        this._religacaoService.setDadosReligacao = this.dados;
        this._router.navigate([PathCompleto.religacao, SubRotasReligacao.InformarDados]);
    }

    pagarFaturas(): void {
        this.dados.faturas = this.faturas;
        this._religacaoService.setDadosReligacao = this.dados;
        this._dialog.open(DialogPagamentoComponent, {
            maxWidth: '120vw',
            maxHeight: '95vh',
        });
    }

    redirecionarWhatsapp(): void {
        this._alert.alertDirecionamentoDePagamento("Você está sendo redirecionado para o nosso canal de atendimento via WhatsApp.");
        window.open(whatsAppUrl('Negociação de dívidas'), '_blank'); //chamada whatsApp
    }
}
