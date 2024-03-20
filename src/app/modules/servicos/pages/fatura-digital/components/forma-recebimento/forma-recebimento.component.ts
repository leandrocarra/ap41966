import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { EnumRecebimento, TypeRecebimento } from "app/core/models/fatura-digital/fatura-digital";

@Component({
    selector: 'app-forma-recebimento',
    templateUrl: './forma-recebimento.component.html',
    styleUrls: ['./forma-recebimento.component.scss']
})
export class FormaRecebimentoComponent implements OnInit {
    @Input() dadosEnvioDaFatura!: TypeRecebimento;
    @Input() tipoRecebimento!: TypeRecebimento;
    @Input() mostrarBtn: boolean = false
    @Output() alterar = new EventEmitter();
    tipoRecebimentoCelular: boolean;
    constructor() {
        this.tipoRecebimentoCelular = false;
    }

    ngOnInit() { // Por que não funciona diretamente do constructor?
        this.tipoRecebimentoCelular = (this.tipoRecebimento === EnumRecebimento.whatsapp);
    }

    alterarDados(): void {
        this.alterar.emit(true);
    }
}