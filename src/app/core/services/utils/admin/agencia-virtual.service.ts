import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from '@environments/environment';
import { Distribuidora, DistribuidorasProtocolo } from 'app/core/enums/distribuidoras';
import { Regiao } from 'app/core/enums/regiao';
import { NomeServico, PathCompleto } from 'app/core/enums/servicos';
import { UsuarioAtivoDTORequest } from 'app/core/models/cadastro/request/cadastro-dto';
import { UsuarioAtivoDTOResponse } from 'app/core/models/cadastro/responses/cadastro-dto';
import { AnexarArquivosDTORequest, CriarSSinformacaoDTORequest, GerarReclamacaoDTORequest, RegistroAtendimentoDTORequest } from 'app/core/models/geral/request/geral-dto';
import { AnexarArquivosDTOResponse, CriarSSinformacaoDTOResponse, GerarReclamacaoDTOResponse, RegistroAtendimentoDTOResponse } from 'app/core/models/geral/response/geral-dto';
import { ProtocoloDTORequest } from 'app/core/models/protocolo/request/protocolo-dto';
import { ProtocoloDTOResponse } from 'app/core/models/protocolo/response/protocolo-dto';
import { PdfDTOResponse } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { GrupoTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { NeoenergiaLinks } from 'app/shared/models/utils/agencia-virtual-utils';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { BehaviorSubject, Observable, catchError, mergeMap, of, throwError } from 'rxjs';
import { SubRotasHome } from "../../../models/home/sub-rotas-home";
import { MultiloginAcessoService } from '../../multilogin-acesso/multilogin-acesso.service';
import { SelecaoImovelService } from '../../selecao-de-imovel/selecao-de-imovel.service';
import { TokenService } from "../../token/token.service";
import { UserService } from '../../user/user.service';
import { CustomSweetAlertService } from '../../customsweetalert/custom-sweet-alert.service';

const VALORES_POSITIVOS_HTTP = [200, 201, 202];

@Injectable({
    providedIn: 'root'
})
export class AgenciaVirtualService {

    linksNeoenergia: NeoenergiaLinks;
    storage:Storage = sessionStorage;
    updateProtocolo(protocolo: ProtocoloDTOResponse) {
        this.stageProtocolo.next(protocolo)
    }
    private stageProtocolo = new BehaviorSubject<ProtocoloDTOResponse | "">("");
    protocolo: any;
    protocoloANL: BehaviorSubject<ProtocoloDTOResponse> = new BehaviorSubject(new ProtocoloDTOResponse());


    updateGrupoTensao(grupoTensao: GrupoTensao) {
        this._selecaoImovelService.setGrupoDoUsuario = grupoTensao;
        this.stageGrupoTensao.next(grupoTensao);
    }
    private stageGrupoTensao = new BehaviorSubject<GrupoTensao>("A");
    grupoTensao: any;

    servicosSemUcSelecionada: Array<string> = [];
    servicosBloqueadosParaContaColetivaMae: Array<string> = [];
    servicosBloqueadosParaContaColetivaFilha: Array<string> = [];
    servicosSemLogin: Array<string> = [];

    constructor(
        private _http: HttpClient,
        private _userService: UserService,
        private _selecaoImovelService: SelecaoImovelService,
        private _recaptchaV3Service: ReCaptchaV3Service,
        private _multiloginAcessoService: MultiloginAcessoService,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _tokenService: TokenService
    ) {
        this.linksNeoenergia = this.gerarLinksPorDistribuidora();
        this.protocolo = this.stageProtocolo.asObservable();
        this.grupoTensao = this.stageGrupoTensao.asObservable();
        this.updateGrupoTensao(this.storage?.userGroup ?? 'B');
        this.servicosSemUcSelecionada = this.setarServicosSemUC();
        this.servicosBloqueadosParaContaColetivaMae = environment.regiao === Regiao.NE ? this.setarBloqueiosCCColetivaMaeNE() : this.setarBloqueiosCCColetivaMaeSE();
        this.servicosBloqueadosParaContaColetivaFilha = environment.regiao === Regiao.NE ? this.setarBloqueiCCColetivaFilhaNE() : this.setarBloqueiCCColetivaFilhaSE();
        this.servicosSemLogin = this.setarServicosSemLogin();
    }

    consultarUsuarioAtivo(requestDTO: UsuarioAtivoDTORequest): Observable<UsuarioAtivoDTOResponse> {
        const endpoint = `${environment.endpoints.areaNaoLogada}/usuarios/ativo`;
        const body = Object.assign({}, requestDTO);
        return this._http.post<UsuarioAtivoDTOResponse>(endpoint, body).pipe(
            mergeMap((response) => response ? of(response) : throwError(() => response))
        );
    }

    preencherAtivoRequestDTO(documento: string): Promise<any> {
        const ativoRequestDTO = new UsuarioAtivoDTORequest();
        return new Promise((resolve, reject) => {
            this.obterRecaptcha().then((token) => {
                ativoRequestDTO.distribuidora = environment.name;
                ativoRequestDTO.regiao = environment.regiao;
                ativoRequestDTO.userName = `${environment.name}/${documento}`;
                ativoRequestDTO.recaptcha = token;
                resolve(ativoRequestDTO);
            }).catch((error: HttpErrorResponse) => {
                reject(error)
            });
        });
    }

    obterRecaptcha(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._recaptchaV3Service.execute('importantAction').subscribe({
                next: (token: string) => {
                    resolve(token);
                },
                error: (error) => {
                    reject(error);
                },
            });
        });
    }

    obterProtocolo(recaptcha:string): Observable<ProtocoloDTOResponse | any> {
        let protocoloDTORequest = this.criaRequestProtocolo(recaptcha);
        let params: HttpParams = this.retornaParametrosProtocolo(protocoloDTORequest);
        let endpoint = `${environment.endpoints.protocolo}obterProtocolo`;
        return this._http.get<ProtocoloDTOResponse | any>(endpoint, { params }).pipe(
            mergeMap((response: any) => !VALORES_POSITIVOS_HTTP.includes(response.status) ? of(response) : throwError(() => response))
        );
    }

    obterProtocoloAreaNaoLogada(requestDTO: ProtocoloDTORequest): Observable<ProtocoloDTOResponse> {
        const endpoint = `${environment.endpoints.areaNaoLogada}/obterProtocolo`;
        let params = new HttpParams();
        Object.entries(requestDTO).forEach(([atributo, valor]) => {
            if (valor) {
                params = params.append(atributo, valor);
            }
        });
        if (environment.regiao === Regiao.NE) {
            params = params.delete('usuario');
        }
        return this._http.get<ProtocoloDTOResponse>(endpoint, { params }).pipe(
            mergeMap((response) => response ? of(response) : throwError(() => response))
        );
    }

    criaRequestProtocolo(recaptcha:string): ProtocoloDTORequest {
        let codCliente: string = (environment.regiao === Regiao.SE) ? "" : this._userService.dadosUser.codCliente;
        let usuario: string = (environment.regiao === Regiao.SE) ?environment.USUARIO_UE : "";
        let protocoloDTORequest = new ProtocoloDTORequest()
        protocoloDTORequest = {
            distribuidora:  DistribuidorasProtocolo[environment.name as keyof typeof DistribuidorasProtocolo],
            canalSolicitante: environment.canal,
            usuario,
            documento: this._multiloginAcessoService.definirDocumento(),
            codCliente,
            recaptcha,
            regiao: environment.regiao
        }
        return protocoloDTORequest
    }

    retornaParametrosProtocolo(protocoloDTORequest: ProtocoloDTORequest): HttpParams {
        let params = new HttpParams();
        let valoresRetornados = Object.entries(protocoloDTORequest);

        valoresRetornados.forEach(([variavel, valor]) => {
            if (valor !== '') {
                params = params.append(variavel, valor);
            }
        });
        return params;
    }

    getProtocolo(recaptcha:string): Promise<any> {
        return new Promise((resolve, errorResolve) => {
            if (this._userService.getProtocolo) {
                this.updateProtocolo(this._userService.getProtocolo);
                resolve(this._userService.getProtocolo);
            } else {
                this.obterProtocolo(recaptcha).subscribe({
                    next: (data) => {
                        this._userService.setProtocolo = data;
                        this.updateProtocolo(data);
                        resolve(data);
                    },
                    error: (error) => {
                        errorResolve(error);
                    }
                });
            }
        });
    }

    verificarSeExisteProtocolo(): void {
        if (this._userService.getProtocolo) {
            this.updateProtocolo(this._userService.getProtocolo);
        }
    }

    enviarAnexoSE(request: AnexarArquivosDTORequest): Observable<AnexarArquivosDTOResponse> {
        const endpoint = `${environment.endpoints.anexos}/`;
        const body = Object.assign({}, request);
        return this._http.post<AnexarArquivosDTOResponse>(endpoint, body).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    registroAtendimentoSE(request: RegistroAtendimentoDTORequest): Observable<RegistroAtendimentoDTOResponse> {
        const endpoint = `${environment.endpoints.anexos}/`;
        const body = Object.assign({}, request);
        return this._http.post<RegistroAtendimentoDTOResponse>(endpoint, body).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    gerarReclamacaoSE(request: GerarReclamacaoDTORequest): Observable<GerarReclamacaoDTOResponse> {
        const endpoint = `${environment.endpoints.anexos}/`;
        const body = Object.assign({}, request);
        return this._http.post<GerarReclamacaoDTOResponse>(endpoint, body).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    criarSSInformacaoSE(request: CriarSSinformacaoDTORequest): Observable<CriarSSinformacaoDTOResponse> {
        const endpoint = `${environment.endpoints.anexos}/`;
        const body = Object.assign({}, request);
        return this._http.post<CriarSSinformacaoDTOResponse>(endpoint, body).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    download(pdf: PdfDTOResponse) {
        const arquivo = `data:application/pdf;base64, ${pdf.fileData}`;
        const link = document.createElement("a");
        link.href = arquivo;
        link.download = `${pdf.fileName}${pdf.fileExtension}`;
        link.click();
    }

    visualizarFatura(pdf: PdfDTOResponse): void {
        let params = 'dependent=yes,locationbar=no,scrollbars=yes,menubar=yes,' +
            'resizable,screenX=50,screenY=50,width=850,height=1050';
        let html = '<embed width=100% height=100%'
            + ' type="application/pdf"'
            + ' src="data:application/pdf;base64,'
            + escape(pdf.fileData!)
            + '"></embed>';
        let printWindow = window.open("", "PDF", params);
        printWindow?.document.write(html);
    }

    gerarLinksPorDistribuidora(): NeoenergiaLinks {
        switch (environment.title) {
            case Distribuidora.ELEKTRO:
                return new NeoenergiaLinks(
                    "https://www.youtube.com/c/NeoenergiaElektro",
                    "https://www.elektro.com.br/sua-casa/dicas-de-economia-e-seguranca-com-energia-eletrica",
                    "",
                    "",
                    "https://qa-multilogin-elektro.neoenergia.net/#/login"
                );

            case Distribuidora.COELBA:
                return new NeoenergiaLinks(
                    "https://www.youtube.com/c/NeoenergiaCoelba",
                    "https://servicos.neoenergiacoelba.com.br/Pages/Dicas%20de%20Economia/Dicas-de-Economia.aspx",
                    "",
                    "",
                    "https://multilogin-coelba.neoenergia.net/"
                );

            case Distribuidora.CELPE:
                return new NeoenergiaLinks(
                    "https://www.youtube.com/c/NeoenergiaPernambuco",
                    "https://servicos.neoenergiapernambuco.com.br/Pages/Dicas%20de%20Economia/Dicas-de-Economia.aspx",
                    "",
                    "",
                    "https://multilogin-pernambuco.neoenergia.net/"
                );

            case Distribuidora.COSERN:
                return new NeoenergiaLinks(
                    "https://www.youtube.com/c/NeoenergiaCosern",
                    "https://servicos.neoenergiacosern.com.br/Pages/Dicas%20de%20Economia/Dicas-de-Economia.aspx",
                    "",
                    "",
                    "https://multilogin-cosern.neoenergia.net/"
                );
            default:
                return new NeoenergiaLinks('', '', '', '', '')
        }
    }

    setarServicosSemUC(): Array<string> {
        return [
            NomeServico.MinhaConta,
            NomeServico.AcompanhePedidos,
            NomeServico.ProjetoParticular
        ];
    }

    setarBloqueiosCCColetivaMaeNE(): Array<string> {
        return [
            NomeServico.FaturaPorEmail,
            NomeServico.FaturaImpressa,
            NomeServico.Autoleitura,
            NomeServico.EntendaSuaConta,
            NomeServico.FaltaDeEnergia,
            NomeServico.Religa,
            NomeServico.Desliga,
            NomeServico.DebitoAutomatico
        ];
    }

    setarBloqueiCCColetivaFilhaNE(): Array<string> {
        return [
            NomeServico.FaturaPorEmail,
            NomeServico.FaturaImpressa,
            NomeServico.Desliga,
            NomeServico.DebitoAutomatico
        ];
    }

    setarBloqueiCCColetivaFilhaSE(): Array<string> {
        return []; // TODO: TESTAR SE
    }

    setarBloqueiosCCColetivaMaeSE(): Array<string> {
        return []; //TODO: TESTAR SE
    }

    setarServicosSemLogin(): Array<string> {
        return [
            NomeServico.LGPD,
            NomeServico.Youtube,
            NomeServico.Instagram,
            NomeServico.Facebook
        ];
    }

    paginaInicial(): void {
        if (this._tokenService.idToken) { // Verificar se o usuario esta logado
            let pathParaRedirecionar = !this.storage?.ucs ? [PathCompleto.selecionarPerfilAcesso] :
            this._selecaoImovelService.getUCSelecionada ? [PathCompleto.home] : [PathCompleto.home, SubRotasHome.MinhasUnidadesConsumidoras];
            if (this._userService.isFluxo) {
                this._alert.alertConfirmarCancelamento().then((r: any) => {
                    if (r.value) {
                        this._router.navigate(pathParaRedirecionar);
                    }
                });
            } else {
                this._router.navigate(pathParaRedirecionar);
            }
        } else {
            this._router.navigate([PathCompleto.paginaInicial]);
        }
    }
}
