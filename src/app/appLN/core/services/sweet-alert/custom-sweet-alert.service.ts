import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { tipoCategoria } from '../../models/dados-da-ligacao/dados-da-ligacao';

@Injectable({
  providedIn: 'root'
})
export class CustomSweetAlertService {

  alertAcompanhar(message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      html: '<div class="d-flex justify-content-center mb-2"><div class="mb-4"><img src="assets/assetsLN/images/tick.svg"></div></div>' + message,
      confirmButtonText: 'ACOMPANHE SEU PEDIDO',
      confirmButtonColor: 'var(--neo-light-green)',
      allowOutsideClick: false,
    }).then();
  }

  alertSuccess(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message.toUpperCase(),
      confirmButtonColor: 'var(--neo-light-green)'
    });
  }

  alertError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: message.toUpperCase(),
      timer: 3000,
      confirmButtonColor: 'var(--neo-light-green)'
    });
  }

  alertCamera(message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      html: '<div class="row"><div class="col-8 mx-auto mb-4"><img src="assets/assetsLN/images/Alerta.svg" /></div></div>' + message,
      // confirmButtonColor: 'var(--neo-light-green)'
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: 'var(--neo-white-400)',
      cancelButtonColor: 'var(--neo-pure-red)',
      confirmButtonText: 'CONTINUAR',
      cancelButtonText: 'SAIR',
    }).then();
  }

  /**
   * POPUP GOLD COR AMARELO
   */
  alertInfo(message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      // type: 'info',
      html: '<div class="row"><div class="col-8 mx-auto mb-4"><img src="assets/assetsLN/images/Alerta.svg" /></div></div>' + '<h3  style="color:var(--neo-orange-100)">' + message.toUpperCase() + '</h3>',
      // title: message,
      confirmButtonColor: 'var(--neo-light-green)',
      width: 850
    }).then();
  }

    alertInfoWithText(title: string, message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      // type: 'info',
      html: '<div class="row"><div class="col-8 mx-auto mb-4"><img src="assets/assetsLN/images/Alerta.svg" /></div></div>' + '<h3  style="color:var(--neo-orange-100)">' + title.toUpperCase() + '</h3>' + message,
      // title: message,
      confirmButtonColor: 'var(--neo-light-green)',
      width: 850
    }).then();
  }

  alertEnviarDocOficial(message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      // type: 'info',
      html: '<div class="row"><div class="col-8 mx-auto mb-4"><img src="assets/assetsLN/images/Alerta.svg" /></div></div>' + '<h3  style="color:var(--neo-orange-100)">' + "Antes de carregar o documento " + message + " carregue o Doc Oficial com foto do Titular." + '</h3>',
      // title: message,
      confirmButtonColor: 'var(--neo-light-green)',
      width: 850
    }).then();
  }

  /**
   * POPUP GOLD COR VERMELHO
   */
  alertWarning(message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      // type: 'info',
      html: '<div class="row"><div class="col-10 offset-1 mb-4"><img src="assets/assetsLN/images/tick.svg"></div></div>' + '<h3  style="color:var(--neo-pure-red)">' + message.toUpperCase() + "</h3>",
      // title: message,
      confirmButtonColor: 'var(--neo-light-green)',
      width: 850
    }).then();
  }

  alertWarningWithText(title: string, message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      // type: 'info',
      html: '<div class="row"><div class="col-10 offset-1 mb-4"><img src="assets/assetsLN/images/tick.svg"></div></div>' + '<h3  style="color:var(--neo-pure-red)">' + title.toUpperCase() + "</h3>" +
        message,
      // title: message,
      confirmButtonColor: 'var(--neo-light-green)',
      width: 850
    }).then();
  }

  alertWarningLicencaAmbiental(): Promise<SweetAlertResult> {
    return Swal.fire({
      // type: 'info',
      html: '<div class="row"><div class="col-10 offset-1 mb-4"><img src="assets/assetsLN/images/Alerta.svg" /></div></div>' + '<h3  style="color:var(--neo-orange-100)">ATENÇÃO <br /></h3>' +
        'É importante que nos envie a licença ambiental ou que apresente o documento no momento da sua vistoria para que a solicitação não sofra impedimento!',
      // title: message,
      confirmButtonColor: 'var(--neo-light-green)',
      width: 850
    }).then();
  }


    alertInfoHtml(message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      // type: 'question',
      html: '<div class="row"><div class="col-8 mx-auto mb-4"><img src="assets/assetsLN/images/certo.svg"></div></div>' + message,
      confirmButtonColor: 'var(--neo-light-green)'
    }).then();
  }

//     showLoading() {
//     Swal.fire({
//       title: 'Carregando',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });
//   }

//   closeLoading() {
//     Swal.close();
//   }

    alertCpfIrregular() {
    return Swal.fire({
      html:
        '<div class="row">' + '<div class="col-12 mx auto mx auto">' +
        '<img src="assets/assetsLN/images/tick.svg">' + '</div>' + '</div>' +
        '<div class="row mt-5">' + '<div class="col-12">' + '<h3 style="color:var(--neo-pure-red);"> SITUAÇÃO IRREGULAR </h3>' + '</div>' + '</div>' +
        '<div class="row">' + '<div class="col-12">' + '<p> Verificamos que a sua situação na Receita Federal está irregular! </p>' + '</div>' + '</div>' +
        '<div class="row">' + '<div class="col-12">' + '<p> Consulte a Receita Federal para regularizar a sua situação e volte para pedir a sua Ligação Nova! </p>' + '</div>' + '</div>',
      showCancelButton: true,
      confirmButtonText: 'ACESSAR O SITE DA RECEITA FEDERAL',
      confirmButtonColor: 'var(--neo-white-400)',
      showConfirmButton: true,
      cancelButtonText: 'FECHAR',
      cancelButtonColor: 'var(--neo-pure-red)',
      allowOutsideClick: false,
      width: 850,
    });
  }

  alertTarifaBranca() {
    return Swal.fire(
      {
        html: '<div align="justify" style="font-size:14px; padding:5px;"><p>Estou ciente que ao optar pela tarifa branca o meu imóvel terá preços diferenciados para os segmentos de ponta, fora de ponta e intermediário, sendo que a configuração de consumo nestes postos horários pode afetar o valor da fatura de energia elétrica.</p></div>',

        showCancelButton: true,
        confirmButtonText: 'NÃO ACEITO',
        confirmButtonColor: 'var(--neo-pure-red)',
        showConfirmButton: true,
        cancelButtonText: 'ACEITO',
        cancelButtonColor: 'var(--neo-light-green)',
        allowOutsideClick: false,
        width: 850,

      });
  }

  alertConfirmacaoDeCategoria(categoria: tipoCategoria): Promise<SweetAlertResult> {
    return Swal.fire(
      {
        html: '<div class="row d-flex justify-content-center"><div class="row d-flex justify-content-center mb-4"><img class="d-flex" style="max-width: 300px" src="assets/assetsLN/images/certo.svg"></div></div><div style="font-size: 18px; color: var(--neo-dark-green); font-weight: bolder !important;" class="col-12"><h4 class="mx-auto">TERMO DE COMPROMISSO</h4></div><br>' +
          '<div align="justify" style="font-size:14px; padding:5px;"><p> Declaro que li e estou ciente que a categoria da ligação do meu imóvel é <strong style="color: var(--neo-dark-green);">' + categoria + '</strong> sendo minha responsabilidade preparar o padrão de entrada do imóvel para receber a ligação nova no momento da vistoria técnica. </p></div>',

        showCancelButton: true,
        cancelButtonText: 'ACEITO',
        cancelButtonColor: 'var(--neo-light-green)',
        showConfirmButton: true,
        confirmButtonText: 'CANCELAR',
        confirmButtonColor: 'var(--neo-pure-red)',
        allowOutsideClick: false,
        width: 850,

      });
  }

  alertAreaPreparada() {
    return Swal.fire(
      {
        title: '<div style="font-size: 18px; color: var(--neo-dark-green); font-weight: bolder !important;"> TERMO DE COMPROMISSO - PREPARAÇÃO DO IMÓVEL PARA LIGAÇÃO NOVA</div>',
        html: '<div align="justify" style="font-size:14px; padding:5px;"><p>Declaro que li e estou ciente que o imóvel deve estar preparado para receber a ligação nova no momento da vistoria técnica. Caso o imóvel não esteja preparado para receber a ligação de energia no momento da vistoria, poderá ser cobrado um valor adicional para que ocorra uma segunda vistoria. As taxas de vistoria variam de acordo com tipo de medição instalada no seu imóvel, confira a tabela de taxas <a rel="noopener" target="_blank" href="https://www.neoenergiaelektro.com.br/sua-casa/tarifas-taxas-e-tributos">aqui</a>.</p></div>',

        showCancelButton: true,
        confirmButtonText: 'NÃO ACEITO',
        confirmButtonColor: 'var(--neo-pure-red)',
        showConfirmButton: false,
        cancelButtonText: 'ACEITO',
        cancelButtonColor: 'var(--neo-light-green)',
        allowOutsideClick: false,
        width: 850,

      });
  }

  alertNaoPossuiDocumentoPosse() {
    return Swal.fire(
      {
        title: '<div style="font-size: 18px; color: var(--neo-dark-green); font-weight: bolder !important;"> TERMO DE COMPROMISSO - ORÇAMENTO DE REDE</div>',
        html: '<div align="justify" style="font-size:14px; padding:5px;"><p>Declaro que li e estou ciente que não poderei ser enquadrado no Atendimento sem Ônus. Estou de acordo e aceito ser atendido mediante orçamento da rede, caso seja necessário.</p></div>',

        showCancelButton: true,
        confirmButtonText: 'ACEITO',
        confirmButtonColor: 'var(--neo-light-green)',
        showConfirmButton: true,
        cancelButtonText: 'NÃO ACEITO',
        cancelButtonColor: 'var(--neo-pure-red)',
        allowOutsideClick: false,
        width: 850,

      });
  }

  alertAlertSenhaExpirada() {
    return Swal.fire({
      icon: 'error',
      title: '<h4 style="color: var(--neo-dark-green)">SUA SENHA EXPIROU!<h4>',
      html: 'Iremos direcioná-lo para a área de redefinição de senha.',
      showConfirmButton: true,
      confirmButtonText: "OK!",
      confirmButtonColor: "var(--neo-light-green)",
      allowOutsideClick: false
    })
  }

    //======Alert sefie area======
  alertWarningSelfie() {
    return Swal.fire({
      html: '<div class="row">' + '<div class="col-12 mx auto mx auto">' +
        '<img src="assets/assetsLN/images/tick.svg">' + '</div>' + '</div>' +
        '<div class="row mt-3 mb-3">' + '<div class="col-12">' + '<br /><h3  style="color:var(--neo-pure-red)">NÃO CONSEGUIMOS CONFIRMAR SUA IDENTIDADE</h3>' + '<h3 style="color:var(--neo-pure-red)">VAMOS TENTAR DE NOVO?</h3><br />' + '</div>' +
        '<div class="col-md-4 col-12">' + '<img src="assets/assetsLN/images/sol2.svg" >' + '</div>' +
        '<div class="col-md-4 col-12">' + '<img src="assets/assetsLN/images/oculos2.svg">' + '</div>' +
        '<div class="col-md-4 col-12">' + ' <img src="assets/assetsLN/images/rosto_livre2.svg">' + '</div>'
        + '</div>',
      allowOutsideClick: false,
      showConfirmButton: true,
      confirmButtonText: "TENTAR NOVAMENTE",
      confirmButtonColor: "var(--neo-light-green)",
      width: 850
    });
  }

  alertEndWarningSelfie() {
    return Swal.fire({
      html: '<div class="row">' + '<div class="col-12 mx auto mx auto">' +
        '<img src="assets/assetsLN/images/tick.svg">' + '</div>' + '</div>' +
        '<div class="row mt-3 mb-3">' + '<div class="col-12">' + '<br /><h3  style="color:var(--neo-pure-red)">AINDA NÃO CONSEGUIMOS VALIDAR SUA SELFIE</h3><br />' +
        '<h6 style="color: var(--neo-white-600)">Como não conseguimos validar automaticamente a selfie com a foto do seu documento, vamos enviá-la para uma análise interna. Não se preocupe, você poderá continuar normalmente com a sua solicitação!</h6><br />' + '</div>' +
        '</div>' + '</div>',
      showConfirmButton: true,
      confirmButtonText: "CONTINUAR",
      confirmButtonColor: "var(--neo-light-green)",
      width: 850
    });
  }

  alertSelfiConfirm() {
    return Swal.fire({
      html: '<div class="row">' + '<div class="col-12 mx auto mx auto">' +
        '<img src="assets/assetsLN/images/certo.svg">' + '</div>' + '</div>' +
        '<div class="row mt-3 mb-3">' + '<div class="col-12">' + '<h3 style="color:var(--neo-light-green)">CONSEGUIMOS CONFIRMAR SUA IDENTIDADE</h3>'
        + '</div>' + '</div>',
      showConfirmButton: true,
      confirmButtonText: "CONTINUAR",
      confirmButtonColor: "var(--neo-light-green)",
      width: 850
    });
  }

  alertSelfieInstrucoes() {
    return Swal.fire({
      html: '<div class="row">' + '<div class="col-12 mx auto mx auto">' +
        '<img src="assets/assetsLN/images/certo.svg">' + '</div>' + '</div>' +
        '<div class="row mt-3 mb-3">' + '<div class="col-12">' + '<h3 style="color:var(--neo-light-green)">PARA UMA BOA SELFIE, POSICIONE O SEU ROSTO NO QUADRO</h3>'
        + '</div>' + '</div>',
      showConfirmButton: true,
      confirmButtonText: "CONTINUAR",
      confirmButtonColor: "var(--neo-light-green)",
      width: 850
    });
  }
  //======End alert sefie area======

    alertUEComPosteUrbano(protocolo: string) {
    return Swal.fire({
      html: '<div class="row" style="margin: 5vh 0 5vh 0">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/certo.svg">' + '</div>' + '</div>' +
        '<div class="row mb-1">' +
        '<div class="col-12">' +
        '<h3 style="color:var(--neo-light-green)">CONSEGUIMOS! VIU COMO FOI FÁCIL?</h3>' +
        '<h6>Agora anote o número do protocolo abaixo para acompanhar o seu pedido.<br /> O prazo estimado para a realização da vistoria é de até <strong>3 dias úteis</strong> e o prazo para a ligação é de até <strong>2 dias úteis</strong> após a vistoria.<br /><br /></h6>' +
        '<h6><br /> SEU NÚMERO DE PROTOCOLO É</h6>' +
        `<h4 style="color: var(--neo-light-green);font-weight: bold">${protocolo}</h4>` +
        `<h6><br />Enviaremos o número do protocolo e atualizações sobre o seu pedido via e-mail.</h6>`,
      allowOutsideClick: false,
      width: 980,
      confirmButtonColor: "var(--neo-light-green)"
    });
  }

  alertUEComPosteRural(protocolo: string) {
    return Swal.fire({
      html: '<div class="row" style="margin: 5vh 0 5vh 0">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/checkG.svg">' + '</div>' + '</div>' +
        '<div class="row mb-1">' +
        '<div class="col-12">' +
        '<h3 style="color:var(--neo-light-green)">CONSEGUIMOS! VIU COMO FOI FÁCIL?</h3>' +
        '<h6>Agora anote o número do protocolo abaixo para acompanhar o seu pedido.<br /> O prazo estimado para a realização da vistoria é de até<strong>5 dias úteis</strong> e o prazo para a ligação é de até <strong>5 dias úteis</strong> após a vistoria.<br /><br /></h6>' +
        '<h6><br /> SEU NÚMERO DE PROTOCOLO É</h6>' +
        `<h4 style="color: var(--neo-light-green);font-weight: bold">${protocolo}</h4>` +
        `<h6><br />Enviaremos o número do protocolo e atualizações sobre o seu pedido via e-mail.</h6>`,
      allowOutsideClick: false,
      width: 980,
      confirmButtonColor: "var(--neo-light-green)"
    });
  }

  alertDeleteArquivo(message: string) {
    return Swal.fire({
      html:
        '<div class="row">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/tick.svg">' + '</div>' + '</div>' +
        '<div class="row mt-3 mb-3">' + '<div class="col-10 mx-auto">' + '<h3  style="color:var(--neo-pure-red)">TEM CERTEZA QUE DESEJA DELETAR O DOCUMENTO?</h3>' + message
        + '</div>' +
        '</div>' + '</div>',
      confirmButtonColor: 'var(--neo-pure-red)',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: 'var(--neo-white-400)',
      confirmButtonText: 'DELETAR',
      cancelButtonText: 'CANCELAR',
      width: 850
    });
  }


  alertEditarDadosTarifaSocial(): Promise<SweetAlertResult> {
    return Swal.fire({
      // type: 'info',
      html: '<div class="row"><div class="col-10 offset-1 mb-4"><img src="assets/assetsLN/images/Alerta.svg" /></div></div>' + '<h3  style="color:var(--neo-orange-100)">ATENÇÃO <br /></h3>' +
        'Para editar os dados do beneficiário, precisaremos que nos envie novamente os documentos para realizarmos a validação automática',
      // title: message,
      confirmButtonColor: 'var(--neo-white-400)',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: 'var(--neo-light-green)',
      cancelButtonText: 'EDITAR',
      confirmButtonText: 'CANCELAR',
      width: 850
    }).then();
  }

  /**
   * POPUP GOLD COR VERDE
   */
  confirmacaoTarifaSocial(): Promise<SweetAlertResult> {
    return Swal.fire({
      html:
        '<div class="row">' +
        '<div class="col-12 mx-auto mt-4">' +
        '<img src="assets/assetsLN/images/certo.svg"></div></div>' +
        '<h3 style="color: var(--neo-dark-green);">DOCUMENTOS RECEBIDOS</h3>' +
        '<p><br /> <br /> Um membro da nossa equipe irá avaliar sua solicitação para adesão à Tarifa Social. ' +
        '<br /><br /> Não se preocupe, a sua solicitação para o Ligação Nova será processada separadamente.</p>',
      // title: message,
      confirmButtonColor: 'var(--neo-light-green)',
      width: 850
    }).then();
  }

  alertUESemPosteUrbano(protocolo: string) { //GOLD UE
    return Swal.fire({
      html: '<div class="row" style="margin: 5vh 0 5vh 0">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/checkG.svg">' + '</div>' + '</div>' +
        '<div class="row mb-1">' +
        '<div class="col-12">' +
        '<h3 style="color:var(--neo-light-green)">CONSEGUIMOS! VIU COMO FOI FÁCIL?</h3>' +
        '<h6>Agora anote o número do protocolo abaixo para acompanhar o seu pedido.<br /> O prazo estimado para a realização da vistoria é de até <strong>3 dias úteis</strong> e o prazo para a ligação é de até<strong>2 dias úteis</strong> após a vistoria.</h6>' +
        `<h6 style="color: var(--neo-white-600);"><strong>Observação:</strong> No momento da vistoria, se identificada a necessidade de uma extensão de rede por parte da distribuidora, os prazos para vistoria e ligação serão interrompidos até a realização da extensão da rede no prazo de 30 dias e automaticamente reiniciados.</h6>` +
        `<h6 style="color: var(--neo-white-600);"><br />SEU NÚMERO DE PROTOCOLO É</h6>` +
        `<h4 style="color: var(--neo-light-green);font-weight: bold">${protocolo}</h4>` +
        `<h6><br />Enviaremos o número do protocolo e atualizações sobre o seu pedido via e-mail.</h6>`,
      allowOutsideClick: false,
      width: 980,
      confirmButtonColor: "var(--neo-light-green)"
    });
  }

  alertUESemPosteRural(protocolo: string) {
    return Swal.fire({
      html: '<div class="row" style="margin: 5vh 0 5vh 0">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/checkG.svg">' + '</div>' + '</div>' +
        '<div class="row mb-1">' +
        '<div class="col-12">' +
        '<h3 style="color:var(--neo-light-green)">CONSEGUIMOS! VIU COMO FOI FÁCIL?</h3>' +
        '<h6>Agora anote o número do protocolo abaixo para acompanhar o seu pedido.<br /> O prazo estimado para a realização da vistoria é de até <strong>5 dias úteis</strong> e o prazo para a ligação é de até<strong>5 dias úteis</strong> após a vistoria.</h6>' +
        `<h6 style="color: var(--neo-white-600);"><strong>Observação:</strong> No momento da vistoria, se identificada a necessidade de uma extensão de rede por parte da distribuidora, os prazos para vistoria e ligação serão interrompidos até a realização da extensão da rede no prazo de 30 dias e automaticamente reiniciados.</h6>` +
        `<h6 style="color: var(--neo-white-600);"><br />SEU NÚMERO DE PROTOCOLO É</h6>` +
        `<h4 style="color: var(--neo-light-green);font-weight: bold">${protocolo}</h4>` +
        `<h6><br />Enviaremos o número do protocolo e atualizações sobre o seu pedido via e-mail.</h6>`,
      allowOutsideClick: false,
      width: 980,
      confirmButtonColor: "var(--neo-light-green)"
    });
  }

  alertBackofficeComPosteUrbano(protocolo: string) {
    return Swal.fire({
      html: '<div class="row" style="margin: 5vh 0 5vh 0">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/Alerta.svg">' + '</div>' + '</div>' +
        '<div class="row mb-1">' +
        '<div class="col-12">' +
        '<h3 style="color:var(--neo-orange-100)">ESTAMOS ANALISANDO A SUA SOLICITAÇÃO</h3>' +
        '<br />' +
        '<h6 style="color: var(--neo-white-600);">A análise do seu pedido será realizada pela nossa equipe de atendimento! <p style="color:var(--neo-light-green)><strong>Anote o número de protocolo abaixo para acompanhar o seu pedido!</strong></p></h6>' +
        `<h6 style="color: var(--neo-white-600);">Após aprovada, o prazo para a realização da vistoria é de até <strong>3 dias úteis</strong> e o prazo para a ligação é de até <strong>2 dias úteis</strong> após a vistoria.</h6>` +
        `<h6 style="color: var(--neo-white-600);"><br />SEU NÚMERO DE PROTOCOLO É</h6>` +
        `<h4 style="color: var(--neo-light-green);font-weight: bold">${protocolo}</h4>` +
        `<br />` +
        `<p><strong style="color: var(--neo-pure-red);">POR FAVOR, NÃO FAÇA OUTRA SOLICITAÇÃO ATÉ RECEBER NOSSA DEVOLUTIVA</strong></p>` +
        `<h6>Enviaremos o número do protocolo e atualizações sobre o seu pedido via e-mail.</h6>`,
      allowOutsideClick: false,
      width: 980,
      confirmButtonColor: "var(--neo-light-green)"
    });
  }

  alertBackofficeComPosteRural(protocolo: string) {
    return Swal.fire({
      html: '<div class="row" style="margin: 5vh 0 5vh 0">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/Alerta.svg">' + '</div>' + '</div>' +
        '<div class="row mb-1">' +
        '<div class="col-12">' +
        '<h3 style="color:var(--neo-orange-100)">ESTAMOS ANALISANDO A SUA SOLICITAÇÃO</h3>' +
        '<br />' +
        '<h6 style="color: var(--neo-white-600);">A análise do seu pedido será realizada pela nossa equipe de atendimento! <p style="color:var(--neo-light-green)><strong>Anote o número de protocolo abaixo para acompanhar o seu pedido!</strong></p></h6>' +
        `<h6 style="color: var(--neo-white-600);">Após aprovada, o prazo para a realização da vistoria é de até <strong>5 dias úteis</strong> e o prazo para a ligação é de até <strong>5 dias úteis</strong> após a vistoria.</h6>` +
        `<h6 style="color: var(--neo-white-600);"><br />SEU NÚMERO DE PROTOCOLO É</h6>` +
        `<h4 style="color: var(--neo-light-green);font-weight: bold">${protocolo}</h4>` +
        `<br />` +
        `<p><strong style="color: var(--neo-pure-red);">POR FAVOR, NÃO FAÇA OUTRA SOLICITAÇÃO ATÉ RECEBER NOSSA DEVOLUTIVA</strong></p>` +
        `<h6>Enviaremos o número do protocolo e atualizações sobre o seu pedido via e-mail.</h6>`,
      allowOutsideClick: false,
      width: 980,
      confirmButtonColor: "var(--neo-light-green)"
    });
  }

  alertBackofficeSemPosteUrbano(protocolo: string) {
    return Swal.fire({
      html: '<div class="row" style="margin: 5vh 0 5vh 0">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/Alerta.svg">' + '</div>' + '</div>' +
        '<div class="row mb-1">' +
        '<div class="col-12">' +
        '<h3 style="color:var(--neo-orange-100)">ESTAMOS ANALISANDO A SUA SOLICITAÇÃO</h3>' +
        `<br />` +
        '<h6 style="color: var(--neo-white-600);">A análise do seu pedido será realizada pela nossa equipe de atendimento! <p style="color:var(--neo-light-green)><strong>Anote o número de protocolo abaixo para acompanhar o seu pedido!</strong></p></h6>' +
        `<h6 style="color: var(--neo-white-600);">Após aprovada, o prazo para a realização da vistoria é de até <strong>3 dias úteis</strong> e o prazo para a ligação é de até <strong>2 dias úteis</strong> após a vistoria.</h6>` +
        `<h6 style="color: var(--neo-white-600);"><strong>Observação:</strong> No momento da vistoria, se identificada a necessidade de uma extensão de rede por parte da distribuidora, os prazos para vistoria e ligação serão interrompidos até a realização da extensão da rede no prazo de 30 dias e automaticamente reiniciados.</h6>` +
        `<h6 style="color: var(--neo-white-600);"><br />SEU NÚMERO DE PROTOCOLO É</h6>` +
        `<h4 style="color: var(--neo-light-green);font-weight: bold">${protocolo}</h4>` +
        `<br />` +
        `<p><strong style="color: var(--neo-pure-red);">POR FAVOR, NÃO FAÇA OUTRA SOLICITAÇÃO ATÉ RECEBER A NOSSA DEVOLUTIVA</strong></p>` +
        `<h6>Enviaremos o número do protocolo e atualizações sobre o seu pedido via e-mail.</h6>`,
      allowOutsideClick: false,
      width: 980,
      confirmButtonColor: "var(--neo-light-green)"
    });
  }

  alertBackofficeSemPosteRural(protocolo: string) {
    return Swal.fire({
      html: '<div class="row" style="margin: 5vh 0 5vh 0">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/Alerta.svg">' + '</div>' + '</div>' +
        '<div class="row mb-1">' +
        '<div class="col-12">' +
        '<h3 style="color:var(--neo-orange-100)">ESTAMOS ANALISANDO A SUA SOLICITAÇÃO</h3>' +
        `<br />` +
        '<h6 style="color: var(--neo-white-600);">A análise do seu pedido será realizada pela nossa equipe de atendimento! <p style="color:var(--neo-light-green)><strong>Anote o número de protocolo abaixo para acompanhar o seu pedido!</strong></p></h6>' +
        `<h6 style="color: var(--neo-white-600);">Após aprovada, o prazo para a realização da vistoria é de até <strong>5 dias úteis</strong> e o prazo para a ligação é de até <strong>5 dias úteis</strong> após a vistoria.</h6>` +
        `<h6 style="color: var(--neo-white-600);"><strong>Observação:</strong> No momento da vistoria, se identificada a necessidade de uma extensão de rede por parte da distribuidora, os prazos para vistoria e ligação serão interrompidos até a realização da extensão da rede no prazo de 30 dias e automaticamente reiniciados.</h6>` +
        `<h6 style="color: var(--neo-white-600);"><br />SEU NÚMERO DE PROTOCOLO É</h6>` +
        `<h4 style="color: var(--neo-light-green);font-weight: bold">${protocolo}</h4>` +
        `<br />` +
        `<p><strong style="color: var(--neo-pure-red);">POR FAVOR, NÃO FAÇA OUTRA SOLICITAÇÃO ATÉ RECEBER NOSSA DEVOLUTIVA</strong></p>` +
        `<h6>Enviaremos o número do protocolo e atualizações sobre o seu pedido via e-mail.</h6>`,
      allowOutsideClick: false,
      width: 980,
      confirmButtonColor: "var(--neo-light-green)"
    });
  }

  //======Documents alert area======
  alertAttemptOneDocument(mobile: boolean): void {
      let titulo: string;
      let sub: string;
    if (mobile) {
      titulo = 'NÃO CONSEGUIMOS RECONHECER A FOTO DO DOCUMENTO'
      sub = 'Vamos tentar de novo? Procure um ambiente com boa iluminação e posicione o documento corretamente.'
    } else {
      titulo = 'NÃO CONSEGUIMOS RECONHECER O DOCUMENTO';
      sub = 'Vamos tentar de novo?';
    }
    Swal.fire({

      html: '<div class="row">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/Alerta.svg">' + '</div>' + '</div>' +
        '<div class="row mt-3 mb-3">' + '<div class="col-10 mx-auto">' + `<h3  style="color:var(--neo-orange-100)"> ${titulo} </h3>` +
        `<h6> ${sub} </h6>` + '</div>' +
        '</div>' + '</div>',
      showConfirmButton: true,
      confirmButtonText: "TENTAR NOVAMENTE",
      confirmButtonColor: "var(--neo-white-400)",
      width: 850
    });
  }

  alertAttemptTwoDocument(mobile: boolean): void {
      let titulo: string;
      let sub: string;
    let sub2: string;
    if (mobile) {
      titulo = 'AINDA NÃO CONSEGUIMOS RECONHECER A FOTO DO DOCUMENTO'
      sub = 'Vamos tentar tirar a foto de outro documento com foto?'
      sub2 = 'Procure um ambiente com boa iluminação e posicione o documento corretamente.'
    } else {
      titulo = 'AINDA NÃO CONSEGUIMOS RECONHECER O DOCUMENTO';
      sub = 'Vamos tentar com outro documento?';
      sub2 = 'Você pode enviar o documento no formato .PDF, .JPG, .JPEG ou .PNG.'
    }
    Swal.fire({
      html: '<div class="row">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/Alerta.svg">' + '</div>' + '</div>' +
        '<div class="row mt-3 mb-3">' + '<div class="col-10 mx-auto">' + `<h3  style="color:var(--neo-orange-100)">${titulo}</h3>` +
        `<h6>${sub}</h6>` +
        `<h6>${sub2}</h6>` +
        '</div>' +
        '</div>' + '</div>',
      showConfirmButton: true,
      confirmButtonText: "TENTAR NOVAMENTE",
      confirmButtonColor: "var(--neo-white-400)",
      width: 850
    });
  }

  alertAttemptThreeDocument(mobile: boolean): void {
      let titulo: string;
      let sub: string;
    let sub2: string;
    if (mobile) {
      titulo = 'AINDA NÃO CONSEGUIMOS RECONHECER A FOTO DO DOCUMENTO'
      sub = 'Vamos tentar tirar a foto de outro documento com foto?'
      sub2 = 'Procure um ambiente com boa iluminação e posicione o documento corretamente.'
    } else {
      titulo = 'NÃO ESTAMOS CONSEGUINDO RECONHECER O DOCUMENTO';
      sub = 'Que tal carregar outro tipo de documento?';
      sub2 = 'Você pode enviar o documento no formato .PDF, .JPG, .JPEG ou .PNG.'
    }
    Swal.fire({
      html: '<div class="row">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/Alerta.svg">' + '</div>' + '</div>' +
        '<div class="row mt-3 mb-3">' + '<div class="col-10 mx-auto">' + `<h3  style="color:var(--neo-orange-100)">${titulo}</h3>` +
        `<h6>${sub}</h6>` +
        `<h6>${sub2}</h6>` +
        '</div>' +
        '</div>' + '</div>',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: 'var(--neo-white-400)',
      cancelButtonColor: 'var(--neo-white-400)',
      confirmButtonText: 'TENTAR NOVAMENTE',
      cancelButtonText: 'CARREGAR ARQUIVO',
      width: 850
    });
  }

  alertAttemptFourDocument() {
    return Swal.fire({
      html:
        '<div class="row">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/tick.svg">' + '</div>' + '</div>' +
        '<div class="row mt-3 mb-3">' + '<div class="col-10 mx-auto">' + '<h3  style="color:var(--neo-pure-red)">NÃO CONSEGUIMOS VALIDAR<br/> SEU DOCUMENTO</h3>' +
        '<h6>Para sua segurança, o seu processo será bloqueado,<br /> tente solicitar a ligação nova mais tarde!</h6>' + '</div>' +
        '</div>' + '</div>',
      confirmButtonColor: 'var(--neo-white-400)',
      width: 850
    });
  }

  alertAnexarSemValidar() {
    return Swal.fire({
      html:
        '<div class="row">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/tick.svg">' + '</div>' + '</div>' +
        '<div class="row mt-3 mb-3">' + '<div class="col-10 mx-auto">' + '<h3  style="color:var(--neo-pure-red)">NÃO CONSEGUIMOS IDENTIFICAR<br/> O DOCUMENTO</h3>' +
        '<h6>Nossa equipe irá analisar o documento enviado!</h6>' + '</div>' +
        '</div>' + '</div>',
      confirmButtonColor: 'var(--neo-white-400)',
      width: 850
    });
  }

    alertAttemptCadespInativoDocument() {
    return Swal.fire({
      html:
        '<div class="row">' + '<div class="col-12 mx auto">' +
        '<img src="assets/assetsLN/images/tick.svg">' + '</div>' + '</div>' +
        '<div class="row mt-3 mb-3">' + '<div class="col-10 mx-auto">' + '<h3  style="color:var(--neo-pure-red)">CADESP EM SITUAÇÃO INATIVA</h3>' +
        '<h6>Para solicitar a isenção do ICMS precisamos que nos envie um CADESP com a situação ativa</h6>' + '</div>' +
        '</div>' + '</div>',
      confirmButtonColor: 'var(--neo-white-400)',
      width: 850
    });
  }

    alertDeclaracaoPoste(distancia: string) {
    return Swal.fire({
      title: '<div style="font-size: 25px; color: var(--neo-dark-green); font-weight: bolder !important;"> ATENÇÃO </div>',
      html: '<div align="justify" style="font-size:19px; padding:5px;"><p> Declaro que li e estou ciente de que se o imóvel estiver localizado a mais de ' + distancia + ' metros do poste de energia mais próximo, os prazos de vistoria e ligação do imóvel se iniciarão após a realização de extensão de rede por parte da distribuidora no prazo de 30 dias. </p></div>',

      showCancelButton: false,
      confirmButtonText: 'FECHAR',
      confirmButtonColor: 'var(--neo-white-400)',
      width: 850
    });

  }

  alertCombo() {
    return Swal.fire({
      title: '<div style="font-size: 25px; color: var(--neo-dark-green); font-weight: bolder !important;"> ATENÇÃO </div>',
      html: '<div align="justify" style="font-size:14px; padding:5px;">' +
        'Estou ciente de que possuo as informações necessárias para o preparo do padrão de entrada do meu imóvel de acordo com o combo escolhido.</p></div>',

      showCancelButton: false,
      confirmButtonText: 'FECHAR',
      confirmButtonColor: 'var(--neo-white-400)',
      width: 850
    });

  }

    alertDocumentosValidosComprovanteEnd(): Promise<SweetAlertResult> {
    let messageAviso = '<h3  style="color:var(--neo-orange-100)">NÃO ENCONTRAMOS O CEP NO NOSSO SISTEMA</h3>\n<br/> Precisamos que nos envie um comprovante de endereço do imóvel:\n';

    return Swal.fire({
      // type: 'info',
      html: '<div class="row"><div class="col-10 offset-1 mb-4"><img src="assets/assetsLN/images/Alerta.svg"></div></div>' +
        messageAviso +
        '<div class="textoDodc" style="text-align: left; padding-left:15%"> <br/>  <ul><li>IPTU</li> <li>ITR/IPTR</li> <li>INCRA</li> <li>DIM</li> <li>DAM</li> <li>Escritura do Imóvel</li> <li>Declaração da Prefeitura</li></ul></div>',
      confirmButtonColor: 'var(--neo-light-green)',
      width: 850
    }).then();
  }

  alertRuaSemCepDefinido(): Promise<SweetAlertResult> {
    let messageAviso = '<h3  style="color:var(--neo-orange-100)">PRECISAMOS DE UM COMPROVANTE DE ENDEREÇO</h3>\n<br/> Precisamos que nos envie um comprovante de endereço do imóvel:\n';

    return Swal.fire({
      // type: 'info',
      html: '<div class="row"><div class="col-10 offset-1 mb-4"><img src="assets/assetsLN/images/Alerta.svg"></div></div>' +
        messageAviso +
        '<div class="textoDodc" style="text-align: left; padding-left:15%"> <br/>  <ul><li>IPTU</li> <li>ITR/IPTR</li> <li>INCRA</li> <li>DIM</li> <li>DAM</li> <li>Escritura do Imóvel</li> <li>Declaração da Prefeitura</li></ul></div>',
      confirmButtonColor: 'var(--neo-light-green)',
      width: 850
    }).then();
  }

  alertAnaliseComprovanteEndereco() {
    return Swal.fire({
      html: '<div class="row">' +
        '<div class="col-12 mx-auto mt-4">' +
        '<img style="width: 20%" src="assets/assetsLN/images/certo.svg">' +
        '</div>' +
        '<div style="font-size: 18px; color: var(--neo-dark-green); font-weight: bolder !important;"> <br> <h4> DOCUMENTO EM ANÁLISE <br></h4></div>' +
        '</div>' +
        '<p> Um membro da nossa equipe irá analisar o comprovante de endereço enviado para cadastrar o seu endereço em nosso sistema. </p>' +
        '<p> Assim que sua solicitação de ligação nova for aprovada você receberá um e-mail de confirmação da nossa equipe. </p>',

      confirmButtonText: 'OK',
      confirmButtonColor: 'var(--neo-light-green)',
      width: 850,

    })
  }

  alertDocumentoEstrangeiro() {
    return Swal.fire({
      html: '<div class="row">' +
        '<div class="col-12 mx-auto mt-4">' +
        '<img src="assets/assetsLN/images/tick.svg">' +
        '</div>' +
        '<div style="font-size: 18px; color: var(--neo-pure-red); font-weight: bolder !important;"> <br> <h4> AVISO AOS ESTRANGEIROS <br></h4></div>' +
        '</div>' +
        '<p style="font-size:smaller"> Infelizmente ainda não estamos aceitando o documento RNE para solicitações online do Ligação Nova. <br> Para solicitar a sua ligação nova,<a rel="noopener" target="_blank" href="https://www.neoenergiaelektro.com.br/fale-com-a-gente/canais-de-atendimento"> clique aqui</a> e consulte o nosso atendimento presencial. </p>',
      confirmButtonText: 'Fechar',
      confirmButtonColor: 'var(--neo-white-400)',
      width: 850,

    })
  }

  alertCameraBloqueada(): Promise<SweetAlertResult> {
    let messageAviso = 'Para autorizar o uso da webcam, por favor vá na área de configuração do seu navegador:';

    return Swal.fire({
      // type: 'info',
      html: '<div class="row"><div class="col-10 offset-1 mb-4"><img src="assets/assetsLN/images/Alerta.svg"></div></div>' +
        messageAviso +
        '<div class="textoDodc" style="text-align: left; padding-left:5%"> <br/><ul><li><b>Google Chorme</b>: Clique em "Segurança e privacidade" e depois em "Configurações do site" procure por Câmera e remova o site da lista.</li><br> <li><strong>Mozilla Firefox</strong>: Clique em "Privacidade e segurança" e depois procure por Permissões por fim clique em Câmera e remove o site da lista.</li><br> <li><b>Microsoft Edge</b>: Clique em "Cookies e permissões de site" procure por Câmera e remove o site da lista.</li></ul></div>',
      confirmButtonColor: 'var(--neo-light-green)',
      width: 850
    }).then();
  }


}
