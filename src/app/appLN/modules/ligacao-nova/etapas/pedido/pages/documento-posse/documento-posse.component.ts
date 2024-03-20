import { Location } from '@angular/common';
import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { BoxAnexo } from '../../../../../../core/models/documentos/box-anexo/box-anexo';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { OcrService } from '../../../../../../core/services/ocr/ocr.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { removerCaracteresEspeciais } from '../../../../../../core/services/utils/neo-utils.service';

const DOC_INVALIDO = true;
const DOC_VALIDADO = false;

@Component({
  selector: 'neo-documento-posse',
  templateUrl: './documento-posse.component.html',
  styleUrls: ['./documento-posse.component.scss']
})
export class DocumentoPosseComponent {
  anexo: any;
  docNecessario: any
  dadosPosseImovel: any;
  constructor(
    private _etapaService: DadosDoImovelService,
    private _alert: CustomSweetAlertService,
    private _userServiceLN: UserServiceLN,
    private _ocrService: OcrService,
    private _location: Location,
    private _router: Router,
    private _loadingService: LoadingService
  ) {
    this.anexo = this._etapaService.getDocPosse.documentoPosseImovel;
    this.dadosPosseImovel = this._etapaService.getDocPosse.posseImovel;
    this.docNecessario = { label: 'DOCUMENTO DE POSSE DO IMÓVEL', ocr: true, docName: 'Doc Posse' }
  }



  docPosse(opcao: string): void {
    if (opcao == 'naoTenhoDocumento') {
      this.anexo['Doc Posse'].arquivos = [];
      this._alert.alertNaoPossuiDocumentoPosse().then(r => {
        if (r.value === true) {
          this._etapaService.setTermoPosse = 'AceitoOrçamentoRede(RR)';
          this._router.navigate(['/ligacao-nova/pedido/selecao-perfil']);
        }
      });
    }
    this._etapaService.setTermoPosse = '';
    this._etapaService.getDocPosse.posseImovel = opcao;
  }

  infoDocumentosPosseImovel(): void {
    this._router.navigate(['/ligacao-nova/pedido/documentos-aceitos']);
  }

  anexar(arquivo: Anexo): void {
    if (this.anexo['Doc Posse'].arquivos.length > 0) {
      this._alert.alertSuccess("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo");
    } else {
      let base64 = this._ocrService.createFileOCR(arquivo.fileData);
      this._ocrService.ocr(base64).then((data: any) => {
        if (data === false) {
          //doc null
          this.ocrInvalida(arquivo);
        } else {
          this.leituraOCR(data, arquivo);
        }
      });
    }
  }

  remove(index: number, box: BoxAnexo): void {
    this.anexo[box.docName].arquivos.splice(index, 1);
  }

  leituraOCR(dataOcr: any, arquivo: Anexo): void {
    if (dataOcr.result[0]) {
        this._loadingService.stop();
      if (dataOcr.result[0].docType === "declaracao" && dataOcr.result[0].tags.find((f: any) => f === 'br-imposto-propriedade-rural-2')) {
        this.validacaoItr(dataOcr.result[0], arquivo);
      } else if (dataOcr.result[0].docType === "certidao" && dataOcr.result[0].tags.find((f: any) => f === 'br-cartorio-registro-imovel-1')) {
        this.validacaoCcir(dataOcr.result[0], arquivo);
      } else {
        this.ocrInvalida(arquivo);
      }
    }
  }

  validacaoItr(dataOcr: any, arquivo: Anexo): void {
    let dadosImovel = this._etapaService.getEndereco;
    let cep = this._ocrService.isOCRFieldValid(dataOcr.fields.find((f: any) => f.name === 'cep_imovel_rural'));
    let cidade = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(dataOcr.fields.find((f: any) => f.name === 'municipio_imovel_rural')));
    let cpf = this._ocrService.isOCRFieldValid(dataOcr.fields.find((f: any) => f.name === 'cpf_contribuinte'));
    let nome = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(dataOcr.fields.find((f: any) => f.name === 'nome_contribuinte')));
    nome = nome.split(' ')[0];

    if (dadosImovel.cep === cep && removerCaracteresEspeciais(dadosImovel.cidade) === cidade && (cpf === this._userServiceLN.sessionUser.documento || nome === removerCaracteresEspeciais(this._userServiceLN.sessionUser.nome).split("", 1)[0])) {
      this.uploadDoc(arquivo, DOC_VALIDADO);
      this.focusInitPedido();
    } else {
      this.ocrInvalida(arquivo);
    }
  }

  validacaoCcir(dataOcr: any, arquivo: Anexo): void {
    let nome = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(dataOcr.fields.find((f: any) => f.name === 'nome_titular')));
    let cpf = this._ocrService.isOCRFieldValid(dataOcr.fields.find((f: any) => f.name === 'cpf_titular'));
    let nomeValidado: boolean = nome.split(' ', 1)[0] === removerCaracteresEspeciais(this._userServiceLN.sessionUser?.nome).split(' ', 1)[0];
    let localizadorImovel = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(dataOcr.fields.find((f: any) => f.name === 'localizador_imovel_rural')));

    if (cpf === this._userServiceLN.sessionUser.documento && nomeValidado && localizadorImovel.includes(removerCaracteresEspeciais(this._etapaService.getEndereco.endereco))) {
      this.uploadDoc(arquivo, DOC_VALIDADO);
      this.focusInitPedido();
    } else {
      this.ocrInvalida(arquivo);
    }
  }

  uploadDoc(arquivo: Anexo, deveChecarDoc: boolean): void {
    this.anexo['Doc Posse'].arquivos.push(arquivo);
    this._etapaService.setChecarDocPosse = deveChecarDoc;
  }

  ocrInvalida(file: any): void {
    this.uploadDoc(file, DOC_INVALIDO);
    this.focusInitPedido();
    this._loadingService.stop();
  }

  focusInitPedido(): void {
    setTimeout(() => {
      document.getElementById('initPedido')!.focus();
    }, 100);
  }

  isDisabled(): boolean {
    if (this._etapaService.getDocPosse.posseImovel === 'tenhoDocumento') {
      return (this.anexo['Doc Posse'].arquivos.length > 0) ? false : true;
    } else if (this._etapaService.getDocPosse.posseImovel === 'naoTenhoDocumento') {
      return true;
    }
    return true;
  }

  voltar(): void {
    this._location.back();
  }

  avancar(): void {
    if (this._etapaService.PREFEITURAS_COM_AUTORIZACAO.includes(this._etapaService.getDadosDoImovel?.endereco?.cidade)) {
      this._router.navigate(["ligacao-nova", "pedido", 'anexar-autorizacao-da-prefeitura']);
    } else {
      this._router.navigate(["ligacao-nova", "pedido", "selecao-perfil"]);
    }
  }
}
