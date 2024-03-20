import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { AnexosDTORequest, EnvioMensagensDTORequest } from 'app/core/models/multilogin/request/multilogin-dto';
import { ListaMotivoDTORequest, PdfDTORequest } from 'app/core/models/segunda-via/request/segunda-via-request-dto';
import { ListaMotivoDTOResponse, MotivoDTO, PdfDTOResponse } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { MarketingAutomationService } from 'app/core/services/marketing-automation/marketing-automation.service';
import { SegundaViaService } from 'app/core/services/segunda-via/segunda-via.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from 'app/core/services/user/user.service';
import { DialogDataBaixarSegundaVia } from '../../faturas/baixar-segunda-via.component';
import { Regiao } from "app/core/enums/regiao";
import { listaTipologiasFaturaNE, listaTipologiasFaturaSE } from "app/core/models/segunda-via/segunda-via.model";

@Component({
  selector: 'app-enviar-email',
  templateUrl: './enviar-email.component.html',
  styleUrls: ['./enviar-email.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EnviarEmailComponent implements OnInit {
    storage: Storage = sessionStorage;

    grupoDoUsuario: string;
    emailFormGroup: FormGroup;
    emailCadastrado: string;
    motivos!: Array<MotivoDTO>;

    listaMotivoRequestDTO = new ListaMotivoDTORequest();
    listaMotivoResponseDTO = new ListaMotivoDTOResponse();

    envioMensagensDTORequest:EnvioMensagensDTORequest;

    pdfRequestDTO: PdfDTORequest;
    pdfResponseDTO: PdfDTOResponse;

    anexosDTORequest: AnexosDTORequest;

    constructor(
        private _user: UserService,
        private _segundaViaService: SegundaViaService,
        private _selecaoImovelService: SelecaoImovelService,
        private _formBuilder: FormBuilder,
        private _dialogRef: MatDialogRef<EnviarEmailComponent>,
        private _domSanitizer: DomSanitizer,
        private _matIconRegistry: MatIconRegistry,
        private _alertService: CustomSweetAlertService,
        private _marketingAutomationService: MarketingAutomationService,

        @Inject(MAT_DIALOG_DATA) public data: DialogDataBaixarSegundaVia,
    ) {
        this.adicionarSvgs();
        this.grupoDoUsuario = this._user.group;
        this.emailFormGroup = this.criarFormulario();
        this.emailCadastrado = this._selecaoImovelService.getInformacoesUCSelecionada.cliente.contato.email;
        this.envioMensagensDTORequest = new EnvioMensagensDTORequest();
        this.pdfRequestDTO = new PdfDTORequest("", "", "", 1, "", "", "");
        this.pdfResponseDTO = new PdfDTOResponse();
        this.anexosDTORequest = new AnexosDTORequest();
    }

    ngOnInit(): void {
        this._alertService.showLoading();
        this.deParaGetMotivo(this.listaMotivoRequestDTO);
        this.getMotivo();
    }

    pedidoFatura(): void {
        this._marketingAutomationService.envioDeMensagem(this.envioMensagensDTORequest).subscribe({
            next: () => {
                this._alertService.closeLoading();
            },
            error: () => {
                this._alertService.closeLoading();
                this._alertService.alertInfo('Ocorreu um erro inesperado');
            }
        });
    }

    uploadFatura(data:PdfDTOResponse): void {
        let time = Math.round(+new Date()/1000)
        let fileExtension = data.fileExtension?.split('.')
        this.anexosDTORequest.base64 = data.fileData as unknown as string
        this.anexosDTORequest.extensaoArquivo = fileExtension?.reverse()[0] as unknown as string
        this.anexosDTORequest.nomeArquivo = `${data.fileName}${time}` as unknown as string

        this._marketingAutomationService.uplodaArquivo(this.anexosDTORequest).subscribe({
            next: (responseDTO) => {
                this.preencherEnvioMensagensDTO(responseDTO.customerKey);
            },
            error: () => {
                this._alertService.closeLoading();
                this._alertService.alertInfo('Ocorreu um erro inesperado');
            }
        });
    }

    getPDF(): void {
        this._alertService.showLoading();
        this.getDTOPDF(this.data.numSeqOper);
        this._segundaViaService.obterPdf(this.pdfRequestDTO).subscribe({
            next: (data: PdfDTOResponse) => {
                this.uploadFatura(data)
            },
            error: () => {
                this._alertService.closeLoading();
                this._alertService.alertInfo('Ocorreu um erro inesperado');
            },
        });
        this.cancelar();
    }

    getDTOPDF(numeroFatura: string): void {
        let motivo = this.emailFormGroup.value.motivoSolicitacao.idMotivo

        this.pdfRequestDTO = {
            codigo: this._selecaoImovelService.getUCSelecionada!.uc,
            numSeqOper: numeroFatura,
            protocolo: this._user.getProtocolo.protocoloSalesforceStr,
            tipificacao: (environment.regiao === Regiao.NE) ? listaTipologiasFaturaNE[motivo as keyof typeof listaTipologiasFaturaNE] : listaTipologiasFaturaSE[motivo as keyof typeof listaTipologiasFaturaSE],
            usuario: environment.USUARIO_UE,
            canalSolicitante: environment.canal,
            motivo: motivo,
        }
        if (environment.regiao === Regiao.SE) {
            this.pdfRequestDTO.taxa = "N";
            this.pdfRequestDTO.opcaoSSOS = "S";
            this.pdfRequestDTO.protocoloSonda = this._user.getProtocolo.protocoloLegadoStr;
        } else {
            this.pdfRequestDTO.documentoSolicitante = this._user.dadosUser.documento;
        }
    }

    resetDate(date:Date) {
        const data = date.toString()
        let splitData = data.split('-')
        const newDate = `${splitData[2]}/${splitData[1]}/${splitData[0]}`
        return newDate;
    }

    preencherEnvioMensagensDTO(customerKey:string) {
        let documento:string =
            environment.regiao === Regiao.SE
                ? this._user.getProtocolo.protocoloLegadoStr
                : this._user.dadosUser.documento;

        let contaContrato:any = this._selecaoImovelService.getUCSelecionada!.contrato

        if (contaContrato == null)
            contaContrato = undefined;

        this.envioMensagensDTORequest.cabecalho = {
            idCliente: this.emailFormGroup.value.email,
            codigoJornada: environment.codigoJornada.segundaViaFatura,
            subscricao: this.emailFormGroup.value.email,
            canalContato: "CRM",
            tipoServico: "2A VIA - FATURA",
            tipoEntrega: "email"
        };
        this.envioMensagensDTORequest.mensagem = {
            documento: documento,
            EmailAddress: this.emailFormGroup.value.email,
            protocolo: this._user.getProtocolo.protocoloSalesforceStr,
            nome: this._selecaoImovelService.getUCSelecionada!.nomeCliente,
            //"codigoBarras": "946100000030 973300220510 741010202164 454405112191",
            vencimento: this.resetDate(this.data.fatura.dataVencimento),
            valor: this.data.fatura.valorEmissao,
            mesReferencia: this.data.fatura.mesReferencia.toString(),
            contaContrato: contaContrato,
            customerKey: customerKey
        };

        return this.pedidoFatura()
    }


    adicionarSvgs(): void {
        let assetsPath: string = "assets/images/icons/";
        let icones: Array<string> = [
            'warning-outline'
        ];

        icones.forEach(icon => {
        this._matIconRegistry.addSvgIcon(
            icon,
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                `${assetsPath}${icon}.svg`
                )
            );
        });
    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group({
            email: [
                '',
                [
                Validators.email
                ]
            ],
            motivoSolicitacao: [
                '',
                [
                Validators.required
                ]
            ]
        });
    }

    deParaGetMotivo(motivo: ListaMotivoDTORequest) {
        motivo.usuario = environment.USUARIO_UE;
        motivo.canalSolicitante = environment.canal;
    }

    getMotivo() {
        this._segundaViaService.obterListaMotivo(this.listaMotivoRequestDTO).subscribe({
            next: (data) => {
                this.listaMotivoResponseDTO = data;
                this.listaMotivoResponseDTO.motivos?.forEach((elem) =>{
                    elem.descricao = (elem.descricao !== undefined) ? elem.descricao.split("-")[0] : "";
                });
                this.motivos = this.listaMotivoResponseDTO.motivos ?? [];
                this._alertService.closeLoading();
            },
            error: () => {
                this._alertService.closeLoading();
                this._alertService.alertInfo('Ocorreu um erro inesperado');
                this.cancelar();
            },
        });
    }

    cadastrarEmail(): void {
        this.getPDF();
        this._dialogRef.close(this.emailFormGroup.value);
    }

    cancelar(): void {
        this._dialogRef.close();
    }

}
