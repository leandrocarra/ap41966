import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumFluxoAutoleitura, EnumLeiturasNaMedia, EnumTipificacaoAutoleitura, FluxoAutoLeitura, Leitura, SubRotasAutoleitura } from 'app/core/models/autoleitura/autoleitura';
import { EnumIdTermo } from 'app/core/models/termo-de-adesao/termo-de-adesao';
import { AutoleituraService } from 'app/core/services/autoleitura/autoleitura.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { TermoDeAdesaoService } from 'app/core/services/termo-de-adesao/termo-de-adesao.service';
import { DialogTermoDeUsoComponent } from 'app/shared/components/dialog-termo-de-uso/dialog-termo-de-uso.component';

@Component({
    selector: 'app-autoleitura',
    templateUrl: './autoleitura.component.html',
    styleUrls: ['./autoleitura.component.scss']
})
export class AutoleituraComponent implements OnInit {
    periodoInicio: Date;
    periodoFim: Date;
    checkTermo: boolean;
    leituras: any;
    naMedia: string;
    leituraJaInformada: boolean;
    semMaisTentativasParaLeitura: boolean;
    termosDeUsoAceitos: boolean;
    dentroDoPeriodoDeLeitura: boolean;

    //variavel html
    fluxo: FluxoAutoLeitura;
    medidor: string;
    sudeste: string;
    regiao: string;
    leiturasPeriodoAtual: Array<Leitura>
    constructor(
        private _alert: CustomSweetAlertService,
        private _router: Router,
        private _location: Location,
        private _autoleituraService: AutoleituraService,
        private _matDialog: MatDialog,
        private _termoDeAdesaoService: TermoDeAdesaoService,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.checkTermo = this._autoleituraService.autoleitura.termosDeUsoAceitos;
        this.periodoInicio = this._autoleituraService.autoleitura.dataInicio ?? new Date();
        this.periodoFim = this._autoleituraService.autoleitura.dataFim ?? new Date();
        this.fluxo = this._autoleituraService.autoleitura.fluxo;
        this.medidor = this._autoleituraService.autoleitura.medidor;
        this.regiao = environment.regiao;
        this.sudeste = Regiao.SE;
        this.semMaisTentativasParaLeitura = this._autoleituraService.getFlagSemMaisTentativas;
        this.leituraJaInformada = this._autoleituraService.getFlagLeituraInformadaMesmoDia;
        this.termosDeUsoAceitos = this._autoleituraService.autoleitura.termosDeUsoAceitos;
        this.leiturasPeriodoAtual = this._autoleituraService.autoleitura.leiturasDestePeriodo;
        this.dentroDoPeriodoDeLeitura = this._autoleituraService.autoleitura.dentroDoPeriodoDeLeitura
        this.naMedia = EnumLeiturasNaMedia.NaMedia;
        this.leituras = (environment.regiao === Regiao.SE) ? this._activatedRoute.snapshot.data.leituras : [];

    }

    ngOnInit(): void {
        if (this.regiao === Regiao.NE) {
            this.exibirDialogParaFluxoNE();
        }
    }

    exibirDialogParaFluxoNE(): void {
        let mensagem = this.dentroDoPeriodoDeLeitura ? "Serão desconsideradas as informações preenchidas para faturamento dentro do mesmo período previsto." : "Serão desconsideradas as informações preenchidas para faturamento fora período previsto."
        if ((this.dentroDoPeriodoDeLeitura && this._autoleituraService.autoleitura.semMaisTentativasParaLeitura) || !this.dentroDoPeriodoDeLeitura) {
            this._alert.alertAnaliseAutoLeitura(mensagem).then((result) => {
                if (!result.value) {
                    this._router.navigate([PathCompleto.home]);
                }
            });
        }
    }

    voltar(): void {
        this._location.back();
    }

    informarAutoleitura(): void {
        this._router.navigate([PathCompleto.autoleitura, SubRotasAutoleitura.InformarAutoleitura]);
    }

    cadastrarTermoDeAdesaoAutoleitura(): void {
        this._termoDeAdesaoService.cadastrarTermoDeAdesao(
            EnumIdTermo.Autoleitura,
            EnumTipificacaoAutoleitura.Solicitacao
        );
    }

    exibirDialogTermosDeUso(): void {
        this._matDialog.open(DialogTermoDeUsoComponent, {
            maxWidth: '900px',
            minWidth: '310px'
        });
    }

    validarLeitura(): string {
        if (this.dentroDoPeriodoDeLeitura) {
            if (this.leituraJaInformada && !this.semMaisTentativasParaLeitura) {
                return 'Deseja corrigir? Você só poderá realizar essa alteração uma vez.';
            } else if (this.leituraJaInformada && this.semMaisTentativasParaLeitura) {
                return 'Por favor, aguarde novo ciclo para o registro.'
            }
        } else {
            return 'Serão desconsideradas informações preenchidas para faturamento fora do período previsto.'
        }
        return '';
    }

    selecionarTextoDoAlerta(): string {
        if (this.fluxo === EnumFluxoAutoleitura.Leitura && this.regiao === Regiao.NE && this.dentroDoPeriodoDeLeitura) return 'JÁ INFORMOU A LEITURA HOJE.';
        if (this.fluxo === EnumFluxoAutoleitura.Leitura && this.regiao === Regiao.NE && this.leituraJaInformada && this.semMaisTentativasParaLeitura) return 'LEITURA JÁ INFORMADA PARA O PERÍODO VIGENTE.';
        if (this.fluxo === EnumFluxoAutoleitura.Simulacao && this.regiao === Regiao.SE) return 'VOCÊ AINDA NÃO ESTÁ NO PERÍODO DE AUTOLEITURA!';
        if (this.fluxo === EnumFluxoAutoleitura.Leitura && this.regiao === Regiao.NE && !this.dentroDoPeriodoDeLeitura) return 'SUA AUTOLEITURA SERÁ ANALISADA!';
        return 'FAÇA SUA AUTOLEITURA AGORA!';
    }

    selecionarTextoDoBotao(): string {
        if (this.leituraJaInformada && !this.semMaisTentativasParaLeitura && this.regiao === Regiao.NE) return 'CORRIGIR AUTOLEITURA';
        if (this.fluxo === EnumFluxoAutoleitura.Leitura || this.regiao === Regiao.NE) return 'INFORMAR AUTOLEITURA';
        if (this.regiao === Regiao.SE) return 'SIMULAR AUTOLEITURA';
        return '';
    }
}
