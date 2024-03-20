import { Injectable } from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class TrocaDeTitularidadeService {

	titular!: string;
	imovel: boolean = false;
	documentoProcuracao!: string;
	documentoFoto: boolean = false;
	dadosTitular: boolean = false;
	confirmarTela: boolean = false;
	solicitacaoEnviada: boolean = false;

	dadosCliente: any;
	breadCrumbsTroca: boolean = true;

	/*
		↓↓↓ Stepper Session ↓↓↓
	*/

	stepsNovoTitular: any = [
		{
			step: "Dados do Imóvel", current: true, done: false
		},
		{
			step: "Dados Pessoais", current: false, done: false
		},
		{
			step: "Características", current: false, done: false
		},
		{
			step: "Fatura", current: false, done: false
		},
		{
			step: "Geração", current: false, done: false
		},
		{
			step: "Concluído", current: false, done: false
		},
	];

	stepsAntigoTitular: any = [
		{
			step: "Dados do Imóvel", current: true, done: false
		},
		{
			step: "Dados Pessoais", current: false, done: false
		},
		{
			step: "Contatos", current: false, done: false
		},
		{
			step: "Geração", current: false, done: false
		},
		{
			step: "Concluído", current: false, done: false
		},
	];


	constructor() {
		this.getDadosCliente();
	}

	get breadCrumbTroca() {
		return this.breadCrumbsTroca;
	}

	set breadCrumbTroca(breadcrumb) {
		this.breadCrumbsTroca = breadcrumb;
	}

	/*
		↓↓↓ Guard Session ↓↓↓
	*/

	setTitular() {
		return this.titular;
	}

	setImovel() {
		return this.imovel;
	}

	setDocumentoProcuracao() {
		return this.documentoProcuracao;
	}

	setDocumentoFoto() {
		return this.documentoFoto;
	}

	setDadosTitular() {
		return this.dadosTitular;
	}

	setConfirmarTela() {
		return this.confirmarTela;
	}

	setSolicitacaoEnviada() {
		return this.solicitacaoEnviada;
	}


	/*
		↓↓↓ NavExtra Session ↓↓↓
	*/

	dadosAntigo(trocaNavExtra: any) {
		let dados: any;
		if (trocaNavExtra.state.contatoNovoTitular.email !== '' || trocaNavExtra.state.contatoNovoTitular.email == null) {
			dados = [
				{
					"label": "Unidade consumidora",
					"data": trocaNavExtra.state.ucImovel,
				},
				{
					"label": "Data de entrega",
					"data": "17/09/2021", //Definir com Derikys
				},
				{
					"label": "Nome do novo titular",
					"data": trocaNavExtra.state.dadosUsuario.nome,
				},
				{
					"label": "CPF",
					"data": trocaNavExtra.state.dadosUsuario.cpf,
				},
				{
					"label": "RG",
					"data": trocaNavExtra.state.dadosUsuario.rg,
				},
				{
					"label": "E-mail para contato",
					"data": trocaNavExtra.state.contatoNovoTitular.email,
				},
				{
					"label": "Telefone para contato",
					"data": trocaNavExtra.state.contatoNovoTitular.telefone,
				},
			]
		} else {
			dados = [
				{
					"label": "Unidade consumidora",
					"data": trocaNavExtra.state.ucImovel,
				},
				{
					"label": "Data de entrega",
					"data": "17/09/2021", //Definir com Derikys
				},
				{
					"label": "Nome do novo titular",
					"data": trocaNavExtra.state.dadosUsuario.nome,
				},
				{
					"label": "CPF",
					"data": trocaNavExtra.state.dadosUsuario.cpf,
				},
				{
					"label": "RG",
					"data": trocaNavExtra.state.dadosUsuario.rg,
				},
				{
					"label": "Telefone para contato",
					"data": trocaNavExtra.state.contatoNovoTitular.telefone,
				},
			]
		}
		return dados;
	}

	dadosConfirmarNavExtraAntigo(trocaNavExtra: any) {
		return [
			{
				label: "Unidade consumidora",
				data: trocaNavExtra.state.ucImovel,
			},
			{
				label: "Data de entrada",
				data: "17/09/2021", //Definir com Derikys
			},
			{
				label: "Nome do novo titular",
				data: trocaNavExtra.state.dadosUsuario.nome,
			},
			{
				label: "CPF",
				data: trocaNavExtra.state.dadosUsuario.cpf,
			},
			{
				label: "RG",
				data: trocaNavExtra.state.dadosUsuario.rg,
			},
			{
				label: "E-mail para contato",
				data: trocaNavExtra.state.contatoNovoTitular.email,
				"rota": "/servicos/troca-de-titularidade/antigo-titular/contato-novo-titular",
				navExtra: trocaNavExtra,
			},
			{
				label: "Telefone para contato",
				data: trocaNavExtra.state.contatoNovoTitular.telefone,
				"rota": "/servicos/troca-de-titularidade/antigo-titular/contato-novo-titular",
				navExtra: trocaNavExtra,
			},
		]
	}

	definirNavExtraConfirmacaoAntigo(trocaNavExtra: any) {
		return {
			queryParams: {
				"protocolo": "123456789",
				"titulo": "Sua solicitação foi enviada para análise!",
				"tituloH4": "DADOS",
				"solicitacaoTipo": "Troca de titularidade",
				"infos": this.dadosAntigo(trocaNavExtra),
				"textos": true,
				"aviso": true,
				"avisoContent": "O novo titular está sendo notificado da troca por meio dos canais digitias"
			},
		}
	}

	criaTextoSolicitacaoAntigo() {
		return {
			queryParams: {
				"textos": [
					{
						texto: "Quando terminar sua análise enviaremos para o seu e-mail",
					},
				]
			}
		}
	}

	dadosConfirmarNavExtra(trocaNavExtra: any) {
		let dadosConfirmacao
		if (trocaNavExtra.state.dadosFatura.debitoAutomatico.numeroBanco) {
			dadosConfirmacao = [
				{
					label: trocaNavExtra.state.ucImovel ? "Unidade Consumidora" : "Número do medidor",
					data: trocaNavExtra.state.ucImovel ? trocaNavExtra.state.ucImovel : trocaNavExtra.state.numeroDoMedidor,
				},
				{
					label: "Data de entrada",
					data: "17/09/2021",
				},
				{
					label: "Perfil de ligação",
					data: "Comercial",
				},
				{
					label: "Categoria de ligação",
					data: "Bifásico",
				},
				{
					label: "Tarifa",
					data: "Convencional",
				},
				{
					label: "Fatura digital",
					data: this.verificaFaturaDigital(trocaNavExtra),
					"rota": "/servicos/troca-de-titularidade/novo-titular/cadastrar-fatura-digital",
					navExtra: trocaNavExtra,
				},
				{
					label: "Data certa",
					data: trocaNavExtra.state.dadosFatura.dataCerta ? trocaNavExtra.state.dadosFatura.dataCerta : "Não cadastrada",
					"rota": "/servicos/troca-de-titularidade/novo-titular/cadastrar-data-certa",
					navExtra: trocaNavExtra,
				},
				{
					label: "Banco",
					data: trocaNavExtra.state.dadosFatura.debitoAutomatico.nomeCompletoBanco,
					"rota": "/servicos/troca-de-titularidade/novo-titular/dados-debito-automatico",
					navExtra: trocaNavExtra,
				},
				{
					label: "Agência",
					data: trocaNavExtra.state.dadosFatura.debitoAutomatico.agencia,
					"rota": "/servicos/troca-de-titularidade/novo-titular/dados-debito-automatico",
					navExtra: trocaNavExtra,
				},
				{
					label: "Conta Corrente",
					data: trocaNavExtra.state.dadosFatura.debitoAutomatico.conta,
					"rota": "/servicos/troca-de-titularidade/novo-titular/dados-debito-automatico",
					navExtra: trocaNavExtra,
				},
			]
		} else {
			dadosConfirmacao = [
				{
					label: trocaNavExtra.state.ucImovel ? "Unidade Consumidora" : "Número do medidor",
					data: trocaNavExtra.state.ucImovel ? trocaNavExtra.state.ucImovel : trocaNavExtra.state.numeroDoMedidor,
				},
				{
					label: "Data de entrada",
					data: "17/09/2021",
				},
				{
					label: "Perfil de ligação",
					data: "Comercial",
				},
				{
					label: "Categoria de ligação",
					data: "Bifásico",
				},
				{
					label: "Tarifa",
					data: "Convencional",
				},
				{
					label: "Fatura digital",
					data: this.verificaFaturaDigital(trocaNavExtra),
					"rota": "/servicos/troca-de-titularidade/novo-titular/cadastrar-fatura-digital",
					navExtra: trocaNavExtra,
				},
				{
					label: "Data certa",
					data: trocaNavExtra.state.dadosFatura.dataCerta ? trocaNavExtra.state.dadosFatura.dataCerta : "Não cadastrada",
					"rota": "/servicos/troca-de-titularidade/novo-titular/cadastrar-data-certa",
					navExtra: trocaNavExtra,
				},
				{
					label: "Débito automático",
					data: "Não cadastrado",
					"rota": "/servicos/troca-de-titularidade/novo-titular/dados-debito-automatico",
					navExtra: trocaNavExtra,
				},
			]
		}


		return dadosConfirmacao;
	}

	definirNavExtraConfirmacaoNovo(trocaNavExtra : any) {

		if (trocaNavExtra.state.dadosFatura.debitoAutomatico.numeroBanco) {
			return {
				queryParams: {
					"protocolo": "123456789",
					"titulo": "Sua solicitação foi enviada para análise!",
					"tituloH4": "DADOS",
					"solicitacaoTipo": "Troca de titularidade",
					"infos": [
						{
							"label": trocaNavExtra.state.ucImovel ? "Unidade consumidora" : "Número do medidor",
							"data": trocaNavExtra.state.ucImovel ? trocaNavExtra.state.ucImovel : trocaNavExtra.state.numeroDoMedidor,
						},
						{
							"label": "Data de entrada",
							"data": "17/09/2021", //Definir com Derikys
						},
						{
							"label": "CPF",
							"data": this.dadosCliente.documento,
						},
						{
							"label": "Data de nascimento",
							"data": this.dadosCliente.dataNascimento,
						},
						{
							"label": "RG",
							"data": this.dadosCliente.docSecundario,
						},
						{
							"label": "E-mail para contato",
							"data": "kelly@br.ey.com",
						},
						{
							"label": "Telefone para contato",
							"data": this.dadosCliente.telefone,
						},
						{
							"label": "Fatura digital",
							"data": this.verificaFaturaDigital(trocaNavExtra)
						},
						{
							"label": "Data certa",
							"data": trocaNavExtra.state.dadosFatura.dataCerta ? trocaNavExtra.state.dadosFatura.dataCerta : "Não cadastrada"
						},
						{
							label: "Banco",
							data: trocaNavExtra.state.dadosFatura.debitoAutomatico.nomeCompletoBanco,
						},
						{
							label: "Agência",
							data: trocaNavExtra.state.dadosFatura.debitoAutomatico.agencia,
						},
						{
							label: "Conta Corrente",
							data: trocaNavExtra.state.dadosFatura.debitoAutomatico.conta,
						},
					],
					"textos": true,
					"aviso": true,
					"avisoContent": "O titular antigo já foi notificado da pendência existente no imóvel"
				},
			}
		} else {
			return {
				queryParams: {
					"protocolo": "123456789",
					"titulo": "Sua solicitação foi enviada para análise!",
					"solicitacaoTipo": "Troca de titularidade",
					"infos": [
						{
							"label": trocaNavExtra.state.ucImovel ? "Unidade consumidora" : "Número do medidor",
							"data": trocaNavExtra.state.ucImovel ? trocaNavExtra.state.ucImovel : trocaNavExtra.state.numeroDoMedidor,
						},
						{
							"label": "Data de entrada",
							"data": "17/09/2021", //Definir com Derikys
						},
						{
							"label": "CPF",
							"data": this.dadosCliente.documento,
						},
						{
							"label": "Data de nascimento",
							"data": this.dadosCliente.dataNascimento,
						},
						{
							"label": "RG",
							"data": this.dadosCliente.docSecundario,
						},
						{
							"label": "E-mail para contato",
							"data": "kelly@br.ey.com",
						},
						{
							"label": "Telefone para contato",
							"data": this.dadosCliente.telefone,
						},
						{
							"label": "Fatura digital",
							"data": this.verificaFaturaDigital(trocaNavExtra)
						},
						{
							"label": "Data certa",
							"data": trocaNavExtra.state.dadosFatura.dataCerta ? trocaNavExtra.state.dadosFatura.dataCerta : "Não cadastrada"
						},
						{
							"label": "Débito automático",
							"data": "Não cadastrado",
						},
					],
					"textos": true,
					"aviso": true,
					"avisoContent": "O titular antigo já foi notificado da pendência existente no imóvel"
				},
			}
		}
	}

	criaTextoSolicitacao() {
		return {
			queryParams: {
				"textos": [
					{
						titulo: "Fatura final do antigo titular",
						texto: "Verificamos que a data de fechamento foi no dia (13/04), foi gerada uma fatura proporcional para o antigo titular no valor de R$ 15 referente aos dias de uso de energia do imóvel",
						titleText: "BAIXAR",
						btnBaixar: true
					},
				]
			}
		}
	}

	verificaFaturaDigital(trocaNavExtra: any): string {
		if (trocaNavExtra.state.dadosFatura.whatsApp && trocaNavExtra.state.dadosFatura.whatsApp !== '') {
			return trocaNavExtra.state.dadosFatura.whatsApp;
		} else if (trocaNavExtra.state.dadosFatura.email && trocaNavExtra.state.dadosFatura.email !== '') {
			return trocaNavExtra.state.dadosFatura.email;
		} else {
			return 'Não cadastrada';

		}
	}

	//TODO: MOCKADO RETIRAR AO REALIZAR INTEGRAÇÃO
	getDadosCliente() {
		this.dadosCliente = {
			nome: "Kelly Macagi",
			documento: "99999999999",
			docSecundario: "654893245",
			dataNascimento: "1992-08-31",
			telefone: "19940028922",
			celular: "79994011272",
			ucs: [
				{
					uc: '9876543',
					logradouro: 'Logradouro',
					numero: '0000',
					complemento: '',
					bairro: 'URBANO',
					cidade: 'AGUAÍ',
					estado: 'SP',
					cep: '13500-000'
				}
			]
		};
	}

}




