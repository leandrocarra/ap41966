import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { UcInfosResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/uc-infos-response-dto';
import { UCResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto';
import { GrupoTensao } from "app/core/models/selecao-de-imoveis/selecao-de-imoveis";
import { AutoleituraService } from 'app/core/services/autoleitura/autoleitura.service';
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { AgenciaVirtualService } from "app/core/services/utils/admin/agencia-virtual.service";
import { Grupo } from "../../enums/grupos";
import { PathCompleto } from "../../enums/servicos";
import { ValidaAutoleituraDTOResponse } from "../../models/autoleitura/response/autoleitura-dto";
import { EnumAvisosPadroes, EnumTitulosPadroes } from "../../models/exibir-aviso/exibir-aviso";
import { EnumStatusUC } from "app/core/enums/unidade-consumidora";
import { DadosDoImovelService } from "app/appLN/core/services/dados-do-imovel/dados-do-imovel.service";

@Injectable()
export class AutoleituraGuard implements CanActivate {
    ucSelecionada: UCResponseDTO | null;
    infosUCSelecionada: UcInfosResponseDTO;
    grupoTensao: GrupoTensao;

    constructor(
        private _autoleituraService: AutoleituraService,
        private _selecaoImovelService: SelecaoImovelService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _loadingService: LoadingService,
        private _router: Router,
        private _etapaService: DadosDoImovelService
    ) {
        this.ucSelecionada = this._selecaoImovelService.getUCSelecionada;
        this.infosUCSelecionada = this._selecaoImovelService.getInformacoesUCSelecionada;
        this.grupoTensao = this._agenciaVirtualService.grupoTensao.source.value;
    }
    async canActivate(): Promise<boolean> {
        const ucSelecionada = this._selecaoImovelService.getUCSelecionada;
        const { regiao } = environment;

        if (ucSelecionada?.status === EnumStatusUC.Suspensa) {
            this.redirecionarParaAviso({ codigoAviso: EnumAvisosPadroes.UnidadeSuspensa });
            return false;

        } else if (ucSelecionada?.status === EnumStatusUC.Desligado) {
            this.redirecionarParaAviso({ codigoAviso: EnumAvisosPadroes.UnidadeDesligada });
            return false;
        }
        else if (ucSelecionada?.indCCColetiva === 'X') {
            this.redirecionarParaAviso({ titulo: EnumTitulosPadroes.ContaColetiva });
            return false;

        } else if (this.grupoTensao === Grupo.A ) {
            this.redirecionarParaAviso({ titulo: EnumTitulosPadroes.UcNaoApta });
            return false;
        }
        else if ((regiao === Regiao.SE && this.validarAutoleituraSE()) || regiao === Regiao.NE) {
            return await this.validaAutoleitura();
        }

        else {
            return false;
        }
    }

    async validaAutoleitura(): Promise<any> {
        this._loadingService.start();
        return await new Promise((resolve, reject) => {
            this._autoleituraService.getDadosValidaAutoleitura(this._autoleituraService.requestValidaAutoleitura("")).then((dadosAutoleitura) => {
                if (environment.regiao === Regiao.NE) {
                    resolve(this.validarAutoleituraNE(dadosAutoleitura));
                } else {
                    this._autoleituraService.definirPeriodoDeLeitura(dadosAutoleitura);
                    resolve(true);
                }
            }).catch((httpErrorResponse: HttpErrorResponse) => {
                this.definirAviso(httpErrorResponse);
                reject(false)
            }).finally(() => {
                this._loadingService.stop();
            });
        });
    }

    validarAutoleituraNE(dadosAutoleitura: ValidaAutoleituraDTOResponse): boolean {
        this._autoleituraService.definirPeriodoDeLeitura(dadosAutoleitura);
        console.log(this._autoleituraService.autoleitura.leiturasDoUltimoPeriodo);
        return true
    }

    validarAutoleituraSE(): boolean | void {
        let bOptanteComTelemedida = ((this.ucSelecionada?.bOptante ?? false) && this.infosUCSelecionada.servicos.medidorTelemedicao === 'S');
        let podeSeguir: Array<boolean> = [];
        // Verificação de que NÃO pode haver instalação de micro e/ou minigeração; // FIXME: Não há na ET.
        podeSeguir.push(bOptanteComTelemedida);
        podeSeguir.push(this.infosUCSelecionada.caracteristicas.irrigacao === 'S');
        podeSeguir.push(this.infosUCSelecionada.faturamento.grupoFaturamento.tipoTarifa.descricao === 'TARIFA BRANCA');
        if (podeSeguir.includes(true)) {
            this.redirecionarParaAviso(({ titulo: EnumTitulosPadroes.UcNaoApta }))
            return false;
        };
        return true;
    }

    private definirAviso(error: HttpErrorResponse): boolean {

        if (this._selecaoImovelService.unidadeDesligada) {
            return this.redirecionarParaAviso({ codigoAviso: EnumAvisosPadroes.UnidadeDesligada });

        } else if(error.error.retorno.numero === "999"){
            return this.redirecionarParaAviso({ titulo: EnumTitulosPadroes.Indisponivel });
        }
        else if(environment.regiao === Regiao.NE && error?.status === 400) {
            return this.redirecionarParaAviso({ titulo: EnumTitulosPadroes.UcNaoApta });
        }
        else {
            return this.redirecionarParaAviso({ titulo: EnumTitulosPadroes.Inesperado });
        }

    }

    redirecionarParaAviso(queryParams: Object): boolean {
        this._router.navigate(
            [PathCompleto.aviso],
            { queryParams: queryParams }
        );
        return false;
    }
}
