import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { configureMenuByWindowSize } from '../../../core/services/utils/neo-utils.service';
import { ValidatorsClass } from '../../../core/services/validators/validators';

@Component({
  selector: 'neo-validar-senhas',
  templateUrl: './validar-senhas.component.html',
  styleUrls: ['./validar-senhas.component.scss']
})

export class ValidarSenhasComponent {
  @Input() nomeLabel: string;
  @Input() isRecuperarSenha: boolean;
  @Output() output: EventEmitter<string | null>;
  hideSenha = true;
  hideConfirmarSenha = true;
  formSenha!: FormGroup;
  tamanhoPattern = 8;
  mobile: boolean;
  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.nomeLabel = '';
    this.isRecuperarSenha = false;
    this.output = new EventEmitter<string | null>();
    this.mobile = configureMenuByWindowSize(window.screen.width);
    this.formSenha = this.criarFormSenha();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  criarFormSenha(): FormGroup {
    return this._formBuilder.group({
      senha: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          ValidatorsClass.customRegex(/[A-Z]/, { hasUpperCase: true }),
          ValidatorsClass.customRegex(/\d/, { hasNum: true }),
        ])
      ],
      confirmarSenha: ['',
        Validators.compose([
          Validators.required,
        ])
      ]
    },
      {
        validators: [ValidatorsClass.senhasIguais]
      },
    )
  }

  checkAll(): void {
    if (this.formSenha.valid) {
      this.output.emit(this.formSenha.value.senha);
    } else {
      this.output.emit(null);
    }
  }
}
