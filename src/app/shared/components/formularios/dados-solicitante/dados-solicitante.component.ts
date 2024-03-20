import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/core/services/user/user.service';
import { aplicarMascaraCelular, aplicarMascaraTelefone, cpfCnpj, ESTADOS, GENERO, NeoUtilsService } from 'app/core/services/utils/neo-utils.service';

@Component({
  selector: 'app-dados-solicitante',
  templateUrl: './dados-solicitante.component.html',
  styleUrls: ['./dados-solicitante.component.scss']
})
export class DadosSolicitanteComponent implements OnInit {

  @Input() dados: any;
  @Output() formSolicitanteValidado: EventEmitter<boolean> = new EventEmitter<boolean>()
  
  public estados: any[] = ESTADOS;
  public genero: any[] = GENERO;
  public isCPF!: boolean;
  public formDadosSolicitante!: FormGroup;
  public mascaraTelefone: string = '';
  public mascaraCelular : string = '';
  public mascaraCpfCnpj : string = '';
 
  constructor(
    private _formBuilder: FormBuilder,
    public utilsService: NeoUtilsService,
    private _userService: UserService

  ) {}

  ngOnInit(): void {
    this.isCPF = (this._userService.tipoDocumento === "CPF") ? true : false;
    this.formDadosSolicitante = this.createForm();
    this.validarForms();

    //chamar funcao primeira vez a fun;áo de mascara etc
    //usar como estudo a dados-pessoais-troca
    this.getTelMask();

    this.getCelMask();

    this.getCpfCnpjMask();
  }

  getTelMask(): void {
    this.mascaraTelefone = aplicarMascaraTelefone();
  }

  getCelMask(): void {
    this.mascaraCelular = aplicarMascaraCelular();
  }

  getCpfCnpjMask(): void {
    this.mascaraCpfCnpj = cpfCnpj(this.formDadosSolicitante.value.cpf);
  }

  createForm(): FormGroup {

    return this._formBuilder.group({

      nomeCompleto: [
        {
          value: this.dados.nome,
          disabled: this.isCPF ? true : false,
        },
        [

          Validators.required,

        ]
      ],

      cpf: [
        {
          value: this.dados.documento,
          disabled: this.isCPF ? true : false,
        },
        [

          Validators.required,


        ],
      ],

      rg: [
        {
          value: this.dados.docSecundario,
          disabled: false,
        },
        [

          Validators.required,

        ],
      ],

      dataNascimento: [
        {
          value: this.dados.dataNascimento,
          disabled: false,
        },
        [

          Validators.required,

        ],
      ],

      genero: [
        {
          value: this.dados.genero,
          disabled: false,
        },
        [

          Validators.required,

        ],
      ],

      orgaoEmissor: [
        {
          value: this.dados.orgaoEmissor,
          disabled: false,
        },
        [
          Validators.required,
        ],
      ],

      estado: [
        {
          value: this.dados.estado,
          disabled: false,
        },
        [
          Validators.required,
        ],
      ],

      email: [
        {
          value: this.dados.email,
          disabled: false,
        },
        [
          Validators.required,
          Validators.email,
        ],
      ],

      telefone: [
        {
          value: this.dados.telefone,
          disabled: false,
        },
      ],

      celular: [
        {
          value: this.dados.celular,
          disabled: false,
        },
      ],

    })
  }

  validarForms(): void{
    if (this.formDadosSolicitante.invalid){
      this.formSolicitanteValidado.emit(false);
    }else{
      this.formSolicitanteValidado.emit(true);
    }
  }

}
