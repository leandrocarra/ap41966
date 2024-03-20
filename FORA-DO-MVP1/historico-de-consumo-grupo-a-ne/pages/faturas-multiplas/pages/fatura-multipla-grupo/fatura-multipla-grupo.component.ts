import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { UserService } from "app/core/services/user/user.service";
import { AccordionComponent } from "app/shared/components/accordion/accordion.component";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";

@Component({
    selector: "app-fatura-multipla-grupo",
    templateUrl: "./fatura-multipla-grupo.component.html",
    styleUrls: ["./fatura-multipla-grupo.component.scss"],
})

export class FaturaMultiplaGrupoComponent implements OnInit, OnDestroy {

    @ViewChild(PaginationComponent, { static: false })
    pagination!: PaginationComponent;
  
    @ViewChild(AccordionComponent, { static: false })
    accordion!: AccordionComponent;

    itens = [
        {
            grupo: 'Grupo 1',
            vencimento: "12/01/2019",
            valor: "323,00",
            situacao: "A vencer",
            estilo: "t-color-blue-royal-100",
            isSelected: false,
        },
        {
            grupo: 'Grupo 1',
            vencimento: "12/02/2021",
            valor: "249,00",
            situacao: "Atrasada",
            estilo: "t-color-red-200",
            isSelected: false,
        },
        {
            grupo: 'Grupo 1',
            vencimento: "12/12/2019",
            valor: "543,00",
            situacao: "Processando",
            estilo: "t-color-light-blue-100",
            isSelected: false,
        },
     
        {
            grupo: 'Grupo 1',
            vencimento: "12/12/2021",
            valor: "12,00",
            situacao: "Vinculada",
            estilo: "t-color-black-100",
            isSelected: false,
        },
        {
            grupo: 'Grupo 1',
            vencimento: "12/12/2020",
            valor: "878,00",
            situacao: "Paga",
            estilo: "t-color-green-sage-100",
            isSelected: false,
        },
    ];
    pageSize = 5;
    ativarDados: any = [];

    constructor(public user: UserService) { }

    ngOnInit() {
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

    eventSelectAll(event: any) {
        this.accordion.checkedAll(event);
    }

    eventPagination(event: any) {
        this.ativarDados = event;
    }

    ngOnDestroy(): void { }
}