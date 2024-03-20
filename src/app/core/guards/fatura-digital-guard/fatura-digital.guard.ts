import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '@environments/environment';

import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import {
    EnumAvisosPadroes,
    EnumTitulosPadroes
} from 'app/core/models/exibir-aviso/exibir-aviso';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { FaturaDigitalService } from 'app/core/services/fatura-digital/fatura-digital.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { ExibirAvisoService } from 'app/shared/pages/exibir-aviso/exibir-aviso.service';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
providedIn: 'root'
})
export class FaturaDigitalGuard implements CanActivate {
	constructor(
		private _faturaDigitalService: FaturaDigitalService,
		private _selecaoImovelService: SelecaoImovelService,
        private _loadingService: LoadingService,
		private _router: Router
	) {	 }

	async canActivate(): Promise<boolean> {
         if(this._selecaoImovelService.unidadeSuspensa){
             this._router.navigate([PathCompleto.aviso], { queryParams: { codigoAviso: EnumAvisosPadroes.UnidadeSuspensa } });
            return false;
        }
        else {
            if (this.verificarSeRequisitosEstaoOK()) {
                if (environment.regiao === Regiao.NE) {
                    await this.validarFaturaDigitalNE();
                } else {
                    await this.validarFaturaDigitalSE();
                }
                return this.validarFaturaDigital();
            } else {
                return false;
            }
        }
	}

	validarFaturaDigital(): boolean {
		let validadores: Array<boolean> = [];
		validadores.push(this._selecaoImovelService.getInformacoesUCSelecionada.situacao.codigo !== 'DS');
		validadores.push(this._selecaoImovelService.getInformacoesUCSelecionada.situacao.codigo !== 'PT');
		if (environment.regiao === Regiao.NE) {
			validadores.push(this._faturaDigitalService.faturaDigitalResponseDTO.e_resultado === 'X');
		} else {
			validadores.push(this._selecaoImovelService.getInformacoesUCSelecionada.servicos.listaCorte === null || this._selecaoImovelService.getInformacoesUCSelecionada.servicos.listaCorte === 'N');
		}
		if (validadores.includes(false)) { //Se alguma das verificações acima resultar em 'false', a validação não está ok.
			this.redirecionarParaTelaDeAviso( { titulo: EnumTitulosPadroes.Inesperado });
			return false;
		}
		return true;
	}

	async validarFaturaDigitalNE(): Promise<boolean> {
		this._loadingService.start();
		return await new Promise((resolve, reject) => {
			this._faturaDigitalService.validarFaturaDigitalNE().then(() => {
				resolve(true);
			}).catch((error) => {
                this.redirecionarParaTelaDeAviso( { titulo: error?.error?.retorno?.mensagem || EnumTitulosPadroes.Inesperado })
				reject(false);
			}).finally(() => {
				this._loadingService.stop();
			});
		});
	}

	async validarFaturaDigitalSE(): Promise<boolean> {
		this._loadingService.start();
		return await new Promise((resolve, reject) => {
			this._faturaDigitalService.consultarFaturaDigitalSE().then(() => {
				resolve(true);
			}).catch((error) => {
				this.selecionarMensagemDeErro(error);
				reject(false);
			}).finally(() => {
				this._loadingService.stop();
			});
		});
	}

	verificarSeRequisitosEstaoOK(): boolean {
		if (environment.regiao === Regiao.NE && this.verificarContaColetivaNE()) {
			this.redirecionarParaTelaDeAviso( { titulo: EnumTitulosPadroes.ContaColetiva });
			return false;
		}
		if (this._selecaoImovelService.unidadeDesligada) {
            this._router.navigate(
                [PathCompleto.aviso],
                { queryParams: { codigoAviso: EnumAvisosPadroes.UnidadeDesligada } }
            );
			return false;
		}
		return true;
	}

	verificarContaColetivaNE(): boolean {
		return (this._selecaoImovelService.getUCSelecionada?.isGrupo === 'X');
	}

	redirecionarParaTelaDeAviso(queryParams: Object): void {
		this._router.navigate(
			[PathCompleto.aviso],
			{ queryParams: queryParams }
		);
	}

	selecionarMensagemDeErro(httpError: HttpErrorResponse): void {
        if (httpError?.error?.retorno?.mensagem) {
            this.redirecionarParaTelaDeAviso( { titulo: httpError.error.retorno.mensagem });
        } else {
            this.redirecionarParaTelaDeAviso( { titulo: EnumTitulosPadroes.Inesperado });
        }
	}
}
