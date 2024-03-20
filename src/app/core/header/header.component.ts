import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { ResolveEnd, Router } from "@angular/router";
import { environment } from "@environments/environment";
import { BandeiraTarifariaService } from "app/core/services/bandeira-tarifaria/bandeira-tarifaria.service";
import packageJson from '../../../../package.json';
import { UserResponseDTO } from "../models/UserDTO/userResponseDTO.model";
import {
    Conjunto,
    EnumCorDeFundoDoHeader as EnumEstiloDoHeader,
    EstiloHeader,
    Item,
    Menu
} from "../models/header/header";
import { UCResponseDTO } from "../models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto";
import { GrupoTensao } from "../models/selecao-de-imoveis/selecao-de-imoveis";
import { CustomSweetAlertService } from "../services/customsweetalert/custom-sweet-alert.service";
import { DialogLoginService } from "../services/dialog-login/dialog-login.service";
import { HeaderService } from "../services/header/header.service";
import { MultiloginAcessoService } from "../services/multilogin-acesso/multilogin-acesso.service";
import { SelecaoImovelService } from "../services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "../services/user/user.service";
import { AgenciaVirtualService } from "../services/utils/admin/agencia-virtual.service";
import { configureMenuByWindowSize } from "../services/utils/neo-utils.service";
import { TokenService } from "../services/token/token.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
    qa: boolean;
    @ViewChild(MatSidenav)
    sidenav!: MatSidenav; // Elemento do HTML, por isso está com > ! <
    @ViewChild('header')
    header!: ElementRef; // Elemento do HTML, por isso está com > ! <
    logo: string;
    opcoesMenu: Menu;
    grupoTensao!: GrupoTensao;
    nomeUsuario: string;
    menuAberto: boolean;
    conjuntoSelecionado: Conjunto;
    mobile: boolean;
    ucSelecionada: UCResponseDTO | null;
    headerClass: string;
    version: string;
    indicadorPerfil: string;
    icone: string;
    rotaLigacaoNova!: boolean;

    constructor(
        private _userService: UserService,
        private _headerService: HeaderService,
        private renderer: Renderer2,
        private _alert: CustomSweetAlertService,
        private _dialogLoginService: DialogLoginService,
        private _router: Router,
        private _selecaoImovelService: SelecaoImovelService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _multiloginAcessoService: MultiloginAcessoService,
        private _tokenService: TokenService,
        private _bandeiraTarifariaService: BandeiraTarifariaService
    ) {
        this.icone = '';
        this.indicadorPerfil = "";
        this.version = packageJson.version;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.menuAberto = false;
        this.nomeUsuario = this._userService.dadosUser.usuarioAcesso;
        this.logo = environment.logoLetraBranca;
        this.headerClass = EnumEstiloDoHeader.Padrao;
        this.opcoesMenu = this._headerService.opcoesMenu;
        this.conjuntoSelecionado = this.opcoesMenu?.opcoes[0];
        this.ucSelecionada = this._selecaoImovelService.ucSelecionada;
        this.renderer.listen('window', 'click', (e: Event) => {
            if (!this.header.nativeElement.contains(e.target)) {
                this.closeAllOptions();
            }
        });
        this._selecaoImovelService.ucSelecionada.subscribe((ucSelecionada: UCResponseDTO | null) => {
            this.ucSelecionada = ucSelecionada;
        });
        this.qa = !environment.production;
    }

    ngOnInit(): void {
        this._router.events.subscribe((_routerEvent: any): void => {
            this.closeAllOptions();

            if (_routerEvent instanceof ResolveEnd) {
                this.rotaLigacaoNova = _routerEvent?.url?.includes('ligacao-nova') ?? false;
                console.log(this.rotaLigacaoNova);
            }
        });

        this._agenciaVirtualService.grupoTensao.subscribe((grupoTensao: GrupoTensao) => {
            this.grupoTensao = grupoTensao;
            this._headerService.definirEstiloDoHeader(grupoTensao);
        });

        this._userService.dadosUser.subscribe((dadosUser: UserResponseDTO) => {
            const nomeDoUsuario: string = this.determinarNomeExibido(dadosUser);
            this.nomeUsuario = nomeDoUsuario;
            this.logo = this.definirLogo(nomeDoUsuario);
        });

        this._headerService.estiloHeader.subscribe((estiloHeader: EstiloHeader) => {
            this.headerClass = estiloHeader.headerClass;
            this.indicadorPerfil = estiloHeader.indicadorPerfil;
            this.icone = estiloHeader.icone;
        });

        this._bandeiraTarifariaService.obterBandeiraTarifaria();
    }

    determinarNomeExibido(dadosUser: UserResponseDTO): string {
        return (dadosUser['usuarioAcesso'] && !dadosUser['usuarioAcesso']?.includes('undefined')) ? dadosUser['usuarioAcesso'] : dadosUser['nome'] || dadosUser['nomeFantasia'] || dadosUser['nomeSolicitante'] ||
            dadosUser['razaoSocial'];
    }


    definirLogo(nome: string): string {
        if (nome === '') {
            return environment.logoLetraBranca;
        } else {
            return environment.logoLetraBranca;
        }
    }

    @HostListener("window:resize", ["$event"])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
        this.controleMenuMobile();
    }

    openOption(opcao: Conjunto, index: number): void {
        if (this.menuAberto) {
            this.closeAllOptions(index);
        }
        if (this.opcoesMenu.opcoes[index].open) {
            this.closeAllOptions();
        } else {
            this.opcoesMenu.opcoes[index].open = true;
            this.menuAberto = true;
            this.rotate(index, true);
        }
        this.conjuntoSelecionado = opcao;
    }

    private closeOption(option: number) {
        this.opcoesMenu.opcoes[option].open = false;
        this.rotate(option, false);
    }

    private closeAllOptions(exception?: number): void {
        this.menuAberto = !!exception;
        this.opcoesMenu.opcoes.forEach((_element, i) => {
            if (i != exception) {
                this.closeOption(i);
            }
        });
    }

    private rotate(option: number, rotate: boolean) {
        const MENU_OPTION = document.getElementById('menu-status-' + option);
        if (MENU_OPTION) {
            MENU_OPTION.classList[(rotate ? 'add' : 'remove')]('rotate-up');
            MENU_OPTION.classList[(rotate ? 'remove' : 'add')]('rotate-down');
        }
    }

    controleMenuMobile(): void {
        if (window.screen.width > 768) {
            this.sidenav.close();
        } else {
            this.closeAllOptions();
        }
    }

    login(): void {
        this._dialogLoginService.exibirDialogLogin();
    }

    escolherServico(servico: Item): void {
        this.sidenav.close();
        if (servico.tipo === 'LINK') {
            if (servico.link) this.openLink(servico.link);

        } else {
            if (!this.nomeUsuario) { // Verifica se o usuario esta logado
                this.sidenav.close();
                this.closeAllOptions();
                this.login();
            } else { // Verifica se existem restrições para o serviço selecionado
                if (this._agenciaVirtualService.servicosSemUcSelecionada.includes(servico.nome)) {
                    this.checarSeEstaEmFluxo(servico);
                } else {
                    if (this.ucSelecionada) {
                        this.checarSeEstaEmFluxo(servico);
                    } else {
                        this._alert.alertInfo('Por favor, selecione uma unidade consumidora para acessar este serviço.');
                    }
                }
            }
        }
    }

    checarSeEstaEmFluxo(servico: Item): void {
        if (this._userService.isFluxo) {

            this._alert.alertConfirmarCancelamento().then((r) => {
                if (r.value) {
                    this._userService.isFluxo = false
                    if (servico.route) this._router.navigate(servico.route);
                }
            });
        } else {
            if (servico.route) {
                this._router.navigate(servico.route);
            }
        }
    }

    openLink(link: string) {
        let otherWindow = window.open(link, '_blank');
        if (otherWindow) {
            otherWindow.opener = null
        }
    }

    paginaInicial(): void {
        this._agenciaVirtualService.paginaInicial();
    }
}
