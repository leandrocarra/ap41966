import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto, Servicos } from 'app/core/enums/servicos';
import { EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { Religacao } from 'app/core/models/religacao/religacao';
import { FaturaArrecadadas, ReligacaoImediataDTORequest } from 'app/core/models/religacao/request/religacao-dto';
import { GrupoTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { ReligacaoService } from 'app/core/services/religacao/religacao.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { SolicitacaoEnviadaService } from 'app/core/services/solicitacao-enviada/solicitacao-enviada.service';
import { UserService } from 'app/core/services/user/user.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { HeaderMetodo } from 'app/shared/models/header-metodo/header-metodo';
import { SolicitacaoContent, SolicitacaoEnviada } from 'app/shared/models/solicitacao-enviada/solicitacao-enviada';
import { take } from 'rxjs';
@Component({
    selector: "app-confirmacao",
    templateUrl: "./confirmacao.component.html",
    styleUrls: ["./confirmacao.component.scss"],
})

export class ConfirmacaoComponent {
    dados: Religacao
    grupoTensao: GrupoTensao;
    possuiDebitos: boolean;
    solicitacaoEnviada: SolicitacaoEnviada;
    mascaraDeTelefone: string;

    // Fluxo com débitos
    validarAnexos: boolean = true;

    constructor(
        private _router: Router,
        private _religacaoService: ReligacaoService,
        private _selecaoImovelService: SelecaoImovelService,
        private _userService: UserService,
        private _location: Location,
        private _solicitacaoEnviadaService: SolicitacaoEnviadaService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _loading: LoadingService
    ) {
        window.scrollTo(0, 0);
        this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao);
        this.dados = this._religacaoService.getDadosReligacao;
        this.mascaraDeTelefone = this.aplicarMascaraTelefone(this.dados.telefone);
        this.solicitacaoEnviada = new SolicitacaoEnviada();
        this.possuiDebitos = this._religacaoService.getDadosReligacao.fluxo === 'pagamento comprovante' || this._religacaoService.getDadosReligacao.fluxo === 'pagamento com erro';
        if (this.possuiDebitos) {
            this.validarAnexos = (this.dados.comprovantes?.length === this.dados.faturas.length) ? true : false; 
        }
    }

    aplicarMascaraTelefone(value: string): string {
        if (value.length === 11) {
            return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
        } else {
            return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
    }

    registrarPedidoReligacao(): void {
        const religacaoImediataDTORequest = this.preencherReligacaoImediataDTORequest();
        this._religacaoService.solicitarReligacao(religacaoImediataDTORequest).subscribe({
            next: () => {
                this._loading.stop();
                this.definirDadosSolicitacao();
                this._solicitacaoEnviadaService.setSolicitacaoEnviada = this.solicitacaoEnviada;
                this._router.navigate([PathCompleto.religacao, Servicos.solicitacaoEnviada]);
            },
            error: () => {
                this._loading.stop();
                this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: EnumTitulosPadroes.Inesperado } })
            }
        });
    }

    preencherReligacaoImediataDTORequest(): ReligacaoImediataDTORequest {
        const religacaoImediata = new ReligacaoImediataDTORequest('', '', new HeaderMetodo());
        religacaoImediata.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        religacaoImediata.pontoReferencia = this.dados.referencia;
        religacaoImediata.telefoneSolicitante = this.dados.telefone;
        religacaoImediata.tipoTaxa = 'C'; //FIXO
        religacaoImediata.headerMetodo.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        religacaoImediata.headerMetodo.tipificacao = '1031401' // FIXO
        religacaoImediata.headerMetodo.documentoSolicitante = this._userService.dadosUser.documento;
        religacaoImediata.headerMetodo.canalSolicitante = environment.canal;
        religacaoImediata.headerMetodo.usuario = environment.USUARIO_UE;


        if (environment.regiao == Regiao.NE) {
            religacaoImediata.nomeSolicitante = this._selecaoImovelService.getUCSelecionada?.nomeCliente.substring(0, 80) ?? '';
            religacaoImediata.cobrataxa = 'X'; // FIXO
            if (this.possuiDebitos) {
                religacaoImediata.pagamentoConfirmado = (this.dados.fluxo === 'pagamento concluido') ? 'X' : '';
            }
        } else {
            religacaoImediata.headerMetodo.protocoloSonda = this._userService.getProtocolo.protocoloLegadoStr;
            if (this.possuiDebitos) {
                religacaoImediata.faturasArrecadadas = [];
                this.dados.faturas.forEach(elem => {
                    religacaoImediata.faturasArrecadadas?.push(
                        new FaturaArrecadadas('01', new Date(), 'Canais Digital', elem.numeroFatura)
                    )
                })
            }
        }
        return religacaoImediata;
    }

    definirDadosSolicitacao(): void {
        this.solicitacaoEnviada.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        this.solicitacaoEnviada.titulo = "Solicitação de Religação enviada com sucesso!";
        this.solicitacaoEnviada.infos.push(
            new SolicitacaoContent("PRAZO", `${this.dados.dadosTaxa.tempo} ${this.dados.dadosTaxa.unidadeTempo}`),
            new SolicitacaoContent("TAXA DE RELIGACAO", 'R$ ' + this.dados.dadosTaxa.taxa),
            new SolicitacaoContent("TELEFONE PARA CONTATO", this.mascaraDeTelefone),
            new SolicitacaoContent("PONTO DE REFERENCIA", this.dados.referencia)
        )
    }

    continuar(): void {
        this._loading.start();
        this.registrarPedidoReligacao()
    }

    voltar(): void {
        this._location.back();
    }

    arquivosAnexados(event: any): void {
        this.validarAnexos = event
    }
}
