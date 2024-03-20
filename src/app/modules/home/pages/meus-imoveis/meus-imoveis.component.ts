import { Location } from "@angular/common";
import { Component, HostListener, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { MatSelect } from "@angular/material/select";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "@environments/environment";

import { Regiao } from "app/core/enums/regiao";
import { PathCompleto } from "app/core/enums/servicos";
import { EnumStatusUC } from "app/core/enums/unidade-consumidora";
import { EnumTitulosPadroes } from "app/core/models/exibir-aviso/exibir-aviso";
import { EnumOpcoesFiltroUC, EnumOpcoesStatusUC } from "app/core/models/meus-imoveis/meus-imoveis";
import { PerfisDeAcesso, SubRotasMultiloginAcesso } from "app/core/models/multilogin/multilogin-acesso";
import { UcInfosResponseDTO } from "app/core/models/selecao-de-imoveis/DTO/responses/uc-infos-response-dto";
import { UCResponseDTO, UserUcsResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { LigacaoNovaService } from "app/core/services/ligacao-nova/ligacao-nova.service";
import { MultiloginAcessoService } from "app/core/services/multilogin-acesso/multilogin-acesso.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";
import { AgenciaVirtualService } from "app/core/services/utils/admin/agencia-virtual.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";
import { HeaderService } from "../../../../core/services/header/header.service";
import { CadastroService } from "app/core/services/cadastro/cadastro.service";

const NUMERO_DE_UCS_VISIVEIS: number = 5;

@Component({
    selector: "app-meus-imoveis",
    templateUrl: "./meus-imoveis.component.html",
    styleUrls: ["./meus-imoveis.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class MeusImoveisComponent implements OnInit {
    @ViewChildren(MatSelect) matSelectList!: QueryList<MatSelect>;
    @ViewChild(PaginationComponent, { static: false }) pagination!: PaginationComponent;
    numeroDeResultadosExibidos: number;
    campoPesquisar: any;
    filtroPorStatus: any = '';
    meusImoveis: UserUcsResponseDTO;
    listaDeUCsFiltradas: Array<UCResponseDTO>;
    listaDeUCsExibidas: Array<UCResponseDTO>;
    todasAsUCsOrdenadas: Array<UCResponseDTO>;
    podeExibirPaginacao: boolean;
    podePesquisar: boolean;
    mobile: boolean;
    statusPossiveis: Array<string>;
    pesquisarCliente: boolean = false;

    constructor(
        public loading: LoadingService,
        private _domSanitizer: DomSanitizer,
        private _matIconRegistry: MatIconRegistry,
        private _router: Router,
        private _selecaoImovelService: SelecaoImovelService,
        private _activatedRoute: ActivatedRoute,
        private _userService: UserService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _ligacaoNovaService: LigacaoNovaService,
        private _loadingService: LoadingService,
		private _multiloginAcessoService: MultiloginAcessoService,
        private _location: Location,
        private _headerService: HeaderService,
        private _cadastroService: CadastroService
    ) {
        this.meusImoveis = this._activatedRoute.snapshot.data.meusImoveis;
        //Definir imóveis
        if (this._multiloginAcessoService.getMultiloginAcesso.perfilDeAcesso !== PerfisDeAcesso.acessoComum) {
            this.todasAsUCsOrdenadas = this.ordenarListaDeUCs(this._multiloginAcessoService.getMultiloginAcesso.ucsCompartilhadas ?? []);
        } else {
            this.todasAsUCsOrdenadas = this.ordenarListaDeUCs(this.meusImoveis.ucs);
        }
        this.todasAsUCsOrdenadas = this.ordenarListaDeUCs(this.meusImoveis.ucs);
        this.listaDeUCsExibidas = this.preencherListaDeUCsExibidas(this.todasAsUCsOrdenadas);
        this.listaDeUCsFiltradas = this.todasAsUCsOrdenadas;
        this.verificarSePodeExibirPaginacao();
        this.checkGrupoTensao(this.meusImoveis);
        this.numeroDeResultadosExibidos = NUMERO_DE_UCS_VISIVEIS;
        this.podeExibirPaginacao = this.listaDeUCsExibidas.length >= NUMERO_DE_UCS_VISIVEIS;
        this.podePesquisar = true;
        this._selecaoImovelService.setUCSelecionada = null;
        this._matIconRegistry.addSvgIcon(
            "light",
            this._domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icons/lampada.svg")
        );
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this._userService.pageSelected = true;
        this.statusPossiveis = this.verificarStatusUcs();
        this.pesquisarCliente = (this._multiloginAcessoService.getMultiloginAcesso.perfilDeAcesso === PerfisDeAcesso.atendenteCredenciado) ? true : false;
    }

    ngOnInit(): void {
        sessionStorage.removeItem("historicoConsumo");
    }

    @HostListener('window:resize', ['$event']) onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    @HostListener('window:scroll') onScrollEvent() {
        this.matSelectList.forEach(element => {
            element.close();
        });
    }

    preencherListaDeUCsExibidas(ucs: Array<UCResponseDTO>): Array<UCResponseDTO> {
        return (ucs.length > NUMERO_DE_UCS_VISIVEIS) ? this.todasAsUCsOrdenadas.slice(0, NUMERO_DE_UCS_VISIVEIS) : ucs;
    }

    ordenarListaDeUCs(listaDeUCs: Array<UCResponseDTO>): Array<UCResponseDTO> {
        let listaOrdenada: Array<UCResponseDTO> = listaDeUCs;
        if (listaDeUCs.length && listaDeUCs.length > 1) {
            listaOrdenada = listaOrdenada.concat(listaDeUCs.filter(option => option.status == EnumOpcoesStatusUC.Ligada));
            listaOrdenada = listaOrdenada.concat(listaDeUCs.filter(option => option.status == EnumOpcoesStatusUC.AindaNaoLigada));
            listaOrdenada = listaOrdenada.concat(listaDeUCs.filter(option => option.status == EnumOpcoesStatusUC.Cortada));
            listaOrdenada = listaOrdenada.concat(listaDeUCs.filter(option => option.status == EnumOpcoesStatusUC.Desligada));
        }
        listaDeUCs = listaDeUCs.map(uc => {
            if (uc.indCCColetiva === `X`) {
                uc.status = EnumStatusUC.Coletiva;
                return uc;
            }
            else if (uc.status === EnumStatusUC.CorteRecente){
                uc.status = EnumStatusUC.Suspensa;
                return uc;
            }
            else {
                return uc;
            }
        });
        return [... new Set(listaOrdenada)];
    }

    verificarSePodeExibirPaginacao(): void {
        this.podeExibirPaginacao = this.listaDeUCsExibidas.length >= NUMERO_DE_UCS_VISIVEIS;
    }

    filtrarUCsPorStatus(status: string): void {
        if (status === EnumOpcoesFiltroUC.Todas) {
            this.listaDeUCsFiltradas = this.todasAsUCsOrdenadas;
        } else {
            this.listaDeUCsFiltradas = this.todasAsUCsOrdenadas.filter((res: any) => {
                if (res.status?.toLocaleLowerCase() === status.toLocaleLowerCase()) {
                    return res.status.toLocaleLowerCase() === status.toLocaleLowerCase()
                }
            });
        }
        this.listaDeUCsExibidas = this.listaDeUCsFiltradas.slice(0, NUMERO_DE_UCS_VISIVEIS);
        this.pagination?.numberPagination(this.listaDeUCsFiltradas);
        this.verificarSePodeExibirPaginacao();
    }

    pesquisarUCsPorInput(pesquisa: any): void {
        this.listaDeUCsFiltradas = this.pesquisarNoArrayDeImoveis(pesquisa);
        if (
            environment.regiao === Regiao.NE &&
            this.listaDeUCsFiltradas.length === 0
        ) {
            this.podePesquisar = false;
            this._selecaoImovelService.requisitarPesquisaNaBaseDeDados(pesquisa).then((value: UserUcsResponseDTO): void => {
                try {
                    let ucs: UCResponseDTO[] = value.ucs;
                    if (ucs.length > 0) {
                        if (ucs[0].indCCColetiva.toLowerCase().includes('x')) {
                            ucs[0].status = 'COLETIVA';
                        }
                        this.listaDeUCsExibidas = [];
                        this.listaDeUCsExibidas.push(value.ucs[0]);
                        this.todasAsUCsOrdenadas.push(value.ucs[0]);
                        this.listaDeUCsFiltradas.push(value.ucs[0]);
                        this._selecaoImovelService.setMeusImoveis = { 'ucs': this.todasAsUCsOrdenadas };
                    }
                } finally {
                    this.podePesquisar = true;
                }
            });
        } else {
            this.listaDeUCsExibidas = this.listaDeUCsFiltradas.slice(0, NUMERO_DE_UCS_VISIVEIS);
            this.podePesquisar = true;

        }
        this.pagination?.numberPagination(this.listaDeUCsFiltradas);
        this.verificarSePodeExibirPaginacao();
    }

    pesquisarNoArrayDeImoveis(pesquisa: any): Array<UCResponseDTO> {
        return this.todasAsUCsOrdenadas.filter((imovel: UCResponseDTO) => {
            let result = imovel.uc.toString().includes(pesquisa);
            if (result) {
                return true;
            } else {
                const local = Object.values(imovel.local);
                for (let dado of local) {
                    if (dado) {
                        result = dado.toString().toLowerCase().includes(pesquisa.toLowerCase());
                        if (result) return true;
                    } else {
                        return false;
                    }
                }
            }
            return false;
        });
    }

    solicitarLigacaoNova(): any {
        this._cadastroService.obterRecaptcha().then((token)=>{
            this._ligacaoNovaService.redirecionarParaLigacaoNova(token);
        })

    }

    eventPagination(event: any) {
        this.listaDeUCsExibidas = event;
    }

    redirecionarParaHome(ucEscolhida: any): void {
        this._cadastroService.obterRecaptcha().then((token)=>{
            this._loadingService.start();
            this._selecaoImovelService.setUCSelecionada = ucEscolhida;
            this.definirDadosUsuario(ucEscolhida);
            this._selecaoImovelService.temInformacoesUCSelecionada(this._selecaoImovelService.getUCSelecionada?.uc!).then((ucEscolhida: UcInfosResponseDTO) => {
                this._agenciaVirtualService.getProtocolo(token).then(() => {
                    this._router.navigate([PathCompleto.home]);
                }).catch(() => {
                    this.exibirAvisoServicoIndisponivel();
                    this._loadingService.stop();
                });
            }).catch(() => {
                this.exibirAvisoServicoIndisponivel();
                this._loadingService.stop();
            });
        })
    }

    exibirAvisoServicoIndisponivel(): void {
        this._router.navigate(
            [PathCompleto.home, 'aviso'],
            { queryParams: { titulo: EnumTitulosPadroes.Indisponivel } }
        );
    }

    checkGrupoTensao(userUCsResponse: UserUcsResponseDTO): void {
        userUCsResponse.ucs.forEach((element: UCResponseDTO) => {
            if (element.grupoTensao?.toLocaleUpperCase() === 'A') {
                if (this._multiloginAcessoService.getMultiloginAcesso.perfilDeAcesso === PerfisDeAcesso.acessoComum) {
                    this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso = PerfisDeAcesso.A;
                    this._multiloginAcessoService.setMultiloginAcesso = this._multiloginAcessoService.multiloginAcesso;
                    this._agenciaVirtualService.updateGrupoTensao('A');
                    this._headerService.definirEstiloDoHeader('A');
                }
            }
        });
    }

    verificarStatusUcs(): Array<string> {
        let statusPossiveis: Array<string> = [];
        this.meusImoveis.ucs.forEach((element: UCResponseDTO) => {
            if (element.status !== null) {
                statusPossiveis.push(element?.status);
            }
        });
        return [... new Set(statusPossiveis)];
    }

    limparFiltros(): void {
        this.listaDeUCsExibidas = this.todasAsUCsOrdenadas;
        this.listaDeUCsFiltradas = this.todasAsUCsOrdenadas;
        this.filtroPorStatus = '';
        this.campoPesquisar = '';
    }

    limparCampoDePesquisa(): void {
        this.campoPesquisar = '';
    }

    aoApertarEnter(pesquisa: any): void {
        this.pesquisarUCsPorInput(pesquisa);
    }

    voltar(): void {
        let perfil = this._multiloginAcessoService.getMultiloginAcesso.perfilDeAcesso;

        switch (perfil) {
            case PerfisDeAcesso.acessoComum:
            case PerfisDeAcesso.conjuge:
            case PerfisDeAcesso.padronista:
            case PerfisDeAcesso.perfilDeAcesso:
                this._router.navigate([PathCompleto.multiloginAcesso, SubRotasMultiloginAcesso.SelecaoDePerfil]);
                break;

            case PerfisDeAcesso.representanteLegal:
            this._router.navigate([PathCompleto.multiloginAcesso, SubRotasMultiloginAcesso.SelecaoDeCliente]);
                break

            case PerfisDeAcesso.atendenteCredenciado:
            case PerfisDeAcesso.corretor:
            this._router.navigate([PathCompleto.multiloginAcesso, SubRotasMultiloginAcesso.PesquisarCliente]);
                break;

            default:
                this._location.back();

        }
    }

    definirDadosUsuario(uc: UCResponseDTO): void {
         if (this._multiloginAcessoService.getMultiloginAcesso.perfilDeAcesso == PerfisDeAcesso.padronista ||
            this._multiloginAcessoService.getMultiloginAcesso.perfilDeAcesso == PerfisDeAcesso.perfilDeAcesso) {
                this._multiloginAcessoService.multiloginAcesso.vinculosRecebidos.forEach(vinculo => {
                    if (vinculo.listaDeUcs.includes(uc.uc)) {
                        this._multiloginAcessoService.multiloginAcesso.documentoCliente = vinculo.docTitular;
                        this._multiloginAcessoService.setMultiloginAcesso = this._multiloginAcessoService.multiloginAcesso;
                    }
                });
                this._userService.storage.removeItem("protocolo");
        }
    }
}
