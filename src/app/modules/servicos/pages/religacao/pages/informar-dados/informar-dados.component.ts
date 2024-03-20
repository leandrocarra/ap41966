import { Location } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { Religacao } from 'app/core/models/religacao/religacao';
import { SubRotasReligacao } from 'app/core/models/religacao/sub-rotas-religacao';
import { GrupoTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { ReligacaoService } from 'app/core/services/religacao/religacao.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { take } from 'rxjs';

const CONST_MB: number = 1000000
@Component({
    selector: 'app-informar-dados',
    templateUrl: './informar-dados.component.html',
    styleUrls: ['./informar-dados.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InformarDadosComponent {
    formReligacao: FormGroup;
    grupoTensao: GrupoTensao;
    declaracaoDebito: boolean = false;
    possuiDebitos: string;
    dados: Religacao

    // Fluxo com débitos
    declaracaoDebitos!: boolean
    validarAnexos!: boolean;

    constructor(
        private _router: Router,
        private _location: Location,
        private _selecaoImovelService: SelecaoImovelService,
        private _formBuilder: FormBuilder,
        private _religacaoService: ReligacaoService,
        private _agenciaVirtualService: AgenciaVirtualService,
    ) {
        window.scrollTo(0, 0);
        this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao)
        this.dados = this._religacaoService.getDadosReligacao;
        this.formReligacao = this.createForm();
        this.possuiDebitos = this._religacaoService.getDadosReligacao.fluxo;

        if (this.possuiDebitos === 'pagamento comprovante' || this.possuiDebitos === 'pagamento com erro') {
            this.declaracaoDebito = false;
            this.validarAnexos = (this.dados.comprovantes?.length === this.dados.falhasNoPagamento?.length);
        }
    }

    createForm(): FormGroup {
        return this._formBuilder.group({

            telefone: [
                this.dados.telefone ?? this._selecaoImovelService.getContato,
                [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(20)
                ]
            ],

            referencia: [
                this.dados.referencia,
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(132)
                ]
            ]
        });
    }

    voltar(): void {
        this._location.back();
    }

    atualizarDadosReligacao(): void {
        this.dados = this._religacaoService.getDadosReligacao;
        this.dados.telefone = this.formReligacao.value.telefone;
        this.dados.referencia = this.formReligacao.value.referencia;
        this._religacaoService.setDadosReligacao = this.dados;
    }

    continuar(): void {
        this.atualizarDadosReligacao();
        this._router.navigate([PathCompleto.religacao, SubRotasReligacao.Confirmacao]);
    }

    retornaValorTelefone(): string {
        return `${this._selecaoImovelService.getInformacoesUCSelecionada.cliente?.contato?.telefone?.ddd}${this._selecaoImovelService.getInformacoesUCSelecionada.cliente?.contato?.telefone?.numero}`
    }

    arquivosAnexados(event: any): void {
        this.validarAnexos = event;
    }

    desabilitarBtContinuar(): boolean {
        if (this.possuiDebitos === 'sem débitos') {
            return this.formReligacao.invalid;
        } else {
            return this.formReligacao.invalid || !this.declaracaoDebitos || !this.validarAnexos;
        }
    }

}
