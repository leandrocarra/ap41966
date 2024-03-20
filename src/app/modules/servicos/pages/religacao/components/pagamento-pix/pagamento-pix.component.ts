import { Clipboard } from '@angular/cdk/clipboard';
import { Location } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { GerarPixDTOResponse } from 'app/core/models/pix/response/pix-dto';
import { DadosFaturarReligacao } from 'app/core/models/religacao/religacao';
import { FaturaDTO } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { CodigoDeBarraFatura } from 'app/core/models/segunda-via/segunda-via.model';
import { GrupoTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { PixService } from 'app/core/services/pix/pix.service';
import { SegundaViaService } from 'app/core/services/segunda-via/segunda-via.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { configureMenuByWindowSize, converterParaReais, Meses } from 'app/core/services/utils/neo-utils.service';
import { SnackbarService } from 'app/shared/components/snackbar/snackbar.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-pagamento-pix',
    templateUrl: './pagamento-pix.component.html',
    styleUrls: ['./pagamento-pix.component.scss']
})
export class PagamentoPixComponent {

    @Input() dadosFatura: DadosFaturarReligacao = new DadosFaturarReligacao(0, new FaturaDTO(), 0);
    @Output() falhaGerarPix: EventEmitter<boolean> = new EventEmitter<boolean>();

    grupoTensao: GrupoTensao;
    mobile: boolean;
    codigoDeBarras: string;
    chaveAleatoriaPix: string;
    qrcodePix: string | SafeResourceUrl;

    constructor(
        private _clipboard: Clipboard,
        private _snackbarService: SnackbarService,
        private _location: Location,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _segundaViaService: SegundaViaService,
        private _loading: LoadingService,
        private _alertService: CustomSweetAlertService,
        private _domSanitizer: DomSanitizer,
        private _pixService: PixService,
    ) {
        window.scrollTo(0, 0);
        this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao);
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.codigoDeBarras = '';
        this.chaveAleatoriaPix = '';
        this.qrcodePix = '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.setarDadosPix();
    }

    setarDadosPix(): void {
        this._pixService.setFaturaSelecionada = this.dadosFatura.fatura;
        this.codigoDeBarras = this._segundaViaService.validarFaturaDadosDePagamento(this.dadosFatura.fatura.numeroFatura);
        if (this.codigoDeBarras == '') {
            this.solicitarCodigoDeBarra();
        } else {
            this.gerarNovoPix();
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    copiarBarraCode(): void {
        this._clipboard.copy(this.chaveAleatoriaPix);
        this._snackbarService.exibirSnackbar('Código PIX copiado com sucesso!', 'Fechar');
    }

    voltar(): void {
        this._location.back();
    }

    definirTitulo(): string {
        return `${this.dadosFatura.index + 1} de ${this.dadosFatura.totalFaturas} - FATURA ${this.mesReferencia()}`;
    }

    valorFatura(valor: string): string {
        return (environment.regiao === Regiao.NE) ? converterParaReais(valor) : `R$ ${valor}`;
    }

    mesReferencia(): string {
        if (this.dadosFatura.fatura.mesReferencia) {
            let data = this.dadosFatura.fatura.mesReferencia;
            let mes = new Date(data).getMonth();
            return Meses[mes ?? 0]
        } else {
            return 'Error';
        }
    }

    solicitarCodigoDeBarra(): void {
        this._loading.start();
        let tipoPagamento = (this.dadosFatura.fatura.tipoArrecadacao.toLocaleLowerCase() === "ficha compensação bancária");
        this._segundaViaService.obterDadosPagamentos(this.dadosFatura.fatura.numeroFatura, tipoPagamento).subscribe({
            next: (data) => {
                let dadosPagamentoResponseDTO = data;
                this.codigoDeBarras = dadosPagamentoResponseDTO.codBarras ?? '';
                this._segundaViaService.setDadosPagamento = new CodigoDeBarraFatura(this.dadosFatura.fatura, data);
                this.gerarNovoPix();
            }, error: () => {
                this._loading.stop();
                this.alertaFalharGerarPix();
            }, complete: () => {
                this._loading.stop();
            }
        })
    }

    gerarNovoPix(): void {
        this._loading.start();
        this._pixService.gerarPix(this.codigoDeBarras).subscribe({
            next: (pixGerado: GerarPixDTOResponse) => {
                this._pixService.setDadosDoPix = pixGerado;
                this.qrcodePix = this._domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${pixGerado.qr_code}`);
                this.chaveAleatoriaPix = pixGerado.qr_emv;
                this._loading.stop();
            }, error: () => {
                this._loading.stop();
                this.alertaFalharGerarPix();
            }
        });
    }

    alertaFalharGerarPix(): void {
        this._alertService.alertInfo('Erro ao gerar PIX').then(() => {
            this.falhaGerarPix.emit(true);
        });
    }
}
