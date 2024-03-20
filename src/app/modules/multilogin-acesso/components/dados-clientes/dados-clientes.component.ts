import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Relacao } from 'app/core/models/multilogin/response/multilogin-dto';
@Component({
    selector: 'app-dados-clientes',
    templateUrl: './dados-clientes.component.html',
    styleUrls: ['./dados-clientes.component.scss']
})
export class DadosClientesComponent {

    @Input() dadosClientes: Array<Relacao>;
    @Output() cliente = new EventEmitter();

    constructor() {
        this.dadosClientes = [];
    }

    clienteSelecionado(cliente: any): void {
        this.cliente.emit(cliente);
    }

    tipoDocumento(documento: string): string {
        return (documento.length > 11) ? 'CNPJ' : 'CPF';
    }

    documentoMask(documento: string): string {
        if (documento.length > 11) {
            return documento.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        } else {
            return documento.replace((/(\d{3})(\d{3})(\d{3})(\d{2})/), "$1.$2.$3-$4");
        }
    }

}
