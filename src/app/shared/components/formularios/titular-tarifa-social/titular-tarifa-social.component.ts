import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarifaSocialService } from 'app/core/services/tarifa-social/tarifa-social.service';


@Component({
  selector: 'app-titular-tarifa-social',
  templateUrl: './titular-tarifa-social.component.html',
  styleUrls: ['./titular-tarifa-social.component.scss']
})
export class TitularTarifaSocialComponent implements OnInit {

  @Input() disabledForm!: boolean;
  @Input() changeTitular!: boolean;
  @Output() formTitularTarifaSocialValidado: EventEmitter<boolean> = new EventEmitter<boolean>();

  formTitularTarifaSocial!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _tarifaSocialService: TarifaSocialService
  ) { }

  ngOnInit(): void {
    this.formTitularTarifaSocial = this.createForm();
    this.validarForms();
  }

  ngOnChanges() {
    if (!this.disabledForm && this.formTitularTarifaSocial !== undefined) {
      this.formTitularTarifaSocial.patchValue({
        nome: "",
        dataNascimento: "",
        cpf: "",
        rg: "",
      })
      setTimeout(() => {
        this.formTitularTarifaSocial.enable();
      }, 100);
    }
  }

  createForm(): FormGroup {
    return this._formBuilder.group({
      nome: [
        {
          value: "",
          disabled: this.disabledForm,
        },
        [
          Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])
        ]
      ],
      dataNascimento: [
        {
          value: "",
          disabled: this.disabledForm,
        },
        [
          Validators.compose([
            Validators.required,
            // ValidatorsClass.compararDataAtual({ dataNascimento: true }),
          ])
        ]
      ],
      cpf: [
        {
          value: "",
          disabled: this.disabledForm,
        },
        [
          Validators.compose([
            Validators.required,
            // validarCpfOuCnpjControl
          ])
        ]
      ],
      rg: [
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

  deParaDadosTitularTarifaSocial() {
    let dadosTitularTarifaSocial = this._tarifaSocialService.getDadosTarifaSocial.dadosTitularTarifaSocial;
    dadosTitularTarifaSocial!.nomeCompleto = this.formTitularTarifaSocial.value.nome;
    dadosTitularTarifaSocial!.dtNascimento  = this.formTitularTarifaSocial.value.dataNascimento;
    dadosTitularTarifaSocial!.cpf = this.formTitularTarifaSocial.value.cpf;
    dadosTitularTarifaSocial!.rg = this.formTitularTarifaSocial.value.rg;
  }

  validarForms(): void {
    if (this.formTitularTarifaSocial.invalid) {
      this.formTitularTarifaSocialValidado.emit(false);
    } else {
      this.deParaDadosTitularTarifaSocial();
      this.formTitularTarifaSocialValidado.emit(true);
    }
  }

}
