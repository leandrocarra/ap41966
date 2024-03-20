import { Location } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DadosPagamento } from '../../../../../../core/models/dados-pagamento/dados-pagamento';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { configureMenuByWindowSize } from "../../../../../../core/services/utils/neo-utils.service";
import { DadosPagamentoService } from '../../../../../../core/services/dados-pagamento/dados-pagamento.service';

@Component({
  selector: 'neo-pagamento-fatura-digital',
  templateUrl: './pagamento-fatura-digital.component.html',
  styleUrls: ['./pagamento-fatura-digital.component.scss']
})
export class PagamentoFaturaDigitalComponent implements OnInit {

  formaRecebimentosArray = ['NO IMÓVEL', 'EM UM IMÓVEL ALTERNATIVO', 'CAIXA POSTAL'];
  habilitarAvancar: boolean = false;
  dadosPagamento: DadosPagamento;
  formEmailFaturaDigital!: FormGroup;
  tarifaAdicional: string;
  mobile: boolean;

  constructor(
    private _router: Router,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _userServiceLN: UserServiceLN,
    private _etapaService: DadosPagamentoService,
  ) {
    this.dadosPagamento = this._etapaService.dadosPagamento;
    this.formEmailFaturaDigital = this.createForm();
    this.tarifaAdicional = '';
    this.mobile = configureMenuByWindowSize(window.screen.width);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  ngOnInit(): void {
    this.carregaPerguntas();
    this.getTarifaAlternativa();
  }

  createForm(): FormGroup {
    return this._formBuilder.group({
      email: [
        {
          value: this._userServiceLN.sessionUser?.email ? this._userServiceLN.sessionUser?.email.toUpperCase() : '',
          disabled: false,
        },
        [
          Validators.email,
        ]
      ],
    });
  }

  carregaPerguntas(): void {
    return this.dadosPagamento.faturaDigital == "Não" ? this.setReceberEmail('Não') : this.setReceberEmail('Sim');
  }

  changeEmail(): void {
    if (this.dadosPagamento.faturaDigital === 'Sim') {
      this.habilitarAvancar = this.formEmailFaturaDigital.valid;
    } else {
      this.habilitarAvancar = false;
    }
  }

  setReceberEmail(receberEmail: string): void {
    this.dadosPagamento.faturaDigital = receberEmail;
    if (this.formEmailFaturaDigital.value.email !== '' && receberEmail === 'Sim') {
      this.habilitarAvancar = true;
    } else if (receberEmail === 'Não') {
      this.habilitarAvancar = false;
    } else {
      this.habilitarAvancar = false;
    }
  }

  getTarifaAlternativa(): void {
    this._etapaService.taxaEntregaAlternativa().subscribe(r => {
      this.tarifaAdicional = r.toString().trim();
      if (this.tarifaAdicional.length == 3) {
        this.tarifaAdicional = [this.tarifaAdicional.slice(0, 1), ',', this.tarifaAdicional.slice(1)].join('').replace('.', '');
      }
      else if (this.tarifaAdicional.length == 4) {
        this.tarifaAdicional = [this.tarifaAdicional.slice(0, 2), ',', this.tarifaAdicional.slice(2)].join('').replace('.', '');
      }
    });
  }

  receberDados(desbloquearBtn: boolean): void {
    this.habilitarAvancar = desbloquearBtn ? true : false;
  }

  voltar(): void {
    this._location.back();
  }

  avancar(): void {
    if (this.dadosPagamento.faturaDigital === 'Sim') {
      this.dadosPagamento.emailRecebimento = this.formEmailFaturaDigital.value.email;
    }
    this._router.navigate(['ligacao-nova', 'pagamento', 'debito-automatico']);
  }
}
