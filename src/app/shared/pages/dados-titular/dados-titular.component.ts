import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-dados-titular',
  templateUrl: './dados-titular.component.html',
  styleUrls: ['./dados-titular.component.scss']
})
export class DadosTitularComponent implements OnInit {
 
  public isCPF!: boolean;
  public formCPFValidado!: boolean;
  public formCNPJValidado!: boolean;


  constructor(
    public user: UserService,
  ) {   }

  

  ngOnInit(): void {
    this.isCPF = (this.user.tipoDocumento === "CPF") ? true : false;
  }

  formSolicitanteValidado(event: any):  void{
    this.formCPFValidado= event;
    this.isDisabled();
  }

  formEmpresaValidado(event: any): void{
    this.formCNPJValidado= event;
    this.isDisabled();
  }

  isDisabled(): boolean{
    if(this.isCPF){
      return !this.formCPFValidado;
    }else{
      return (this.formCPFValidado && this.formCNPJValidado) ? false : true;
    }
  }

  continuar(): void{

  }

  voltar(): void {

  }



}
