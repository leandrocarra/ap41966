import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';
import { Grupo } from 'app/core/enums/grupos';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumAvisosPadroes, EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { EnumOpcoesStatusUC } from 'app/core/models/meus-imoveis/meus-imoveis';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { Observable } from 'rxjs';

@Injectable()
export class ReligacaoGuard implements CanActivate {
    constructor(
        private _loading: LoadingService,
        private _router: Router,
        private _selecaoImovelService: SelecaoImovelService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.verificarAcesso();
    }

    canLoad(): Observable<boolean> | Promise<boolean> | boolean {
        return this.verificarAcesso();
    }

    private verificarAcesso(): boolean {

        //NE: Proibido para conta mãe de conta coletiva
        if (this._selecaoImovelService.getUCSelecionada?.isGrupo === null && this._selecaoImovelService.getUCSelecionada?.indCCColetiva === 'X' && environment.regiao == Regiao.NE) {
            this._router.navigate( [PathCompleto.aviso], { queryParams: { titulo: EnumTitulosPadroes.ContaColetiva } } );
            this._loading.stop();
            return false;
        }

        //Proibir quando estiver desligada;
        if (this._selecaoImovelService.getInformacoesUCSelecionada.situacao.descricao === EnumOpcoesStatusUC.Desligada) {
            this._router.navigate( [PathCompleto.aviso], { queryParams: { codigoAviso: EnumAvisosPadroes.UnidadeDesligada } } );
            this._loading.stop();
            return false;
        }

        //SE: Proibir para grupo A sudeste
        if (this._selecaoImovelService.getGrupoDoUsuario === Grupo.A && environment.regiao == Regiao.SE) {
            this._router.navigate( [PathCompleto.aviso], { queryParams: { titulo: EnumTitulosPadroes.IndisponivelGrupoA } } );
            this._loading.stop();
            return false;
        }

        //Proibir quando estiver processo de desligamento; //TODO: aguardando massa de dados
        // if (this._selecaoImovelService.getInformacoesUCSelecionada.situacao.descricao === EnumOpcoesStatusUC.Desligada) {
        //         const dadosAdicionais = new DadosAdicionais();
        //         dadosAdicionais.botaoPrimario = 'SOLICITAR LIGAÇÃO NOVA'
        //         dadosAdicionais.funcaoPrimaria = () => {
        //             this._router.navigate([PathCompleto.home]);
        //         }
        //         this._exibirAvisoService.setDadosAdicionais = dadosAdicionais;
        //         this.telaDeAviso(EnumReligacao.DesligamentoEmAndamento)
        //         this._loading.stop();
        //         return false;
        // }

         //Uc em tramite de ligação e religacão em andamento.
           if (this._selecaoImovelService.getInformacoesUCSelecionada.situacao.descricao === EnumOpcoesStatusUC.Potencial) {
                this._loading.stop();
                this._router.navigate( [PathCompleto.aviso], { queryParams: { titulo: 'Não é possível pedir Religação, pois a unidade consumidora econtra-se em processo de ativação.' } } );
                return false;
        }

        return true;
    }


}
