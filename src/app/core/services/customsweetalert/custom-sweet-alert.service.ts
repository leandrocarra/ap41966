import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PathCompleto } from "app/core/enums/servicos";
import Swal, { SweetAlertResult } from 'sweetalert2';
import { UserService } from "../user/user.service";


@Injectable({
	providedIn: "root",
})
export class CustomSweetAlertService {
	groupColor: string;

	constructor(
		public user: UserService,
		private _router: Router,
	) {
		this.groupColor = (this.user.group === 'A') ? '#00A443' : '#00A443';
	}

	alertSuccess(message: string): void {
		Swal.fire({
			icon: "success",
			title: message,
		});
	}

	alertWarningWithText(title: string, message: string): Promise<SweetAlertResult> {
		return Swal.fire({
			html: `
			<div><img src="assets/images/tick.svg"></div>
			<h3  style="color:#e33c4f">${title.toUpperCase()}</h3>
			${message}
			`,
			confirmButtonColor: this.groupColor,
		}).then();
	}

	alertCamera(message: string): Promise<SweetAlertResult> {
		return Swal.fire({
			html: '<div class="row"><div class="col-8 mx-auto mb-4"><img src="assets/images/Alerta.svg" /></div></div>' + message,
			// confirmButtonColor: '#00A443'
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonColor: '#cecece',
			cancelButtonColor: '#d33',
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: 'SAIR',
		}).then();
	}

	alertSelfieInstrucoes() {

		return Swal.fire({
			html: '<div class="row">' + '<div class="col-12 mx auto mx auto">' +
				'<mat-icon><span class="material-icons-outlined" style="font-size: 126px; color: ' + this.groupColor + '; margin-bottom: 20px">check_circle_outline</span></mat-icon>' + '</div>' + '</div>' +
				'<div class="row mt-3 mb-3">' + '<div class="col-12">' + '<h3 style="color:#00A443">PARA UMA BOA SELFIE, POSICIONE O SEU ROSTO NO QUADRO</h3>'
				+ '</div>' + '</div>',
			showConfirmButton: true,
			confirmButtonText: "CONTINUAR",
			confirmButtonColor: "#00A443",
			width: 850
		});
	}

	alertExcluirGrupo() {
		return Swal.fire({
			html:
				'<mat-icon><span class="material-icons-outlined" style="font-size: 126px; color: ' + this.groupColor + '; margin-bottom: 20px">attach_email</span></mat-icon>' +
				'<h4 style="color: #707070;font-weight: bold;margin: auto;" class="col-8">Tem certeza que deseja excluir o grupo da fatura múltipla?</h4>' +
				'<p style="color: #707070; margin-top: 20px; font-weight: normal;">Caso o grupo seja excluído, o cliente receberá todas as faturas separadas de acordo com a unidade consumidora no endereço e data de vencimento de acordo com a norma.</p>',
			allowOutsideClick: false,
			width: 700,
			cancelButtonText: "SIM",
			confirmButtonText: "NÃO",
			confirmButtonColor: '#707070',
			cancelButtonColor: this.groupColor,
			showCancelButton: true,
			focusCancel: false
		});
	}

	alertRemoverUc(uc: any) {
		return Swal.fire({
			html:
				'<mat-icon><span class="material-icons-outlined" style="font-size: 126px; color: ' + this.groupColor + '; margin-bottom: 20px">attach_email</span></mat-icon>' +
				'<h4 style="color: #707070;font-weight: bold;margin: auto;" class="col-10">Tem certeza que deseja remover a unidade consumidora ' + uc + ' da fatura múltipla?</h4>' +
				'<p style="color: #707070; margin-top: 20px; font-weight: normal;">Caso a unidade seja removida, o cliente receberá todas as faturas separadas de acordo com a unidade consumidora no endereço e data de vencimento de acordo com a norma.</p>',
			allowOutsideClick: false,
			width: 700,
			cancelButtonText: "SIM",
			confirmButtonText: "NÃO",
			confirmButtonColor: '#707070',
			cancelButtonColor: this.groupColor,
			showCancelButton: true,
			focusCancel: false
		});
	}

	ucRemovida() {
		return Swal.fire({
			html:
				'<mat-icon><span class="material-icons-outlined" style="font-size: 126px; color: ' + this.groupColor + '; margin-bottom: 20px">check_circle</span></mat-icon>' +
				'<h4 style="color: #707070;font-weight: bold;margin: auto;" class="col-10">Unidade Removida</h4>' +
				'<p style="color: #707070;margin: 20px auto;font-weight: normal;" class="col-8">Acesse as unidades consumidoras pertencentes a esse grupo que foi excluído para realizar o cadastro no débito automático e escolher uma data boa.</p>',
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: "FECHAR",
			confirmButtonColor: this.groupColor,
		});
	}

	grupoExcluido() {
		return Swal.fire({
			html:
				'<mat-icon><span class="material-icons-outlined" style="font-size: 126px; color: ' + this.groupColor + '; margin-bottom: 20px">check_circle</span></mat-icon>' +
				'<h4 style="color: #707070;font-weight: bold;margin: auto;" class="col-8">Fatura múltipla excluída</h4>' +
				'<p style="color: #707070;margin: 20px auto;font-weight: normal;" class="col-8">Acesse as unidades consumidoras pertencentes a esse grupo que foi excluído para realizar o cadastro no débito automático e escolher uma data boa.</p>',
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: "FECHAR",
			confirmButtonColor: this.groupColor,
		});
	}


	alertDirecionamentoDePagamento(mensagem: string) {
		return Swal.fire({
			html:
				'<mat-icon><span class="material-icons-outlined" style="font-size: 126px; color: ' + this.groupColor + '; margin-bottom: 20px">schedule</span></mat-icon>' +
				'<h4 style="color: #707070;font-weight: bold;margin: auto;" class="col-12 col-md-8">' + mensagem + '</h4>' +
				'<p style="color: #707070; margin-top: 20px; font-weight: normal;">Aguarde, por favor. :)</p>',
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: "FECHAR",
			confirmButtonColor: this.groupColor,

		});
	}

	alertAnaliseAutoLeitura(mensagemAnaliseLeitura: string) {
		return Swal.fire({
			html: `<h5 class="mt-3" style="color: #232323"><strong>Sua Autoleitura será analisada.</br>
			Deseja prosseguir com a solicitação?</strong>
			</h5>
			<div class="mt-3 me-3 col-md-10 col-12 mx-auto">
			<p style=" color: #615D5A;">${mensagemAnaliseLeitura} </p>
			</div>`,
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: "SIM",
			confirmButtonColor: '#707070',
			showCancelButton: true,
			cancelButtonText: "NÃO",
			cancelButtonColor: this.groupColor

		})
	}

	alertSolicitacaoRegistrada() {
		return Swal.fire({
			html: `<h5 class= "mt-3" style="color: #232323"><strong>Sua solicitação foi registrada!</strong>
			</h5>
			<div class="mt-3 me-3" col-md-10 col-12 mx-auto>
			<p style= "color: #615D5A;">Serão desconsideradas as informações preenchidas para
			faturamento fora do período previsto.</p>
			</div> `,
			allowOutsideClick: false,
			width: 700,
			showConfirmButton: false,
			showCancelButton: true,
			cancelButtonText: "FECHAR",
			cancelButtonColor: this.groupColor

		})
	}

	alertCodigoDeBarrasPagamento() {
		return Swal.fire({
			html:
				'<mat-icon><span class="material-icons-outlined" style="font-size: 126px; color: ' + this.groupColor + '; margin-bottom: 20px">check_circle</span></mat-icon>' +
				'<h4 style="color: #707070;font-weight: bold;margin: auto;" class="class="col-12 col-md-8"">Copiado com sucesso!</h4>' +
				'<p style="color: #707070; margin-top: 20px; font-weight: normal; margin: 20px auto auto auto;" class="col-12 col-md-8">Acesse o internet banking e cole o código de barras do boleto no campo indicado no site.</p>' +
				'<p style="color: #707070; margin-top: 20px; font-weight: normal; margin: 20px auto auto auto;" class="col-12 col-md-8">O pedido será cancelado caso o boleto não seja pago até o vencimento.</p>',
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: "FECHAR",
			confirmButtonColor: this.groupColor,
		});
	}

	alertVisualizarFatura(fatura: any): void {
		Swal.fire({
			html:
				'<mat-icon><span class="material-icons-outlined" style="font-size: 126px; color: #D60E00; margin-bottom: 10px;">error_outline</span></mat-icon>' +
				'<h4 style="color: #D60E00;font-weight: bold;margin: auto;" class="col-8">Informações da fatura</h4>' +
				'<div class="col-8" style="text-align: justify;margin: 0 auto 28px auto;">' +
				`<p style="font-weight: 600;font-size: 22px;margin-top: 20px;margin-bottom: 6px;">R$ ${fatura.valor}</p>` +
				'<p style="margin-bottom: 6px;">Número da unidade consumidora: 9********1.</p>' +
				'<p style="margin-bottom: 6px;">Endereço: Av. M**. De****o da F*****a, 1*** C*****o, L******a-**, *****-***.</p>' +
				`<p style="margin-bottom: 6px;">Vencimento: ${fatura.vencimento}.</p>` +
				`<p style="margin-bottom: 6px;">Status: ${fatura.status}.</p>` +
				'</div>' +
				'<div style="margin: auto;" class="col-10">' +
				`<p style="padding: 10px 20px; background-color: ${this.groupColor}; color: #FFF; border-radius: 4px;">${fatura.codigoBarras}</p>` +
				'</div>' +
				'<div class="col-12" style="margin: 20px auto 4px;">' +
				`<button id="copy" class="col-6 col-md-3 btn" style="background-color: ${this.groupColor}; color: #FFF; margin: 5px; border-radius: 26px;">Copiar Código</button>` +
				'</div>' +
				'<span id="toast" style="visibility: hidden; padding: 5px 10px; background-color: ' + this.groupColor + '; color: #FFF; font-weight: normal; border-radius: 4px;">Copiado!</span>' +
				'<h4 style="color: #707070; font-weight: bold; margin: 10px auto auto auto;" class="col-8">Pague com internet banking</h4>' +
				'<p style="color: #707070; margin-top: 20px; font-weight: normal; margin: 20px auto auto auto;" class="col-8">Nos aplicativos, internet banking ou caixas eletrônicos dos bancos conveniados.</p>' +
				"<div>" +
				'<p style="text-align: left; font-weight: bold; margin: 20px auto 20px 20px;">Selecione um dos bancos abaixo ou procure um de sua preferência:</p>' +
				'<div style="display: flex; justify-content: space-evenly; flex-wrap: wrap;">' +
				'<a href="https://www.itau.com.br/" target="_blank" style="display: flex; flex-direction: column; cursor: pointer; text-decoration:none !important;"><img style="width: 100px;" src="assets/images/icons/logo_itau.png"/><span style="font-weight:bold; color: #000;">Itaú</span></a>' +
				'<a href="https://www.santander.com.br/" target="_blank" style="display: flex; flex-direction: column; cursor: pointer; text-decoration:none !important;"><img style="width: 100px;" src="assets/images/icons/logo_stdr.png"/><span style="font-weight:bold; color: #000;">Santander</span></a>' +
				'<a href="https://banco.bradesco/" target="_blank" style="display: flex; flex-direction: column; cursor: pointer; text-decoration:none !important;"><img style="width: 100px;" src="assets/images/icons/logo_bradesco.png"/><span style="font-weight:bold; color: #000;">Bradesco</span></a>' +
				'<a href="https://www.caixa.gov.br/" target="_blank" style="display: flex; flex-direction: column; cursor: pointer; text-decoration:none !important;"><img style="width: 100px;" src="assets/images/icons/logo_caixa.png"/><span style="font-weight:bold; color: #000;">Caixa</span></a>' +
				'<a href="https://www.bb.com.br/" target="_blank" style="display: flex; flex-direction: column; cursor: pointer; text-decoration:none !important;"><img style="width: 100px;" src="assets/images/icons/logo_bb.png"/><span style="font-weight:bold; color: #000;">Banco do Brasil</span></a>' +
				"</div>" +
				"</div>" +
				'<p style="margin: 30px auto auto auto;">O seu pagamento pode ser confirmado em 5 horas se for feito através dos bancos conveniados (Itaú, Santander, Bradesco, Caixa e Banco do Brasil).</p>' +
				'<p style="margin: 30px auto auto auto;">Para os demais bancos, a confirmação será feita em até 72 horas.</p>' +
				'<p style="margin: 30px auto auto auto;">Lembre-se de pagar seu boleto até a data de vencimento original de sua fatura para evitar juros e multas.</p>',
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: "FECHAR",
			confirmButtonColor: this.groupColor,
		});
		document.getElementById("copy")?.addEventListener("click", copyCodigoBarras);
		function copyCodigoBarras() {
			navigator.clipboard.writeText(fatura.codigoBarras);
			document.getElementById('toast')!.style.visibility = "visible";
			setTimeout(() => {
				document.getElementById('toast')!.style.visibility = "hidden";
			}, 1500);
		}
	}

	alertPixIndisponivel() {
		Swal.fire({
			html:
				'<mat-icon><span class="material-icons-outlined" style="font-size: 126px; color: #FF5A00; margin-bottom: 10px;">cancel</span></mat-icon> \
				<h4 style="color: #707070; font-weight: bold; margin: 12px auto 12px auto;" class="col-12 col-md-8">Serviço indisponível no momento</h4> \
				<p style="color: #707070; font-weight: 500; font-size: 18px; margin: 20px auto 20px auto; letter-spacing: 0.36px;" class="col-12 col-md-10">Estamos trabalhando para habilitar o pagamento via PIX</p>',
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: "FECHAR",
			confirmButtonColor: this.groupColor,
		});
	}

	alertConfirmarCancelamento() {

		return Swal.fire({
			html:
				'<h4 style="color: #707070; font-weight: bold; margin: 12px auto 12px auto;" class="col-9">Tem certeza que deseja cancelar esta solicitação?</h4> \
				<p style="color: #707070; font-weight: 500; font-size: 18px; margin: 20px auto 20px auto; letter-spacing: 0.36px;" class="col-10">Todas as informações preenchidas serão perdidas.</p>',
			allowOutsideClick: false,
			width: 700,
			cancelButtonText: "NÃO",
			confirmButtonText: "SIM",
			confirmButtonColor: '#707070',
			cancelButtonColor: this.groupColor,
			showCancelButton: true,
			focusCancel: true
		});
	}

	alertRepresentanteLegal() {
		return Swal.fire({
			html:
				'<h4 style="color: #707070; font-weight: bold; margin: 12px auto 12px auto;" class="col-9">Termo de compromisso - Representante Legal</h4> \
				<p style="color: #707070; font-weight: 500; font-size: 18px; margin: 20px auto 20px auto; letter-spacing: 0.36px;" class="col-10">Declaro que li e estou ciente que apenas o representante legal mencionado em ata, estatuto social, contrato social ou CCMEI pode solicitar uma Ligação Nova para o CNPJ cadastrado no portal do Ligação Nova.</p> \
				<p style="color: #F80B0B; font-weight: 500; font-size: 18px; margin: 20px auto 20px auto; letter-spacing: 0.36px;" class="col-10">ATENÇÃO: Caso você não seja o representante legal, a solicitação de Ligação Nova será recusada e o imóvel não receberá a ligação.</p>',

			allowOutsideClick: false,
			width: 950,
			confirmButtonText: "NÃO SOU O RESPONSÁVEL",
			cancelButtonText: "SOU O RESPONSÁVEL",
			cancelButtonColor: '#00A443',
			confirmButtonColor: '#615D5A',
			showCancelButton: true,
			focusCancel: true
		});
	}




	alertError(message: string): void {
		Swal.fire({
			icon: "error",
			title: message,
		});
	}

	alertInfo(message: string): Promise<SweetAlertResult> {
		return Swal.fire({
			icon: "info",
			title: message,
			confirmButtonColor: '#00A443',
			iconColor:'#FF5A00'
		}).then();
	}

	showLoading() {
		Swal.fire({
			title: 'Carregando',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			}
		});
	}


	closeLoading() {
		Swal.close();
	}

	alertAlteradoSucesso(msg: string, nomeBtn: string = 'FECHAR') {
		return Swal.fire({
			html:
				'<mat-icon><span class="material-icons-outlined" style="font-size: 126px; color: ' + this.groupColor + '; margin-bottom: 20px">check_circle_outline</span></mat-icon>' +
				'<h4 style="color: #707070;font-weight: bold;margin: auto;" class="col-8">' + msg + '</h4>',
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: nomeBtn,
			confirmButtonColor: this.groupColor,
		}).then();
	}

	alertErroRequisicao(mensagem: string): Promise<SweetAlertResult> {
		return Swal.fire({
			html: `<div class="mt-3">
			<img src="assets/images/error_outline_black_24dp_exclamacao.svg">
			</div>
			<h2 class= "mt-3" style="color: #615D5A"><strong>${mensagem}</strong></h2>
		 `,
			allowOutsideClick: false,
			width: 700,
			showConfirmButton: false,
			showCancelButton: true,
			cancelButtonText: "FECHAR",
			cancelButtonColor: this.groupColor
		})

	}


	faltaEnergiaAssistenciaMedica(): Promise<SweetAlertResult> {
		return Swal.fire({
			html:
				`
				<h4 style="color: #707070;font-weight: bold;margin: auto;" class="col-12 mt-5 p-0">
				Estamos priorizando o seu atendimento. Contudo, não podemos garantir que o defeito seja resolvido em tempo hábil e por isso orientamos que encaminhe a pessoa que faz uso do equipamento vital ao hospital ou local de atendimento médico mais próximo.
				</h4>
				<p style="color: #707070;margin: 20px auto;font-weight: normal;" class="col-12">
				Deseja seguir com o registro de Falta de Energia?
				</p>`,
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: "SIM",
			confirmButtonColor: '#707070',
			showCancelButton: true,
			cancelButtonText: "NÃO",
			cancelButtonColor: this.groupColor,
		});
	}

	faltaEnergiaManutencao(horaInclusao: string, horaCombinada: string): Promise<SweetAlertResult> {
		return Swal.fire({
			html:
				`
				<h4 style="color: #707070;font-weight: bold;margin: auto;" class="col-12 mt-5 p-0">
				Estamos realizando uma manutenção na sua região desde as ${horaInclusao}.<br>
				Previsão de finalização: ${horaCombinada}.
				</h4>
				<p style="color: #707070;margin: 20px auto;font-weight: normal;" class="col-12">
				Deseja seguir com o registro de Falta de Energia?
				</p>`,
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: "SIM",
			confirmButtonColor: '#707070',
			showCancelButton: true,
			cancelButtonText: "NÃO",
			cancelButtonColor: this.groupColor,
		});
	}

	faltaEnergiaJaIdentificada(data: string, hora: string): Promise<SweetAlertResult> {
		return Swal.fire({
			html:
				`
				<h4 style="color: #707070;font-weight: bold;margin: auto;"  class="col-12 mt-5">
				Falta de energia já identificada nesta unidade consumidora.
				Previsão de retorno: ${data} às ${hora}.
				</h4>
				<p style="color: #707070;margin: 20px auto;font-weight: normal;" class="col-12">
				Deseja seguir com o registro de Falta de Energia?
				</p>`,
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: "SIM",
			confirmButtonColor: '#707070',
			showCancelButton: true,
			cancelButtonText: "NÃO",
			cancelButtonColor: this.groupColor,
		});
	}


	alertData() {
		return Swal.fire({
			html:
				'<mat-icon><span class="material-icons-outlined" style="font-size: 126px; color: #D60E00; margin-bottom: 10px;">error_outline</span></mat-icon>' +
				'<h4 style="color: #707070;font-weight: bold;margin: auto;" class="col-8">Data final não pode ser menor que a inicial</h4>',
			allowOutsideClick: false,
			width: 500,
			confirmButtonText: "FECHAR",
			confirmButtonColor: this.groupColor,
		}).then();
	}

	//======Alert sefie area======
	alertWarningSelfie() {
		return Swal.fire({
			html: '<div class="row">' + '<div class="col-12 mx auto mx auto">' +
				'<div class="row m-0 mt-3 mb-3">' + '<div class="col-12">' + '<br /><h3 style="font-weight: bolder; color: var(--neo-dark-gray)">NÃO CONSEGUIMOS CONFIRMAR SUA IDENTIDADE!</h3>' + '</div>' +
				'<div class="col-md-4 col-12">' + '<img style="fill: var(--neo-light-green)" src="assets/images/oculos2.svg">' + '</div>' +
				'<div class="col-md-4 col-12">' + '<img style="fill: var(--neo-light-green)" src="assets/images/sol2.svg" >' + '</div>' +
				'<div class="col-md-4 col-12">' + ' <img style="fill: var(--neo-light-green)" src="assets/images/rosto_livre2.svg">' + '</div>'
				+ '</div>',
			allowOutsideClick: false,
			showConfirmButton: true,
			confirmButtonText: "TENTAR NOVAMENTE",
			confirmButtonColor: "#00A443",
			width: 850
		});
	}

	alertTrocaTitularidade(msg: string) {
		return Swal.fire({
			html: '<div class="row">' + '<div class="col-12 mx auto mx auto">' +
				'<div class="row m-0 mt-3 mb-3">' + '<div class="col-12">' + '<br /><h3 style="font-weight: bolder; color: var(--neo-dark-gray)">' + msg + '</h3>',
			allowOutsideClick: false,
			showConfirmButton: true,
			confirmButtonText: "FECHAR",
			confirmButtonColor: this.groupColor,
			width: 850
		});
	}

	alertNaoReconheceDividaTroca() {
		return Swal.fire({
			html: '<div class="row">' + '<div class="col-12 mx auto mx auto">' +
				'<div class="row m-0 mt-3 mb-3">' + '<div class="col-12">' + '<br /><h3 style="font-weight: bolder; color: var(--neo-dark-gray)">' + 'Para realizar a Troca de Titularidade é necessário realizar o pagamento das faturas em aberto' + '</h3>',
			allowOutsideClick: false,
			cancelButtonText: "DESEJO PAGAR",
			confirmButtonText: "CANCELAR SOLICITAÇÃO",
			confirmButtonColor: '#707070',
			cancelButtonColor: this.groupColor,
			showCancelButton: true,
			width: 850
		});
	}


	alertTarifaBranca() {
		return Swal.fire(
			{
				html: '<div align="justify" style="font-size:14px; padding:5px;"><h3 style="text-align: center; font-weight: 500; color: black;">Tem certeza que deseja optar pela tarifa branca?</h3><p style="font-size: 21px; color: #b1adad; font-weight: 400; text-align: center;">Estou ciente que ao optar pela tarifa branca o meu imóvel terá preços diferenciados para os segmentos de ponta, fora de ponta e intermediário, sendo que a configuração de consumo nestes postos horários pode afetar o valor da fatura de energia elétrica.</p></div>',

				showCancelButton: true,
				confirmButtonText: 'NÃO ACEITO',
				confirmButtonColor: '#d33',
				showConfirmButton: true,
				cancelButtonText: 'ACEITO',
				cancelButtonColor: '#00A443',
				allowOutsideClick: false,
				width: 850,

			});
	}

	alertUsuarioComPerfilInativo(): Promise<SweetAlertResult> { // FIXME: Verificar mensagens e textos/ações dos botões corretos.
		return Swal.fire({
			html:
				`
                <img src="assets/images/error_outline_black_24dp_exclamacao.svg" class="mt-3">
				<h4 style="color: #707070;font-weight: bold;margin: auto;" class="col-12 mt-3">
				Usuário com o perfil inativo!
				</h4>
				<p style="color: #707070;margin: 20px auto;font-weight: normal;" class="col-12">
				Deseja reativar o seu cadastro?
				</p>
                `,
			allowOutsideClick: false,
			width: 600,
			confirmButtonText: "SIM",
			confirmButtonColor: this.groupColor,
			showCancelButton: true,
			cancelButtonText: "NÃO",
			cancelButtonColor: '#707070'
		});
	}

	alertConfirmarComCoresInvertidas(titulo: string, subtitulo: string, botaoConfirmar: string, botaoCancelar: string): Promise<SweetAlertResult> {
		return Swal.fire({
			title: titulo,
			text: subtitulo,
			allowOutsideClick: false,
			cancelButtonText: botaoCancelar,
			confirmButtonText: botaoConfirmar,
			cancelButtonColor: this.groupColor,
			showCancelButton: true,
			focusCancel: false,
			customClass: {
				confirmButton: "btn-neo-outline-secondary"
			}
		});
	}

	// Multilogin
	documentacaoEnviadaComSucesso() {
		return Swal.fire({
			html:
				'<mat-icon><span class="material-icons-outlined" style="font-size: 126px; color: ' + this.groupColor + '; margin-bottom: 20px">check_circle</span></mat-icon>' +
				'<h4 style="color: #232323;font-weight: bold;margin: auto;" class="col-8">Documentação enviada para análise.</h4>' +
				'<p style="color: #707070; margin-top: 10px; font-weight: normal;">Você recebrá um e-mail de confirmação<br>assim que a análise for concluída.</p>',
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: "FECHAR",
			confirmButtonColor: this.groupColor,
		}).then();
	}


	alertExcluirVinculo() {
		return Swal.fire({
			html:
				'<h4 style="color: #232323;font-weight: bold;margin: auto;" class="col-8">Tem certeza que deseja excluir este perfil?</h4>' +
				'<p style="color: #707070; margin-top: 10px; font-weight: normal;">Todas as permissões cedidas serão suspensa.</p>',
				allowOutsideClick: false,
				width: 700,
				cancelButtonText: "NÃO",
				confirmButtonText: "SIM",
				confirmButtonColor: '#707070',
				cancelButtonColor: this.groupColor,
				showCancelButton: true,
				focusCancel: true
		}).then();
	}

	alertCadastroRepresentanteLegal(titulo: string, subtitulo: string, botaoCancelar: string, botaoConfirmar: string) {
		return Swal.fire({
				title: titulo,
				text: subtitulo,
				allowOutsideClick: false,
				cancelButtonText: botaoCancelar,
				confirmButtonText: botaoConfirmar,
				confirmButtonColor: '#707070',
				cancelButtonColor: this.groupColor,
				showCancelButton: true,
				focusCancel: true,
				width: 871
			});
	}


	//Alert regilação
	alertUcSemEnergia(): Promise<SweetAlertResult> {
		return Swal.fire({
			html:
				`<h4 style="color: #232323;font-weight: bold;margin: auto;  margin-top: 10px" class="col-12">Sua Unidade Consumidora está sem energia?</h4>`,
			allowOutsideClick: false,
			width: 600,
			confirmButtonText: "SIM",
			confirmButtonColor: this.groupColor,
			showCancelButton: true,
			cancelButtonText: "NÃO",
			cancelButtonColor: '#707070'
		});
	}

	alertFornecimentoDeEnergia() {
		return Swal.fire({
			html:
				`<h4 style="color: #232323; margin-top: 30px; font-weight: bold; class="col-12"">
                Não identificamos em nossos sistemas a informação de uma suspensão de fornecimento de energia para a Unidade Consumidora selecionada.<br>
                Sugerimos verificar o disjuntor interno, da sua casa.<br>
                Você pode entrar em contato nos nossos demais canais de atendimento, lojas presenciais ou Call Center no número 116.</h4>`,
			allowOutsideClick: false,
			width: 700,
			confirmButtonText: "FECHAR",
			confirmButtonColor: this.groupColor,
		}).then((r) => {
			this._router.navigate([PathCompleto.home]);
		});
	}
}
