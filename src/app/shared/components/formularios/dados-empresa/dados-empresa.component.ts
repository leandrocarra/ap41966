import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dados-empresa',
  templateUrl: './dados-empresa.component.html',
  styleUrls: ['./dados-empresa.component.scss']
})
export class DadosEmpresaComponent implements OnInit {

  @Input() dados: any;
  @Output() formEmpresaValidado: EventEmitter<boolean> = new EventEmitter<boolean>()
  public formDadosEmpresa!: FormGroup;
  
  constructor(
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {

    this.formDadosEmpresa = this.createForm();
    this.validarFormsEmpresa();
  }

  createForm(): FormGroup {
    return this._formBuilder.group({
      cnpj: [
        {
          value: this.dados.cnpj,
          disabled: true
        },
        [
          Validators.required
        ]
      ],

      razaoSocial: [
        {
          value: this.dados.razaoSocial,
          disabled: true
        },
        [
          Validators.required,
        ]
      ],

      atividadeFiscal: [
        {
          value: this.dados.atividadeFiscal,
          disabled: true
        },
        [
          Validators.required,
        ]
      ],

      nomeFantasia: [
        {
          value: this.dados.nomeFantasia,
          disabled: true
        },
        [
          Validators.required,
        ]
      ],

      inscricaoMunicipal: [
        {
          value: this.dados.inscricaoMunicipal,
          disabled: false
        },
        [
          Validators.required,
        ]
      ],

      inscricaoEstadual: [
        {
          value: this.dados.inscricaoEstadual,
          disabled: false
        },
    
      ],
    });
  }

  validarFormsEmpresa(): void{
    if (this.formDadosEmpresa.invalid){
      this.formEmpresaValidado.emit(false);
    }else{
      this.formEmpresaValidado.emit(true);
    }

}

}
