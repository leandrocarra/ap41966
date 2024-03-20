import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { PathCompleto } from 'app/core/enums/servicos';
import { ContaCadastradaDebitoDTORequest } from 'app/core/models/debito-automatico/request/debito-automatico-dto';
import { EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { DebitoAutomaticoService } from 'app/core/services/debito-automatico/debito-automatico.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from 'app/core/services/user/user.service';
import { HttpErrorResponse } from "@angular/common/http";
import { take } from "rxjs";
import { ContaCadastradaDebitoDTOResponse } from "../../models/debito-automatico/response/debito-automatico-dto";
import { Regiao } from "../../enums/regiao";
import { SubRotasDebitoAutomatico } from "../../models/debito-automatico/sub-rota-debito-automatico";

@Injectable({
    providedIn: 'root'
})
export class DebitoAutomaticoResolver implements Resolve<boolean> {
    constructor(
        private _debitoAutomaticoService: DebitoAutomaticoService,
        private _selecaoImovelService: SelecaoImovelService,
        private _userService: UserService,
        private _loading: LoadingService,
        private _router: Router
    ) {
    }

    resolve(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this._debitoAutomaticoService.obterDebitoAutomatico()
                .pipe(take(1))
                .subscribe({
                    next: (data: ContaCadastradaDebitoDTOResponse) => {
                        if (data.debitoAutomatico && data.numeroContaCorrente) { //Retorno de sucesso com dados bancários
                            this._debitoAutomaticoService.setDebitoCadastrado = data;
                            this._debitoAutomaticoService.debitoAutomatico.debitoAutomaticoCadastrado = true;
                            this._debitoAutomaticoService.debitoAutomatico.debitoAutomaticoConfirmado = (environment.regiao === Regiao.SE) ? (data.debitoAutomatico !== "false") : true;
                            this._debitoAutomaticoService.debitoAutomatico.dadosBancarios.banco = (environment.regiao === Regiao.NE) ? `${data.codigoBanco} - ${data.nomeCompletoBanco}` : `${data.codigoBanco}`;
                            this._debitoAutomaticoService.debitoAutomatico.dadosBancarios.agencia = data.codigoAgencia;
                            this._debitoAutomaticoService.debitoAutomatico.dadosBancarios.conta = data.numeroContaCorrente;
                            this._debitoAutomaticoService.debitoAutomatico.uc = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
                            this._debitoAutomaticoService.setDebitoAutomatico = this._debitoAutomaticoService.debitoAutomatico;
                        } else {
                            this._router.navigate([PathCompleto.debitoAutomatico, SubRotasDebitoAutomatico.InformacoesDePagamento]);
                        }

                        resolve(true);
                    },
                    error: (httpError: HttpErrorResponse) => {
                        if (httpError.error?.retorno?.mensagem) {
                            this._router.navigate([PathCompleto.aviso], {queryParams: {titulo: httpError.error?.retorno?.mensagem}});
                        } else {
                            this._router.navigate([PathCompleto.aviso], {queryParams: {titulo: EnumTitulosPadroes.Inesperado}});
                        }
                        resolve(false);
                    }
                });
        });
    }
}



