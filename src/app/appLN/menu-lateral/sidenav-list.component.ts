import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environmentLN } from '@environments/environmentsLN/environment';
import { LoginService } from '../core/services/login/login.service';
import { UserServiceLN } from '../core/services/user/user.service';

@Component({
  selector: 'neo-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
    telaAtual: string;
    url: string;
    isExpanded: boolean;
    isMenuVisible: boolean;
    isMobile: boolean;
    isHomologacao: boolean;
    @ViewChild('sidenav') sidenav: any;
    nomeUser: string;
    usuarioDAO: any;
    outros = [
        { nome: 'ELEKTRO', link: 'https://www.neoenergiaelektro.com.br/' }
    ]

    routes = [
        { label: 'Pedido', path: "ligacao-nova/pedido", visited: false, current: false, number: 1 },
        { label: 'Documentos', path: "ligacao-nova/documentos", visited: false, current: false, number: 2 },
        { label: 'Dados do Títular', path: "ligacao-nova/dados-do-titular", visited: false, current: false, number: 3 },
        { label: 'Dados da Ligação', path: "ligacao-nova/dados-da-ligacao", visited: false, current: false, number: 4 },
        { label: 'Pagamento', path: "ligacao-nova/pagamento", visited: false, current: false, number: 5 },
        { label: 'Confirmação', path: "ligacao-nova/confirmacao", visited: false, current: false, number: 6 },
        { label: 'Vistoria', path: "ligacao-nova/vistoria", visited: false, current: false, number: 7 },
        { label: 'Conclusão', path: "ligacao-nova/conclusao", visited: false, current: false, number: 8 },
    ];

    constructor(
        private _userServiceLN: UserServiceLN,
        private _loginService: LoginService,
        private _router: Router

    ) {
        this.telaAtual = '';
        this.url = '';
        this.isExpanded = false;
        this.isMenuVisible = true;
        this.isMobile = false;
        this.isHomologacao = false;
        this.usuarioDAO = this._userServiceLN?.sessionUser;
        this.nomeUser = this.usuarioDAO?.nome;
        this._router.events.subscribe((routerEvent) => {
        if (routerEvent instanceof NavigationEnd) {
            this.checkEtapa(routerEvent.url);
            this.url = routerEvent.url;
        }
    });
}

    ngOnInit() {
        if (environmentLN.apiUrl === 'https://api-agenciahml.elektro.com.br') {
        this.isHomologacao = true;
        }
        this.configureMenuByWindowSize(window.screen.width);
    }

    checkEtapa(etapa: string) {
        this.routes.forEach((element, index) => {
        if (etapa.includes(element.path)) {
            this.setCurrentNavigate(index);
        }
        });
    }

    setCurrentNavigate(index: number) {
        let x = this.routes.length;
        for (let i = 0; i < x; i++) {
        if (i == index) {
            this.telaAtual = this.url === '/ligacao-nova/pedido/imovel-pronto' ? 'Preparação do imóvel' :  this.routes[i].label;
            this.routes[i].current = true;
            this.routes[i].visited = false;
        } else {
            this.routes[i].current = false;
            this.routes[i].visited = i < index && !this.routes[i].visited ? true : this.routes[i].visited;
        }
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.configureMenuByWindowSize(event.target.innerWidth);
    }

    openMenu(): void {
        if (!this.isMenuVisible) {
        this.sidenav?.open();
        this.isExpanded = true;
        this.isMenuVisible = true;
        } else {
        this.sidenav.close();
        this.isExpanded = false;
        this.isMenuVisible = false;
        }
    }

    configureMenuByWindowSize(width: any): void {
        if (width <= 768) {
        setTimeout(() => {
            this.sidenav.close();
        }, 1);
        this.isMenuVisible = false;
        this.isMobile = true;

        if (this.usuarioDAO) {
            this.nomeUser = this.usuarioDAO.nome;

            if (this.nomeUser.length > 20 && this.isMobile) {
            this.nomeUser = this.nomeUser.split(' ')[0] + " " + this.nomeUser.split(" ").splice(-1);

            if (this.nomeUser.length > 18) {
                this.nomeUser = this.nomeUser.split(' ')[0] + "...";
            }
            }
        }
        } else {
        this.nomeUser = this.usuarioDAO.nome;
        this.sidenav?.open();
        this.isMenuVisible = true;
        this.isMobile = false;
        }
    }

    logout(): void {
        this._loginService.logout();
    }
}
