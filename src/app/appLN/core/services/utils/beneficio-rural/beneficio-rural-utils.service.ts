import { Injectable } from '@angular/core';
import { BoxAnexo } from '../../../models/documentos/box-anexo/box-anexo';
import { UserServiceLN } from '../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class BeneficioRuralUtilsService {
  CNPJ_RURAL: any;
  CPF_RURAL: any;
  constructor(
    private _userServiceLN: UserServiceLN
  ) {
    this.CNPJ_RURAL = {
      'agropecuaria-rural': [
        this.DOC_OFICIAL,
        this.DOC_CNPJ,
        this.DOC_CTTSOCIAL,
        new BoxAnexo('COMPROVANTE DE ATIVIDADE RURAL', this._userServiceLN.tipoDocumento === 'CPF', 'Comp Atividade Rural')
      ],
      'escola-agrotecnica': [
        this.DOC_OFICIAL,
        this.DOC_CNPJ,
        this.DOC_CTTSOCIAL
      ],
      'aquicultor': [
        this.DOC_OFICIAL,
        this.DOC_CNPJ,
        this.DOC_CTTSOCIAL,
        new BoxAnexo('COMPROVANTE DE ATIVIDADE RURAL', false, 'Comp Atividade Rural')
      ],
      'agroindustrial': [
        this.DOC_OFICIAL,
        this.DOC_CNPJ,
        this.DOC_CTTSOCIAL
      ],
      'agropecuaria-urbana': [
        this.DOC_OFICIAL,
        this.DOC_CNPJ,
        this.DOC_CTTSOCIAL,
        new BoxAnexo('COMPROVANTE DE ATIVIDADE RURAL', this._userServiceLN.tipoDocumento === 'CPF', 'Comp Atividade Rural')
      ],
      'servico-publico-de-irrigacao': [
        this.DOC_OFICIAL,
        this.DOC_CNPJ,
        this.DOC_CTTSOCIAL,
        new BoxAnexo('OUTORGA DE ÁGUA', false, 'Outorga'),
        new BoxAnexo('LICENÇA AMBIENTAL', false, 'Lic Ambiental')
      ],
      'irrigante': [
        this.DOC_OFICIAL,
        this.DOC_CNPJ,
        this.DOC_CTTSOCIAL,
        new BoxAnexo('COMPROVANTE DE ATIVIDADE RURAL', false, 'Comp Atividade Rural')
      ],
    }

    this.CPF_RURAL = {
      'residencial-rural': [
        this.DOC_OFICIAL,
        new BoxAnexo('COMPROVANTE TRABALHADOR RURAL', true, 'Comp Trabalhador Rural'),
      ],
      'agropecuaria-rural': [
        this.DOC_OFICIAL,
        new BoxAnexo('COMPROVANTE DE ATIVIDADE RURAL', this._userServiceLN.tipoDocumento === 'CPF', 'Comp Atividade Rural'),
      ],
      'aquicultor': [
        this.DOC_OFICIAL,
        new BoxAnexo('COMPROVANTE DE ATIVIDADE RURAL', false, 'Comp Atividade Rural'),
      ],
      'agropecuaria-urbana': [
        this.DOC_OFICIAL,
        new BoxAnexo('COMPROVANTE DE ATIVIDADE RURAL', this._userServiceLN.tipoDocumento === 'CPF', 'Comp Atividade Rural'),
      ],
      'irrigante': [
        this.DOC_OFICIAL,
        new BoxAnexo('COMPROVANTE DE ATIVIDADE RURAL', false, 'Comp Atividade Rural')
      ],
    }
  }

  DOC_OFICIAL: BoxAnexo = new BoxAnexo('DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)', true, 'Doc Oficial');
  DOC_CNPJ: BoxAnexo = new BoxAnexo('CADASTRO NACIONAL DA PESSOA JURÍDICA (CNPJ)', true, 'CNPJ');
  DOC_CTTSOCIAL: BoxAnexo = new BoxAnexo('CONTRATO SOCIAL OU ESTATUTO SOCIAL OU CCMEI', false, 'CTT Social ou CCMEI');

  getBoxsRural(subperfil: string, cnpj: boolean) {
    if (cnpj) {
      return this.CNPJ_RURAL[subperfil];
    } else {
      return this.CPF_RURAL[subperfil];
    }
  }
}
