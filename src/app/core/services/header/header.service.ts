import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { NomeServico, PathCompleto } from 'app/core/enums/servicos';
import {
    Conjunto,
    EnumCorDeFundoDoHeader,
    EnumCorDeFundoDoHeader as EnumEstiloDoHeader, EstiloHeader,
    Item,
    Menu,
    Notificacao,
    NotificacoesHeader,
    SubConjunto
} from 'app/core/models/header/header';
import { GrupoTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { NeoenergiaLinks } from 'app/shared/models/utils/agencia-virtual-utils';
import { BehaviorSubject, Subject } from 'rxjs';
import { LgpdService } from '../lgpd/lgpd.service';
import { MultiloginAcessoService } from '../multilogin-acesso/multilogin-acesso.service';
import { AgenciaVirtualService } from '../utils/admin/agencia-virtual.service';
import { PerfisDeAcesso, TipoAcesso } from 'app/core/models/multilogin/multilogin-acesso';
import { TrocaTitularidadeService } from '../troca-titularidade/troca-titularidade.service';
import { DenunciaEticaService } from '../denuncia-etica/denuncia-etica.service';
import { ProgramaFidelidadeService } from '../programa-fidelidade/programa-fidelidade.service';
import { CanaisAtendimentoService } from '../canais-atendimento/canais-atendimento.service';
import {
    AtendimentoPresencialAgendadoService
} from '../atendimento-presencial-agendado/atendimento-presencial-agendado.service';

const habilitado: boolean = false;

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    estiloHeader: any;
    updateEstiloHeader(estilo: EstiloHeader): void {
        this.stageEstiloHeader.next(estilo);
    }
    private stageEstiloHeader: BehaviorSubject<EstiloHeader> = new BehaviorSubject<EstiloHeader>(new EstiloHeader())
    opcoesMenu: Menu;
    notificacoesHeader: NotificacoesHeader;
    linksDistribuidora: NeoenergiaLinks;

    constructor(
        private titleCasePipe: TitleCasePipe,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _lgpdService: LgpdService,
        private _trocaTitularidadeService: TrocaTitularidadeService,
        private _denunciaEticaService: DenunciaEticaService,
        private _programaFidelidadeService: ProgramaFidelidadeService,
        private _canaisAtendimentoService: CanaisAtendimentoService,
        private _atendimentoPresencialAgendadoService: AtendimentoPresencialAgendadoService,
        private _multiloginAcessoService: MultiloginAcessoService,

    ) {
        this.linksDistribuidora = this._agenciaVirtualService.gerarLinksPorDistribuidora();
        this.opcoesMenu = new Menu([
            new Conjunto(
                'Para Você',
                [
                    new SubConjunto('Meu perfil',
                        [
                            new Item(NomeServico.MinhaConta, habilitado, 'ROTA', [PathCompleto.minhaConta]),
                            new Item(NomeServico.UnidadesConsumidora, habilitado, 'ROTA', [PathCompleto.unidadesConsumidoras]),
							new Item(NomeServico.CompartilharAcesso, habilitado, 'ROTA', [PathCompleto.compartilharAcesso])

                        ]
                    ),
                    new SubConjunto('Faturas',
                        [
                            new Item(NomeServico.SegundaViaLogado, habilitado, 'ROTA', [PathCompleto.segundaVia]),
                            new Item(NomeServico.Autoleitura, habilitado, 'ROTA', [PathCompleto.autoleitura])
                        ]
                    ),
                    new SubConjunto('Solicitações',
                        [
                            new Item(NomeServico.DenunciaEtica, habilitado, 'LINK', undefined, this._denunciaEticaService.getLinkDenunciaEtica()),
                            new Item(NomeServico.ProgramaFidelidade, habilitado, 'LINK', undefined, this._programaFidelidadeService.getLinkProgramaFidelidade()),
                            new Item(NomeServico.CanaisAtendimento, habilitado, 'LINK', undefined, this._canaisAtendimentoService.getLinkCanaisAtendimento()),
                            new Item(NomeServico.AtendimentoPresencialAgendado, habilitado, 'LINK', undefined, this._atendimentoPresencialAgendadoService.getLinkAtendimentoPresencialAgendado()),
                            new Item(NomeServico.LGPD, habilitado, 'LINK', undefined, this._lgpdService.getLinkLGPD('LGPD'))
                        ]
                    )
                ]
            ),
            new Conjunto(
                'Para a Unidade Consumidora',
                [
                    new SubConjunto('Energia',
                        [
                            new Item(NomeServico.FaltaDeEnergia, habilitado, 'ROTA', [PathCompleto.faltaDeEnergia]),
                            new Item(NomeServico.Religa, habilitado, 'ROTA', [PathCompleto.religacao]),
                            new Item(NomeServico.HistoricoDeConsumo, habilitado, 'ROTA', [PathCompleto.historicoDeconsumo]),
                            new Item(NomeServico.ProjetoParticular, habilitado, 'ROTA', [PathCompleto.projetoParticular])
                        ]
                    ),
                    new SubConjunto('Personalização da conta',
                        [
                            new Item(NomeServico.FaturaPorEmail, habilitado, 'ROTA', [PathCompleto.faturaDigital]),
                            new Item(NomeServico.DebitoAutomatico, habilitado, 'ROTA', [PathCompleto.debitoAutomatico]),
                            new Item(NomeServico.DataDeVencimento, habilitado, 'ROTA', [PathCompleto.alterarDataDeVencimento]),
                            new Item(NomeServico.TrocaTitularidade, habilitado, 'LINK', undefined, this._trocaTitularidadeService.getLinkTrocaTitularidade())
                        ]
                    )
                ]
            ),
            new Conjunto(
                'Neoenergia',
                [
                    new SubConjunto('Sobre nós',
                        [
                            new Item(`A ${this.titleCasePipe.transform(environment.title)}`, habilitado, 'LINK', undefined, this.linksDistribuidora.paginaInstitucionalURL)
                        ]
                    ),
                    new SubConjunto('Nossas redes',
                        [
                            new Item('YouTube', habilitado, 'LINK', undefined, this.linksDistribuidora.youtubeURL),
                            new Item('Facebook', habilitado, 'LINK', undefined, this.linksDistribuidora.facebookURL),
                            new Item('Instagram', habilitado, 'LINK', undefined, this.linksDistribuidora.instagramURL)
                        ]
                    )
                ]
            ),
        ]);

        this.notificacoesHeader = new NotificacoesHeader([
            new Notificacao("nova", "Reajuste Tarifário médio 5,71%, Resolução 2.670/20 ANEEL.", "05 de jul às 10:45"),
            new Notificacao("nova", "Reajuste Tarifário médio 5,71%, Resolução 2.670/20 ANEEL.", "05 de jul às 10:45"),
            new Notificacao("nova", "Reajuste Tarifário médio 5,71%, Resolução 2.670/20 ANEEL.", "05 de jul às 10:45")
        ]);
        this.estiloHeader = this.stageEstiloHeader.asObservable();
    }

    headerGrupoTensao(grupoTensao: GrupoTensao): void {
        const headerData = {
            headerClass: grupoTensao === 'A' ? EnumCorDeFundoDoHeader.GrupoA : EnumCorDeFundoDoHeader.Padrao,
            indicadorPerfil: grupoTensao === 'A' ? 'GRANDES<br>CLIENTES' : '',
            icone: ''
        };

        this.updateEstiloHeader(headerData);
    }

    definirEstiloDoHeader(tipoUsuario: string): void {
         if (tipoUsuario === TipoAcesso.imobiliaria) {
            this.updateEstiloHeader({
                headerClass: EnumEstiloDoHeader.Imobiliaria,
                indicadorPerfil: `ACESSO COMPARTILHADO </br> IMOBILIÁRIA`,
                icone: 'assets/images/icons/header_imob.svg'
            });

        } else if (tipoUsuario === TipoAcesso.credenciado) {
            this.updateEstiloHeader({
                headerClass: EnumEstiloDoHeader.Credenciado,
                indicadorPerfil: `ACESSO COMPARTILHADO </br> CREDENCIADO`,
                icone: 'assets/images/icons/header_credenciado.svg'
            });
        } else {
            let perfil: PerfisDeAcesso = this._multiloginAcessoService.getMultiloginAcesso.perfilDeAcesso

            switch (perfil) {
                case PerfisDeAcesso.conjuge:
                    this.updateEstiloHeader({
                        headerClass: EnumEstiloDoHeader.Conjuge,
                        indicadorPerfil: `ACESSO COMPARTILHADO </br> CÔNJUGE`,
                        icone: 'assets/images/icons/header_conjuge.svg'
                    });
                    break;

                case PerfisDeAcesso.representanteLegal:
                    this.updateEstiloHeader({
                        headerClass: EnumEstiloDoHeader.RepresentanteLegal,
                        indicadorPerfil: `ACESSO COMPARTILHADO </br> REPRESENTANTE LEGAL`,
                        icone: 'assets/images/icons/header_rep_legal.svg'
                    });
                    break;

                case PerfisDeAcesso.corretor:
                    this.updateEstiloHeader({
                        headerClass: EnumEstiloDoHeader.Corretor,
                        indicadorPerfil: `ACESSO COMPARTILHADO </br> CORRETOR`,
                        icone: 'assets/images/icons/header_corretor.svg'
                    });
                    break;

                case PerfisDeAcesso.padronista:
                    this.updateEstiloHeader({
                        headerClass: EnumEstiloDoHeader.Padronista,
                        indicadorPerfil: `ACESSO COMPARTILHADO </br> PADRONISTA`,
                        icone: 'assets/images/icons/header_padronista.svg'
                    });
                    break;

                case PerfisDeAcesso.atendenteCredenciado:
                    this.updateEstiloHeader({
                        headerClass: EnumEstiloDoHeader.AtendenteCredenciado,
                        indicadorPerfil: `ACESSO COMPARTILHADO </br> ATENDENTE CREDENCIADO`,
                        icone: 'assets/images/icons/header_atend_cred.svg'
                    });
                    break;

                    case PerfisDeAcesso.perfilDeAcesso:
                        this.updateEstiloHeader({
                            headerClass: EnumEstiloDoHeader.PerfilDeAcesso,
                            indicadorPerfil: `ACESSO COMPARTILHADO </br> PERFIL DE ACESSO`,
                            icone: 'assets/images/icons/header_perf_acesso.svg'
                        })
                        break;

                default:
                    this.headerGrupoTensao(tipoUsuario as GrupoTensao);
                    break;
            }
        }
    }
}





