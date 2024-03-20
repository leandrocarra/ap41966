import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubPerfilRural } from '../../../../../../core/models/escolha-perfil/escolha-perfil';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { LoginService } from '../../../../../../core/services/login/login.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { DialogRepresentanteLegalService } from '../../components/dialog-representante-legal/dialog-representante-legal-service/dialog-representante-legal-service.service';

@Component({
  selector: 'neo-documentos-necessarios',
  templateUrl: './documentos-necessarios.component.html',
  styleUrls: ['./documentos-necessarios.component.scss']
})
export class DocumentosNecessariosComponent {
  documentosNecessarios: Array<any>;
  tipoDocumento: string;
  perfil: string;
  subPerfil: SubPerfilRural;
  DOCUMENTOS_NECESSARIOS_RURAL: any;
  constructor(
    private _router: Router,
    private _userServiceLN: UserServiceLN,
    private _loginService: LoginService,
    private _dadosDoImovelService: DadosDoImovelService,
    private _ligacaoNovaService: LigacaoNovaService,
    private _dialogRepresentanteLegalService: DialogRepresentanteLegalService,
    private _location: Location
  ) {
    this.documentosNecessarios = [];
    this.perfil = this._ligacaoNovaService.getPerfilEscolhido?.perfil;
    this.tipoDocumento = this._userServiceLN.tipoDocumento;
    this.subPerfil = new SubPerfilRural();
    this.recebeValoresDoService();
  }

  recebeValoresDoService(): void {
    if (this.perfil === 'RESIDENCIAL') {
      this.documentosNecessarios = this.documentosNecessariosResidencial();
    } else if (this.perfil === 'COMERCIAL' || this.perfil === 'INDUSTRIAL') {
      this.documentosNecessarios = this.documentosNecessariosComercialIndustrial();
    } else if (this.perfil == 'BENEFÍCIO RURAL') {
      this.subPerfil = this._ligacaoNovaService.getSubPerfilEscolhido!;
      this.DOCUMENTOS_NECESSARIOS_RURAL = this.montaDocumentosNecessariosRural();
      this.documentosNecessarios = (this.tipoDocumento === 'CPF') ? this.documentosNecessariosRuralCPF() : this.documentosNecessariosRuralCNPJ();
    }
  }

  continuar(): void {
    if (this.tipoDocumento === 'CNPJ') {
      this._dialogRepresentanteLegalService.open();
      this._dialogRepresentanteLegalService.termoRepresentante().subscribe(representate => {
        if (!representate)
          this._loginService.logout();
      })
    }
    if (this.perfil === 'RESIDENCIAL') {
      this._router.navigate(['ligacao-nova', 'documentos', 'residencial']);
    } else if (this.perfil === 'COMERCIAL') {
      this._router.navigate(['ligacao-nova', 'documentos', 'comercial']);
    } else if (this.perfil === 'INDUSTRIAL') {
      this._router.navigate(['ligacao-nova', 'documentos', 'industrial']);
    } else if (this.perfil === 'BENEFÍCIO RURAL') {
      this._router.navigate(['ligacao-nova', 'documentos', 'rural', this._ligacaoNovaService.getSubPerfilEscolhido!.route]);
    }
  }

  voltar(): void {
    this._location.back();
  }

  //---------------------------------------

  documentosNecessariosRuralCPF(): any[] {
    let docs: any[] = JSON.parse(JSON.stringify(this.DOCUMENTOS_NECESSARIOS_RURAL['CPF'])); //deep copy
    let licencaAmbiental = (this._dadosDoImovelService.getEnderecoAnexos['Licença Ambiental'].length === 0) ? true : false;

    if (this.subPerfil.label !== undefined) {
      if (this.subPerfil.label !== 'RESIDENCIAL RURAL') {
        docs.push(this.DOCUMENTOS_NECESSARIOS_RURAL['CADESP'][0]);
        if (this.subPerfil.label === 'AQUICULTOR' || this.subPerfil.label === 'IRRIGANTE') {
          if (licencaAmbiental) {
            docs.push(this.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
          }
        } else {
          docs.push(this.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
        }
      } else {
        docs.push(this.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
      }
    }
    return docs;
  }

  documentosNecessariosRuralCNPJ(): any[] {
    let docs: any[] = JSON.parse(JSON.stringify(this.DOCUMENTOS_NECESSARIOS_RURAL['CNPJ'])); //deep copy
    let licencaAmbiental = (this._dadosDoImovelService.getEnderecoAnexos['Licença Ambiental'].length === 0) ? true : false;

    if (this.subPerfil.label !== undefined) {
      if (this.subPerfil.label === 'AGROPECUÁRIA RURAL' || this.subPerfil.label === 'AGROPECUÁRIA URBANA') {
        docs.push(this.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
      } else if (this.subPerfil.label === 'AQUICULTOR' || this.subPerfil.label === 'IRRIGANTE') {
        if (licencaAmbiental) {
          docs.push(this.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
        }
      } else if (this.subPerfil.label === 'SERVIÇO PÚBLICO DE IRRIGAÇÃO') {
        docs.push(this.DOCUMENTOS_NECESSARIOS_RURAL['OUTORGA DE ÁGUA'][0]);
        if (licencaAmbiental) {
          docs.push(this.DOCUMENTOS_NECESSARIOS_RURAL['LICENÇA AMBIENTAL'][0]);
        }
      }
    }
    return docs;
  }

  montaTooltipAtividadeRural(): string {
    let tipoRuralTooltipAtividadeRural = ["AQUICULTOR", "IRRIGANTE"];

    if (tipoRuralTooltipAtividadeRural.includes(this.subPerfil.label)) {
      return 'Como comprovante de atividade rural será aceito um dos documentos abaixo:\nLicença Ambiental - emitido pelo Ibama ou órgãos Estaduais\nOutorga de Água - emitido pelo ANA ou órgãos Estaduais';
    } else if (this.subPerfil.label === "RESIDENCIAL RURAL") {
      return 'Como comprovante de trabalhador rural será aceito um dos documentos abaixo:\nCarteira de Trabalhador Rural - emitido pelo Ministério do Trabalho\nCarteira de Sindicato Rural - emitido pelo Sindicado Rural\nAposentadoria Rural - emitido pelo INSS';
    } else {
      return 'Como comprovante de atividade rural será aceito um dos documentos abaixo:\nInscrição Estadual com atividade de Produtor Rural - emitido pelo SEFAZ\nEstadual Registro no INCRA - emitido pelo INCRA\nCODEVASF  Companhia de Desenvolvimento do Vale do São Francisco - emitido pelo CODEVASF\nPRONAF  Programa Nacional de Fortalecimento da Agricultura Familiar - emitido pelo Ministério da Agricultura\nCCIR(CAFIR)  Cadastro Nacional de Imóvel Rural - emitido pela Receita Federal\nIRT  Imposto Territorial Rural  emitido pela Receita Federal\nMAPA  Ministério da Agricultura e Pecuária - emitido pelo Ministério da Agricultura\nNIRF  Comprovante de Inscrição do imóvel Receita Federal do Brasil - emitido pela Receita Federal\nRegistro EMBRAPA  Empresa Brasileira de Pesquisa Agropecuária - emitido pela Embrapa\nRegistro em Secretarias ou Órgãos Municipais Vinculados a Agropecuária - emitido pelas Secretarias ou Órgãos Municipais\nRegistro em Secretarias ou Órgãos Estaduais Vinculados a Agropecuária - emitido pelas Secretarias ou Órgãos Estaduais';
    }
  }

  documentosNecessariosResidencial(): any[] {
    return [
      {
        label: "RG OU DOCUMENTO OFICIAL COM FOTO*",
        imagem: "assets/assetsLN/images/success.svg",
        altImagem: "Check",
        temTooltip: true,
        textoTooltip: 'Será aceito um dos seguintes documentos: RG, CNH (carteira nacional de habilitação) ou passaporte brasileiro.'
      },
      {
        label: "ART OU TRT (EM CASOS ESPECÍFICOS)*",
        imagem: "assets/assetsLN/images/success.svg",
        altImagem: "Check",
        temTooltip: true,
        textoTooltip: 'ART (Anotação de Responsabilidade Técnica) e TRT (Termo de Responsabilidade Técnica) são documentos emitidos por conselhos técnicos garantindo a qualidade e segurança das instalações e construções. \n\n Nós solicitamos estes documentos quando a ligação do imóvel é configurada com alta demanda de energia.'
      },
    ]
  }

  documentosNecessariosComercialIndustrial(): any[] {
    return [
      {
        label: "RG OU DOCUMENTO OFICIAL COM FOTO*",
        imagem: "assets/assetsLN/images/success.svg",
        altImagem: "Check",
        temTooltip: true,
        textoTooltip: 'Será aceito um dos seguintes documentos: RG, CNH (carteira nacional de habilitação) ou passaporte brasileiro.'
      },
      {
        label: "CÓDIGO DA ATIVIDADE FISCAL - CÓDIGO CNAE*",
        imagem: "assets/assetsLN/images/success.svg",
        altImagem: "Check",
        temTooltip: false,
        textoTooltip: ''
      },
      {
        label: "CONTRATO SOCIAL OU ESTATUTO SOCIAL OU CCMEI*",
        imagem: "assets/assetsLN/images/success.svg",
        altImagem: "Check",
        temTooltip: false,
        textoTooltip: ''
      },
      {
        label: "INSCRIÇÃO MUNICIPAL*",
        imagem: "assets/assetsLN/images/success.svg",
        altImagem: "Check",
        temTooltip: false,
        textoTooltip: ''
      },
      {
        label: "INSCRIÇÃO ESTADUAL (SE HOUVER)",
        imagem: "assets/assetsLN/images/success.svg",
        altImagem: "Check",
        temTooltip: false,
        textoTooltip: ''
      },
      {
        label: "ART OU TRT (EM CASOS ESPECÍFICOS)*",
        imagem: "assets/assetsLN/images/success.svg",
        altImagem: "Check",
        temTooltip: true,
        textoTooltip: 'ART (Anotação de Responsabilidade Técnica) e TRT (Termo de Responsabilidade Técnica) são documentos emitidos por conselhos técnicos garantindo a qualidade e segurança das instalações e construções. \n\n Nós solicitamos estes documentos quando a ligação do imóvel é configurada com alta demanda de energia.'
      },
      {
        label: "CNPJ*",
        imagem: "assets/assetsLN/images/success.svg",
        altImagem: "Check",
        temTooltip: false,
        textoTooltip: ''
      },
    ];
  }

  montaDocumentosNecessariosRural(): any {
    return {
      'CPF': [
        {
          label: "RG OU DOCUMENTO OFICIAL COM FOTO*",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: true,
          textoTooltip: 'Será aceito um dos seguintes documentos: RG, CNH (carteira nacional de habilitação) ou passaporte brasileiro.'
        },
        {
          label: "ART OU TRT (EM CASOS ESPECÍFICOS)*",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: true,
          textoTooltip: `ART (Anotação de Responsabilidade Técnica) e TRT (Termo de Responsabilidade Técnica) são documentos emitidos por conselhos técnicos garantindo a qualidade e segurança das instalações e construções.
          \n Nós solicitamos estes documentos quando a ligação do imóvel é configurada com alta demanda de energia.`
        },
      ],
      'CNPJ': [
        {
          label: "RG OU DOCUMENTO OFICIAL COM FOTO*",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: true,
          textoTooltip: 'Será aceito um dos seguintes documentos: RG, CNH (carteira nacional de habilitação) ou passaporte brasileiro.'
        },
        {
          label: "CNPJ*",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: false,
          textoTooltip: ''
        },
        {
          label: "CONTRATO SOCIAL OU ESTATUTO SOCIAL OU CCMEI*",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: false,
          textoTooltip: ''
        },
        {
          label: "INSCRIÇÃO MUNICIPAL*",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: false,
          textoTooltip: ''
        },
        {
          label: "INSCRIÇÃO ESTADUAL (SE HOUVER)",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: false,
          textoTooltip: ''
        },
        {
          label: "CADESP (EM CASOS ESPECÍFICOS)*",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: true,
          textoTooltip: 'O CADESP é a sigla que corresponde ao Cadastro de Contribuintes do ICMS do Estado de São Paulo. Mais informações sobre como obter o CADESP (Cadastro de Contribuintes de ICMS) podem ser encontradas no Posto Fiscal da sua cidade ou no escritório contábil de sua preferência.'
        },
        {
          label: "ART OU TRT (EM CASOS ESPECÍFICOS)*",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: true,
          textoTooltip: 'ART (Anotação de Responsabilidade Técnica) e TRT (Termo de Responsabilidade Técnica) são documentos emitidos por conselhos técnicos garantindo a qualidade e segurança das instalações e construções. \n Nós solicitamos estes documentos quando a ligação do imóvel é configurada com alta demanda de energia.'
        },
      ],
      'CADESP': [
        {
          label: "CADESP (EM CASOS ESPECÍFICOS)*",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: true,
          textoTooltip: 'O CADESP é a sigla que corresponde ao Cadastro de Contribuintes do ICMS do Estado de São Paulo. Mais informações sobre como obter o CADESP (Cadastro de Contribuintes de ICMS) podem ser encontradas no Posto Fiscal da sua cidade ou no escritório contábil de sua preferência.'
        },
      ],
      'COMPROVANTE DE ATIVIDADE RURAL': [
        {
          label: "COMPROVANTE DE ATIVIDADE RURAL*",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: true,
          textoTooltip: this.montaTooltipAtividadeRural()
        },
      ],
      'LICENÇA AMBIENTAL': [
        {
          label: "LICENÇA AMBIENTAL*",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: true,
          textoTooltip: 'Documento emitido pelo Ibama ou órgãos Estaduais.'
        },
      ],
      'OUTORGA DE ÁGUA': [
        {
          label: "OUTORGA DE ÁGUA*",
          imagem: "assets/assetsLN/images/success.svg",
          altImagem: "Check",
          temTooltip: true,
          textoTooltip: 'Documento emitido pelo ANA ou Órgãos Estaduais.'
        },
      ]
    };
  }
}
