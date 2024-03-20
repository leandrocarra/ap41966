import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'app/core/services/user/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): any {
    if (form?.control.controls.email) {
      if (form.control.controls.email.value && control?.value !== form.control.controls.email.value) {
        return true;
      }
    }
  }
}

@Component({
  selector: 'app-email-recebimento',
  templateUrl: './email-recebimento.component.html',
  styleUrls: ['./email-recebimento.component.scss']
})

export class EmailRecebimentoComponent implements OnInit, OnDestroy {
  @Input() servico: any;
  @Output() eventoEmail = new EventEmitter();

  emailFormGroup!: FormGroup;
  matcher = new MyErrorStateMatcher();

  emailValue: string = '';
  confirmEmailValue: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    public user: UserService
    ) {

  }

  ngOnInit() {
    this.validatorsEmailFormGroup();
  }

  validatorsEmailFormGroup() {
    this.emailFormGroup = this._formBuilder.group({
      email: ['', Validators.email],
      confirmEmail: ['']
    });
  }

  voltar() {
    this.eventoEmail.emit('voltar');
  }

  continuar() {
    this.eventoEmail.emit(this.emailValue);
  }

  ngOnDestroy() {

  }
}