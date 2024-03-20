import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserUcsResponseDTO } from './../../../../../../core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto';
import { SolicitacaoContent, SolicitacaoEnviada } from './../../../../../../shared/models/solicitacao-enviada/solicitacao-enviada';
import { PathCompleto, Servicos } from 'app/core/enums/servicos';
import { Anexo } from 'app/core/models/anexo/anexo';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { MatErrorMensagens } from 'app/core/services/error/error.service';
import { SolicitacaoEnviadaService } from 'app/core/services/solicitacao-enviada/solicitacao-enviada.service';
import { UserService } from 'app/core/services/user/user.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';

@Component({
  selector: 'app-formulario-projeto-particular',
  templateUrl: './formulario-projeto-particular.component.html',
  styleUrls: ['./formulario-projeto-particular.component.scss']
})
export class FormularioProjetoParticularComponent {
    formProjetoParticular: FormGroup;
    matErrorNomeEmpresa: string;
    matErrorTecnico: string;
    matErrorEmail: string;
    matErrorTelefone: string;
    matErrorCliente: string;
    matErrorMunicipio: string;
    arrayAnexos: Array<Anexo>;
    formatosParaAnexar: string;
    tamanhoMaximoArquivo: number;
    infoDoc: string;
    label: string;
    userIdMask: string;
    ucsDisponiveis!: Array<UserUcsResponseDTO>;
    documentoParaDownload!: string;
    tipoProjeto: Array<string>;

    constructor(
        private _formBuilder: FormBuilder,
        private _alertService: CustomSweetAlertService,
        private _router: Router,
        private _solicitacaoEnviadaService: SolicitacaoEnviadaService,
        private _user: UserService,
        private _selecaoImovelService: SelecaoImovelService,
    ) {
        this.matErrorNomeEmpresa = MatErrorMensagens.NomeEmpresa;
        this.matErrorTecnico = MatErrorMensagens.TecnicoEngResponsavel;
        this.matErrorEmail = MatErrorMensagens.EmailContato;
        this.matErrorTelefone = MatErrorMensagens.TelefoneContato;
        this.matErrorCliente = MatErrorMensagens.Cliente;
        this.matErrorMunicipio = MatErrorMensagens.MunicipioProjeto
        this.arrayAnexos = [];
        this.formatosParaAnexar = '.xlsx, .xls, .pdf, .jpg, .doc, .docx, .jpeg, .dwg, .png';
        this.tamanhoMaximoArquivo = 2500000;
        this.userIdMask = '(00) 00000-0000';
        this.trazerUCs();
        this.infoDoc = "- Aceito apenas anexos no formato XLSX, XLS, PDF, JPG, DOC, DOCX, JPEG, DWG E PNG.";
        this.tipoProjeto = [
            "Loteamento",
            "Rede de distribuição",
            "Iluminação pública",
            "Remoção de Rede",
            "Cabine Primária",
            "Posto de Transformação",
            "Medição Coletiva-agrupada",
            "Compartilhamento de infraestrutura",
            "Consulta de Acesso para Minigeração",
            "Declaração de Viabilidade",
            "Projetos SE/LT tensão 138kV",
            "Paralelismo Momentâneo MT",
            "Paralelismo Contínuo MT",
            "Estudo de Proteção – Art. 32 Res. 1000"
        ];
        this.label = "Selecionar arquivos para upload";
        this.formProjetoParticular = this.criarFormulario();
    }

  trazerUCs(): void{
    this._selecaoImovelService.getMeusImoveis(this._user.dadosUser.documento).then((response) => {
        this.ucsDisponiveis = response.ucs;
    })
  }

  criarFormulario(): FormGroup{
    return this._formBuilder.group({
        unidadeConsumidora: [this._selecaoImovelService.getUCSelecionada?.uc],
        nomeEmpresa: ["", [Validators.required, Validators.maxLength(50)]],
        tecnicoResponsavel: ["", [Validators.required, Validators.maxLength(50)]],
        emailContato: ["", [Validators.required, Validators.email, Validators.maxLength(60)]],
        telefone: ["", [Validators.required, Validators.maxLength(11)]],
        nomeCliente: ["", [Validators.required, Validators.maxLength(50)]],
        municipioProjeto: ["", [Validators.required, Validators.maxLength(50)]],
        tipoProjeto: ["", [Validators.required]]
    })
  }

  voltar(): void {
      this._alertService.alertConfirmarComCoresInvertidas('Tem certeza que deseja cancelar esta solicitação?',
      'Todas as informações preenchidas serão perdidas.', 'SIM', 'NÃO').then((r) =>{
        this.formProjetoParticular.reset();
        this._router.navigate([`${PathCompleto.home}servicos/${Servicos.projetoParticular}/${Servicos.projetoParticularSolicitarAnalise}`])
      })
    }

    enviar(): void {
        // this._alertService.alertConfirmar('Confirma envio da solicitação?', '', 'SIM', 'NÃO').then((r) => {
        //     if(r) this.solicitar();
        // });
    }

    receberAnexo(arquivo: Anexo): void{
        arquivo.fileName = `Doc ${this.arrayAnexos.length + 1}`
        this.arrayAnexos.push(arquivo);
    }

    removerAnexo(indexArquivo: number): void {
		this.arrayAnexos.splice(indexArquivo, 1);
	}

    solicitar(): void{
        this.enviarDadosSolicitacaoEnviada();
        this._router.navigate([`${PathCompleto.home}servicos/${Servicos.projetoParticular}/${Servicos.solicitacaoEnviada}`])
    }

    aplicarMaskTel(): void {
		this.userIdMask = this.formProjetoParticular.value.telefone.length > 10 ? "(00) 00000-0000" : "(00) 0000-0000";
	}

    enviarDadosSolicitacaoEnviada(): void{
        this._solicitacaoEnviadaService.setSolicitacaoEnviada = new SolicitacaoEnviada(
            this._user.getProtocolo.protocoloSalesforceStr,
            [
                new SolicitacaoContent(
                    "EMPRESA",
                    this.formProjetoParticular.value.nomeEmpresa
                ),
                new SolicitacaoContent(
                    "TÉCNICO OU ENG. RESPONSÁVEL",
                    this.formProjetoParticular.value.tecnicoResponsavel
                ),
                new SolicitacaoContent(
                    "E-MAIL DE CONTATO",
                    this.formProjetoParticular.value.emailContato
                ),
                new SolicitacaoContent(
                    "TELEFONE DE CONTATO",
                    this.formProjetoParticular.value.telefone,
                ),
                new SolicitacaoContent(
                    "CLIENTE",
                    this.formProjetoParticular.value.nomeCliente
                ),
                new SolicitacaoContent(
                    "MUNICÍPIO DO PROJETO",
                    this.formProjetoParticular.value.municipioProjeto
                ),
                new SolicitacaoContent(
                    "TIPO DE PROJETO",
                    this.formProjetoParticular.value.tipoProjeto
                )
            ],
            'Solicitação enviada com sucesso!'
        )
    }

    linkDocumento(): void{
        if(["Posto de Transformação",
        "Medição Coletiva-agrupada",
        "Compartilhamento de infraestrutura",
        "Remoção de Rede",
        "Cabine Primária"].includes(this.formProjetoParticular?.value?.tipoProjeto))
            this.documentoParaDownload = `${this.formProjetoParticular?.value?.tipoProjeto}`

        else if(["Loteamento",
        "Rede de distribuição",
        "Iluminação pública"].includes(this.formProjetoParticular?.value?.tipoProjeto))
            this.documentoParaDownload = 'Loteamento, Rede de Distribuição e Iluminação Pública'

        else this.documentoParaDownload = "";
    }

    abrirDocumento(nomeArquivo: string): void {
        window.open("assets/documents/projeto-particular/documentos/" + nomeArquivo)
    }

    definirDocumento(documentoParaDownload: string): void {
        switch(documentoParaDownload) {
            case "Posto de Transformação":
             this.abrirDocumento("posto_transformacao.pdf");
             break;
            case "Medição Coletiva-agrupada":
             this.abrirDocumento("medicao_coletiva_agrupada.pdf");
             break;
            case "Compartilhamento de infraestrutura":
             this.abrirDocumento("compartilhamento_infraestrutura.pdf");
             break;
            case "Remoção de Rede":
             this.abrirDocumento("remocao_rede.pdf");
             break;
            case "Cabine Primária":
             this.abrirDocumento("cabine_primaria.pdf");
             break;
            case "Loteamento, Rede de Distribuição e Iluminação Pública":
            this.abrirDocumento("loteamento_rede_distribuicao_iluminacao_publica.pdf");
             break;
            default: "";
             break;
        }
    }
}
