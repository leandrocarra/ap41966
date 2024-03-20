import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { PerfilAtivo } from 'app/core/models/multilogin/response/multilogin-dto';


@Component({
    selector: 'app-conjuge-block',
    templateUrl: './conjuge-block.component.html',
    styleUrls: ['./conjuge-block.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ConjugeBlockComponent implements OnInit {

    @Input() dadosUsuarioFilho!: PerfilAtivo;
    @Input() mostrarTodosDados: boolean;
    @Input() desabilitarBtn: boolean;
    @Output() executarAcao: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
        this.mostrarTodosDados = true;
        this.desabilitarBtn = true;
    }

    ngOnInit(): void {
        if (this.dadosUsuarioFilho.button == 'excluir') {
            this.desabilitarBtn = false;
        }
    }

    emitirAcao(): void {
        this.executarAcao.emit(this.dadosUsuarioFilho.button);
    }

    documentoMask(documento: string): string {
        return (documento.length > 11) ? documento.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : documento.replace((/(\d{3})(\d{3})(\d{3})(\d{2})/), "$1.$2.$3-$4")
    }

    formatarData(data: string): string {
        return data?.split(" ")[0] ?? 'N/A';
    }

}
