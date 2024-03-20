import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { environment } from "@environments/environment";
import { Distribuidora } from 'app/core/enums/distribuidoras';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';

@Component({
  selector: 'app-informar-imovel-troca',
  templateUrl: './informar-imovel-troca.component.html',
  styleUrls: ['./informar-imovel-troca.component.scss']
})
export class InformarImovelTrocaComponent implements OnInit {

  informarTrocaFormGroup!: FormGroup;
  tipoInput: any;
  isDisabled: boolean = true;
  minLength: number = 8;
  maxLength: number = 20;

  endereco: any = [];
  hasDebitoUC: boolean = true;
  navExtra!: NavigationExtras; 

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activedRouter: ActivatedRoute,
    private _location: Location
  ) {

    this.endereco.cep = "13500-000";
    this.endereco.logradouro = "Rua Vicente Carlos";
    this.endereco.bairro = "Pitangueiras";
    this.endereco.cidade = "Guarujá";
    this.endereco.estado = "SP";
    this.endereco.numero = "123";

        
    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {        
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });
    console.log(this.navExtra);
   }

  ngOnInit(): void {
    this.informarTrocaFormGroup = this._formBuilder.group({
      optionSelected: ['', [Validators.required]],
      inputValue: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
    });
  }

  voltar(): void {
    if (this.navExtra.state!.fluxoPendencia === 'pendencia-novo-titular') {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'pendencias-em-aberto'], this.navExtra);
    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'escolha-titular'], this.navExtra);
    }
  }

  continuar(): void {
    this.preencherDadosImovel();
    if(this.hasDebitoUC) {
      this.navExtra.state!.fluxoPendencia = 'pendencia-novo-uc';
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'pendencias-em-aberto'], this.navExtra);
    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'documento-com-foto'], this.navExtra);
    }
  }

  onChange(): void {
    this.informarTrocaFormGroup.controls.inputValue.setValue('');
  }

  preencherDadosImovel() {
    if (this.tipoInput.value === 'uc') {
      this.navExtra.state!.ucImovel = this.informarTrocaFormGroup.controls.inputValue.value;
    } else {
      this.navExtra.state!.numeroDoMedidor = this.informarTrocaFormGroup.controls.inputValue.value;
    }
    this.navExtra.state!.dadosImovel = this.endereco;
  }

  changeTipoInput(option: any): void {
    const toBeReturned = {
      value: option.value,
      label: option.source._elementRef.nativeElement.innerText.toUpperCase(),
      labelInvalido: option.source._elementRef.nativeElement.innerText,
    }
    this.tipoInput = toBeReturned;
    this.validaLengthsInput();
    return this.tipoInput;
  }

  validaLengthsInput(): void {
    if (this.tipoInput.value == 'uc') {
      this.minLength = 10;
    } else {
      this.minLength = 10;
      if (environment.title !== Distribuidora.ELEKTRO) { // região 
        this.maxLength = 18
      } else {
        this.maxLength = 20;
      }
    }
  }

}
