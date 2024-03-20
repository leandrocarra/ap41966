import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {environment} from '@environments/environment';
import {Regiao} from 'app/core/enums/regiao';
import {PathCompleto} from 'app/core/enums/servicos';
import {OperacaoDataCerta} from 'app/core/models/data-certa/data-certa';
import {DataCertaValidaDTORequest} from 'app/core/models/data-certa/request/data-certa-dto';
import {DataCertaValidaDTOResponse} from "../../models/data-certa/response/data-certa-dto";
import {DataCertaService} from "../../services/data-certa/data-certa.service";
import {SelecaoImovelService} from "../../services/selecao-de-imovel/selecao-de-imovel.service";
import {EnumAvisosPadroes, EnumTitulosPadroes} from "../../models/exibir-aviso/exibir-aviso";
import {
    DialogAtencaoComponent
} from "../../../modules/servicos/pages/data-certa/components/dialog-atencao/dialog-atencao.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
    providedIn: 'root'
})
export class DataCertaGuard implements CanActivate {
    constructor(
        public dialog: MatDialog,
        private _selecaoImovelService: SelecaoImovelService,
        private _dataCertaService: DataCertaService,
        private _router: Router
    ) {
    }

    canActivate(): Promise<boolean> | boolean {
        return this.verificarAcesso();
    }

    private verificarAcesso(): Promise<boolean> {
        return new Promise((resolve) => {
            const requestDTO = this.preencherDadosDataCertaValida();
            if (this._selecaoImovelService.unidadeSuspensa) {
                this.exibirAviso({codigoAviso: EnumAvisosPadroes.UnidadeSuspensa });
                resolve(false);

            } else if (this._selecaoImovelService.unidadeDesligada) {
                this.exibirAviso({codigoAviso: EnumAvisosPadroes.UnidadeDesligada});
                resolve(false);
            } else if ((this._selecaoImovelService.ehColetivaFilha || this._selecaoImovelService.ehContaContratoMae) && environment.regiao === Regiao.NE) {
                this.exibirAviso({titulo: this._selecaoImovelService.ehColetivaFilha ? EnumTitulosPadroes.ContaColetivaFilha : EnumTitulosPadroes.ContaColetiva});
                resolve(false);

            } else {
                this._dataCertaService.getDataCertaValida(requestDTO).subscribe({
                    next: (responseDTO: DataCertaValidaDTOResponse) => {
                        this._dataCertaService.dataCertaValidaResponseDTO = responseDTO;
                        resolve(this.permitirAcesso());
                    },
                    error: (error: HttpErrorResponse) => {
                        if (error.status === 400){
                            this.exibirAviso({titulo: error.error?.retorno?.mensagem });
                            resolve(false);
                        }
                        else{
                            resolve(this.tratarErrosDataCerta(error));
                        }
                    }
                });
            }
        });
    }

    preencherDadosDataCertaValida(): DataCertaValidaDTORequest {
        const requestDTO: DataCertaValidaDTORequest = new DataCertaValidaDTORequest();
        requestDTO.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.usuario = environment.USUARIO_UE;
        requestDTO.operacao = (environment.regiao === Regiao.NE) ? OperacaoDataCerta.Valida : '';
        return requestDTO;
    }

    permitirAcesso(): boolean {
        const verificacoes: Array<boolean> = [];
        verificacoes.push(this.verificarTramiteAtivacao());
        return !verificacoes.includes(false);
    }

    verificarTramiteAtivacao(): boolean {
        if (environment.regiao === Regiao.SE) {
            if (
                this._selecaoImovelService.getUCSelecionada?.status === 'POTENCIAL' ||
                this._selecaoImovelService.getUCSelecionada?.status === 'PT'
            ) {
                this.exibirAviso({titulo: EnumTitulosPadroes.TramiteDeAtivacao});
                return false;
            } else {
                return true;
            }
        } else {
            // TODO: Ficou pendente a verificação para NE no caso de trâmite de ativação ou primeira fatura.
            //       Não foi possível determinar o que avaliar para estes casos.
            return true;
        }
    }

    tratarErrosDataCerta(httpErrorResponse: HttpErrorResponse): boolean {
        if (environment.regiao === Regiao.SE) {
            let dialogRef = this.dialog.open(DialogAtencaoComponent, {
                width: '50vw',
                maxWidth: '900px',
                minWidth: '310px'
            });
            dialogRef.componentInstance.dataAlteracao =  httpErrorResponse.error.retorno.mensagem.split(' ').slice(5, 6);
            return !!httpErrorResponse.error.retorno.mensagem.includes("Ja existe vigência iniciada");
        } else {
            const queryParams: Object = {
                codigoAviso: httpErrorResponse.error?.retorno?.numero === '008' ? EnumAvisosPadroes.UnidadeDesligada : undefined,
                titulo: httpErrorResponse.error?.retorno?.mensagem || EnumTitulosPadroes.Inesperado
            }

            this._router.navigate(
                [PathCompleto.home, 'aviso'],
                {queryParams: queryParams}
            );
            return false;
        }
    }

    exibirAviso(queryParams: Object): void {
        this._router.navigate(
            [PathCompleto.home, 'aviso'],
            {queryParams: queryParams}
        );
    }
}
