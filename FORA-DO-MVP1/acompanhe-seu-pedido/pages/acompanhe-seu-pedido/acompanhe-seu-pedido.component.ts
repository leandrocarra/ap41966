import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'app/core/services/user/user.service';
import { PaginationComponent } from 'app/shared/components/pagination/pagination.component';
import { environment } from "@environments/environment";


@Component({
	selector: 'app-acompanhe-seu-pedido',
	templateUrl: './acompanhe-seu-pedido.component.html',
	styleUrls: ['./acompanhe-seu-pedido.component.scss']
})
export class AcompanheSeuPedidoComponent implements OnInit {
	@ViewChild(PaginationComponent, { static: false })
	pagination!: PaginationComponent;

	itens: any = [];
	// CONFIGURAR FLUXO POR AQUI
	itensSE = [
		{
			protocolo: '0578607593',
			procotolos: ["0578607593", "0578607593", "0578607593"],
			descricao: "Desligamento definitivo",
			subDescricao: "10311 - ENCERRAMENTO CONTRATUAL",
			enderecoCompleto: "Av. Marechal Deodoro da Fonseca, sn - Centro, Limeira - SP",
			solicitante: "JOÃO VICENTE",
			conclusaoDesejada: "05 DEZ 2020",
			dataSolicitacao: "29/10/2020",
			ultimaAtualizacao: "01/11/2020",
			situacao: "Realizada",
		},
		{
			protocolo: '058607593',
			descricao: "Negociação de débito",
			procotolos: [""],
			subDescricao: "10311 - encerramento contratual",
			dataSolicitacao: "12/01/2019",
			solicitante: "JOÃO VICENTE",
			ultimaAtualizacao: "12/01/2019",
			situacao: "Em andamento",
			enderecoCompleto: "Av. Marechal Deodoro da Fonseca, sn - Centro, Limeira - SP",
		},
		{
			protocolo: '058607593',
			descricao: "Troca de titularidade",
			procotolos: [""],

			subDescricao: "18989 - TROCA",
			dataSolicitacao: "12/02/2021",
			solicitante: "JOÃO VICENTE",
			ultimaAtualizacao: "12/02/2021",
			situacao: "Rejeitada",
			enderecoCompleto: "Av. Marechal Deodoro da Fonseca, sn - Centro, Limeira - SP",

		},
		{
			protocolo: '058607593',
			descricao: "Cancelar débito automático",
			procotolos: [""],

			subDescricao: "10311 - encerramento contratual",
			enderecoCompleto: "Av. Marechal Deodoro da Fonseca, sn - Centro, Limeira - SP",
			solicitante: "JOÃO VICENTE",
			dataSolicitacao: "12/12/2021",
			ultimaAtualizacao: "12/12/2021",
			situacao: "Concluida",
		},
		{
			protocolo: '058607593',
			descricao: "Falta de energia",
			procotolos: [""],

			subDescricao: "10311 - encerramento contratual",
			enderecoCompleto: "Av. Marechal Deodoro da Fonseca, sn - Centro, Limeira - SP",
			solicitante: "JOÃO VICENTE",
			dataSolicitacao: "12/12/2020",
			ultimaAtualizacao: "13/12/2020",
			situacao: "Cancelada",
		},
	];

	itensNE = [
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Em andamento",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Em andamento",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'Em andamento',
				},
				{
					status: "Realizada",
					done: 'false',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Análise de Projetos",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Finalizada",
				estrutura: "P",
				protocolo: "20210810012333333",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "074 - Estudo de viabilidade",
				situacao: "Finalizada",
				numProtocolo: "20210810012333333",
				protocoloFilho: {
					filho: "2021081001233333F",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Finalizada",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Finalizada",
					done: 'finalizada',
				},
			]
		},
		{
			header: {
				numProtocolo: "999999999",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Em andamento",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Em andamento",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'Em andamento',
				},
				{
					status: "Realizada",
					done: 'false',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Análise de Projetos",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Finalizada",
				estrutura: "P",
				protocolo: "20210810012333333",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "074 - Estudo de viabilidade",
				situacao: "Finalizada",
				numProtocolo: "20210810012333333",
				protocoloFilho: {
					filho: "2021081001233333F",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Finalizada",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Finalizada",
					done: 'finalizada',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Em andamento",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Em andamento",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'Em andamento',
				},
				{
					status: "Realizada",
					done: 'false',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Análise de Projetos",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Finalizada",
				estrutura: "P",
				protocolo: "20210810012333333",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "074 - Estudo de viabilidade",
				situacao: "Finalizada",
				numProtocolo: "20210810012333333",
				protocoloFilho: {
					filho: "2021081001233333F",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Finalizada",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Finalizada",
					done: 'finalizada',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Em andamento",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Em andamento",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'Em andamento',
				},
				{
					status: "Realizada",
					done: 'false',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Análise de Projetos",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Finalizada",
				estrutura: "P",
				protocolo: "20210810012333333",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "074 - Estudo de viabilidade",
				situacao: "Finalizada",
				numProtocolo: "20210810012333333",
				protocoloFilho: {
					filho: "2021081001233333F",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Finalizada",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Finalizada",
					done: 'finalizada',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Em andamento",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Em andamento",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'Em andamento',
				},
				{
					status: "Realizada",
					done: 'false',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Análise de Projetos",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Finalizada",
				estrutura: "P",
				protocolo: "20210810012333333",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "074 - Estudo de viabilidade",
				situacao: "Finalizada",
				numProtocolo: "20210810012333333",
				protocoloFilho: {
					filho: "2021081001233333F",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Finalizada",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Finalizada",
					done: 'finalizada',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Em andamento",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Em andamento",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'Em andamento',
				},
				{
					status: "Realizada",
					done: 'false',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Análise de Projetos",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Finalizada",
				estrutura: "P",
				protocolo: "20210810012333333",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "074 - Estudo de viabilidade",
				situacao: "Finalizada",
				numProtocolo: "20210810012333333",
				protocoloFilho: {
					filho: "2021081001233333F",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Finalizada",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Finalizada",
					done: 'finalizada',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Em andamento",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Em andamento",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'Em andamento',
				},
				{
					status: "Realizada",
					done: 'false',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Análise de Projetos",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Finalizada",
				estrutura: "P",
				protocolo: "20210810012333333",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "074 - Estudo de viabilidade",
				situacao: "Finalizada",
				numProtocolo: "20210810012333333",
				protocoloFilho: {
					filho: "2021081001233333F",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Finalizada",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Finalizada",
					done: 'finalizada',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Em andamento",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Em andamento",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'Em andamento',
				},
				{
					status: "Realizada",
					done: 'false',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Análise de Projetos",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Finalizada",
				estrutura: "P",
				protocolo: "20210810012333333",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "074 - Estudo de viabilidade",
				situacao: "Finalizada",
				numProtocolo: "20210810012333333",
				protocoloFilho: {
					filho: "2021081001233333F",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Finalizada",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Finalizada",
					done: 'finalizada',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Em andamento",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Em andamento",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'Em andamento',
				},
				{
					status: "Realizada",
					done: 'false',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Análise de Projetos",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Finalizada",
				estrutura: "P",
				protocolo: "20210810012333333",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "074 - Estudo de viabilidade",
				situacao: "Finalizada",
				numProtocolo: "20210810012333333",
				protocoloFilho: {
					filho: "2021081001233333F",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Finalizada",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Finalizada",
					done: 'finalizada',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Concluído",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Concluida",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Realizada",
					done: 'true',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Solicitação 2a. Via",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Em andamento",
				estrutura: "P",
				protocolo: "20210810012345678",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "30.1 solicitações - Ligação Nova",
				situacao: "Andamento",
				numProtocolo: "20210810012345678",
				protocoloFilho: {
					filho: "20210810012345679",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Em andamento",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'Em andamento',
				},
				{
					status: "Realizada",
					done: 'false',
				},
			]
		},
		{
			header: {
				numProtocolo: "8005874508",
				tipoSolicitacao: "Análise de Projetos",
				dataSolicitacao: "08/04/2021",
				statusSolicitacao: "Finalizada",
				estrutura: "P",
				protocolo: "20210810012333333",
				retorno: {
					tipo: "S",
					id: "ZCUCS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			detalhes: {
				descricaoNota: "Análise de Projetos - Estudo de viabilidade",
				tipologiaAtendimento: "074 - Estudo de viabilidade",
				situacao: "Finalizada",
				numProtocolo: "20210810012333333",
				protocoloFilho: {
					filho: "2021081001233333F",
				},
				informacoes: {
					solicitante: "JOÃO VICENTE OLIVEIRA",
					datasolicitacao: "08/04/2021",
					enderecoImovel: "AV. BOA VIAGEM 111 - RECIFE - PE",
					conclusaoDesejada: "05/12/2021",
					ultimaAtualizacao: "30/11/2021"
				},
				acompanhamentoDetalhado: {
					statusFluxo: "Finalizada",
					textoFluxo: "Finalizada",
					dataFluxo: "25/12/2021",
					horaFluxo: "23:59"
				},
				retorno: {
					tipo: "S",
					id: "ZCUS",
					numero: "074",
					mensagem: "Ok"
				}
			},
			etapas: [
				{
					status: "Criada",
					done: 'true',
				},
				{
					status: "Em análise",
					done: 'true',
				},
				{
					status: "Finalizada",
					done: 'finalizada',
				},
			]
		},
	];
	pageSize = 5;
	ativarDados: any = [];

	constructor(
		public user: UserService,
	) {
		// this.itens = environment.regiao === "SE" ? this.itensSE : this.itensNE;
		this.itens = this.itensNE;
	}

	ngOnInit(): void {
		this.mostrarDadosPorPagina();
	}

	mostrarDadosPorPagina() {
		this.ativarDados = this.itens.slice(0, this.pageSize);
	}

	eventFilter(event: any) {
		this.ativarDados = event;
		this.pagination.numberPagination(this.ativarDados);
	}

	eventClear(event: any) {
		if (event == true) {
			this.pagination.numberPagination(this.itens);
		}
	}

	eventPagination(event: any) {
		this.ativarDados = event;
	}
}
