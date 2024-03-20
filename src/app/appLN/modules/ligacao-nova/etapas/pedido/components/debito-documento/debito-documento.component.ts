import { Component, EventEmitter, Output } from '@angular/core';
import { DebitoFaturaService } from '../../../../../../core/services/debito-fatura/debito-fatura.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';

@Component({
  selector: 'neo-debito-documento',
  templateUrl: './debito-documento.component.html',
  styleUrls: ['./debito-documento.component.scss']
})
export class DebitoDocumentoComponent {
    @Output() faturasAPagar = new EventEmitter();
    @Output() valorAPagar = new EventEmitter();
    @Output() totalFaturas = new EventEmitter();
    @Output() obterUc = new EventEmitter();
    tipoDoDocumento: string;
    faturasVencidas: Array<any>;
    listaFaturas: Array<any>;
    selectItem: boolean;
    selectAll: boolean;
    valorTotalDebitosNoDoc: number;
    constructor(
        private _userServiceLN: UserServiceLN,
        private _debitoFaturaService: DebitoFaturaService,
    ) {
        this.tipoDoDocumento = this._userServiceLN.tipoDocumento;
        this.faturasVencidas = this._debitoFaturaService.getPendencias;
        this.listaFaturas = [];
        this.selectItem = false;
        this.selectAll = false;
        this.valorTotalDebitosNoDoc = 0;
        this._debitoFaturaService.codigoCliente = this._userServiceLN.sessionUser?.codUsuario;
    }

    onSelectAll(): void {
        this.listaFaturas = [];
        this.valorTotalDebitosNoDoc = 0;

        if (!this.selectItem) {
        this.selectItem = true;
        this.faturasVencidas.forEach((vencidas: any) => {
            this.listaFaturas.push(vencidas.numeroFatura);
            this.valorTotalDebitosNoDoc += vencidas.valorEmissao;
        });
        } else {
        this.selectItem = false;
        this.listaFaturas = [];
        this.valorTotalDebitosNoDoc = 0;
        }

        this.faturasAPagar.emit(this.listaFaturas);
        this.valorAPagar.emit(this.valorTotalDebitosNoDoc);
        this.totalFaturas.emit(this.faturasVencidas.length);
        this.obterUc.emit(this.faturasVencidas[0].uc);
    }

    faturasSelecionadas(vencida: any): void {
        if (this.listaFaturas) {
        let hasAdded = this.listaFaturas.includes(vencida.numeroFatura);

        if (hasAdded) {
            let index = this.listaFaturas.indexOf(vencida.numeroFatura);
            this.listaFaturas.splice(index, 1);
            this.valorTotalDebitosNoDoc -= vencida.valor;
            vencida.selectItem = false;
        } else {
            this.listaFaturas.push(vencida.numeroFatura);
            this.valorTotalDebitosNoDoc += vencida.valor;
            vencida.selectItem = true;
        }
        }

        this.mudarSelecionarTodos();
        this.faturasAPagar.emit(this.listaFaturas);
        this.valorAPagar.emit(this.valorTotalDebitosNoDoc);
        this.totalFaturas.emit(this.faturasVencidas.length);
        this.obterUc.emit(this.faturasVencidas[0].uc);
    }

    mudarSelecionarTodos(): void {
        this.selectAll = this.listaFaturas.length === this.faturasVencidas.length ? true : false;
        this.valorTotalDebitosNoDoc = !this.listaFaturas.length ? 0 : this.valorTotalDebitosNoDoc;
    }

    formatarData(data: any) {
        const vencimento = new Date(data);
        var mes = vencimento.getMonth();
        var mesExtenso = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        return mesExtenso[mes];
    }

    getDate(data: any): Date {
        return new Date(data);
    }

    diasDeAtraso(dataVencimento: string) {
        const hoje = new Date();
        const vencimento = new Date(dataVencimento);
        const diferença = Math.abs(hoje.getTime() - vencimento.getTime());
        const dias = Math.ceil(diferença / (1000 * 60 * 60 * 24));
        return dias - 1;
    }
}
