import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarifaSocialService } from 'app/core/services/tarifa-social/tarifa-social.service';

@Component({
  selector: 'app-dados-beneficio',
  templateUrl: './dados-beneficio.component.html',
  styleUrls: ['./dados-beneficio.component.scss']
})
export class DadosBeneficioComponent implements OnInit {

  @Input() beneficio!: string;
  @Input() disabledForm!: boolean;
  @Input() changeTitular!: boolean;
  @Output() formDadosBeneficioValidado: EventEmitter<boolean> = new EventEmitter<boolean>();

  formDadosBeneficio!: FormGroup;
  formDadosBeneficioBPC!: FormGroup;


  constructor(
    private _formBuilder: FormBuilder,
    private _tarifaSocialService: TarifaSocialService
  ) { }

  ngOnInit(): void {
    if (this.beneficio === 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA') {
      this.formDadosBeneficioBPC = this.createFormDadosBeneficioBPC();
    } else {
      this.formDadosBeneficio = this.createFormDadosBeneficio();
    }
    this.validarForms();
  }



  ngOnChanges() {
    console.log('DISABLED :' + this.disabledForm);
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
    }
  }

  createFormDadosBeneficio(): FormGroup {
    return this._formBuilder.group({
      nis: [
        {
          value: "",
          disabled: this.disabledForm,
        },
        [
          Validators.required
        ]
      ],
      codigoFamiliar: [
        {
          value: "",
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
          value: "",
          disabled: this.disabledForm,
        },
        [
          Validators.required
        ]
      ],
    })
  }

  deParaDadosBeneficioBPC() {
    let dadosBeneficio = this._tarifaSocialService.getDadosTarifaSocial.dadosBeneficio;
    dadosBeneficio!.nb = this.formDadosBeneficioBPC.value.nb;
  }

  deParaDadosBeneficio() {
    let dadosBeneficio = this._tarifaSocialService.getDadosTarifaSocial.dadosBeneficio;
    dadosBeneficio!.nis = this.formDadosBeneficio.value.nis;
    dadosBeneficio!.codigoFamiliar = this.formDadosBeneficio.value.codigoFamiliar
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
