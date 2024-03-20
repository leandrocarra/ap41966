import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { Anexo } from 'app/core/models/anexo/anexo';
import { Leitura, SubRotasAutoleitura } from 'app/core/models/autoleitura/autoleitura';
import { AnexarFotoAutoleituraDTORequest } from 'app/core/models/autoleitura/request/autoleitura-dto';
import { AutoleituraService } from 'app/core/services/autoleitura/autoleitura.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from 'app/core/services/user/user.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { take } from "rxjs/operators";
import { EnumTitulosPadroes } from "../../../../../../core/models/exibir-aviso/exibir-aviso";
import { AnexarArquivosDTORequest, AnexoSSOS } from 'app/core/models/geral/request/geral-dto';


@Component({
    selector: 'app-anexar-foto-autoleitura',
    templateUrl: './anexar-foto-autoleitura.component.html',
    styleUrls: ['./anexar-foto-autoleitura.component.scss']
})
export class AnexarFotoAutoleituraComponent {
    fluxo: string;
    medidor: string;
    leiturasDestePeriodo: Array<Leitura>;
    formatosParaAnexar: string;
    tamanhoMaximoArquivo: number; // Bytes

    constructor(
        private _user: UserService,
        private _router: Router,
        private _location: Location,
        private _autoleituraService: AutoleituraService,
        private _selecaoImovelService: SelecaoImovelService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _loading: LoadingService
    ) {
        this.fluxo = this._autoleituraService.autoleitura.fluxo;
        this.medidor = this._autoleituraService.autoleitura.medidor;
        this.leiturasDestePeriodo = this._autoleituraService.autoleitura.leiturasDestePeriodo;
        this.formatosParaAnexar = environment.regiao === Regiao.NE ? '.jpg, .jpeg' : '.png, .jpg, .jpeg, .pdf';
        this.tamanhoMaximoArquivo = environment.regiao === Regiao.NE ? 1000000 : 2500000;
    }

    chamadaAnexarDocumentoNE(requestDTO: AnexarFotoAutoleituraDTORequest): void {
        this._loading.start();
        this._autoleituraService.anexarFotoAutoleitura(requestDTO).pipe(take(1)).subscribe({
            next: (data) => {
                this._loading.stop();
                console.log(data);
            },
            error: (httpErrorResponse: HttpErrorResponse) => {
                this._loading.stop();
                if (httpErrorResponse.error?.retorno?.mensagem) {
                    this.redirecionarParaAviso({ titulo: httpErrorResponse.error?.retorno?.mensagem });
                } else {
                    this.redirecionarParaAviso({ titulo: EnumTitulosPadroes.Inesperado });
                }
            }
        });
    }

    requestNE(fileData: string, ordemLeitura: string): AnexarFotoAutoleituraDTORequest {
        let requestDTO = new AnexarFotoAutoleituraDTORequest(this._selecaoImovelService.getInformacoesUCSelecionada.codigo, environment.canal, environment.USUARIO_UE, fileData, ordemLeitura,
            this._user.getProtocolo.protocoloSalesforceStr);
        requestDTO.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.usuario = environment.USUARIO_UE;
        requestDTO.anexo = fileData;
        requestDTO.ordemLeitura = ordemLeitura;
        requestDTO.protocolo = this._user.getProtocolo.protocoloSalesforceStr;
        return requestDTO;
    }

    chamadaAnexarDocumentoSE(requestDTO: AnexarArquivosDTORequest): void {
        this._loading.start();
        this._agenciaVirtualService.enviarAnexoSE(requestDTO).pipe(take(1)).subscribe({
            next: (data) => {
                this._loading.stop();
                console.log(data);
            },
            error: (httpErrorResponse: HttpErrorResponse) => {
                this._loading.stop();
                if (httpErrorResponse.error?.retorno?.mensagem) {
                    this.redirecionarParaAviso({ titulo: httpErrorResponse.error?.retorno?.mensagem });
                } else {
                    this.redirecionarParaAviso({ titulo: EnumTitulosPadroes.Inesperado });
                }
            }
        });
    }

    requestSE(arquivo: Anexo, os: string): AnexarArquivosDTORequest {
        let requestDTO: AnexarArquivosDTORequest = new AnexarArquivosDTORequest(
            environment.USUARIO_UE,
            environment.canal,
            '01',
            '1',
            os,
            this.deParaArquivosSudeste(arquivo)
        );
        return requestDTO;
    }

    deParaArquivosSudeste(arquivoAnexo: Anexo): AnexoSSOS {
        let arquivo: AnexoSSOS = new AnexoSSOS(
            arquivoAnexo.fileName,
            arquivoAnexo.fileExtension,
            arquivoAnexo.fileData
        )
        return arquivo;
    }

    voltar(): void {
        this._location.back();
    }

    confirmarEnvio(): void {
        this.obterArquivoAutoLeitura();
        this._user.isFluxo = false;
        this._router.navigate([PathCompleto.autoleitura, SubRotasAutoleitura.SolicitacaoEnviada]);
    }

    obterArquivoAutoLeitura(): void {
        for (let i = 0; i < this.leiturasDestePeriodo.length; i++) {
            if (environment.regiao === Regiao.NE) {
                let filedata = this.leiturasDestePeriodo[i].arquivos[0].fileData;
                let ordemLeitura = this._autoleituraService.getAutoLeituraDTOResponse.valorLeitura[i].ordemLeitura
                this.chamadaAnexarDocumentoNE(this.requestNE(filedata, ordemLeitura));
            } else {
                let arquivoAnexado = this.leiturasDestePeriodo[i].arquivos[0];
                let os = this._autoleituraService.getAutoLeituraDTOResponse.os ?? '';
                this.chamadaAnexarDocumentoSE(this.requestSE(arquivoAnexado, os))
            }
        }
    }

    receberAnexo(arquivo: Anexo, index: number): void {
        this._autoleituraService.autoleitura.leiturasDestePeriodo[index].arquivos.push(arquivo);
    }

    removerAnexo(indexLeitura: number, indexArquivo: number): void {
        this._autoleituraService.autoleitura.leiturasDestePeriodo[indexLeitura].arquivos.splice(indexArquivo, 1);
    }

    redirecionarParaAviso(queryParams: Object): void {
        this._router.navigate(
            [PathCompleto.aviso],
            { queryParams: queryParams }
        );
    }

}
