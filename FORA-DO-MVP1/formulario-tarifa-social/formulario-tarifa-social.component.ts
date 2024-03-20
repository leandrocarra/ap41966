import { Component, OnInit } from '@angular/core';
import { BoxAnexo } from 'app/core/models/documentos/box-anexo/box-anexo';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { TarifaSocialService } from 'app/core/services/tarifa-social/tarifa-social.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-formulario-tarifa-social',
  templateUrl: './formulario-tarifa-social.component.html',
  styleUrls: ['./formulario-tarifa-social.component.scss']
})
export class FormularioTarifaSocialComponent implements OnInit {

  mobile: boolean;
  docsNecessarios: any[];
  anexos: any;

  zonaRural: boolean = false; //FIXME: validar com time de req se é necessário. 
  solicitarKit: any;
  beneficio: string;
  titular: boolean = true;
  disabledForm: boolean = false;
  resetDados: boolean = false;


  validarFormTitular: boolean = false;
  validarFomDadosBeneficio: boolean = false;

  // validação dos documentos
  documentos: any;
  documentosTitular: any;
  documentosNaoTitular: any;
  documentoDuplo: boolean = false;




  constructor(
    public user: UserService,
    private _tarifaSocialService: TarifaSocialService,
    private _alert: CustomSweetAlertService

  ) {
    this.titular = true;
    this.mobile = window.screen.width <= 768 ? true : false;
    // this.beneficio = "BENEFÍCIO DE PRESTAÇÃO CONTINUADA"; //FIXME: dretirar dado mockado quando tiver fluxo
    this.beneficio = "ASSISTÊNCIA MÉDICA DOMICILIAR"; //FIXME: dretirar dado mockado quando tiver fluxo
    this._tarifaSocialService.setBeneficioTarifa = this.beneficio;
    this.docsNecessarios = this._tarifaSocialService.getDocumentosNecessarios(this.titular);
    this.anexos = this._tarifaSocialService.getDadosTarifaSocial.anexos;
  }

  ngOnInit(): void {}

  redirecionamento(doc: string): void {
    this._tarifaSocialService.urlRedirecionamento(doc);
  }

  formTitularTarifaSocialValidado(event: any): void {
    this.validarFormTitular = event;
  }

  formDadosBeneficioValidado(event: any): void {
    this.validarFomDadosBeneficio = event;
  }

  valorEscolhidoKit():void{}


  resetForm(): void {
    this.disabledForm = false;
    this.resetDados = true;
    this.docsNecessarios.forEach(element => {
      if (this.anexos[element.docName].length > 0) {
        this.anexos[element.docName] = [];
      }
    });
    this.resetDados = false;
  }


  alterarTitular(): void {
    this._tarifaSocialService.setTitular = this.titular;
    this.resetForm();
    this.docsNecessarios = this._tarifaSocialService.getDocumentosNecessarios(this.titular);
  }


  validarBotaoTitular(): boolean {
    let validado: boolean = false;

    switch (this.beneficio) {
      case 'PROGRAMA SOCIAL DO GOVERNO': {
        validado = (this.anexos['Folha V7'].arquivos.length > 0) ? false : true;
        break;
      }
      case 'ASSISTÊNCIA MÉDICA DOMICILIAR': {
        validado = (this.anexos['Folha V7'].arquivos.length > 0 && this.anexos['Ass Medica'].arquivos.length > 0) ? false : true;
        break;
      }
      case 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA': {
        validado = (this.anexos['Carta INSS'].arquivos.length > 0) ? false : true;
        break;
      }
      default: {
        validado = true;
      }
    }
    return validado;
  }

  validarBotaoNaoTitular(): boolean {
    return (this.anexos['Doc Oficial'].arquivos.length > 0 && !this.validarBotaoTitular()) ? false : true;
  }



  remove(index: number, box: BoxAnexo): void {
    // if (!this.resetDados) {
    //   this._alert.alertDeleteArquivo(box.docName).then(r => {
    //     if (!r.dismiss) {
    //       if (box.docName === 'Doc Oficial') {
    //         this._documentosService.removeDocOficial('RESIDENCIAL', index, box.docName, true)
    //       } else {
    this.anexos[box.docName].arquivos.splice(index, 1);
    //       }
    //     }
    //   })
    // } else {
    //   if (box.docName === 'Doc Oficial') {
    //     this._documentosService.removeDocOficial('RESIDENCIAL', index, box.docName, true)
    //   } else {
    //     this.anexos[box.docName].arquivos.splice(index, 1);
    //   }

    // }
  }

  // recebeAnexos(file: any): void {
  //   if (file !== undefined) {
  //     this.anexos.push(file);
  //   }
  // }

  anexarDocumento(arquivo: any, box: BoxAnexo): void {
    this.anexos[box.docName].arquivos.push(arquivo);
  }




  anexar(arquivo: any, box: BoxAnexo): void {
    //Quando anexar arquivo, eu desabilito o formulario
      //-> Só consigo naexar o arquivo quando preenchido o formulario
    if (this.verificarAnexo()) {
      // this._tarifaSocialService.setDocumentoDuplo = (box.docName === 'Doc Oficial') ? true : false;
      if (this.anexos[box.docName].arquivos.length > 1 || (this.anexos[box.docName].arquivos.length < 2)) {
        this.anexarDocumento(arquivo, box);
      } else {
        this._alert.alertSuccess("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo")
      }
    }

  }

  verificarAnexo(): boolean {
    if (this.titular) {
      if (!this.validarFomDadosBeneficio) {
        this._alert.alertInfo("Antes de carregar o documento, preencha todos os campos acima.");
        return false;
      }
    } else {
      if (!this.validarFomDadosBeneficio || !this.validarFormTitular) {
        this._alert.alertInfo("Antes de carregar o documento, preencha todos os campos acima.");
        return false;
      }
    }
    this.disabledForm = true;
    return true;
  }


  
  continuar(): void {

  }

  voltar(): void {

  }

  isDisabled(): boolean {
    if (this.titular) {
      return this.validarBotaoTitular();
    } else {
      return this.validarBotaoNaoTitular();
    }
  }

 




}
