import { Injectable } from '@angular/core';
import {
    Resolve,
    Router
} from '@angular/router';
import { environment } from '@environments/environment';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasHome } from 'app/core/models/home/sub-rotas-home';
import { PerfisDeAcesso } from 'app/core/models/multilogin/multilogin-acesso';
import { ValidaRelacao } from 'app/core/models/multilogin/multilogin-cadastro';
import { ObterVinculosDTORequest, ValidaRelacaoDTORequest } from 'app/core/models/multilogin/request/multilogin-dto';
import { ObterVinculosDTOResponse } from 'app/core/models/multilogin/response/multilogin-dto';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';
import { SelecaoPerfilDeAcessoService } from 'app/core/services/selecao-perfil-de-acesso/selecao-perfil-de-acesso.service';
import { UserService } from 'app/core/services/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class MultiloginSelecaoDePerfilResolver implements Resolve<boolean> {

    liberarConjuge: boolean;
    liberarRepresentanteLegal: boolean;

    constructor(
        private _selecaoPerfilDeAcessoService: SelecaoPerfilDeAcessoService,
        private _multiloginAcessoService: MultiloginAcessoService,
        private _loadingService: LoadingService,
        private _userService: UserService,
        private _router: Router
    ) {
        this.liberarConjuge = false;
        this.liberarRepresentanteLegal = false;
    }


    async resolve(): Promise<ObterVinculosDTOResponse | any> {
        this._loadingService.start();
        if(!!this._userService.dadosUser.documento){
            //Definir relações legado ocultar cônjuge quando CNPJ
            let perfisLegado = (this._userService.dadosUser.documento.length > 11) ? [PerfisDeAcesso.representanteLegal] : [PerfisDeAcesso.representanteLegal, PerfisDeAcesso.conjuge]
            perfisLegado.forEach(elem => {
                this.obterVinculosLegado(elem);
            });

            await this.obterVinculosMultilogin();
        }
    }

    obterVinculosLegado(perfil: PerfisDeAcesso): void {
        const validaRelacaoRequest = new ValidaRelacaoDTORequest(
            `${environment.name}/${this._userService.dadosUser.documento}`,
            this._userService.dadosUser.documento,
            this.definirAtribuicao(perfil),
            environment.canal,
            environment.USUARIO_UE
        )

        this._multiloginAcessoService.getValidaRelacao(validaRelacaoRequest).then((dados) => {
            this._loadingService.stop();
            if (perfil === PerfisDeAcesso.conjuge) {
                this.liberarConjuge = true;
                this._multiloginAcessoService.multiloginAcesso.documentoCliente = dados.relacoes[0].documentoCliente;
                this._multiloginAcessoService.setMultiloginAcesso = this._multiloginAcessoService.multiloginAcesso;
            } else {
                this.liberarRepresentanteLegal = true;
            }

        }).catch(() => { });
    }

    obterVinculosMultilogin(): Promise<any> {
        return new Promise((vinculosRecebidos) => {
            let request: ObterVinculosDTORequest = new ObterVinculosDTORequest(
                `${environment.name}/${this._userService.dadosUser.documento}`,
                this._userService.dadosUser.documento
            );
            this._multiloginAcessoService.getObterVinculosRecebidos(request).then((vinculos: ObterVinculosDTOResponse) => {
                this.definirPerfisLiberados(vinculos.listaPerfisAtivo);
                this.fluxoAcessoComum();
                vinculosRecebidos(vinculos.listaPerfisAtivo);
                this._loadingService.stop();
            }).catch((error) => {
                this._loadingService.stop();
                this.definirPerfisLiberados([]);
                this.fluxoAcessoComum();
                vinculosRecebidos(error);

            });
        });
    }

    definirAtribuicao(perfil: string): string {
        let atribuicao = '';
        ValidaRelacao.forEach(element => {
            if (element.value === perfil) {
                atribuicao = element.key;
            }
        });
        return atribuicao;
    }


    definirPerfisLiberados(perfis: Array<string>): void {
        if (this._userService.dadosUser.documento.length > 12) {
            this.removerConjuge();
        }

        this._selecaoPerfilDeAcessoService.getCardsPerfis.forEach((elem) => {
            let perfisLiberados: Array<string> = perfis.map((perfil: string) => perfil.toUpperCase());

            perfisLiberados = perfisLiberados.map((perfil: string) => {
                return (perfil === 'ACESSO COMPARTILHADO') ? 'PERFIL DE ACESSO' : perfil;
            });

            if (perfisLiberados.includes(elem.titulo.toUpperCase())) {
                //NOTE: remover vínculos de representante legal e cônjuge
                //Esses tipos de vínuculos virá do legado
                if (elem.titulo.toUpperCase() !== PerfisDeAcesso.representanteLegal.toUpperCase() || elem.titulo.toUpperCase() !== PerfisDeAcesso.conjuge.toUpperCase()) {
                    elem.disabled = false;
                }
            }

            if (this.liberarConjuge && elem.titulo.toUpperCase() == PerfisDeAcesso.conjuge.toString().toUpperCase()) {
                elem.disabled = false;
            }

            if (this.liberarRepresentanteLegal && elem.titulo.toUpperCase() == PerfisDeAcesso.representanteLegal.toString().toUpperCase()) {
                elem.disabled = false;
            }

            //NOTE: sempre liberar Acesso Comum
            if (elem.titulo.toUpperCase() == PerfisDeAcesso.acessoComum.toString().toUpperCase()) {
                elem.disabled = false;
            }
        });
        this._selecaoPerfilDeAcessoService.setCardsPerfis = this._selecaoPerfilDeAcessoService.cardsPerfis;
        this._multiloginAcessoService.setMultiloginAcesso = this._multiloginAcessoService.multiloginAcesso;
    }

    removerConjuge(): void {
        this._selecaoPerfilDeAcessoService.getCardsPerfis.forEach((elem, index) => {
            if (elem.titulo.toUpperCase() === PerfisDeAcesso.conjuge.toString().toUpperCase()) {
                this._selecaoPerfilDeAcessoService.cardsPerfis.splice(index, 1)
            }
        });
    }

    fluxoAcessoComum(): void {
        if (this._multiloginAcessoService.validarFluxoDiretoAcessoComum() && this._userService.dadosUser.documento.length <= 11) {
            this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso = PerfisDeAcesso.B;
            this._multiloginAcessoService.setMultiloginAcesso = this._multiloginAcessoService.multiloginAcesso;
            this._router.navigate([PathCompleto.home, SubRotasHome.MinhasUnidadesConsumidoras]);
        }
    }
}
