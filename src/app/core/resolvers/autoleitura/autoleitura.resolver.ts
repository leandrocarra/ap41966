import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { EnumTipificacaoAutoleitura } from 'app/core/models/autoleitura/autoleitura';
import { SimulaAutoleituraDTORequest } from 'app/core/models/autoleitura/request/autoleitura-dto';
import { SimulaAutoleituraDTOResponse } from 'app/core/models/autoleitura/response/autoleitura-dto';
import { EnumIdTermo } from 'app/core/models/termo-de-adesao/termo-de-adesao';
import { AutoleituraService } from 'app/core/services/autoleitura/autoleitura.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { TermoDeAdesaoService } from 'app/core/services/termo-de-adesao/termo-de-adesao.service';
import { UserService } from 'app/core/services/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AutoleituraResolver implements Resolve<boolean> {
    constructor(
        private _autoleituraService: AutoleituraService,
        private _selecaoImovelService: SelecaoImovelService,
        private _userService: UserService,
        private _loadingService: LoadingService,
        private _termoDeAdesaoService: TermoDeAdesaoService
    ) { }

    resolve(): Promise<SimulaAutoleituraDTOResponse | any> {
        if (environment.regiao === Regiao.SE) {
            this.consultarTermoDeAdesao();
            return this.simulaAutoLeitura();
        } else {
            return new Promise((resolve) => {
                resolve([]);
            });
        }
    }

    simulaAutoLeitura(): Promise<SimulaAutoleituraDTOResponse | any> {
        const requestDTO = this.preencherSimulaAutoleituraDTO();
        return new Promise((resolve) => {
            this._autoleituraService.simularAutoleitura(requestDTO).subscribe({
                next: (data: SimulaAutoleituraDTOResponse) => {
                    this._loadingService.stop();
                    this._autoleituraService.deParaLeituraSE(data);
                    this._autoleituraService.setListLeituraAutoLeitura = data.equipamentoAutoLeitura.listLeituraAutoLeitura;
                    resolve(data.equipamentoAutoLeitura.listLeituraAutoLeitura);
                },
                error: (error: Error) => {
                    this._loadingService.stop();
                    resolve(error);
                }
            });
        });
    }

    preencherSimulaAutoleituraDTO(): SimulaAutoleituraDTORequest {
        let requestDTO = new SimulaAutoleituraDTORequest();
        requestDTO.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        requestDTO.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        requestDTO.protocoloSonda = this._userService.getProtocolo.protocoloLegadoStr;
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.usuario = environment.USUARIO_UE;
        requestDTO.tipificacao = EnumTipificacaoAutoleitura.Simulacao; //fixo
        requestDTO.geraSSOS = 'S'; //fixo
        return requestDTO;
    }

    consultarTermoDeAdesao(): void {
        this._termoDeAdesaoService.consultarTermoDeAdesao(EnumIdTermo.Autoleitura, "AT").then((response) => {
            this._autoleituraService.autoleitura.termosDeUsoAceitos = response.termoAceiteServico.length === 0 ? false : true;
        });
    }
}
