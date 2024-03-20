import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-manter-caracteristicas-ligacao-troca',
  templateUrl: './manter-caracteristicas-ligacao-troca.component.html',
  styleUrls: ['./manter-caracteristicas-ligacao-troca.component.scss']
})
export class ManterCaracteristicasLigacaoTrocaComponent implements OnInit {

  mobile: boolean = false;
  seguirCaracButton!: string;
  alterarCaracButton!: string;

  perfilLigacao!: string;
  categoriaLigacao!: string;
  tarifa!: string;



  constructor(
    public user: UserService,
  ) {
    console.log('');
  }

  ngOnInit(): void {
    this.mobile = (window.screen.width <= 768) ? true : false;
    this.seguirCaracButton = (this.mobile) ? "CONTINUAR" : "SEGUIR COM AS CARACTERÍSTICAS";
    this.alterarCaracButton = (this.mobile) ? "ALTERAR" : "DESEJO ALTERAR AS CARACTERÍSTICAS";

    this.perfilLigacao = 'Comercial';
    this.categoriaLigacao = 'Bifásico';
    this.tarifa = 'Convencional';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.configureMenuByWindowSize(event.target.innerWidth);
  }

  configureMenuByWindowSize(width: any): void {
    this.mobile = (width <= 768) ? true : false;
    this.seguirCaracButton = (this.mobile) ? "CONTINUAR" : "SEGUIR COM AS CARACTERÍSTICAS";
    this.alterarCaracButton = (this.mobile) ? "ALTERAR" : "DESEJO ALTERAR AS CARACTERÍSTICAS";
  }

  alterarCaracteristicas(): void {
    console.log('btn alterarCaracteristicas clicado');
  }


  seguirCaracteristicas(): void {
    console.log('btn seguirCaracteristicas clicado');
  }

}
