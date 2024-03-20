import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Anexo } from '../../../models/anexo/anexo';
import { DadosDaLigacaoService } from '../../dados-da-ligacao/dados-da-ligacao.service';
import { DadosDoImovelService } from '../../dados-do-imovel/dados-do-imovel.service';
import { DocumentosService } from '../../documentos/documentos.service';
import { LigacaoNovaService } from '../../ligacao-nova/ligacao-nova.service';
import { TarifaSocialService } from '../../tarifa-social/tarifa-social.service';
import { UserServiceLN } from '../../user/user.service';
import { DownloadUtilsService } from '../download-utils/download-utils.service';

@Injectable({
  providedIn: 'root'
})
export class GerarPdfService {

  constructor(
    private _ligacaoNovaService: LigacaoNovaService,
    private _dadosDoImovelService: DadosDoImovelService,
    private _dadosDaLigacaoService: DadosDaLigacaoService,
    private _downloadUtilService: DownloadUtilsService,
    private _userServiceLN: UserServiceLN,
    private _documentosService: DocumentosService,
    private _tarifaSocialService: TarifaSocialService

  ) { }

  async criaAnexoContrato() {
    // Documento que sera preenchido
    const formUrl = 'assets/assetsLN/docs/Contrato.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    // Carregar campos preenchiveis
    const pdfDoc = await PDFDocument.load(formPdfBytes)
    const form = pdfDoc.getForm()

    //Chamando cada campo que sera preenchido
    const nome = form.getTextField('#Nome');
    const tipoDoc = form.getTextField('#TipoDoc');
    const rg = form.getTextField('Nr_RG');
    const cpfcnpj = form.getTextField('#NumDoc');
    const unidadeConsumidora = form.getTextField('#NumUC');
    const endereco = form.getTextField('#Endereco');
    nome.enableReadOnly();
    tipoDoc.enableReadOnly();
    rg.enableReadOnly();
    cpfcnpj.enableReadOnly();
    unidadeConsumidora.enableReadOnly();
    endereco.enableReadOnly();


    // Conteudo que sera colocado nos campos
    nome.setText(this._documentosService.dadosTitular.nome);
    tipoDoc.setText('RG');
    rg.setText(this._documentosService.dadosTitular.rg);
    cpfcnpj.setText(this._documentosService.dadosTitular.cpf);
    unidadeConsumidora.setText(this._dadosDoImovelService.getEndereco.uc);
    endereco.setText('RUA: ' + this._dadosDoImovelService.getEndereco.endereco + '.   Nº: ' + this._dadosDoImovelService.getEndereco.numero + '.  ' + this._dadosDoImovelService.getEndereco.bairro + '  ' + this._dadosDoImovelService.getEndereco.cidade + ' - ' + this._dadosDoImovelService.getEndereco.estado);


    // Reconstrução do PDF
    pdfDoc.setCreator('Ligação Nova NeoEnergia')
    pdfDoc.setProducer('Elektro');
    pdfDoc.setAuthor('Ligação Nova');
    pdfDoc.setKeywords(['ligacao-nova', 'elektro', 'contrato']);
    pdfDoc.setSubject('Conheça mais sobre a Elektro e você!');
    pdfDoc.setTitle('Guia do Cliente');


    const pdfBytes = await pdfDoc.save()

    // Chamar o download do documento
    this._downloadUtilService.download(new Blob([pdfBytes]), "contratoelektro.pdf");
  }

  async criaAnexoChecklist() {
    // Documento que sera preenchido
    const formUrlCheckList = 'assets/assetsLN/docs/checklist.pdf'
    const formPdfBytesCheckList = await fetch(formUrlCheckList).then(res => res.arrayBuffer())

    // Carregar campos preenchiveis
    const pdfDoc = await PDFDocument.load(formPdfBytesCheckList)
    const formCheckList = pdfDoc.getForm()

    // Chamando cada campo que sera preenchido;
    const desmembradoCheck = formCheckList.getTextField('desmembrado');
    const propriedadeCheck = formCheckList.getTextField('propriedade')
    const proximoCheck = formCheckList.getTextField('proximo')
    desmembradoCheck.enableReadOnly();
    propriedadeCheck.enableReadOnly();
    proximoCheck.enableReadOnly();

    //conteudo que será colocado nos campos
    desmembradoCheck.setText(this._dadosDaLigacaoService.getDesmembrado);
    propriedadeCheck.setText(this._dadosDaLigacaoService.getItensPropriedade);
    proximoCheck.setText(this._dadosDaLigacaoService.getItensProxPropriedade);


    // Reconstrução do PDF
    pdfDoc.setCreator('Ligação Nova NeoEnergia')
    pdfDoc.setProducer('Elektro');
    pdfDoc.setAuthor('Ligação Nova');
    pdfDoc.setKeywords(['ligacao-nova', 'elektro', 'tarifa-social']);
    pdfDoc.setSubject('');
    pdfDoc.setTitle('checklist');

    const pdfBytesCheck = await pdfDoc.save();

    var binaryCheck = '';
    var lenCheck = pdfBytesCheck.byteLength;
    for (var i = 0; i < lenCheck; i++) {
      binaryCheck += String.fromCharCode(pdfBytesCheck[i]);
    }

    var base64Check = window.btoa(binaryCheck);

    return new Anexo('.pdf', 'checklistrural', base64Check?.length, base64Check);
  }

  async criaAnexoTarifa(): Promise<Anexo> {
    // Documento que sera preenchido
    const formUrl = 'assets/assetsLN/docs/Adesao_Tarifa.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    // Carregar campos preenchiveis
    const pdfDoc = await PDFDocument.load(formPdfBytes)
    const form = pdfDoc.getForm()

    //Chamando cada campo que sera preenchido
    const nome2 = form.getTextField('#nome');
    const beneficio = form.getTextField('Beneficio');
    const nisnb = form.getTextField('nis nb');
    const codigoFamiliar = form.getTextField('codigo familiar');
    const nascimento = form.getTextField('dt nascimento');
    const cpf = form.getTextField('cpf');
    const rg = form.getTextField('rg');
    const cidade = form.getTextField('Cidade');
    const observacoes1 = form.getTextField('observacoes1');
    const observacoes2 = form.getTextField('observacoes2');
    const observacoes3 = form.getTextField('observacoes3');
    nome2.enableReadOnly();
    beneficio.enableReadOnly();
    nisnb.enableReadOnly();
    codigoFamiliar.enableReadOnly();
    nascimento.enableReadOnly();
    cpf.enableReadOnly();
    rg.enableReadOnly();
    cidade.enableReadOnly();
    observacoes1.enableReadOnly();
    observacoes2.enableReadOnly();
    observacoes3.enableReadOnly();

    // Conteudo que sera colocado nos campos
    let dadosTitularTarifa = this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial
    let dadosBeneficioTarifa = this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosBeneficio
    let titular = this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.titular;
    let beneficioTarifa = this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.beneficio;

    let campoNome = titular ? this._userServiceLN.sessionUser.nome : dadosTitularTarifa.nomeCompleto;
    nome2.setText(campoNome);

    beneficio.setText(beneficioTarifa);

    let campoNisNB = beneficioTarifa === "BENEFÍCIO DE PRESTAÇÃO CONTINUADA" ? 'NB: ' + dadosBeneficioTarifa.nb : 'NIS: ' + dadosBeneficioTarifa.nis
    nisnb.setText(campoNisNB);

    let codigoCampo = dadosBeneficioTarifa.codigoFamiliar === '' ? '' : 'Código Familiar: ' + dadosBeneficioTarifa.codigoFamiliar;
    codigoFamiliar.setText(codigoCampo);

    let dataDeNascimento = dadosTitularTarifa.dtNascimento === '' ? this._documentosService.dadosTitular.dataNascimento : dadosTitularTarifa.dtNascimento;
    let campoNascimento = dataDeNascimento.substr(0, 2) + '/' + dataDeNascimento.substr(2, 2) + '/' + dataDeNascimento.substr(4, 8);
    nascimento.setText(campoNascimento);

    let campoCpf = dadosTitularTarifa.cpf === '' ? this._documentosService.dadosTitular.cpf : dadosTitularTarifa.cpf;
    cpf.setText(campoCpf);

    let campoRg = dadosTitularTarifa.rg === '' ? this._documentosService.dadosTitular.rg : dadosTitularTarifa.rg;
    rg.setText(campoRg);

    cidade.setText(this._dadosDoImovelService.getEndereco.cidade);

    // ---

    let campoObservacao = !this._tarifaSocialService.getTarifaSocialValidada || (!this._tarifaSocialService.getTitular && !this._dadosDaLigacaoService.getDocumentoComFotoTarifaSocialValidado) ?  'Necessário avaliar documentos enviados' : 'Documentos enviados validados' ;
    observacoes1.setText(campoObservacao);
    observacoes2.setText('');
    observacoes3.setText('');

    // ---

    // Reconstrução do PDF
    pdfDoc.setCreator('Ligação Nova NeoEnergia')
    pdfDoc.setProducer('Elektro');
    pdfDoc.setAuthor('Ligação Nova');
    pdfDoc.setKeywords(['ligacao-nova', 'elektro', 'tarifa-social']);
    pdfDoc.setSubject('');
    pdfDoc.setTitle('Adesao a Tarifa Social');


    const pdfBytes = await pdfDoc.save()
    var binary = '';
    var len = pdfBytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(pdfBytes[i]);
    }

    var base64 = window.btoa(binary);

    return new Anexo('.pdf', 'tarifasocial', base64?.length, base64);
  }
}
