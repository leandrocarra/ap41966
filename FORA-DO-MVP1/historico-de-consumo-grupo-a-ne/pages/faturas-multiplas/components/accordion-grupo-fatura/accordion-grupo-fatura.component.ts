import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/core/services/user/user.service';
import { PaginationComponent } from 'app/shared/components/pagination/pagination.component';

@Component({
  selector: 'app-accordion-grupo-fatura',
  templateUrl: './accordion-grupo-fatura.component.html',
  styleUrls: ['./accordion-grupo-fatura.component.scss']
})
export class AccordionGrupoFaturaComponent implements OnInit {
  panelOpenState = false;
  @Input() itens: any;
  @Output() groupEscolhido = new EventEmitter();
  ativarDados: any = [];
  pageSize = 3;
  grupoSelecionado!: string;
  
  @ViewChild(PaginationComponent, { static: false })
  pagination!: PaginationComponent;

  constructor(
    public user: UserService,
    public router: Router
  ) { 
  }

  ngOnInit() {
  }

  mostrarDadosPorPagina(index: any, data: any) {
    this.panelOpenState = true;
    this.ativarDados[index] = data.slice(0, this.pageSize);
  }

  editar() {
    this.router.navigateByUrl('faturas-multiplas/editar-grupo');
  }

  grupoEscolhido(item: any) {
    this.groupEscolhido.emit(item);
  }

  eventPagination(event: any, index: any) {
    this.ativarDados[index] = event;
  }
}
