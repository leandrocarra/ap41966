import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasHome } from 'app/core/models/home/sub-rotas-home';
import { CardPerfil, PerfisDeAcesso, SubRotasMultiloginAcesso } from 'app/core/models/multilogin/multilogin-acesso';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { HeaderService } from 'app/core/services/header/header.service';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { SelecaoPerfilDeAcessoService } from 'app/core/services/selecao-perfil-de-acesso/selecao-perfil-de-acesso.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
    selector: 'app-dados-perfil-de-acesso',
    templateUrl: './dados-perfil-de-acesso.component.html',
    styleUrls: ['./dados-perfil-de-acesso.component.scss']
})
export class DadosPerfilDeAcessoComponent implements OnInit {
    cardsPerfis: Array<CardPerfil>;
    banner: string;
    @Input() cards!: Array<CardPerfil>;

    constructor(
        private _selecaoPerfilDeAcessoService: SelecaoPerfilDeAcessoService,
        private _multiloginAcessoService: MultiloginAcessoService,
        private _selecaoImovelService: SelecaoImovelService,
        private _userService: UserService,
        private _router: Router,
        private _headerService: HeaderService,
        private _customSweetAlert: CustomSweetAlertService,
    ) {
        this.cardsPerfis = this._selecaoPerfilDeAcessoService.getCardsPerfis;
        this.banner = this._selecaoPerfilDeAcessoService.banner;
        this.cards = this._selecaoPerfilDeAcessoService.cardsPerfis;
    }

    ngOnInit(): void {
        this.setarDados(PerfisDeAcesso.acessoComum);

        if (this._userService.dadosUser.documento.length > 11) {
            this.cadastrarRepresentanteLegal();
        }
    }

    cadastrarRepresentanteLegal(): void {
        this._customSweetAlert.alertCadastroRepresentanteLegal(
            'Você está sendo convidade a atualizar os seus dados,\n isso tratá benefícios de acesso como Represetante Legal.',
            'Após a atualização dos seus dados, você terá o benefício de utilizar a opção de Representante Legal.',
            'CADASTRAR PERFIL DE REPRESENTANTE LEGAL',
            'NÃO'
        ).then((result) => {
            if (!result.value) {
                this._router.navigate([PathCompleto.compartilharAcesso]);
            } else {
                if (this._multiloginAcessoService.validarFluxoDiretoAcessoComum()) {
                    this._router.navigate([PathCompleto.home, SubRotasHome.MinhasUnidadesConsumidoras]);
                }
            }
        });
    }


    navigateTo(perfil: PerfisDeAcesso): void {
        this.setarDados(perfil);

        switch (perfil) {
            case PerfisDeAcesso.acessoComum:
            case PerfisDeAcesso.conjuge:
            case PerfisDeAcesso.perfilDeAcesso:
            case PerfisDeAcesso.padronista:
                this.setarProtocolo(perfil);
                this._router.navigate([PathCompleto.home, SubRotasHome.MinhasUnidadesConsumidoras]);
                break;

            case PerfisDeAcesso.representanteLegal:
                this._router.navigate([PathCompleto.multiloginAcesso, SubRotasMultiloginAcesso.SelecaoDeCliente]);
                break

            default:
                this._router.navigate([PathCompleto.multiloginAcesso, SubRotasMultiloginAcesso.PesquisarCliente]);
                break;
        }
    }

    setarDados(perfil: PerfisDeAcesso): void {
        this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso = perfil;
        this._multiloginAcessoService.setMultiloginAcesso = this._multiloginAcessoService.multiloginAcesso;
        this._headerService.definirEstiloDoHeader(perfil);
        this._selecaoImovelService.storage.removeItem("ucs");   //Limpar ucs sempre que trocar o perfil de acesso

    }

    setarProtocolo(perfil: PerfisDeAcesso): void {
        if ([PerfisDeAcesso.acessoComum, PerfisDeAcesso.conjuge].includes(perfil)) {
            this._userService.storage.removeItem("protocolo");
        }
    }

}
