import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent {
  @Input() endereco: any;
  @Input() disableAll?: boolean;
  @Input() disableNum?: boolean;
  @Input() disableComplemento?: boolean;
  public dadosEnderecoFormGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.disableNum = this.disableNum === null ? true : this.disableNum;
    this.disableComplemento = this.disableComplemento === null ? true : this.disableComplemento;
    this.dadosEnderecoFormGroup = this._formBuilder.group({
      numero: ['', [Validators.required]],
    })
  }
}
