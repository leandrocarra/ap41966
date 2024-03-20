import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { environment } from "@environments/environment";
import { ProtocoloDTORequest } from "app/core/models/protocolo/request/protocolo-dto";
import { CadastroService } from "app/core/services/cadastro/cadastro.service";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { MultiloginCadastroService } from "app/core/services/multilogin-cadastro/multilogin-cadastro.service";
import { AgenciaVirtualService } from "app/core/services/utils/admin/agencia-virtual.service";


@Injectable({
    providedIn: 'root'
})
export class MultiloginCadastroResolver implements Resolve<boolean> {
    obterProtocoloRequestDTO:ProtocoloDTORequest

    constructor(
        private _loadingService: LoadingService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _multiloginCadastroService: MultiloginCadastroService,
        private _cadastroService: CadastroService
    ) {
        this.obterProtocoloRequestDTO = new ProtocoloDTORequest();
    }

    resolve(): Promise<boolean> {
        return new Promise((response) => {
            this.preencherObterProtocoloRequestDTO().then(()=>{
                this._agenciaVirtualService.obterProtocoloAreaNaoLogada(this.obterProtocoloRequestDTO).subscribe({
                    next: (responseDTO) => {
                        this._loadingService.stop();
                        this._multiloginCadastroService.protocoloAreaNaoLogada = responseDTO;
                        response(true);
                    },
                    error: (error) => {
                    //TODO: tratar erro quando n se obter o protocolo
                        this._loadingService.stop();
                        response(false);
                    }
                });
            })
        });
    }

    preencherObterProtocoloRequestDTO():Promise<void>{
        this._loadingService.start();
        return this._cadastroService.obterRecaptcha().then((token)=>{
            this.obterProtocoloRequestDTO = this._agenciaVirtualService.criaRequestProtocolo();
            this.obterProtocoloRequestDTO.regiao = environment.regiao;
            this.obterProtocoloRequestDTO.recaptcha = token;
        })
    }

}
