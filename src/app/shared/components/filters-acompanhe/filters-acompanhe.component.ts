import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-filters-acompanhe',
  templateUrl: './filters-acompanhe.component.html',
  styleUrls: ['./filters-acompanhe.component.scss']
})
export class FiltersAcompanheComponent implements OnInit {


  @Input() labelTitle: any;
  @Input() itens: any;
  @Input() pageSize: any;
  @Input() tipoFiltro: any;

  @Output() eventOutput = new EventEmitter<any[]>();
  @Output() eventClear = new EventEmitter();
  @Output() eventSelectAll = new EventEmitter();

  mobile!: boolean;
  tablet!: boolean;
  solicitacaoFilter!: string;
  dtInicioFilter: any;
  dtFimFilter: any;
  ativarDados!: Array<any>;
  imovelFilter: any;
  statusFilter: any;
  searchFilter: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.configureMenuByWindowSize(event.target.innerWidth);
  }

  configureMenuByWindowSize(width: any) {
    this.mobile = width < 768 ? true : false;
    this.tablet = width == 768 ? true : false;
  }

  constructor(
    private _dateAdapter: DateAdapter<Date>,
    public alert: CustomSweetAlertService,
    public user: UserService
  ) { }

  ngOnInit(): void {
    this._dateAdapter.setLocale('pt');
    this.mobile = window.screen.width < 768 ? true : false;
    this.tablet = window.screen.width == 768 ? true : false;
  }

  compareDates() {
    if (this.dtInicioFilter && this.dtFimFilter) {
      if (this.dtInicioFilter > this.dtFimFilter) {
        this.alert.alertData().then(r => {
          this.dtInicioFilter = '';
          this.dtFimFilter = '';
        });
      }
    }
  }

  filterByStatus(status: any) {
    let filtrados;
    filtrados = this.itens.filter((res: any) => {
      if (res.situacao.toLocaleLowerCase() == status.toLocaleLowerCase()) {
        return res.situacao.toLocaleLowerCase() == status.toLocaleLowerCase();
      }
    });

    this.ativarDados = filtrados.slice(0, this.pageSize);
    this.eventOutput.emit(this.ativarDados);
  }

  toFilterLowerCase(param1: any, param2: any): boolean {
    return param1.toLocaleLowerCase().match(param2.toLocaleLowerCase());
  }

  searchNE(event: any): void {
    if(event !== "") {
      let itensToSearch = this.itens;
      let matchFilter = itensToSearch.filter((result: any) => {
        if (this.toFilterLowerCase(result.header.numProtocolo, this.searchFilter)) {
          this.toFilterLowerCase(result.header.numProtocolo, this.searchFilter);
  
          return true;
        }
      });
      let filteredItens = this.searchFilter != "" ? matchFilter : this.itens;
      this.itens = this.itens.slice(0, this.pageSize);
      this.eventOutput.emit(filteredItens);

    } else {
      this.limparFiltros();
    }
  }

  search(event: any): void {
    if (event === "NE") {
      this.searchNE(event);
    } else {
      this.searchSE(event);
    }
  }

  searchSE(event: any): void {
    if(event !== "") {
      let itensToSearch = this.itens;
      let matchFilter = itensToSearch.filter((result: any) => {
        if (this.toFilterLowerCase(result.protocolo, this.searchFilter)) {
          this.toFilterLowerCase(result.protocolo, this.searchFilter);
  
        } else if (this.toFilterLowerCase(result.dataSolicitacao, this.searchFilter)) {
          return true;
  
        } else if (this.toFilterLowerCase(result.descricao, this.searchFilter)) {
          return true;
  
        } else if (this.toFilterLowerCase(result.situacao, this.searchFilter)) {
          return true;
  
        }
      });
  
      let filteredItens = this.searchFilter != "" ? matchFilter : this.itens;
      this.itens = this.itens.slice(0, this.pageSize);
      this.eventOutput.emit(filteredItens);
    } else {
      this.limparFiltros();
    }
  }

  limparFiltros(): void {
    this.searchFilter = "";
    this.statusFilter = "";
    this.dtInicioFilter = "";
    this.dtFimFilter = "";
    this.ativarDados = this.itens.slice(0, this.pageSize);
    this.eventOutput.emit(this.ativarDados);
    this.eventClear.emit(true);
  }
}
