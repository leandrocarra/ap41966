import { Injectable } from '@angular/core';
import { Anexo, Anexos } from '../../models/anexo/anexo';
import { DadosDaLigacao, DimensionamentoDeRede, Equipamento, tipoCategoria } from '../../models/dados-da-ligacao/dados-da-ligacao';

type tipoDimensionamento = "CALCULADORA" | "COMBO" | "CATEGORIA";
@Injectable({
	providedIn: 'root'
})
export class DadosDaLigacaoService {
	public dadosDaLigacao: DadosDaLigacao;
	public equipamentos: Array<Equipamento>;
	public equipamentosCalculadora: Array<any>;
	public potencia: number;
	public codigoFase: string;
	public codigoTipoDisjuntor: string;
	public tensaoFornecimentoMaxima: string;
	public tensaoFornecimentoMinima: string;
	public anexos: Anexos;
	public tentativasArt: number;
	public tipoDimensionamento: tipoDimensionamento;
	private documentoComFotoTarifaSocialValidado: boolean = false;

	constructor() {
        this.dadosDaLigacao = new DadosDaLigacao();
		this.anexos = new Anexos();
		this.tentativasArt = 0;
		this.equipamentos = [];
		this.equipamentosCalculadora = [];
        this.potencia = 0;
        this.codigoFase = '';
        this.codigoTipoDisjuntor = '';
        this.tensaoFornecimentoMaxima = '';
        this.tensaoFornecimentoMinima = '';
        this.tipoDimensionamento = 'CALCULADORA';
	}

	checkArt(): boolean {
		if (this.anexos.art.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	tentativaArt() {
		this.tentativasArt++;
	}

	set isencaoICMS(value: boolean) {
		this.dadosDaLigacao.desejaIsencaoICMS = value;
	}

	definirDimensionamentoDeRede(tipo: tipoDimensionamento, categoria: tipoCategoria, equipamentos: Array<Equipamento>, potencia: number) {
		this.tipoDimensionamento = tipo;
		this.dadosDaLigacao.categoria = categoria;
		this.equipamentos = equipamentos;
		this.potencia = potencia;
		this.deParaDadosCalculadora();
	}

	get getCategoria(): tipoCategoria {
		return this.dadosDaLigacao.categoria;
	}

	//Refatorar para setPoste pós deploy 4.0.0
	set poste(poste: string) {
		this.dadosDaLigacao.distanciaPoste = poste;
	}

	set setDesmembrado(value: string) {
		this.dadosDaLigacao.questionarioRural.desmembrado = value;
	}

	get getDesmembrado(): string {
		return this.dadosDaLigacao.questionarioRural.desmembrado;
	}

	set setCombo(combo: any) {
		this.dadosDaLigacao.combo = combo;
		this.deParaDadosCalculadora();
	}

	set setAnexoART(doc: Array<Anexo>) {
		this.anexos.art = doc;
	}

	set setDimensionamentoDeRede(infos: DimensionamentoDeRede) {
		this.dadosDaLigacao.dimensionamentoDeRede = infos;
		this.deParaDadosCalculadora();
	}

	set setTarifa(tarifa: string) {
		this.dadosDaLigacao.tarifa = tarifa;
	}

	get getTarifa(): string {
		return this.dadosDaLigacao.tarifa;
	}

	set checarDocumentoART(value: boolean) {
		this.dadosDaLigacao.checarDocumentoART = value;
	}

	get getItensPropriedade() {
		let content: string = '';

		if (this.dadosDaLigacao.questionarioRural.propriedade.nenhum) {
			content = content + 'Nenhum Desses ';
		} else if (this.dadosDaLigacao.questionarioRural.propriedade.casa) {
			content = content + 'Casa ';
		} else if (this.dadosDaLigacao.questionarioRural.propriedade.cerca) {
			content = content + 'Cerca ';
		} else if (this.dadosDaLigacao.questionarioRural.propriedade.muro) {
			content = content + 'Muro ';
		} else if (this.dadosDaLigacao.questionarioRural.propriedade.barracao) {
			content = content + 'Barracao ';
		} else if (this.dadosDaLigacao.questionarioRural.propriedade.poco) {
			content = content + 'Poco ';
		}
		return content;
	}

	get getItensProxPropriedade() {
		let content: string = '';
		if (this.dadosDaLigacao.questionarioRural.proxPropriedade.nenhum) {
			content = content + 'Nenhum Desses Próximo ';
		} else if (this.dadosDaLigacao.questionarioRural.proxPropriedade.corrego) {
			content = content + 'Corrego ';
		} else if (this.dadosDaLigacao.questionarioRural.proxPropriedade.acude) {
			content = content + 'Acude ';
		} else if (this.dadosDaLigacao.questionarioRural.proxPropriedade.rodovia) {
			content = content + 'Rodovia ';
		} else if (this.dadosDaLigacao.questionarioRural.proxPropriedade.ferrovia) {
			content = content + 'Ferrovia ';
		}
		return content;
	}

	set setDocumentoComFotoTarifaSocialValidado(dados: boolean) {
		this.documentoComFotoTarifaSocialValidado = dados;
	}

	get getDocumentoComFotoTarifaSocialValidado(): boolean {
		return this.documentoComFotoTarifaSocialValidado
	}

	deParaDadosCalculadora() {
		this.codigoFase = this.dadosDaLigacao.categoria.substring(0, 2);
		this.tensaoFornecimentoMinima = '127';
		this.tensaoFornecimentoMaxima = this.dadosDaLigacao.categoria != 'MONOFÁSICA' ? '220' : ''
		this.codigoTipoDisjuntor = this.getTipoDisjuntor(this.potencia);
	}

	getTipoDisjuntor(potencia: number): string {
		let tipoDisjuntor = '';
		if (potencia <= 25000) {
			tipoDisjuntor = '63';
		} else if (potencia > 25000 && potencia < 38100) {
			tipoDisjuntor = '100';
		} else if (potencia >= 38100 && potencia < 54100) {
			tipoDisjuntor = '150';
		} else if (potencia >= 54100) {
			tipoDisjuntor = '200';
		}
		return tipoDisjuntor;
	}
}
