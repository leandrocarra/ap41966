import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { CardAcessoRapido } from 'app/core/models/pagina-inicial/pagina-inicial';
import { FaturaSimplificadaDTO } from 'app/core/models/segunda-via-pagamento/response/segunda-via-pagamento-dto';
import { InformativoFaturaAberta } from 'app/core/models/segunda-via/segunda-via.model';
import { PaginaInicialService } from 'app/core/services/pagina-inicial/pagina-inicial.service';
import { SegundaViaPagamentoService } from 'app/core/services/segunda-via-pagamento/segunda-via-pagamento.service';
import { initialCapitalize } from 'app/core/services/utils/neo-utils.service';

@Component({
  selector: 'app-acesso-faturas-segunda-via',
  templateUrl: './acesso-faturas-segunda-via.component.html',
  styleUrls: ['./acesso-faturas-segunda-via.component.scss']
})
export class AcessoFaturasSegundaViaComponent {
    distribuidora: string;
    tituloServicos: string;
    informativos: Array<InformativoFaturaAberta>;
    cardsAcessoRapido: Array<CardAcessoRapido>;
    faturasFiltradas: Array<FaturaSimplificadaDTO>;
    constructor(
        private _location: Location,
        private _router: Router,
        private _paginaInicialService: PaginaInicialService,
        private _segundaViaPagamentoService: SegundaViaPagamentoService
    ) {
        this.distribuidora = initialCapitalize(environment.title.split(" ")[1]);
        this.informativos = new Array<InformativoFaturaAberta>();
        this.cardsAcessoRapido = this._paginaInicialService.criarCardsAcessoRapido(this._router.url);
        this.tituloServicos = this._paginaInicialService.tituloSectionDois;
        this.faturasFiltradas = this._segundaViaPagamentoService.tratarFaturasParaExibicao();
        this.criarInformativos();
    }

    criarInformativos(): void {
        this.informativos.push(
            new InformativoFaturaAberta("VALOR DAS FATURAS EM ABERTO", "Este valor corresponde ao saldo em aberto para os dados informados, mas não considera multa ou acordos feitos separadamente e nem pagamentos feitos nos últimos 2 dias úteis."),
            new InformativoFaturaAberta("VENCIMENTO", "Lembre-se de pagar seu boleto até a data de vencimento original de sua fatura para evitar juros e multa."),
            new InformativoFaturaAberta("ESTA É A REPRESENTAÇÃO NUMÉRICA DO CÓDIGO DE BARRAS", "Para realizar o pagamento, este número deverá ser copiado nos caixas de auto atendimento ou internet banking do seu banco. Para pagamento nos caixas de qualquer rede bancária, é necessário abrir o código de barras."),
        );
    }

    voltar(): void {
        this._location.back();
    }
}
