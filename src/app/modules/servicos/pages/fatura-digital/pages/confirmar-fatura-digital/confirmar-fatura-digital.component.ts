import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto, Servicos } from 'app/core/enums/servicos';
import { EnumDeclaracaoDeTermos, EnumOperacoes, EnumRecebimento } from 'app/core/models/fatura-digital/fatura-digital';
import { FaturaEmailCadastraDTORequest } from 'app/core/models/fatura-digital/request/fatura-digital-dto';
import { FaturaDigitalCadastraDTOResponse } from 'app/core/models/fatura-digital/response/fatura-digital-dto';
import { SubRotasFaturaDigital } from 'app/core/models/fatura-digital/sub-rotas-fatura-digital';
import { EnumIdTermo } from 'app/core/models/termo-de-adesao/termo-de-adesao';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { ErrorService } from 'app/core/services/error/error.service';
import { FaturaDigitalService } from 'app/core/services/fatura-digital/fatura-digital.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { SolicitacaoEnviadaService } from 'app/core/services/solicitacao-enviada/solicitacao-enviada.service';
import { TermoDeAdesaoService } from 'app/core/services/termo-de-adesao/termo-de-adesao.service';
import { UserService } from 'app/core/services/user/user.service';
import {
    EnumAlertaCorTitulo,
    EnumAlertaIcone,
    SolicitacaoContent,
    SolicitacaoEnviada
} from 'app/shared/models/solicitacao-enviada/solicitacao-enviada';

const AGUARDAR_PERIODO_DE_LEITURA: string = 'Aguarde! Sua próxima fatura deverá vir digitalmente após finalizado o período de leitura!';
const SOLICITACAO_ENVIADA: string = 'Sua solicitação foi enviada com sucesso!';

@Component({
    selector: 'app-confirmar-fatura-digital',
    templateUrl: './confirmar-fatura-digital.component.html',
    styleUrls: ['./confirmar-fatura-digital.component.scss']
})
export class ConfirmarFaturaDigitalComponent {
    grupoDoUsuario: string;
    termo: boolean;
    modoDeEnvio: any;
    tipoRecebimento: string;
    novaFormeDeEnvio: string;
    declaracaoDeTermos: string;
    faturaEmOSB: boolean;

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _location: Location,
        private _faturaDigitalService: FaturaDigitalService,
        private _solicitacaoEnviadaService: SolicitacaoEnviadaService,
        private _selecaoImovelService: SelecaoImovelService,
        private _loadingService: LoadingService,
        private _errorService: ErrorService,
        private _alertService: CustomSweetAlertService,
        private _termoDeAdesaoService: TermoDeAdesaoService
    ) {
        this._userService.breadcrumb = true;
        this._userService.isFluxo = true;
        this.grupoDoUsuario = this._userService.group;
        this.termo = false;
        this.modoDeEnvio = this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio;
        this.tipoRecebimento = this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio.label;

        if (this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio.label === EnumRecebimento.whatsapp ||
            this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio.label === EnumRecebimento.novoWhatsapp) {
            this.novaFormeDeEnvio = "WhatsApp";
            this.declaracaoDeTermos = EnumDeclaracaoDeTermos.cadastrarWhatsApp
        } else {
            this.novaFormeDeEnvio = "e-mail";
            if (this._faturaDigitalService.fluxoFaturaDigital.possuiFaturaDigital) { // FIXME: settar variável de fluxo no serviço após retorno dos endpoints que verificam.
                this.declaracaoDeTermos = EnumDeclaracaoDeTermos.alterarEmail;
            } else {
                this.declaracaoDeTermos = EnumDeclaracaoDeTermos.cadastrarFaturaDigital;
            }
        }
        this.faturaEmOSB = _selecaoImovelService.unidadeEmPeriodoDeLeitura;
    }

    alterarDados(event: any): void {
        if (event) {
            this._router.navigate([PathCompleto.faturaDigital, SubRotasFaturaDigital.alterarFaturaDigital]);
        }
    }

    voltar(): void {
        this._location.back();
    }

    continuar(): void {
        this._loadingService.start();
        this.cadastrarFaturaDigital().then((responseDTO) => {
            this._faturaDigitalService.cadastraResponseDTO = responseDTO;
            this._faturaDigitalService.atualizarFaturaDigitalService(true);
            this._solicitacaoEnviadaService.setSolicitacaoEnviada = this.definirDadosSolicitacao();
            this._router.navigate([PathCompleto.faturaDigital, Servicos.solicitacaoEnviada]);
        }).catch((error) => {
            this._alertService.alertErroRequisicao(this._errorService.tratamentoDeErro(error));
        }).finally(() => {
            this._loadingService.stop();
        });
    }

    definirDadosSolicitacao(): SolicitacaoEnviada {
        const EMAIL: boolean = this.modoDeEnvio.label.includes('E-mail');
        const FORMA_DE_ENVIO: string = EMAIL ? "E-MAIL DE RECEBIMENTO" : "FORMA DE RECEBIMENTO";
        const CANAL_DE_ENVIO: string = EMAIL ? this.modoDeEnvio.valor : this.modoDeEnvio.valor.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
        const solicitacaoEnviada: SolicitacaoEnviada = new SolicitacaoEnviada();
        solicitacaoEnviada.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        solicitacaoEnviada.titulo = this.faturaEmOSB ? AGUARDAR_PERIODO_DE_LEITURA : SOLICITACAO_ENVIADA;
        solicitacaoEnviada.infos.push(new SolicitacaoContent(FORMA_DE_ENVIO, CANAL_DE_ENVIO));
        solicitacaoEnviada.alertaIcone = EnumAlertaIcone.TrianguloExclamacaoErro;
        solicitacaoEnviada.alerta = true;
        solicitacaoEnviada.alertaTituloCor = EnumAlertaCorTitulo.Vermelho;
        solicitacaoEnviada.alertaMensagemCor = EnumAlertaCorTitulo.Vermelho;
        solicitacaoEnviada.alertaTitulo = 'Atenção';
        solicitacaoEnviada.alertaMensagem = 'A fatura deverá vir digitalmente a partir do próximo ciclo de faturamento.';
        solicitacaoEnviada.uc = this._selecaoImovelService.getInformacoesUCSelecionada?.codigo;
        return solicitacaoEnviada;
    }

    cadastrarFaturaDigital(): Promise<FaturaDigitalCadastraDTOResponse> {
        let requestDTO = this.definirDadosParaCadastro();
        return new Promise<FaturaDigitalCadastraDTOResponse>((resolve, reject) => {
            this._faturaDigitalService.postFaturaDigitalCadastra(requestDTO).subscribe({
                next: (responseDTO) => {
                    this._faturaDigitalService.fluxoFaturaDigital.modoDeEnvioAtual = this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio;
                    this.cadastrarTermoDeAdesaoFaturaDigital();
                    resolve(responseDTO);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    definirDadosParaCadastro(): FaturaEmailCadastraDTORequest {
        this.definirFormatacaoDoOutputCasoWhatsApp();
        let requestDTO = new FaturaEmailCadastraDTORequest();
        requestDTO.email = this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio.valor;
        requestDTO.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.usuario = environment.USUARIO_UE;
        requestDTO.tipificacao = this._faturaDigitalService.fluxoFaturaDigital.tipificacao;
        requestDTO.documentoSolicitante = this._userService.dadosUser.documento;
        requestDTO.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        if (environment.regiao === Regiao.NE) {
            requestDTO.operacao = EnumOperacoes.Cadastro;
            requestDTO.nome = this._selecaoImovelService.getUCSelecionada ? this._selecaoImovelService.getUCSelecionada.nomeCliente.substring(0, 45) : '';
        } else {
            requestDTO.protocoloSonda = this._userService.getProtocolo.protocoloLegadoStr;
        }
        return requestDTO;
    }

    cadastrarTermoDeAdesaoFaturaDigital(): void {
        this._termoDeAdesaoService.cadastrarTermoDeAdesao(
            EnumIdTermo.FaturaDigital,
            this._faturaDigitalService.fluxoFaturaDigital.tipificacao
        );
    }

    definirFormatacaoDoOutputCasoWhatsApp(): void {
        const veiculoDaFatura = this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio.label;
        const numeroWhatsApp = this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio.valor;
        if (veiculoDaFatura === EnumRecebimento.whatsapp) {
            this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio.valor = (this._faturaDigitalService.formatarNumeroDeTelefoneParaEnvio(numeroWhatsApp));
        }
    }
}
