import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { DadosFaturarReligacao, Religacao } from 'app/core/models/religacao/religacao';
import { SubRotasReligacao } from 'app/core/models/religacao/sub-rotas-religacao';
import { FaturaDTO } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { GrupoTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { PixService } from 'app/core/services/pix/pix.service';
import { ReligacaoService } from 'app/core/services/religacao/religacao.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { take } from 'rxjs';
import { PagamentoPixComponent } from '../../components/pagamento-pix/pagamento-pix.component';
import { ConsultarPixDTOResponse } from 'app/core/models/pix/response/pix-dto';

@Component({
    selector: 'app-pagar-com-pix',
    templateUrl: './pagar-com-pix.component.html',
    styleUrls: ['./pagar-com-pix.component.scss']
})
export class PagarComPixComponent implements AfterViewInit {
    grupoTensao: GrupoTensao;
    faturas: Array<FaturaDTO>;
    dadosFatura: DadosFaturarReligacao;
    dados: Religacao;

    @ViewChild(PagamentoPixComponent, { static: false })
    pagamentoPix!: PagamentoPixComponent

    constructor(
        private _location: Location,
        private _router: Router,
        private _religacaoService: ReligacaoService,
        private _pixService: PixService,
        private _loading: LoadingService,
        private _agenciaVirtualService: AgenciaVirtualService
    ) {
        window.scrollTo(0, 0);
        this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao);
        this.dados = this._religacaoService.getDadosReligacao;
        this.faturas = [];
        this.dados.faturas.forEach((elem) => {
            if (elem.selecionado)
                this.faturas.push(elem);
        });
        this.dadosFatura =  new DadosFaturarReligacao(this.faturas.length, this.faturas[0], 0);
    }

    ngAfterViewInit(): void {
        this.pagamentoPix.setarDadosPix();
    }

    voltar(): void {
        this._location.back();
    }

    continuar(): void {
        if (this.dadosFatura.index + 1 === this.faturas.length) {
            this._router.navigate([PathCompleto.religacao, SubRotasReligacao.InformarDados]);
        } else {
            if (this.dados.fluxo !== 'pagamento com erro') {
                this.validarPagamento();
            } else {
                this.proximaFatura();
            }
        }
    }

    falhaGerarPix(): void {
        this.dados = this._religacaoService.getDadosReligacao;
        this.dados.fluxo = 'pagamento com erro';
        this.dados.falhasNoPagamento?.push(this.dadosFatura.fatura);
        this._religacaoService.setDadosReligacao = this.dados;
        this.continuar();
    }

    validarPagamento(): void {
        this._loading.start();
        this._pixService.consultarPix(this._pixService.definirRequestConsulta()).subscribe({
            next: (consultaPix: ConsultarPixDTOResponse) => {
                if (this._pixService.descriptografar(consultaPix.status) === 'Pago') {
                    this.proximaFatura();
                }
            },
            error: () => {
                this._loading.stop();
                this.falhaGerarPix();
            }
        })
    }

    proximaFatura(): void {
        this.dadosFatura.index++;
        this.pagamentoPix.dadosFatura.fatura = this.faturas[this.dadosFatura.index];
        this.pagamentoPix.dadosFatura.index = this.dadosFatura.index;
        this.pagamentoPix.setarDadosPix();
    }
}








