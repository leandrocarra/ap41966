import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/core/services/user/user.service';
import { aplicarMascaraCelular, aplicarMascaraTelefone, ESTADOS, ORGAOS_EMISSORES } from 'app/core/services/utils/neo-utils.service';

@Component({
  selector: 'app-dados-pessoais-troca',
  templateUrl: './dados-pessoais-troca.component.html',
  styleUrls: ['./dados-pessoais-troca.component.scss']
})
export class DadosPessoaisTrocaComponent implements OnInit {


  dadosPessoaisFormGroup!: FormGroup;

  estados: any[] = ESTADOS;
  orgaosEmissores: any[] = ORGAOS_EMISSORES;
  tiposDocumentos: any[] = ["RG", "Passaporte", "Carteira de trabalho"];

  mascaraTelefone: string = '';
  mascaraCelular: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    public user: UserService,
  ) { }

  ngOnInit(): void {

    this.dadosPessoaisFormGroup = this._formBuilder.group({
      nomeCompleto: ['',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      dataNascimento: ['',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      celular: ['',
        [
          Validators.required,
          Validators.maxLength(11)
        ]
      ],
      telefone: ['',
        [
          Validators.maxLength(10)
        ]
      ],
      tipoDocumento: ['',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      documento: ['',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      orgaoEmissor: ['',
        [
          Validators.minLength(2)
        ]
      ],
      estado: ['',
        [
          Validators.minLength(2)
        ],
      ],
    });
  }


  getTelMask(): void {
    this.mascaraTelefone = aplicarMascaraTelefone();
  }

  getCelMask(): void {
    this.mascaraCelular = aplicarMascaraCelular();
  }

  voltar(): void {
    this._location.back();
  }

  continuar(): void {
    console.log('clicou em continuar');
  }
}