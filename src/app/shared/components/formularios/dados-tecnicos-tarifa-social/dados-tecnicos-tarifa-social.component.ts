import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dados-tecnicos-tarifa-social',
  templateUrl: './dados-tecnicos-tarifa-social.component.html',
  styleUrls: ['./dados-tecnicos-tarifa-social.component.scss']
})
export class DadosTecnicosTarifaSocialComponent implements OnInit {


  @Input() beneficio!: string;
  @Input() disabledForm!: boolean;
  @Input() changeTitular!: boolean;
  @Output() formDadosBeneficioValidado:  EventEmitter<boolean> = new EventEmitter<boolean>()

  formDadosBeneficio!: FormGroup;
  formDadosBeneficioBPC!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.beneficio === 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA') {
      this.formDadosBeneficioBPC = this.createFormDadosBeneficioBPC();
    } else {
      this.formDadosBeneficio = this.createFormDadosBeneficio();
    }
    this.validarFormularios();
  }

  ngOnChanges(){
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


  
  validarFormularios(): void {
    if (this.beneficio === 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA') {
      if (this.formDadosBeneficioBPC.invalid) {
        this.formDadosBeneficioValidado.emit(false);
      } else {
        this.formDadosBeneficioValidado.emit(true);
      }
    } else {
      if (this.formDadosBeneficio.invalid) {
        this.formDadosBeneficioValidado.emit(false);
      } else {
        this.formDadosBeneficioValidado.emit(true);
      }
    }
  }




  

 













}
