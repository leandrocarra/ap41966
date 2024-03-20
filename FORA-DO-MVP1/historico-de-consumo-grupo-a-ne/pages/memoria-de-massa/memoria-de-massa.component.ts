import { Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Router, NavigationExtras } from '@angular/router';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { UserService } from 'app/core/services/user/user.service';
import { convertDates, PATHS } from 'app/core/services/utils/utils.service';

@Component({
  selector: 'app-memoria-de-massa',
  templateUrl: './memoria-de-massa.component.html',
  styleUrls: ['./memoria-de-massa.component.scss']
})

export class MemoriaDeMassaComponent implements OnInit {
  @ViewChildren(MatSelect) matSelectList!: QueryList<MatSelect>;

  closeMenu() {
    this.matSelectList.forEach(element => {
      element.close();
    })
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any){     
     this.closeMenu();
  }

  // Dados User
  entregaFatura: string = "joaovicente2@gmail.com";
  formaRecebimentoFatura: string = "E-mail de cadastro";
  // End Dados User

  // Pages Variables
  telaAlterarEmail: boolean = false;
  mobile: boolean;
  memoriaDeMassa!: any[];
  valorTaxa!: string;
  intervalo: string = "";
  dtInicio: string = "";
  dtFim: string = "";
  minutos: string[] = [
    "1 minuto",
    "5 minutos",
    "10 minutos",
    "15 minutos"];
  // EndPages Variables

  constructor(
    private _dateAdapter: DateAdapter<Date>,
    private _router: Router,
    private _user: UserService,
    public alert: CustomSweetAlertService
  ) {
    this._dateAdapter.setLocale('pt');
    this.mobile = window.screen.width < 768 ? true : false;
  }

  ngOnInit(): void {
    this.valorTaxa = "R$68,00";
  }

  checkBtn() {
    if (this.intervalo !== "" && this.dtInicio !== "" && this.dtFim !== "") {
      return false;
    } else {
      return true;
    }
  }

  onChooseMinutes(event: any) {
    this.intervalo = event.value;
  }

  compareDates() {
    if (this.dtInicio && this.dtFim) {
      if (this.dtInicio > this.dtFim) {
        this.alert.alertData().then(r => {
          this.dtInicio = '';
          this.dtFim = '';
        });
      }
    }
  }

  alterarCadastro() {
    this.telaAlterarEmail = true;
  }

  voltar() {
    this._router.navigate([PATHS.servicos, PATHS.historicoConsumo]);
  }

  continuar() {
    let data: NavigationExtras = {
      queryParams: {
        "protocolo": "123456789",
        "titulo": "A sua solicitação foi enviada com sucesso!",
        "tituloH4": "DADOS",
        "solicitacaoTipo": "Memória de massa",
        "infos": [
          {
            "label": "UNIDADE CONSUMIDORA",
            "data": this._user.uc
          },
          {
            "label": "ENDEREÇO",
            "data": this._user.enderecoCompleto
          },
          {
            "label": "DATA INICIAL",
            "data": convertDates(this.dtInicio),
          },
          {
            "label": "DATA FINAL",
            "data": convertDates(this.dtFim),
          },
          {
            "label": "INTERVALO",
            "data": this.intervalo,
          },
          {
            "label": "EMAIL CADASTRADO",
            "data": this.entregaFatura,
          },
          {
            "label": "VALOR DA TAXA",
            "data": this.valorTaxa,
          }
        ],
      },
      skipLocationChange: false,
      fragment: 'top'
    };
    this._router.navigate(['servicos', 'data-certa', 'solicitacao-enviada'], {
      state: { detalhesSolicitacao: data }
    });
  }

  eventoEmail(event: any) {
    if (event != null || event != '') {
      this.telaAlterarEmail = false;
      this.entregaFatura = event;
    }
  }
}
