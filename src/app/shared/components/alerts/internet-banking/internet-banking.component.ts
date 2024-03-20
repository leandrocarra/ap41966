import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DadosPagamentoDTORequest } from 'app/core/models/segunda-via/request/segunda-via-request-dto';
import { DadosPagamentoDTOResponse } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { Banco, CodigoDeBarraFatura } from 'app/core/models/segunda-via/segunda-via.model';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { SegundaViaService } from 'app/core/services/segunda-via/segunda-via.service';
import { UserService } from 'app/core/services/user/user.service';
import { formatarSeparadoresNumericos } from 'app/core/services/utils/neo-utils.service';
import { HeaderMetodo } from 'app/shared/models/header-metodo/header-metodo';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { SelecaoImovelService } from './../../../../core/services/selecao-de-imovel/selecao-de-imovel.service';

export interface InternetBankingComponent {
    fatura: any;
    tipoFatura: string;
}
@Component({
    selector: 'app-internet-banking',
    templateUrl: './internet-banking.component.html',
    styleUrls: ['./internet-banking.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InternetBankingComponent {
    grupoDoUsuario: string;
    bancos: Array<Banco>;
    recomendacoes: Array<string>;
    linkAviso: string;
    fatura!: any;
    codigoDeBarras: string;
    endereco: string;
    dadosPagamentoRequestDTO: DadosPagamentoDTORequest;
    dadosPagamentoResponseDTO: DadosPagamentoDTOResponse;

    constructor(
        private _userService: UserService,
        private _dialogRef: MatDialogRef<InternetBankingComponent>,
        private _clipboard: Clipboard,
        private _snackbarService: SnackbarService,
        private _segundaViaService: SegundaViaService,
        private _alertService: CustomSweetAlertService,
        private _selecaoImovelService: SelecaoImovelService,
        @Inject(MAT_DIALOG_DATA) public data: InternetBankingComponent
    ) {
        this.dadosPagamentoRequestDTO = new DadosPagamentoDTORequest('', new HeaderMetodo());
        this.dadosPagamentoResponseDTO = new DadosPagamentoDTOResponse();
        this.fatura = data.fatura;
        this.codigoDeBarras = (this.data.tipoFatura === 'faturaSimplificada') ? this.data.fatura.codbarras : '';
        this.endereco = (this.data.tipoFatura === 'faturaSimplificada') ? this.data.fatura.endereco : this._selecaoImovelService.getInformacoesUCSelecionada.local.endereco;
        this.grupoDoUsuario = this._userService.group;
        this.linkAviso = "assets/images/icons/aviso.svg";
        this.bancos = [
            new Banco('https://www.itau.com.br/', 'Itaú', 'assets/images/icons/logo_itau.png'),
            new Banco('https://www.santander.com.br/', 'Santander', 'assets/images/icons/logo_stdr.png'),
            new Banco('https://banco.bradesco/', 'Bradesco', 'assets/images/icons/logo_bradesco.png'),
            new Banco('https://internetbanking.caixa.gov.br/sinbc/#!nb/login', 'Caixa', 'assets/images/icons/logo_caixa.png'),
            new Banco('https://www.bb.com.br/', 'Banco do Brasil', 'assets/images/icons/logo_bb.png')
        ];

        this.recomendacoes = [
            'O seu pagamento pode ser confirmado em 5 horas se for feito através dos bancos conveniados (Itaú, Santander, Bradesco, Caixa e Banco do Brasil).',
            'Para os demais bancos, a confirmação será feita em até 72 horas.',
            'Lembre-se de pagar seu boleto até a data de vencimento original de sua fatura para evitar juros e multa.'
        ];

        if (this.data.tipoFatura !== 'faturaSimplificada') {
            this.validarCodigoDeBarras()
        }

    }

    validarCodigoDeBarras(): void {
        this.codigoDeBarras = this._segundaViaService.validarFaturaDadosDePagamento(this.data.fatura.numeroFatura);
        if (this.codigoDeBarras === '') {
            this.solicitarCodigoDeBarras();
        }
    }

    solicitarCodigoDeBarras(): void {
        this._alertService.showLoading();
        this._segundaViaService.obterDadosPagamentos(this.data.fatura.numeroFatura).subscribe({
            next: (data) => {
                this.dadosPagamentoResponseDTO = data;
                this.codigoDeBarras = this.definirCodigoDeBarras();
                this._segundaViaService.setDadosPagamento = new CodigoDeBarraFatura(this.fatura, data)
            }, error: () => {
                this._dialogRef.close();
                this._alertService.alertInfo('Ocorreu um erro inesperado.');
            }, complete: () => {
                this._alertService.closeLoading();
            }
        });
    }

    definirCodigoDeBarras(): string {
        return (this.dadosPagamentoResponseDTO.codBarras ?? this.dadosPagamentoResponseDTO.numeroBoleto) ?? '';
    }

    fecharAlerta(): void {
        this._dialogRef.close();
    }

    copiarCodigoDeBarras(): void {
        this._clipboard.copy(this.codigoDeBarras);
        this._snackbarService.exibirSnackbar('Código de Barras copiado com sucesso!', 'Fechar', 3);
    }

    formatarValor(valor: string): string {
        return formatarSeparadoresNumericos(valor);
    }
}
