import { Injectable } from '@angular/core';
import { tipoCategoria } from '../../models/dados-da-ligacao/dados-da-ligacao';

@Injectable({
	providedIn: 'root',
})
export class CalculadoraUtilsService {
	public equipamentos: any;
	public itensCalculadora: any;
	public itensCombo: any;
	public palavrasArt: Array<string>;
	public monofasicoPadrao: any;
	public bifasicoPadrao: any;
	public trifasicoPadrao: any;
	public itensCategoriaApartamento: any;

	constructor() {
		this.monofasicoPadrao = {
			"codigoAparelho": "1",
			"codigoSubTipoAparelho": "39",
			"codigoTipoAparelho": "1",
			"descricaoSubTipoAparelho": "CARGA PADRÃO MONOFÁSICA",
			"quantidadeAparelho": "1"
		};

		this.bifasicoPadrao = {
			"codigoAparelho": "1",
			"codigoSubTipoAparelho": "40",
			"codigoTipoAparelho": "1",
			"descricaoSubTipoAparelho": "CARGA PADRÃO BIFASICA",
			"quantidadeAparelho": "1"
		}

		this.trifasicoPadrao = {
			"codigoAparelho": "5",
			"codigoSubTipoAparelho": "151",
			"codigoTipoAparelho": "5",
			"descricaoSubTipoAparelho": "APARELHO SOM 25000 WATTS",
			"quantidadeAparelho": "1"
		};

		this.itensCalculadora = {
			"CNPJ": [
				{
					equipamento: "AR-CONDICIONADO",
					class: "ar-condicionado",
					selected: false

				},
				{
					equipamento: "AQUECEDOR CENTRAL",
					class: "aquecedor",
					selected: false
				},
				{
					equipamento: "FORNO",
					class: "forno",
					selected: false
				},
				{
					equipamento: "OUTROS",
					class: "outros",
					selected: false
				},
				{
					equipamento: "RAIO X",
					class: "raiox",
					selected: false
				},
				{
					equipamento: "MÁQUINA DE SOLDA",
					class: "solda",
					selected: false
				},
				{
					equipamento: "MOTORES/BOMBAS",
					class: "motor",
					selected: false
				},
				{
					equipamento: "RESISTÊNCIAS",
					class: "resistencia",
					selected: false
				}


			],
			"CPF": [
				{
					equipamento: "AR-CONDICIONADO",
					class: "ar-condicionado",
					selected: false

				},
				{
					equipamento: "CHUVEIRO ELÉTRICO",
					class: "chuveiro",
					selected: false
				},
				{
					equipamento: "MOTORES/BOMBAS",
					class: "motor",
					selected: false
				},
				{
					equipamento: "OUTROS",
					class: "outros",
					selected: false
				}
			]
		};

		this.equipamentos = {
			'AR-CONDICIONADO': [
				{
					key: '7500BTU',
					value: 900,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '25',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AR CONDICIONADO 7.500 BTU',
				},
				{
					key: '10000BTU',
					value: 1400,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '27',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AR CONDICIONADO 10.000 BTU',
				},
				{
					key: '12000BTU',
					value: 1600,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '28',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AR CONDICIONADO 12.000 BTU',
				},
				{
					key: '15000BTU',
					value: 1900,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '88',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AR CONDICIONADO 15.000 BTU',
				},
				{
					key: '18000BTU',
					value: 2600,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '30',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AR CONDICIONADO 18.000 BTU',
				},
			],
			'CHUVEIRO ELÉTRICO': [
				{
					key: '5500W',
					value: 5500,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '138',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 5500 WATTS',
				},
				{
					key: '6600W',
					value: 6600,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '16',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR DE AGUA 6600 W CARDAL',
				},
				{
					key: '7200W',
					value: 7200,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '117',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA BIFAS  GERADORA 9KVA',
				},
			],
			"FORNO": [
				{
					key: '800W',
					value: 800,
					codigoAparelho: '99999',
					codigoSubTipoAparelho: '39',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'FORNO A RESISTENCIA PEQUENO',
				},
				{
					key: '1200W',
					value: 1200,
					codigoAparelho: '99999',
					codigoSubTipoAparelho: '40',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'FORNO MICROONDAS',
				},
				{
					key: '1500W',
					value: 1500,
					codigoAparelho: '99999',
					codigoSubTipoAparelho: '38',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'FORNO A RESISTENCIA GRANDE',
				},
			],
			'MÁQUINA DE SOLDA': [
				{
					key: '4000W',
					value: 4000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '113',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA BIF GERADORA 5 KVA',
				},
				{
					key: '4800W',
					value: 4800,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '82',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA BIFASICA TIG 6 KVA',
				},
				{
					key: '5600W',
					value: 5600,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '99',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA BIFASICA MIG 7 KVA',
				},
				{
					key: '6400W',
					value: 6400,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '116',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA BIFAS  GERADORA 8KVA',
				},
				{
					key: '7200W',
					value: 7200,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '117',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA BIFAS  GERADORA 9KVA',
				},
				{
					key: '8000W',
					value: 8000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '86',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA BIFASICA TIG 10 KVA',
				},
				{
					key: '10000W',
					value: 10000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '93',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA TRIFASICA TIG 12,5KVA',
				},
				{
					key: '12000W',
					value: 12000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '78',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA TRIFASICA TRANSF 15 KV',
				},
				{
					key: '14000W',
					value: 14000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '111',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA TRIFASICA MIG 17,5 KVA',
				},
				{
					key: '16000W',
					value: 16000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '112',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA TRIFASICA MIG 20 KVA',
				},
			],
			'AQUECEDOR CENTRAL': [
				{
					key: '1000W',
					value: 1000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '18',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 1000 W (BOILER)',
				},
				{
					key: '1500W',
					value: 1500,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '19',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 1500 W (BOILER)',
				},
				{
					key: '1550W',
					value: 1550,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '99999',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR DE AMBIENTE',
				},
				{
					key: '2000W',
					value: 2000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '17',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 2000 W (BOILER)',
				},
				{
					key: '3000W',
					value: 3000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '20',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 3000 W (BOILER)',
				},
				{
					key: '5000W',
					value: 5000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '21',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 5000 W (BOILER)',
				},
				{
					key: '5400W',
					value: 5400,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '24',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR DE PISCINA',
				},
				{
					key: '6600W',
					value: 6600,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '16',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR DE AGUA 6600 W CARDAL',
				},
				{
					key: '7500W',
					value: 7500,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '22',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 7500 W (BOILER)',
				},
				{
					key: '10000W',
					value: 10000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '23',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 10000 W (BOILER)',
				},
			],
			'RAIO X': [
				{
					key: '1000W',
					value: 1000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '130',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 1000 WATTS',
				},
				{
					key: '1500W',
					value: 1500,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '131',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 1500 WATTS',
				},
				{
					key: '2000W',
					value: 2000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '132',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 2000 WATTS',
				},
				{
					key: '3000W',
					value: 3000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '133',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 3000 WATTS',
				},
				{
					key: '3500W',
					value: 3500,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '134',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 3500 WATTS',
				},
				{
					key: '4000W',
					value: 4000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '135',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 4000 WATTS',
				},
				{
					key: '4500W',
					value: 4500,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '136',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 4500 WATTS',
				},
				{
					key: '5000W',
					value: 5000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '137',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 5000 WATTS',
				},
				{
					key: '5500W',
					value: 5500,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '138',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 5500 WATTS',
				},
				{
					key: '6000W',
					value: 6000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '139',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 6000 WATTS',
				},
				{
					key: '10000W',
					value: 10000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '140',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 10.000 WATTS',
				},
				{
					key: '15000W',
					value: 15000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '141',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 15.000 WATTS',
				},
				{
					key: '20000W',
					value: 20000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '142',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 20.000 WATTS',
				},
				{
					key: '30000W',
					value: 30000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '143',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 30.000 WATTS',
				},
				{
					key: '40000W',
					value: 40000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '144',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 40.000 WATTS',
				},
				{
					key: '50000W',
					value: 50000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '145',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 50.000 WATTS',
				},
				{
					key: '60000W',
					value: 60000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '146',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 60.000 WATTS',
				},
				{
					key: '70000W',
					value: 70000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '147',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 70.000 WATTS',
				},
				{
					key: '80000W',
					value: 80000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '148',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 80.000 WATTS',
				},
				{
					key: '90000W',
					value: 90000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '149',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 90.000 WATTS',
				},
				{
					key: '130000W',
					value: 130000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '150',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - > OU = A 100.000 WATTS',
				},
			],
			"RESISTÊNCIAS": [
				{
					key: '1000W',
					value: 1000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '7',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'RESISTENCIA 1000W',
				},
				{
					key: '2000W',
					value: 2000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '8',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'RESISTENCIA 2000W',
				},
				{
					key: '3000W',
					value: 3000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '9',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'RESISTENCIA 3000W',
				},
				{
					key: '4000W',
					value: 4000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '10',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'RESISTENCIA 4000W',
				},
				{
					key: '5000W',
					value: 5000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '11',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'RESISTENCIA 5000W',
				},
				{
					key: '6500W',
					value: 6500,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '12',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'RESISTENCIA 6500W',
				},
				{
					key: '7000W',
					value: 7000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '13',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'RESISTENCIA 7000W',
				},
				{
					key: '10000W',
					value: 10000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '14',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'RESISTENCIA 10000W',
				},
			],
			'MOTORES/BOMBAS': [
				{
					key: 'Motores 1cv',
					value: 749,
					codigoAparelho: '88888',
					codigoSubTipoAparelho: '7',
					codigoTipoAparelho: '6',
					descricaoSubTipoAparelho: 'VM700 + REATOR 49',
				},
				{
					key: 'Motores 1/2cv',
					value: 370,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '36',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'TV PLASMA 60\\"',
				},
				{
					key: 'Motores 1/4cv',
					value: 180,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '35',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'TV LCD 22\\"',
				},
				{
					key: 'Motores 2cv',
					value: 1600,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '28',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AR CONDICIONADO 12.000 BTU',
				},
				{
					key: 'Motores 3cv',
					value: 2170,
					codigoAparelho: '2',
					codigoSubTipoAparelho: '71',
					codigoTipoAparelho: '3',
					descricaoSubTipoAparelho: 'MOTOR BIFASICO 2 CV',
				},
				{
					key: 'Motores 3/4cv',
					value: 555,
					codigoAparelho: '4',
					codigoSubTipoAparelho: '92',
					codigoTipoAparelho: '4',
					descricaoSubTipoAparelho: 'VS500 + REATOR 55',
				},
			],
			"OUTROS": [
				{
					key: '1000W',
					value: 1000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '18',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 1000 W (BOILER)',
				},
				{
					key: '2000W',
					value: 2000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '17',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 2000 W (BOILER)',
				},
				{
					key: '3000W',
					value: 3000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '20',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 3000 W (BOILER)',
				},
				{
					key: '4000W',
					value: 4000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '10',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'RESISTENCIA 4000W',
				},
				{
					key: '5000W',
					value: 5000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '21',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 5000 W (BOILER)',
				},
				{
					key: '6000W',
					value: 6000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '139',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'RAIO X - 6000 WATTS',
				},
				{
					key: '7000W',
					value: 7000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '13',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'RESISTENCIA 7000W',
				},
				{
					key: '8000W',
					value: 8000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '86',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA BIFASICA TIG 10 KVA',
				},
				{
					key: '9000W',
					value: 9000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '18',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 1000 W (BOILER)',
				}, // AO FINAL, EXISTE UM MÉTODO EM QUE ENVIA 9 OBJETOS DE 1K
				{
					key: '10000W',
					value: 10000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '23',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 10000 W (BOILER)',
				},
				{
					key: '11000W',
					value: 11000,
					codigoAparelho: '1',
					codigoSubTipoAparelho: '18',
					codigoTipoAparelho: '1',
					descricaoSubTipoAparelho: 'AQUECEDOR CENTRAL 1000 W (BOILER)',
				}, // AO FINAL, EXISTE UM MÉTODO EM QUE ENVIA 11 OBJETOS DE 1K
				{
					key: '12000W',
					value: 12000,
					codigoAparelho: '5',
					codigoSubTipoAparelho: '78',
					codigoTipoAparelho: '5',
					descricaoSubTipoAparelho: 'MAQUINA SOLDA TRIFASICA TRANSF 15 KV',
				},
			],
		};

		this.itensCategoriaApartamento = {
			'MONOFÁSICA': {
				categoria:'MONOFÁSICA',
				equipamentos: this.monofasicoPadrao,
				potencia: '10000'
			},
			'BIFÁSICA': {
				categoria:'BIFÁSICA',
				equipamentos: this.bifasicoPadrao,
				potencia: '18000'
			},
			'TRIFÁSICA': {
				categoria:'TRIFÁSICA',
				equipamentos: this.trifasicoPadrao,
				potencia: '18100'
			}
		};

		this.itensCombo = [
			{
				combo: "0",
				nome: 'RESIDENCIAL I',
				categoria: 'MONOFÁSICA',
				potencia: 10000,
				equipamentos: [
					this.monofasicoPadrao
				]
			},
			{
				combo: "1",
				nome: 'RESIDENCIAL II',
				categoria: 'BIFÁSICA',
				potencia: 18000,
				equipamentos: [
					this.bifasicoPadrao
				]
			},
			{
				combo: "2",
				nome: 'RESIDENCIAL III',
				categoria: 'TRIFÁSICA',
				potencia: 18100,
				equipamentos: [
					{
						"codigoAparelho": "5",
						"codigoSubTipoAparelho": "112",
						"codigoTipoAparelho": "5",
						"descricaoSubTipoAparelho": "MAQUINA SOLDA TRIFASICA MIG 20 KVA",
						"quantidadeAparelho": "1"
					},
					{
						"codigoAparelho": "1",
						"codigoSubTipoAparelho": "30",
						"codigoTipoAparelho": "1",
						"descricaoSubTipoAparelho": "AR CONDICIONADO 18.000 BTU",
						"quantidadeAparelho": "1"
					}
				]
			},
			{
				combo: "3",
				nome: 'RESIDENCIAL IV',
				categoria: 'TRIFÁSICA',
				potencia: 25000,
				equipamentos: [
					this.trifasicoPadrao
				]
			}
		];

		this.palavrasArt = ['padrão', 'entrada de energia', 'instalação', 'poste', 'obra', 'elétrica', 'quadro de medição', 'ligação', 'baixa tensão'];
	}

	getPotencias(equipamento: any) {
		return this.equipamentos[equipamento];
	}

	getCombo(combo: any) {
		return this.itensCombo[combo];
	}

	calcular(equipamentos: any): Promise<number> {
		return new Promise((resolve) => {
			let potencia = 2160;

			if (equipamentos.length > 0) {
				equipamentos.forEach((equipamento: any, index: number) => {
					potencia += equipamento.potencia * equipamento.quantidade;

					if (index == (equipamentos.length - 1)) {
						resolve(potencia);
					}
				});
			} else {
				resolve(potencia);
			}
		});
	}

	getCategoria(potencia: number): Promise<tipoCategoria> {
		return new Promise((resolve) => {
			if (potencia <= 10000) {
				resolve('MONOFÁSICA');
			} else if (potencia <= 18000) {
				resolve('BIFÁSICA');
			} else {
				resolve('TRIFÁSICA');
			}
		});
	}

	getDadosApt(index: number) {
		return this.itensCategoriaApartamento[index];
	}

}
