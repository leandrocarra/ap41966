import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { UCResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
    selector: 'app-dados-imovel-ligacao',
    templateUrl: './dados-imovel-ligacao.component.html',
    styleUrls: ['./dados-imovel-ligacao.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DadosImovelLigacaoComponent {

    @Input() codigoMedidor: any;
    telaAutoleitura: string | undefined;
    @Input() userUC: string;
    @Input() userEndereco: string;
    tipoEntregaFatura: string;

    constructor(
        private _user: UserService,
        private _activatedRoute: ActivatedRoute,
        private _selecaoImovelService: SelecaoImovelService
    ) {
        this.telaAutoleitura = this._activatedRoute.snapshot.routeConfig?.component?.name;
        this._user.uc = this._selecaoImovelService.getInformacoesUCSelecionada.codigo ?? '';
        this._user.enderecoCompleto = this.concatEnderecoCompleto() ?? '';
        this.userUC = this._user.uc;
        this.userEndereco = this._user.enderecoCompleto;
        this.tipoEntregaFatura = (this._selecaoImovelService.getInformacoesUCSelecionada.servicos.faturaEmail === 'S' ||
            this._selecaoImovelService.getInformacoesUCSelecionada.servicos.faturaEmail === 'X') ? "Fatura digital" : "Fatura impressa";
    }


    concatEnderecoCompleto(): string {
        if (this._selecaoImovelService.getUCSelecionada?.local.endereco != null) {
            return `${this._selecaoImovelService.getUCSelecionada?.local.endereco}, ${this._selecaoImovelService.getUCSelecionada?.local.bairro}, ${this._selecaoImovelService.getUCSelecionada?.local.municipio}, ${this._selecaoImovelService.getUCSelecionada?.local.uf}, <span id="dados-imovel-cep">${this._selecaoImovelService.getUCSelecionada?.local.cep}</span>`;
        } else {
            return '';
        }
    }
}

