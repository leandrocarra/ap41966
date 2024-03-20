import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadosDaLigacaoService } from '../../../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';

@Component({
  selector: 'neo-dados-beneficio',
  templateUrl: './dados-beneficio.component.html',
  styleUrls: ['./dados-beneficio.component.scss']
})
export class DadosBeneficioComponent implements OnInit, OnChanges {
  @Input() beneficio: string;
  @Input() disabledForm: boolean;
  @Input() changeTitular: boolean;
  @Output() formDadosBeneficioValidado: EventEmitter<boolean> = new EventEmitter<boolean>();
  formDadosBeneficio!: FormGroup;
  formDadosBeneficioBPC!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _etapaService: DadosDaLigacaoService
  ) {
    this.beneficio = '';
    this.disabledForm = false;
    this.changeTitular = false;
  }

  ngOnInit(): void {
    if (this.beneficio === 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA') {
      this.formDadosBeneficioBPC = this.createFormDadosBeneficioBPC();
    } else {
      this.formDadosBeneficio = this.createFormDadosBeneficio();
    }
    this.validarForms();
  }

  ngOnChanges() {
    if (!this.disabledForm && (this.formDadosBeneficioBPC !== undefined || this.formDadosBeneficio !== undefined)) {
      if (this.beneficio === 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA') {
        this.formDadosBeneficioBPC.patchValue({
          nb: "",
        })
        setTimeout(() => {
          this.formDadosBeneficioBPC.enable();
        }, 100);
      } else {
        this.formDadosBeneficio.patchValue({
          nis: "",
          codigoFamiliar: "",
        })
        setTimeout(() => {
          this.formDadosBeneficio.enable();
        }, 100);
      }

      this.validarForms();
    }
  }

  createFormDadosBeneficio(): FormGroup {
    return this._formBuilder.group({
      nis: [
        {
          value: this._etapaService.dadosDaLigacao.tarifaSocial.dadosBeneficio.nis !== '' ? this._etapaService.dadosDaLigacao.tarifaSocial.dadosBeneficio.nis : '',
          disabled: this.disabledForm,
        },
        [
          Validators.required
        ]
      ],
      codigoFamiliar: [
        {
          value: this._etapaService.dadosDaLigacao.tarifaSocial.dadosBeneficio.codigoFamiliar !== '' ? this._etapaService.dadosDaLigacao.tarifaSocial.dadosBeneficio.codigoFamiliar : '',
          disabled: this.disabledForm,
        },
        [
          Validators.required
        ]
      ],
    })
  }

  createFormDadosBeneficioBPC(): FormGroup {
    return this._formBuilder.group({
      nb: [
        {
          value: this._etapaService.dadosDaLigacao.tarifaSocial.dadosBeneficio.nb !== '' ? this._etapaService.dadosDaLigacao.tarifaSocial.dadosBeneficio.nb : '',
          disabled: this.disabledForm,
        },
        [
          Validators.required
        ]
      ],
    })
  }

  deParaDadosBeneficioBPC() {
    let dadosBeneficio = this._etapaService.dadosDaLigacao.tarifaSocial.dadosBeneficio;
    dadosBeneficio.nb = this.formDadosBeneficioBPC.value.nb;
  }

  deParaDadosBeneficio() {
    let dadosBeneficio = this._etapaService.dadosDaLigacao.tarifaSocial.dadosBeneficio;
    dadosBeneficio.nis = this.formDadosBeneficio.value.nis;
    dadosBeneficio.codigoFamiliar = this.formDadosBeneficio.value.codigoFamiliar
  }

  validarForms(): void {
    if (this.beneficio === 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA') {
      if (this.formDadosBeneficioBPC.invalid) {
        this.formDadosBeneficioValidado.emit(false);
      } else {
        this.deParaDadosBeneficioBPC();
        this.formDadosBeneficioValidado.emit(true);
      }
    } else {
      if (this.formDadosBeneficio.invalid) {
        this.formDadosBeneficioValidado.emit(false);
      } else {
        this.deParaDadosBeneficio();
        this.formDadosBeneficioValidado.emit(true);
      }
    }
  }
}
