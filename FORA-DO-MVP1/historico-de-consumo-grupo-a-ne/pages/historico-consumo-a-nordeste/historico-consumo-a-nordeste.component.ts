import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { accordionHeader } from "app/core/models/debitos_historico.model";
import { ConsumosARequestDTO } from "app/core/models/hitorico-de-consumo/old/consumosARequestDTO.model";
import { ConsumosAResponseDTO } from "app/core/models/hitorico-de-consumo/old/consumosAResponseDTO.model";

import { HistoricoDeConsumoService } from 'app/core/services/historico-de-consumo/historico-de-consumo.service';
import { UserService } from "app/core/services/user/user.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { AccordionComponent } from "app/shared/components/accordion/accordion.component";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";

@Component({
  selector: "app-historico-consumo",
  templateUrl: "./historico-consumo-a-nordeste.component.html",
  styleUrls: ["./historico-consumo-a-nordeste.component.scss"],
})
export class HistoricoConsumoANordesteComponent implements OnInit {
  ativarDados: Array<any> = [];
  pageSize: number = 5;
  mobile!: boolean;
  isTela = 'historicoConsumo';
  isTelaHistorico: boolean = true;
  msgCategoriaTarifa!: string;
  categoriaTarifa!: string;

  consumosARequestDTO = new ConsumosARequestDTO();
  consumosAResponseDTO = new ConsumosAResponseDTO();


  @ViewChild(AccordionComponent, { static: false })
  accordion!: AccordionComponent;

  @ViewChild(PaginationComponent, { static: false })
  pagination!: PaginationComponent;

  youtubeURL = "https://www.youtube.com/watch?v=6lfzFQ2KhEQ";
  paginaInstitucionalUrl =
    "https://www.elektro.com.br/sua-casa/dicas-de-economia-e-seguranca-com-energia-eletrica";

  itens: Array<accordionHeader>;

  constructor(
    public user: UserService,
    private _historicoConsumoService: HistoricoDeConsumoService
  ) {
    this.mobile = configureMenuByWindowSize(window.screen.width);

    this.itens = this._historicoConsumoService.itens;
  }

  deParaGetHistorico() {
    this.consumosARequestDTO.protocolo = '123';
    this.consumosARequestDTO.codCliente = '123';
  }

  // carregarDadosHistoricoConsumoA() {
  //   let codigo = '1234';

  //   this.deParaGetHistorico();

  //   this._historicoConsumoService.getHistoricoConsumoA(this.consumosARequestDTO, codigo).subscribe({
  //     (data) => {
  //       this.consumosAResponseDTO = data;
  //     }, (error) => {
  //       if (error.status == 401 || error.status == 400) { } else { }
  //     }
  //   )}
  // }

  ngOnInit(): void {


    window.scroll(0, 0);

    this.mostrarDadosPorPagina();
    this.categoriaTarifa = `Modalidade: Livre verde`;
    this.msgCategoriaTarifa =
      this.categoriaTarifa + '\nBandeira verde. Condições favoráveis de geração de energia. A tarifa não sofre nenhum acréscimo.';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
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

  eventSelectAll(event: any) {
    this.accordion.checkedAll(event);
  }

  eventPagination(event: any) {
    this.ativarDados = event;
  }
}