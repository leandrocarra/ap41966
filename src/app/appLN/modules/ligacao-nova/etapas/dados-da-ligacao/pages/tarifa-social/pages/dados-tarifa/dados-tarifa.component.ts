import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { Anexo } from '../../../../../../../../core/models/anexo/anexo';
import { BoxAnexo } from '../../../../../../../../core/models/documentos/box-anexo/box-anexo';
import { OcrRequest } from '../../../../../../../../core/models/ocr/ocr-request';
import { DadosDaLigacaoService } from '../../../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { DadosDoImovelService } from '../../../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { DocumentosService } from '../../../../../../../../core/services/documentos/documentos.service';
import { OcrService } from '../../../../../../../../core/services/ocr/ocr.service';
import { CustomSweetAlertService } from '../../../../../../../../core/services/sweet-alert/custom-sweet-alert.service';
import { TarifaSocialService } from '../../../../../../../../core/services/tarifa-social/tarifa-social.service';
import { configureMenuByWindowSize } from '../../../../../../../../core/services/utils/neo-utils.service';

const PERFIL = 'residencial';


@Component({
  selector: 'neo-dados-tarifa',
  templateUrl: './dados-tarifa.component.html',
  styleUrls: ['./dados-tarifa.component.scss']
})
export class DadosTarifaComponent {

  mobile: boolean;
  docsNecessarios: any[];
  anexos: any;

  solicitarKit: boolean = false;
  zonaRural: boolean;

  beneficio: string;
  titular: boolean;
  disabledForm: boolean;
  resetDados: boolean = false;

  //Validators
  validarFormTitular: boolean = false;
  validarFormDadosBeneficio: boolean = false;

  constructor(
    private _etapaService: DadosDaLigacaoService,
    private _dadosDoImovelService: DadosDoImovelService,
    private _tarifaSocialService: TarifaSocialService,
    private _ocrService: OcrService,
    private _alert: CustomSweetAlertService,
    private _location: Location,
    private _router: Router,
    private _documentosService: DocumentosService,
    private _loadingService: LoadingService
  ) {
    this.titular = this._tarifaSocialService.getTitular;
    this.disabledForm = this._tarifaSocialService.getDisableForm;
    this.mobile = configureMenuByWindowSize(window.screen.width);
    this.beneficio = this._etapaService.dadosDaLigacao.tarifaSocial.beneficio;
    this.zonaRural = this._dadosDoImovelService.getEndereco.zonaRural;
    this.solicitarKit = this._tarifaSocialService.getSolicitarKit;
    this.docsNecessarios = this._tarifaSocialService.getDocumentosNecessiaros(this.titular);
    this.anexos = this._etapaService.dadosDaLigacao.tarifaSocial.anexos;
    this._documentosService.setRGCompleto = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  redirecionamento(doc: string): void {
    this._tarifaSocialService.urlRedirecionamento(doc);
  }

  formTitularTarifaSocialValidado(event: any): void {
    this.validarFormTitular = event;
  }

  formDadosBeneficioValidado(event: any): void {
    this.validarFormDadosBeneficio = event;
  }

  resetForm(): void {
    this.disabledForm = false;
    this.resetDados = true;
    this.docsNecessarios.forEach(element => {
      if (this.anexos[element.docName].arquivos.length > 0) {
        this.anexos[element.docName].arquivos = [];
        if (element.docName == 'Doc Oficial') {
          this.anexos[element.docName].frenteVerso = false;
          this.anexos[element.docName].frente = false;
          this.anexos[element.docName].verso = false;
          this.anexos[element.docName].docsSuficientes = false;
        }
      }
    });
    this.resetDados = false;
  }

  alterarTitular(): void {
    this._tarifaSocialService.setTitular = this.titular;
    this.docsNecessarios = this._tarifaSocialService.getDocumentosNecessiaros(this.titular);
    this.resetForm();
  }

  editarDados(): void {
    this._alert.alertEditarDadosTarifaSocial().then(r => {
      if (r.dismiss) {
        this.resetForm();
      }
    })
  }

  valorEscolhidoKit(): void {
    this._tarifaSocialService.setSolicitarKit = this.solicitarKit;
  }

  anexarDocumento(arquivo: Anexo, box: BoxAnexo): void {
    this.anexos[box.docName].arquivos.push(arquivo);
    this._loadingService.stop();
  }

  anexar(arquivo: Anexo, box: BoxAnexo): void {
    if (this.verificarAnexo() && this.verificarDocComFoto(box.docName)) {

      if (box.docName === 'Doc Oficial') {

        if (this.anexos[box.docName].arquivos.length < this.anexos[box.docName].maxAnexos && !this.anexos[box.docName].docsSuficientes) {

          if (this.anexos[box.docName].tentativas < 3) {
            this.chamarOCR(arquivo, box);

          } else {
            let fileName: string = 'Doc Oficial';
            this._alert.alertAnexarSemValidar();

            if (this.anexos[box.docName].arquivos.length === 1) {
              this._etapaService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].frente = (this.anexos[box.docName].arquivos[0].fileName.includes('Verso')) ? true : false;
              this._etapaService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].verso = (this.anexos[box.docName].arquivos[0].fileName.includes('Frente')) ? true : false;

              if (this.anexos[box.docName].arquivos[0].fileName.includes('RG')) {
                fileName = (this.anexos[box.docName].arquivos[0].fileName.includes('Verso')) ? 'RG Frente' : 'RG Verso';
              } else if (this.anexos[box.docName].arquivos[0].fileName.includes('CNH Verso')) {
                fileName = 'CNH Frente';
              }
            } else {
              fileName = 'Doc Oficial';
            }

            arquivo.fileName = fileName;
            this._documentosService.uploadDocTarifaSocial(arquivo, 'Doc Oficial');
            this._etapaService.setDocumentoComFotoTarifaSocialValidado = false;
            this._etapaService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].docsSuficientes = true;
          }
        } else {
          this._alert.alertSuccess("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo");
        }

      } else {

        if (box.ocr && this.anexos[box.docName].tentativas < this.anexos[box.docName].maxTentativas) {
          this.anexos[box.docName].tentativas++;
          this.chamarOCR(arquivo, box);

        } else {

          if (box.ocr) {
            this._tarifaSocialService.setTarifaSocialValidada = false;
            this._alert.alertAnexarSemValidar();
          }

          this._documentosService.verificarAnexacaoComum(PERFIL, arquivo, box, true)

        }
      }
    }
  }

  remove(index: number, box: BoxAnexo): void {
    if (!this.resetDados) {
      this._alert.alertDeleteArquivo(box.docName).then(r => {
        if (!r.dismiss) {
          if (box.docName === 'Doc Oficial') {
            this._documentosService.removeDocOficial(PERFIL, index, box.docName, true)
          } else {
            this.anexos[box.docName].arquivos.splice(index, 1);
          }
        }
      })
    } else {
      if (box.docName === 'Doc Oficial') {
        this._documentosService.removeDocOficial(PERFIL, index, box.docName, true)
      } else {
        this.anexos[box.docName].arquivos.splice(index, 1);
      }
    }
  }

  verificarAnexo(): boolean {
    if (this.titular) {
      if (!this.validarFormDadosBeneficio) {
        this._alert.alertInfo("Antes de carregar o documento, preencha todos os campos acima.");
        return false;
      }
    } else {
      if (!this.validarFormDadosBeneficio || !this.validarFormTitular) {
        this._alert.alertInfo("Antes de carregar o documento, preencha todos os campos acima.");
        return false;
      }
    }
    this.disabledForm = true;
    return true;
  }

  verificarDocComFoto(documento: string): boolean {
    if ((documento === 'Folha V7' || documento === 'Carta INSS') && !this.titular && !this.anexos['Doc Oficial'].docsSuficientes) {
      this._alert.alertEnviarDocOficial(documento);
      return false;
    } else {
      return true;
    }
  }

  chamarOCR(arquivo: Anexo, box: BoxAnexo) {
    let base64 = new OcrRequest(arquivo.fileData, false);
    this._ocrService.ocr(base64).then((data: any) => {

      if (data === false || data === null) {
        this.chamarAlertDocInvalido(arquivo, box);

      } else {
        if (box.docName === 'Folha V7' && data.result[0].tags[1] === 'br-cadastro-unico-1') {
          this._tarifaSocialService.validarFolhaV7(arquivo, box.docName, data, this.mobile);
        } else if (box.docName === 'Carta INSS' && data.result[0].tags[1] === 'br-previdencia-historico-de-creditos-1') {
          this._tarifaSocialService.validarINSS(arquivo, box.docName, data, this.mobile);
        } else if (box.docName === 'Doc Oficial') {
          this._documentosService.validarDocOficial(data, PERFIL, this.anexos['Doc Oficial'], arquivo, true)
        } else {
          this.chamarAlertDocInvalido(arquivo, box);
        }
      }
    })
  }

  chamarAlertDocInvalido(arquivo: Anexo, box: BoxAnexo): void {
    if (box.docName === 'Doc Oficial') {
      this._documentosService.alertDocumentosInvalidos(this.mobile, 'residencial', box.docName, arquivo, true);
    } else {
      this._tarifaSocialService.alertDocInvalido(box.docName, this.mobile);
    }
  }

  isDisabled(): boolean {
    let verificarKit: boolean = false;

    if (this.zonaRural) {
      verificarKit = (this.solicitarKit !== null) ? false : true;
    }

    if (!verificarKit) {
      if (this.titular) {
        return (this.validarBotaoTitular());
      } else {
        return (this.validarBotaoNaoTitular());
      }
    } else {
      return true;
    }

  }

  validarBotaoNaoTitular(): boolean {
    return (this.anexos['Doc Oficial'].docsSuficientes && !this.validarBotaoTitular()) ? false : true;
  }

  validarBotaoTitular(): boolean {

    switch (this.beneficio) {
      case 'PROGRAMA SOCIAL DO GOVERNO': {
        return (this.anexos['Folha V7'].arquivos.length > 0) ? false : true;
      }
      case 'ASSISTÊNCIA MÉDICA DOMICILIAR': {
        return (this.anexos['Folha V7'].arquivos.length > 0 && this.anexos['Ass Medica'].arquivos.length > 0) ? false : true;
      }
      case 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA': {
        return (this.anexos['Carta INSS'].arquivos.length > 0) ? false : true;
      }
    }
    return true;
  }

  continuar(): void {
    this._alert.confirmacaoTarifaSocial().then(r => {
      if (r.value) {
        this._tarifaSocialService.setTitular = this.titular;
        this._tarifaSocialService.setDisableForm = this.disabledForm;
        this._tarifaSocialService.setSolicitarKit = this.solicitarKit;
        this._router.navigate(["ligacao-nova", "pagamento", "definir-data"]);
      }
    })
  }

  voltar(): void {
    this._location.back();
  }

}
