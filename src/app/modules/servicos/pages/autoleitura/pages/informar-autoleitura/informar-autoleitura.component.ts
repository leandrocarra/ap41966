import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumFluxoAutoleitura, EnumLeiturasNaMedia, Leitura, SubRotasAutoleitura } from 'app/core/models/autoleitura/autoleitura';
import { AutoleituraService } from 'app/core/services/autoleitura/autoleitura.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { SolicitacaoEnviadaService } from 'app/core/services/solicitacao-enviada/solicitacao-enviada.service';
import { AutoleituraDTOResponse } from 'app/core/models/autoleitura/response/autoleitura-dto';
import { EnumAlertaCorTitulo, EnumAlertaIcone, SolicitacaoContent, SolicitacaoEnviada } from 'app/shared/models/solicitacao-enviada/solicitacao-enviada';
import { DialogConfirmarAutoleituraComponent } from '../../components/dialog-confirmar-autoleitura/dialog-confirmar-autoleitura.component';
import { UserService } from 'app/core/services/user/user.service';
import { EnumStatusUC } from 'app/core/enums/unidade-consumidora';
import { take } from "rxjs/operators";
import { EnumTitulosPadroes } from "../../../../../../core/models/exibir-aviso/exibir-aviso";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-informar-autoleitura',
    templateUrl: './informar-autoleitura.component.html',
    styleUrls: ['./informar-autoleitura.component.scss']
})
export class InformarAutoleituraComponent {
    fluxo: string;
    medidor: string;
    leiturasDoUltimoPeriodo: Array<Leitura>;
    formAutoleitura: FormGroup;
    regiao: string;
    sudeste: string;
    msgDePreenchimento: string;
    warningLeitura: boolean;
    verificarCondicao: any;
    constructor(
        private _dialog: MatDialog,
        private _alert: CustomSweetAlertService,
        private _router: Router,
        private _location: Location,
        private _autoleituraService: AutoleituraService,
        private _formBuilder: FormBuilder,
        private _loading: LoadingService,
        private _solicitacaoEnviadaService: SolicitacaoEnviadaService,
        private _selecaoImovelService: SelecaoImovelService,
        private _userService: UserService,
    ) {
        this.regiao = environment.regiao;
        this.sudeste = Regiao.SE;
        this.fluxo = this._autoleituraService.autoleitura.fluxo;
        this.medidor = this._autoleituraService.autoleitura.medidor;
        this.leiturasDoUltimoPeriodo = this._autoleituraService.autoleitura.leiturasDoUltimoPeriodo;
        this.formAutoleitura = new FormGroup({ formArrayRegistradores: this._formBuilder.array([]) });
        this.criarFormAutoleitura();
        this.msgDePreenchimento = "Por favor, preencha todos os campos corretamente.";
        this.warningLeitura = this.conferirLeitura();
        this.verificarCondicao = environment.regiao === Regiao.NE && this._autoleituraService.autoleitura.dentroDoPeriodoDeLeitura && this._autoleituraService.autoleitura.leituraInformadaMesmoDia;
    }

    criarFormAutoleitura(): void {
        const controlArray = this.formAutoleitura.get('formArrayRegistradores') as FormArray;
        this.leiturasDoUltimoPeriodo.forEach((leitura, index) => {
            controlArray.push(
                this._formBuilder.group({
                    leitura: new FormControl(
                        (
                            this._autoleituraService.autoleitura.leiturasDestePeriodo[index]
                                ? this._autoleituraService.autoleitura.leiturasDestePeriodo[index].valor
                                : ''),
                        this.definirValidadoresPorRegiao(leitura),
                    )
                })
            );
        });
    }

    definirValidadoresPorRegiao(leitura: Leitura): Array<ValidatorFn> {
        if (environment.regiao === Regiao.SE) {
            return [
                Validators.minLength(4),
                Validators.maxLength(5),
                Validators.required
            ];
        } else {
            const cv: number = parseInt(leitura.CV ?? "5");
            const cd: number = parseInt(leitura.CD ?? "0");
            const formatoDoInput: RegExp = new RegExp(`[0-9]{${cv + cd}}`);
            return [
                Validators.minLength(cv + cd),
                Validators.maxLength(cv + cd + 1),
                Validators.pattern(formatoDoInput),
                Validators.required
            ];
        }
    }

    definirCampoPreenchido(leitura: any): void {
        if (this.verificarCondicao) {
            this.warningLeitura = this.formAutoleitura.get('formArrayRegistradores')?.value[leitura].leitura.length <= 0;
        }
    }

    conferirLeitura(): boolean {
        return !!this.verificarCondicao;
    }

    criarMaskParaInput(leitura: Leitura): string {
        const cv: number = parseInt(leitura.CV ?? "5");
        const cd: number = parseInt(leitura.CD ?? "0");
        if (cd > 0) {
            return `${this.preencherComZero(cv)},${this.preencherComZero(cd)}`;
        } else {
            return `${this.preencherComZero(cv)}`;
        }
    }

    preencherComZero(tamanho: number): string {
        let s = 0 + "";
        while (s.length < tamanho) s = "0" + s;
        return s;
    }

    voltar(): void {
        this._location.back();
    }

    validaAutoleitura(): void {
        let request = this._autoleituraService.requestValidaAutoleitura('X');
        this._autoleituraService.getDadosValidaAutoleitura(request).then((dadosAutoleitura) => {
            this.executaAutoLeitura()
        });
    }

    //NE
    executaAutoLeitura(): void {
        const autoleituraRequestDTO = this._autoleituraService.requestAutoleitura();
        this._loading.start();
        this._autoleituraService.efetivaAutoleitura(autoleituraRequestDTO).pipe(take(1)).subscribe({
            next: (data: AutoleituraDTOResponse) => {
                this._autoleituraService.setAutoLeituraDTOResponse = data
                this._loading.stop();
                this._autoleituraService.autoleitura.dentroDoPeriodoDeLeitura ? this.passarDadosParaSolicitacaoEnviadaService() : this.exibirDialogSolicitacaoRegistrada();
                this.contadorDeLeituras();
            },
            error: (httpErrorResponse: HttpErrorResponse) => {
                if (httpErrorResponse.error?.retorno?.mensagem) {
                    this.redirecionarParaAviso({ titulo: httpErrorResponse.error?.retorno?.mensagem });
                } else {
                    this.redirecionarParaAviso({ titulo: EnumTitulosPadroes.Inesperado });
                }
            }
        });
    }

    passarDadosParaSolicitacaoEnviadaService(): void {
        const arraySolicitacaoContent: Array<SolicitacaoContent> = this.criarArrayComDadosDaSolicitacao();
        let solicitacaoEnviada = new SolicitacaoEnviada(
            this._userService.getProtocolo.protocoloSalesforceStr,
            arraySolicitacaoContent,
            'Autoleitura registrada com sucesso!',
            '',
            'Informar Autoleitura'
        );

        if (this._selecaoImovelService.getUCSelecionada?.status === EnumStatusUC.Cortado || this._selecaoImovelService.getUCSelecionada?.status === EnumStatusUC.Suspensa) {
            solicitacaoEnviada.alerta = true;
            solicitacaoEnviada.alertaIcone = EnumAlertaIcone.Sino;
            solicitacaoEnviada.alertaTituloCor = EnumAlertaCorTitulo.Laranja;
            solicitacaoEnviada.alertaTitulo = 'Lembrete';
            solicitacaoEnviada.alertaMensagem = `Sua Unidade Consumidora está com a energia cortada.`;
            solicitacaoEnviada.redirecionarFluxo = PathCompleto.religacao;
            solicitacaoEnviada.mensagemRedirecionarFluxo = 'Solicitar Religação';
        }
        this._solicitacaoEnviadaService.setSolicitacaoEnviada = solicitacaoEnviada;
        this.exibirDialogConfirmar();
    }

    criarArrayComDadosDaSolicitacao(): Array<SolicitacaoContent> {
        const arraySolicitacaoContent: Array<SolicitacaoContent> = [];
        this._autoleituraService.autoleitura.leiturasDestePeriodo.forEach((leitura) => {
            arraySolicitacaoContent.push(
                new SolicitacaoContent(
                    '',
                    '',
                    'TIPO DE REGISTRADOR',
                    leitura.tipoRegistrador
                ),
                new SolicitacaoContent(
                    'LEITURA',
                    leitura.valor
                ),
            );
        });
        return arraySolicitacaoContent;
    }

    contadorDeLeituras(): void {
        this._autoleituraService.getFlagLeituraInformadaMesmoDia ?
            this._autoleituraService.setFlagSemMaisTentativas = true :
            this._autoleituraService.setFlagLeituraInformadaMesmoDia = true;
    }

    enviarAutoleitura(): void {
        this.atualizarLeiturasDestePeriodoNoService();
        if (this.regiao === Regiao.NE) {
            (this._autoleituraService.autoleitura.dentroDoPeriodoDeLeitura && this._autoleituraService.autoleitura.semMaisTentativasParaLeitura) || !this._autoleituraService.autoleitura.dentroDoPeriodoDeLeitura ? this.validaAutoleitura() : this.exibirDialogSolicitacaoRegistrada()
        } else {
            this._router.navigate([PathCompleto.autoleitura, SubRotasAutoleitura.ConfirmarAutoleitura]);
        }
    }

    exibirDialogConfirmar(): void {
        this._dialog.open(DialogConfirmarAutoleituraComponent, {
            width: '500px',
            maxWidth: '90vw',
            data: { dadosAutoleitura: this._autoleituraService }
        });
    }

    exibirDialogSolicitacaoRegistrada(): void {
        this._alert.alertSolicitacaoRegistrada().then((r) => {
            if (r.isDismissed) { 
                this._router.navigate([PathCompleto.home]);
            }
        });
    }

    atualizarLeiturasDestePeriodoNoService(): void {
        const controlArray = this.formAutoleitura.get('formArrayRegistradores') as FormArray;
        const tempArray: Array<Leitura> = [];
        let statusMediaMesesValido: boolean = true;
        controlArray.controls.forEach((control, index) => {
            let novaLeitura = new Leitura(control.value.leitura, this.leiturasDoUltimoPeriodo[index].tipoRegistrador);
            if (environment.regiao === Regiao.NE) {
                novaLeitura.CD = this.leiturasDoUltimoPeriodo[index].CD;
                novaLeitura.CV = this.leiturasDoUltimoPeriodo[index].CV;
                novaLeitura.descricaoRegistrador = this.leiturasDoUltimoPeriodo[index].descricaoRegistrador;
            } else {
                novaLeitura.statusMedia = EnumLeiturasNaMedia.SemDadosSuficientes;
                novaLeitura.constante = this.leiturasDoUltimoPeriodo[index].constante;
                novaLeitura.consumo = this.calcularConsumo(novaLeitura);
                novaLeitura.dataLeitura = new Date().toISOString();
            }
            novaLeitura.anexo = this.leiturasDoUltimoPeriodo[index].anexo;
            tempArray.push(novaLeitura);
            statusMediaMesesValido = ((novaLeitura.media3Meses ?? 0) > 0 && (novaLeitura.media12Meses ?? 0) > 0);
        });
        this._autoleituraService.autoleitura.leiturasDestePeriodo = tempArray;
        this._autoleituraService.verificarMediaLeiturasDestePeriodo(statusMediaMesesValido);
    }

    selecionarTextoDoBotao(): string {
        if (this.fluxo === EnumFluxoAutoleitura.Simulacao) return 'SIMULAR AUTOLEITURA';
        if (this.regiao === Regiao.NE) return 'REGISTRAR AUTOLEITURA';
        if (this.regiao === Regiao.SE) return 'INSERIR AUTOLEITURA';
        return '';
    }

    calcularConsumo(leitura: Leitura): string {
        let consumo = '';
        this._autoleituraService.autoleitura.ultimosConsumos.forEach(elem => {
            if (elem.key === leitura.tipoRegistrador) {
                consumo = ((parseFloat(leitura.valor) - elem.value.valor) * elem.value.constante).toString();
                leitura.media12Meses = elem.value.media12Meses;
                leitura.media3Meses = elem.value.media3Meses;
            }
        })
        return (parseFloat(consumo) < 0) ? (parseFloat(consumo) * (-1)).toString() : consumo;
    }

    redirecionarParaAviso(queryParams: Object): void {
        this._loading.stop();
        this._router.navigate(
            [PathCompleto.aviso],
            { queryParams: queryParams }
        );
    }
}


