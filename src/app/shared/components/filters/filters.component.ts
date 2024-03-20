import {
    AfterViewInit, Component,
    EventEmitter,
    HostListener,
    Input, OnInit, Output,
    QueryList, ViewChildren,
    ViewEncapsulation
} from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import { MatIconRegistry } from "@angular/material/icon";
import { MatSelect } from "@angular/material/select";
import { DomSanitizer } from "@angular/platform-browser";
import { FaturaDTO } from "app/core/models/segunda-via/response/segunda-via-response-dto";
import { SegundaViaService } from "app/core/services/segunda-via/segunda-via.service";
import { UserService } from "app/core/services/user/user.service";

@Component({
    selector: "app-filters",
    templateUrl: "./filters.component.html",
    styleUrls: ["./filters.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class FiltersComponent implements OnInit {
    @ViewChildren(MatSelect) matSelectList!: QueryList<MatSelect>;

    closeMenu() {
        this.matSelectList.forEach(element => {
            element.close();
        })
    }

    @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
        this.closeMenu();
    }

    @Input() labelTitle!: string;
    @Input() itens: any;
    @Input() pageSize: any;
    @Input() tipoFiltro: any;

    @Output() eventOutput = new EventEmitter<any[]>();
    @Output() eventClear = new EventEmitter();
    @Output() eventSelectAll = new EventEmitter();
    @Output() eventDownloadAll = new EventEmitter();
    @Output() eventOutputFiltered = new EventEmitter();

    ano: string;
    anoAtual: string;
    anosPossiveis: Array<string> = [];
    mobile: boolean;
    tablet: boolean;
    statusPossiveis: Array<string> = [];
    selectall: boolean = false;
    statusFilter: any;
    ativarDados!: Array<any>;
    grupoDoUsuario: string;
    tooltipMsg: string = "Faça o download de uma ou mais faturas. Caso selecione mais de uma ocorrerá o download para cada.";

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.configureMenuByWindowSize(event.target.innerWidth);
    }

    configureMenuByWindowSize(width: any) {
        this.mobile = width < 768 ? true : false;
        this.tablet = width == 768 ? true : false;
    }

    constructor(
        private _user: UserService,
        private _dateAdapter: DateAdapter<Date>,
        private _matIconRegistry: MatIconRegistry,
        private _domSanitizer: DomSanitizer,
        private _segundaViaService: SegundaViaService,
    ) {
        this.ano = "";
        this.anoAtual = "";
        this._dateAdapter.setLocale('pt');
        this.mobile = window.screen.width < 768 ? true : false;
        this.tablet = window.screen.width == 768 ? true : false;
        this.grupoDoUsuario = this._user.group;
        this.adicionarSvgs();
    }
    ngOnInit(): void {
        this.preencherFiltro();
        this.statusPossiveis = this._segundaViaService.getDadosSegundaVia.listaStatusFaturas;
        this._segundaViaService.dadosSegundaVia.faturasFiltradas = this._segundaViaService.getFaturas;
    }

    adicionarSvgs(): void {
        this._matIconRegistry.addSvgIcon(
            "download-faturas",
            this._domSanitizer.bypassSecurityTrustResourceUrl(
                "assets/images/icons/download_lista_faturas.svg"
            )
        );
    }

    preencherFiltro(): void {
        this._segundaViaService.getDadosSegundaVia.anoStatus.forEach(elem => {
            this.anosPossiveis.push(elem.key);
        })
        this.anoAtual = this.anosPossiveis[0];
    }

    onSelectAll(e: any): void {
        this.eventSelectAll.emit(e);
    }

    baixarFaturas(e: any): void {
        this.eventDownloadAll.emit(e);
    }

    filterByStatus(status: any) {
        let filtrados;
        filtrados = this.itens.filter((res: any) => {
            if (this._segundaViaService.getStatus(res.statusFatura) == status) {
                return res.statusFatura.toLocaleLowerCase();
            }
        });
        this.ativarDados = filtrados.slice(0, this.pageSize);
        this.eventOutputFiltered.emit(filtrados); //listagem filtrada
        this.eventOutput.emit(this.ativarDados);
        this._segundaViaService.dadosSegundaVia.faturasFiltradas = filtrados;
    }

    // filterByMes(mes: any) {
    // 	let filtrados;
    // 	let mesArraySelecionado = this.meses.find((m) => m.key == mes);
    // 	filtrados = this.itens.filter((res: any) => {
    // 		if (res.vencimento.substring(3, 5) == mesArraySelecionado.key) {
    // 			return res.vencimento.substring(3, 5) == mesArraySelecionado.key;
    // 		}
    // 	});
    // 	this.ativarDados = filtrados.slice(0, this.pageSize);
    //  this.eventOutputFiltered.emit(filtrados); //listagem filtrada
    // 	this.eventOutput.emit(this.ativarDados);
    // }

    filterByAno(ano: any) {
        let filtrados;
        filtrados = this.itens.filter((res: FaturaDTO) => {
            let data = res.dataVencimento ?? "";
            let anoFatura = new Date(data).getFullYear();
            if (anoFatura == ano) {
                return res;
            }
        });
        this.setarStatusPossiveis(ano);
        this.ativarDados = filtrados.slice(0, this.pageSize);
        this.eventOutputFiltered.emit(filtrados); //listagem filtrada
        this.eventOutput.emit(this.ativarDados);
        this._segundaViaService.dadosSegundaVia.faturasFiltradas = filtrados;
    }

    limparFiltros() {
        this.ano = "";
        this.statusFilter = "";
        this.selectall = false;
        this.ativarDados = this.itens.slice(0, this.pageSize);
        this.statusPossiveis = this._segundaViaService.getDadosSegundaVia.listaStatusFaturas;
        this.eventSelectAll.emit(false);
        this.eventOutput.emit(this.itens);
        this.eventClear.emit(true);
        this._segundaViaService.dadosSegundaVia.faturasFiltradas = this._segundaViaService.getFaturas;
    }

    getStatusPossiveis(): Array<string> {
        let statusPossiveis: Array<string> = [];
        this.itens.forEach((element: FaturaDTO) => {
            statusPossiveis.push(this._segundaViaService.getStatus(element.statusFatura));
        });
        this._segundaViaService.setDadosSegundaVia.listaStatusFaturas = [... new Set(statusPossiveis)]
        return this._segundaViaService.getDadosSegundaVia.listaStatusFaturas;
    }

    setarStatusPossiveis(ano: string): void {
        this.statusPossiveis = [];
        this._segundaViaService.getDadosSegundaVia.anoStatus.forEach(elem => {
            if (elem.key == ano) {
                this.statusPossiveis = elem.value;
            }
        })
    }
}
