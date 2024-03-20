import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumAvisosPadroes, EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { TaxaReligacaoDTORequestSE, ValidaReligacaoDTORequest } from 'app/core/models/religacao/request/religacao-dto';
import {
    TaxaReligacaoDTOResponseSE,
    ValidaReligacaoDTOResponse
} from 'app/core/models/religacao/response/religacao-dto';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { ReligacaoService } from 'app/core/services/religacao/religacao.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { ExibirAvisoService } from 'app/shared/pages/exibir-aviso/exibir-aviso.service';

@Injectable({
    providedIn: 'root'
})
export class ReligacaoResolver implements Resolve<ValidaReligacaoDTOResponse> {

    constructor(
        private _loading: LoadingService,
        private _religacaoService: ReligacaoService,
        private _router: Router,
        private _selecaoDeImoveis: SelecaoImovelService,
        private _exibirAvisoService: ExibirAvisoService
    ) { }

    resolve(): Promise<ValidaReligacaoDTOResponse> {
        this._loading.start();
        return new Promise((religacaoValida) => {
            let validaReligacaoRequest: ValidaReligacaoDTORequest = new ValidaReligacaoDTORequest(
                this._selecaoDeImoveis.getInformacoesUCSelecionada.codigo,
                environment.canal,
                environment.USUARIO_UE
            );

            this._religacaoService.getValidaReligacao(validaReligacaoRequest).then((validarReligacao) => {
                this._loading.stop();

                switch (this.validarFluxo(validarReligacao.error?.retorno?.mensagem ?? validarReligacao.retorno?.mensagem)) {
                    case 1:
                        this._religacaoService.dadosReligacao.possuiNotaCorte = false;
                        if (environment.regiao == Regiao.SE) {
                            this.obterDadosTaxa();
                        }
                        religacaoValida(validarReligacao);
                        break

                    case 2:
                        this._religacaoService.dadosReligacao.possuiNotaCorte = true;
                        if (environment.regiao == Regiao.SE) {
                            this.obterDadosTaxa();
                        }
                        religacaoValida(validarReligacao);
                        break

                    case 3:
                        this.religacaoEmAndamento();
                        break

                    case 4:
                        this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: EnumTitulosPadroes.Inesperado } })
                        break
                }
            });
        });
    }

    obterDadosTaxa(): Promise<TaxaReligacaoDTOResponseSE> {
        this._loading.start();
        return new Promise((taxaReligacao) => {
            let taxaReligacaoRequestSE: TaxaReligacaoDTORequestSE = new TaxaReligacaoDTORequestSE(
                this._selecaoDeImoveis.getInformacoesUCSelecionada.codigo,
                environment.USUARIO_UE,
                environment.canal,
            );

            this._religacaoService.getObterTaxaReligacao(taxaReligacaoRequestSE).then((taxatReligacao) => {
                this._loading.stop();
                switch (this.validarFluxo(taxatReligacao.error?.retorno?.mensagem ?? taxatReligacao.retorno?.mensagem)) {
                    case 1:
                    case 2:
                        taxaReligacao(taxatReligacao);
                        break

                    case 3:
                        this.religacaoEmAndamento();
                        break

                    case 4:
                        this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: EnumTitulosPadroes.Inesperado } })
                        break
                }
            });
        });
    }

    validarFluxo(msg: string): number {
        const messageToNumber = new Map<string, number>([
            ['Unidade consumidora não está com a energia suspensa', 1],
            ['A Unidade Consumidora está fora da lista corte', 1],
            ['Executado com sucesso.', 2],
            ['OK', 2],
            ['Unidade consumidora já possui um pedido de Religação em andamento', 3],
        ]);
        if (msg.includes('Já existe pedido de religação em aberto')) {
            return 3;
        }
        return messageToNumber.get(msg) || 4;
    }


    religacaoEmAndamento(): void {
        this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: EnumTitulosPadroes.ReligacaoEmAndamento } })
    }

}
