import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { configureMenuByWindowSize } from '../../../../../../core/services/utils/neo-utils.service';

@Component({
    selector: 'neo-informativo-tarifa-social',
    templateUrl: './informativo-tarifa-social.component.html',
    styleUrls: ['./informativo-tarifa-social.component.scss']
})
export class InformativoTarifaSocialComponent {
    mobile: boolean;
    tarifasSociais: Array<any>;
    titleTooltip: string;
    constructor(
        public router : Router,
        private _location: Location
    ) {
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.tarifasSociais = this.preencheTarifasSociais();
        this.titleTooltip = "A tarifa social é um benefício criado pelo Governo Federal para as residências de famílias com baixa renda. Consiste na redução da tarifa de consumo de energia elétrica em até 65% e para indígenas e quilombolas em até 100%."
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }


    abrirURL(url: string): void {
        let otherWindow = window.open(url, '_blank');
        if (otherWindow) { otherWindow.opener = null };
    }

    preencheTarifasSociais(): Array<any> {
        return this.tarifasSociais = [
        {
            tarifaSocial: 'Programa Social do Governo',
            textoTooltip: 'Famílias no Cadastro Único para Programas Sociais do Governo Federal com renda familiar mensal por pessoa menor ou igual a meio salário mínimo nacional',
            textoTarifaSocial: 'Será obrigatório informar o código familiar e o número de identificação social - NIS, RG e CPF do beneficiário e enviar os seguintes documentos:',
            documentos: [
            {
                nomeDocumento: 'Documento com foto do titular do NIS*',
                temURL: false,
                url: ''
            },
            {
                nomeDocumento: 'Folha Resumo Cadastro Único-V7*',
                temURL: true,
                url: 'https://www.gov.br/pt-br/servicos/emitir-comprovante-do-cadastro-unico'
            },
            ],
        },
        {
            tarifaSocial: 'Assistência Médica Domiciliar',
            textoTooltip: 'Famílias no Cadastro Único da Prefeitura, com renda familiar mensal de até três salários mínimos, que tenha alguém com doença ou patologia que precise do uso continuado de aparelhos ou equipamentos elétricos',
            textoTarifaSocial: 'Será obrigatório informar o código familiar e o número de identificação social - NIS, RG e CPF do beneficiário e enviar os seguintes documentos:',
            documentos: [
            {
                nomeDocumento: 'Documento com Foto do Titular do NIS*',
                temURL: false,
                url: '',
            },
            {
                nomeDocumento: 'Folha Resumo Cadastro Único-V7*',
                temURL: true,
                url: 'https://www.gov.br/pt-br/servicos/emitir-comprovante-do-cadastro-unico',
            },
            {
                nomeDocumento: 'Relatório e atestado emitido por profissionais médicos*',
                temURL: false,
                url: '',
            },
            ],
        },
        {
            tarifaSocial: 'Benefício de Prestação Continuada',
            textoTooltip: 'Famílias com idoso ou deficiente que receba o Benefício de Prestação Continuada da Assistência Social - BPC (Lei LOAS)',
            textoTarifaSocial: 'Será obrigatório informar o número do beneficiário - NB, RG e CPF do beneficiário e enviar os seguintes documentos:',
            documentos: [
            {
                nomeDocumento: 'Documento com Foto do Titular do NB*',
                temURL: false,
                url: '',
            },
            {
                nomeDocumento: 'Carta de Concessão do INSS*',
                temURL: true,
                url: 'https://www.gov.br/inss/pt-br/saiba-mais/seu-beneficio/declaracao-de-beneficio-consta-nada-consta',
            },
            ],
        },
        ];
    }

    fechar(): void {
        this._location.back();
    }
}
