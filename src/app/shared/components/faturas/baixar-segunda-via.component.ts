import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { ListaMotivoDTORequest, PdfDTORequest } from "app/core/models/segunda-via/request/segunda-via-request-dto";
import { FaturaDTO, ListaMotivoDTOResponse, MotivoDTO, PdfDTOResponse } from "app/core/models/segunda-via/response/segunda-via-response-dto";
import { listaTipologiasFaturaNE, listaTipologiasFaturaSE } from "app/core/models/segunda-via/segunda-via.model";
import { CustomSweetAlertService } from "app/core/services/customsweetalert/custom-sweet-alert.service";
import { SegundaViaService } from "app/core/services/segunda-via/segunda-via.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";
import { AgenciaVirtualService } from "app/core/services/utils/admin/agencia-virtual.service";

export interface DialogDataBaixarSegundaVia {
    numSeqOper: string;
    opcaoFatura: string;
    fatura: FaturaDTO;
    listaFaturas: Array<FaturaDTO>;
}
@Component({
    selector: "app-baixar-segunda-via",
    templateUrl: "./baixar-segunda-via.component.html",
    styleUrls: ["./baixar-segunda-via.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class BaixarSegundaVia implements OnInit {
    motivos!: Array<MotivoDTO>;
    grupoDoUsuario: string;
    motivoFormGroup: FormGroup;
    opcaoFatura: string;
    listaMotivoRequestDTO = new ListaMotivoDTORequest();
    listaMotivoResponseDTO = new ListaMotivoDTOResponse();
    pdfRequestDTO = new PdfDTORequest("", "", "", 1, "", "", "");
    pdfResponseDTO = new PdfDTOResponse();

    constructor(
        private _user: UserService,
        private _segundaViaService: SegundaViaService,
        private _selecaoImovelService: SelecaoImovelService,
        private _dialogRef: MatDialogRef<BaixarSegundaVia>,
        private _formBuilder: FormBuilder,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _alertService: CustomSweetAlertService,

        @Inject(MAT_DIALOG_DATA) public data: DialogDataBaixarSegundaVia,
    ) {
        this.grupoDoUsuario = this._user.group;
        this.motivoFormGroup = this.criarFormulario();
        this.opcaoFatura = this.data.opcaoFatura;
    }

    ngOnInit(): void {
        this._alertService.showLoading();
        this.deParaGetMotivo(this.listaMotivoRequestDTO);
        this.getMotivo();
    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group({
            motivoSolicitacao: ["", [Validators.required]],
        });
    }

    deParaGetMotivo(motivo: ListaMotivoDTORequest): void {
        motivo.usuario = environment.USUARIO_UE;
        motivo.canalSolicitante = environment.canal;
    }

    getMotivo(): void {
        this._segundaViaService.obterListaMotivo(this.listaMotivoRequestDTO).subscribe({
            next: (data: ListaMotivoDTOResponse) => {
                this.listaMotivoResponseDTO = data;
                this.filtrarMotivosPermitidos();
                if (environment.regiao === Regiao.NE) {
                    this.validarMotivos();
                }
                this._alertService.closeLoading();
            },
            error: () => {
                this._alertService.closeLoading();
                this._alertService.alertInfo('Ocorreu um erro inesperado');
                this.cancelar();
            },
        });
    }

    filtrarMotivosPermitidos(): void {
        this.motivos = [];
        this.listaMotivoResponseDTO.motivos?.forEach((motivo) => {
            const motivosPermitidos = [
                "NÃO RECEPÇÃO",
                "FATURA DANIFICADA",
                "COMPROVAR RESIDÊNCIA",
                "MUDANÇA NA MODALIDADE DE PAGAMENTO",

                //Retorno dos motivos NE
                "NÃO ESTOU COM FATURA EM MÃOS",

                // Retorno dos motivos SE
                "NÃO ESTOU COM A FATURA EM MÃOS",

                //TODO: Remover assim que a API retornar com os acentos
                "COMPROVAR RESIDENCIA",
                "NAO ESTOU COM A FATURA EM MAOS"
            ];
            motivo.descricao = motivo.descricao!.split("-")[0].trim();
            if (motivosPermitidos.includes(motivo.descricao)) {
                this.motivos.push(motivo);
            }
        });
    }

    deParaGetPdf(pdf: PdfDTORequest, numeroFatura: string): void {
        pdf.codigo = this._selecaoImovelService.getUCSelecionada!.uc
        pdf.numSeqOper = numeroFatura;
        pdf.protocolo = this._user.getProtocolo.protocoloSalesforceStr;
        pdf.motivo = this.motivoFormGroup.value.motivoSolicitacao.idMotivo;
        pdf.tipificacao = (environment.regiao === Regiao.NE) ? listaTipologiasFaturaNE[pdf.motivo as keyof typeof listaTipologiasFaturaNE] : listaTipologiasFaturaSE[pdf.motivo as keyof typeof listaTipologiasFaturaSE];
        pdf.usuario = environment.USUARIO_UE;
        pdf.canalSolicitante = environment.canal;
        if (environment.regiao === Regiao.SE) {
            pdf.taxa = "N";
            pdf.opcaoSSOS = "S";
            pdf.protocoloSonda = this._user.getProtocolo.protocoloLegadoStr;
        } else {
            pdf.documentoSolicitante = this._user.dadosUser.documento;
        }
    }

    verificarQuantidadeDeFaturas(): void {
        if (this.data.numSeqOper) {
            this.baixar(this.data.numSeqOper)
        } else {
            let faturasSelecionada: boolean = false;
            this.data.listaFaturas.forEach((item: any) => {
                if (item.selecionado) {
                    faturasSelecionada = true;
                    this.baixar(item.numeroFatura);
                }
            })
            this.cancelar();
            if (!faturasSelecionada) { // Cenário quando não existe faturas selecionadas
                this._alertService.alertInfo("Selecione pelo menos uma fatura para realizar o download.")
            }
        }
    }

    baixar(numeroFatura: string): void {
        this._alertService.showLoading();
        this.deParaGetPdf(this.pdfRequestDTO, numeroFatura);
        this._segundaViaService.obterPdf(this.pdfRequestDTO).subscribe({
            next: (data) => {
                this._alertService.closeLoading();
                this.pdfResponseDTO = data;
                if (this.opcaoFatura === 'visualizar') {
                    this._agenciaVirtualService.visualizarFatura(this.pdfResponseDTO);
                } else {
                    this.pdfResponseDTO.fileName = numeroFatura;
                    this._agenciaVirtualService.download(this.pdfResponseDTO);
                }
            },
            error: () => {
                this._alertService.closeLoading();
                this._alertService.alertInfo('Ocorreu um erro inesperado');
            },
        });
        this.cancelar();
    }

    cancelar(): void {
        this._dialogRef.close();
    }

    /**
     * RN_AV_30:
     * exibir idMotivo07 - mudança na modalidade de pagamento apenas quando tipoArrecacao for débito automático
     * não exibir idMotivo07 - mudança na modalidade de pagamento quando tipoArrecadacao for diferente de débito automático
     */
    validarMotivos(): void {
        if (this.data.fatura && this.data.fatura.tipoArrecadacao.toLocaleLowerCase() !== 'débito automático') {
            this.motivos = this.motivos.filter(item => item.idMotivo !== "07");
        }
    }

}
