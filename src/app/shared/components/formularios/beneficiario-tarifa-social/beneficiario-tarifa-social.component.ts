import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/core/services/user/user.service';
import { cpfCnpj } from 'app/core/services/utils/neo-utils.service';

@Component({
  selector: 'app-beneficiario-tarifa-social',
  templateUrl: './beneficiario-tarifa-social.component.html',
  styleUrls: ['./beneficiario-tarifa-social.component.scss']
})
export class BeneficiarioTarifaSocialComponent implements OnInit {


  @Input() disabledForm!: boolean;
  @Input() changeTitular!: boolean;
  @Output() formBeneficiarioValidado: EventEmitter<boolean> = new EventEmitter<boolean>()

  formDadosBeneficiario!: FormGroup;
  
  // titular: boolean = true;
  // resetDados: boolean = false;
  // docsNecessarios: any[];
  // anexos: any[] = [];
 
  constructor(
    private _formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
   
    this.formDadosBeneficiario = this.createForm();
    this.validarForms();
  }

  ngOnChanges(){
    if (!this.disabledForm && this.formDadosBeneficiario !== undefined) {
      this.formDadosBeneficiario.patchValue({
        nome: "",
        dataNascimento: "",
        cpf: "",
        rg: "",
      })
      setTimeout(() => {
        this.formDadosBeneficiario.enable();
      }, 100);
    }
  }

  createForm(): FormGroup{
    return this._formBuilder.group({
      nome: [
        {
          value: "",
          disabled: this.disabledForm
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
        ])
          
        ]
      ],
      cpf:[
        {
          value: "",
          disabled: this.disabledForm,
        },
        [
          Validators.required,
          cpfCnpj
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

  validarForms(): void{
    if (this.formDadosBeneficiario.invalid){
      this.formBeneficiarioValidado.emit(false);
    }else{
      this.formBeneficiarioValidado.emit(true);
    }
  }




}
