import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { SelecaoCombo } from 'app/core/models/selecaoComboDTO/selecao-combo';
import { CalculadoraUtilsService } from 'app/core/services/calculadora/calculadora-utils.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-selecao-combo',
  templateUrl: './selecao-combo.component.html',
  styleUrls: ['./selecao-combo.component.scss']
})
export class SelecaoComboComponent implements OnInit {
  navExtra!: NavigationExtras;
  disableButtonTwo: boolean = true;
  formCombo: FormGroup;
  combo: any;
  infos!: SelecaoCombo[];


  constructor(
    private _router: Router,
    public user: UserService,
    private calculadoraUtils: CalculadoraUtilsService,
    private _formBuilder: FormBuilder
  ) {
    this.formCombo = this.createForm();
   }
  
  ngOnInit(): void {

    this.infos = [
      {
        imagem: "assets/images/res1.svg",
        imagem_select: "assets/images/res1on.svg",
      },
      {
        imagem: "assets/images/res2.svg",
        imagem_select: "assets/images/res2on.svg" 
      },
      {
        imagem: "assets/images/res3.svg",
        imagem_select: "assets/images/res3on.svg" 
      },
      {
        imagem: "assets/images/res4.svg",
        imagem_select: "assets/images/res4on.svg" 
      },
      {
        imagem: "assets/images/CALC.svg",
      }
    ]
   }
  

  createForm(): FormGroup{
    return this._formBuilder.group({
      tarifa: ['', [Validators.required]]
    });

  }

  setCombo(index: number): void {
		this.combo = this.calculadoraUtils.getcombo(index);
    console.log(this.combo)
	}
  
  continuar(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }

  voltar(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }
}