import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadosDaLigacaoService } from '../../../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { validarCpfOuCnpjControl } from '../../../../../../../../core/services/utils/neo-utils.service';
import { ValidatorsClass } from '../../../../../../../../core/services/validators/validators';


@Component({
  selector: 'neo-titular-tarifa-social',
  templateUrl: './titular-tarifa-social.component.html',
  styleUrls: ['./titular-tarifa-social.component.scss']
})
export class TitularTarifaSocialComponent implements OnInit, OnChanges {
  @Input() disabledForm: boolean;
  @Input() changeTitular: boolean;
  @Output() formTitularTarifaSocialValidado: EventEmitter<boolean> = new EventEmitter<boolean>();
  formTitularTarifaSocial!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _etapaService: DadosDaLigacaoService,
  ) {
    this.disabledForm = false;
    this.changeTitular = false;
  }

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
      this.validarForms();
    }
  }

  createForm(): FormGroup {
    return this._formBuilder.group({
      nome: [
        {
          value: this._etapaService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.nomeCompleto !== '' ? this._etapaService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.nomeCompleto : '',
          disabled: this.disabledForm,
        },
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      dataNascimento: [
        {
          value: this._etapaService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.dtNascimento !== '' ? this._etapaService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.dtNascimento : '',
          disabled: this.disabledForm,
        },
        [
          Validators.required,
          ValidatorsClass.compararDataAtual({ dataNascimento: true }),
        ]
      ],
      cpf: [
        {
          value: this._etapaService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.cpf !== '' ? this._etapaService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.cpf : '',
          disabled: this.disabledForm,
        },
        [
          Validators.required,
          validarCpfOuCnpjControl
        ]
      ],
      rg: [
        {
          value: this._etapaService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.rg !== '' ? this._etapaService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.rg : '',
          disabled: this.disabledForm,
        },
        [
          Validators.required
        ]
      ],
    })
  }

  deParaDadosTitularTarifaSocial() {
    let dadosTitularTarifaSocial = this._etapaService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial;
    dadosTitularTarifaSocial.nomeCompleto = this.formTitularTarifaSocial.value.nome;
    dadosTitularTarifaSocial.dtNascimento = this.formTitularTarifaSocial.value.dataNascimento;
    dadosTitularTarifaSocial.cpf = this.formTitularTarifaSocial.value.cpf;
    dadosTitularTarifaSocial.rg = this.formTitularTarifaSocial.value.rg;
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
