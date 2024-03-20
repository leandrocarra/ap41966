import { Component } from "@angular/core";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { Conteudo, InformacaoConta } from "app/core/models/entenda-sua-conta/informacao-conta";
import { BandeiraTarifariaDTO } from "app/core/models/entenda-sua-conta/response/entenda-sua-conta-dto";
import { LeituraDeConsumoDTO } from "app/core/models/hitorico-de-consumo/response/historico-de-consumo-dto";
import { FaturaDTO } from "app/core/models/segunda-via/response/segunda-via-response-dto";
import { UcInfosResponseDTO } from "app/core/models/selecao-de-imoveis/DTO/responses/uc-infos-response-dto";
import { EntendaSuaContaService } from "app/core/services/entenda-sua-conta/entenda-sua-conta.service";
import { HistoricoDeConsumoService } from "app/core/services/historico-de-consumo/historico-de-consumo.service";
import { SegundaViaService } from "app/core/services/segunda-via/segunda-via.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { converterParaReais } from "app/core/services/utils/neo-utils.service";

@Component({
    selector: 'app-descricao-conta-component',
    templateUrl: './descricao-conta.component.html',
    styleUrls: ['./descricao-conta.component.scss']
})

export class DescricaoContaComponent {
    infosDaUC: UcInfosResponseDTO;
    informacoesConta: Array<InformacaoConta>;

    constructor(
        private _entendaSuaContaService: EntendaSuaContaService,
        private _selecaoImovelService: SelecaoImovelService,
        private _historicoDeConsumoService: HistoricoDeConsumoService,
        private _segundaViaService: SegundaViaService
    ) {
        this.infosDaUC = this._selecaoImovelService.getInformacoesUCSelecionada;
        this.informacoesConta = this.passarInformacoesDeConta(this.receberDadosDaConta());

    }

    private receberDadosDaConta(): any {
        const indexDados = this._entendaSuaContaService.faturaIndex;
        const dadosDoHistorico = this._historicoDeConsumoService.getDataHistorico[indexDados];
        const dadosDaFatura = this._segundaViaService.dadosSegundaVia.faturasFiltradas[indexDados];
        return {
            consumoEmkWh: dadosDoHistorico.consumoKw,
            diasDeConsumo: this.calcularDiasDeConsumo(dadosDaFatura),
            valorDaFatura: converterParaReais(dadosDaFatura.valorEmissao.toString()),
            dataDeVencimento: this.transformarData(dadosDaFatura.dataVencimento),
            situacaoDaFatura: this._segundaViaService.getStatus(dadosDaFatura.statusFatura),
            leitura: environment.regiao === Regiao.SE ? dadosDoHistorico.especificacao[0].numeroLeitura : dadosDoHistorico.numeroLeitura,
            leituraNaMedia: dadosDoHistorico.indicativoMedia,
            dataDaLeitura: environment.regiao === Regiao.SE ? this.transformarData(dadosDoHistorico.especificacao[0].dataLeitura) : dadosDoHistorico.dataLeitura,
            dataDaProximaLeitura: environment.regiao === Regiao.SE ? this.transformarData(dadosDoHistorico.dataProxLeitura) : dadosDoHistorico.dataProxLeitura,
            variacaoPercentual: this.calcularVariacaoPercentual(dadosDoHistorico, indexDados)

        }
    }

    private passarInformacoesDeConta(dadosDaConta: any): Array<InformacaoConta> {
        return [
            {
                titulo: 'Bandeira Tarifária',
                conteudo: this.montaConteudoBandeiraTarifaria()
            },
            {
                titulo: 'Consumo',
                conteudo: [
                    {
                        subtitulo: `${dadosDaConta.consumoEmkWh} kWh`,
                        icone: 'query_builder',
                        statusCor: 'Consumo',
                        descricao: `Percebemos que o valor da sua conta ${dadosDaConta.variacaoPercentual} em relação ao mês anterior.\nDias de consumo: ${dadosDaConta.diasDeConsumo} dias`,
                    }
                ]
            },
            {
                titulo: 'Valor da Conta',
                conteudo: [
                    {
                        subtitulo: dadosDaConta.valorDaFatura,
                        icone: 'request_page',
                        statusCor: 'valorConta',
                        descricao: `Vencimento: ${dadosDaConta.dataDeVencimento}\nSituação da fatura: ${dadosDaConta.situacaoDaFatura}\n${this.mensagemUcVinculada(dadosDaConta.situacaoDaFatura)}`,
                    }
                ]
            },
            {
                titulo: 'Leitura',
                conteudo: [
                    {
                        subtitulo: dadosDaConta.leitura,
                        icone: 'fullscreen',
                        statusCor: 'Leitura',
                        descricao: this.selecionarDescricaoDaLeitura(dadosDaConta),
                    }
                ],
            }
        ];
    }

    private mensagemUcVinculada(statusFatura: string): string {
        if (statusFatura.toLowerCase() === 'vinculada') {
            return 'O valor dessa conta não atingiu a quantia de R$70,00. Este valor será acumulado sem encargos na próxima conta.';
        }else{
            return '';
        }
    }

    private calcularDiasDeConsumo(dadosFatura: FaturaDTO): string {
        const dataInicial = new Date(dadosFatura.dataInicioPeriodo);
        const dataFinal = new Date(dadosFatura.dataFimPeriodo);
        return Math.ceil((dataFinal.getTime() - dataInicial.getTime()) / (1000 * 60 * 60 * 24) + 1).toString();
    }

    private calcularVariacaoPercentual(dadosFatura: LeituraDeConsumoDTO, indexDadosHistorico: number): string {
        const dadosHistorico = this._historicoDeConsumoService.getDataHistorico;
        const faturaAtual = dadosHistorico[indexDadosHistorico + 1].consumoKw.split(',');
        const faturaAnterior = dadosFatura.consumoKw.split(',');
        const variacao = Number(faturaAnterior[1] === undefined ? `${faturaAnterior[0]}` : `${faturaAnterior[0]}.${faturaAnterior[1]}`) / Number(faturaAtual[1] === undefined ? `${faturaAtual[0]}` : `${faturaAtual[0]}.${faturaAtual[1]}`);
        const percentual = Math.round(Math.abs(1 - variacao) * 100);
        if (variacao >= 1) {
            return `aumentou ${percentual}%`;
        } else {
            return `diminuiu ${percentual}%`;
        }
    }

    private selecionarDescricaoDaLeitura(dadosDaConta: any): string {
        let mensagem: string;
        if (dadosDaConta.leituraNaMedia) {
            mensagem = 'Você está dentro de sua média de consumo.';
        } else {
            mensagem = 'Valor de consumo fora da média mensal!';
        }
        return `${mensagem}\nData da leitura: ${dadosDaConta.dataDaLeitura}\nData da próxima leitura: ${dadosDaConta.dataDaProximaLeitura}`
    }

    private montaConteudoBandeiraTarifaria(): Array<Conteudo> {
        let conteudoBandeiras: Array<Conteudo> = [];
        for (const bandeira of this._entendaSuaContaService.getBandeiraTarifaria) {
            conteudoBandeiras.push(new Conteudo(
                `Entre ${this.transformarData(bandeira.dataInicio)} e ${this.transformarData(bandeira.dataFim)}`,
                'flag',
                bandeira.bandeira,
                this.validaDescricaoBandeira(bandeira)
            ));
        }
        return conteudoBandeiras;
    }

    private transformarData(dataRecebida: Date | string): string {

        dataRecebida = new Date(dataRecebida); // FIXME: pesquisar solucao definitiva
        dataRecebida.setDate(dataRecebida.getDate()+1);

        return new Date(dataRecebida).toLocaleDateString('pt-br', { day: 'numeric', month: 'numeric', year: 'numeric' });
    }



    private validaDescricaoBandeira(bandeiraRetornada: BandeiraTarifariaDTO) {
        const valorTarifa = bandeiraRetornada.valorTarifa.toLocaleString('pt-br');
        switch (bandeiraRetornada.bandeira) {
            case 'VMv2': {
                return `Bandeira vermelha patamar 2. Condições ainda mais custosas de geração de energia. A tarifa sofre acréscimo de R$ ${valorTarifa} para cada 100 kWh consumidos.`;
            }
            case 'VM': {
                return `Bandeira vermelha patamar 1. Condições mais custosas de geração de energia. A tarifa sofre acréscimo de R$ ${valorTarifa} para cada 100 kWh consumidos.`;
            }
            case 'AM': {
                return `Bandeira amarela. Condições menos favoráveis de geração de energia. A tarifa sofre acréscimo de R$ ${valorTarifa} para cada 100 kWh consumidos.`;
            }
            case 'EH': {
                return `Bandeira preta. Condições de crise hídrica. Necessário o uso de mais termelétricas e de importação de energia. A tarifa sofre acréscimo de R$ ${valorTarifa} para cada 100 kWh consumidos.`
            }
            default: {
                return `Bandeira verde. Condições favoráveis de geração de energia. A tarifa não sofre nenhum acréscimo.`;
            }
        }
    }
}
