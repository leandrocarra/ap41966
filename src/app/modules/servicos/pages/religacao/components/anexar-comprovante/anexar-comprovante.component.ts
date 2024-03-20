import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { Anexo } from 'app/core/models/anexo/anexo';
import { BoxAnexo } from 'app/core/models/documentos/box-anexo/box-anexo';
import { Religacao } from 'app/core/models/religacao/religacao';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { ReligacaoService } from 'app/core/services/religacao/religacao.service';

const CONST_MB: number = 1000000;

@Component({
    selector: 'app-anexar-comprovante',
    templateUrl: './anexar-comprovante.component.html',
    styleUrls: ['./anexar-comprovante.component.scss']
})
export class AnexarComprovanteComponent {

    @Output() arquivosAnexados: EventEmitter<boolean> = new EventEmitter<boolean>();

    dadosBoxAnexo: BoxAnexo;
    comprovantes: Array<Anexo>;
    dados: Religacao
    tamanhoMaximoArquivo: number; // Bytes
    formatosParaAnexar: string;
    infoDoc: string
    constructor(
        private _religacaoService: ReligacaoService,
        private _alert: CustomSweetAlertService
    ) {
        this.dados = this._religacaoService.getDadosReligacao;
        this.dadosBoxAnexo = this.dados.boxAnexo ?? new BoxAnexo('COMPROVANTE DE PAGAMENTO', false, 'COMPROVANTE DE PAGAMENTO');
        this.comprovantes = this.dados.comprovantes ?? [];
        this.formatosParaAnexar = environment.regiao === Regiao.NE ? '.jpg, .jpeg' : '.png, .jpg, .jpeg, .pdf';
        this.tamanhoMaximoArquivo = environment.regiao === Regiao.NE ? 1000000 : 2500000;
        this.infoDoc = `- Anexe mais de um documento ao mesmo tempo.\n
                        - Tamanho máximmo para anexo é de ${this.tamanhoMaximoArquivo / CONST_MB}MB.\n
                        - Aceito apenas anexos no formato ${this.formatosParaAnexar}.`;
        this.arquivosAnexados.emit(this.validarQuantidadeComprovante());
    }

    receberAnexo(arquivo: Anexo): void {
        if (this.validarQuantidadeComprovante()) {
            let msgComprovanteRecebido = (this.dados.faturas.length === 1) ?
                "Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo." : "Já recebemos todos os comprovantes, para enviar novamente, delete um documento abaixo.";
            this._alert.alertInfo(msgComprovanteRecebido);
            this.arquivosAnexados.emit(true);
        } else {
            this.comprovantes.push(arquivo);
            this.setarValores();
            this.arquivosAnexados.emit(this.validarQuantidadeComprovante());
        }
    }

    removerAnexoIndex(indexArquivo: any): void {
        this.comprovantes.splice(indexArquivo, 1);
        this.setarValores();
        this.arquivosAnexados.emit(false);
    }

    validarQuantidadeComprovante(): boolean {
        return (this.comprovantes.length === this._religacaoService.getDadosReligacao.falhasNoPagamento?.length);
    }

    setarValores(): void {
        this.dados.comprovantes = this.comprovantes;
        this._religacaoService.setDadosReligacao = this.dados;
    }

}
