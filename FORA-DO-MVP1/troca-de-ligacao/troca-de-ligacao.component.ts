import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-troca-de-ligacao',
  templateUrl: './troca-de-ligacao.component.html',
  styleUrls: ['./troca-de-ligacao.component.scss']
})
export class TrocaDeLigacaoComponent implements OnInit {

  opcoes: Array<string>;
  opcoesART: Array<string>;
  categorias: string[];
  trocarLigacao: string;
  possuiCargasEspeciais: string;
  possui220: string;
  possuiART: string;
  categoria: string;
  myFiles: Array<any> = [];
  arquivo: any;
  toolTipsCategoria;
  navExtra!: NavigationExtras;

  constructor(
    private _router: Router,
    public userService: UserService,

  ) {
    this.trocarLigacao = "";
    this.possuiCargasEspeciais = "";
    this.possui220 = "";
    this.possuiART = "";
    this.categoria = "";

    this.toolTipsCategoria = this.tooltip();
    
    this.opcoes = [
      'NÃO',
      'SIM'
    ];

    this.opcoesART = [
      'NÃO SEI',
      'NÃO',
      'SIM'
    ];

    this.categorias = [
      'MONOFÁSICA',
      'BIFÁSICA',
      'TRIFÁSICA'
    ];

  }

  ngOnInit(): void {
  }

  validacao(): boolean {

    if (this.trocarLigacao !== undefined) {
      if (this.trocarLigacao === 'NÃO') {
        return false;

      } else {
        if (this.possuiART === 'SIM') {
          return this.validarArt();
          
        } else {
          return this.validarNaoTemArt();
        }
      } 
      
    }else{ 
      return true;
    }
  }

  validarArt(): boolean {
    this.possuiCargasEspeciais = '';
    this.possui220 = '';
    return (this.categorias.includes(this.categoria) && this.myFiles.length > 0) ? false : true;

  }

  validarNaoTemArt(): boolean {
    this.categoria = '';
    if (this.possuiCargasEspeciais === 'SIM') {
      return false;
    } else {
      return this.possui220 === '' || this.possui220 === undefined ? true : false;
    }
  }

  voltar(): void {
  }

  continuar(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }

  recebeAnexos(file: any): void {
    if (file !== undefined) {
      this.myFiles.push(file);
    }
  }

  removeAnexo(file: any): void {
    var indice = this.myFiles.indexOf(file);
    this.myFiles.splice(indice, 1);
  }

  tooltip(): any {
    return {
      'MONOFÁSICA': {
        textoTooltip: '1 a 3 TV(S)\n 1 GELADEIRA\n 1 MICROONDAS \n 1 FERRO DE PASSAR\n 1 MÁQUINA DE LAVAR \n 1 a 3 VENTILADOR(ES)\n 1CHUVEIRO ELÉTRICO'
      },
      'BIFÁSICA': {
        textoTooltip: '1 a 3 TV(S)\n 1 GELADEIRA\n 1 MICROONDAS \n 1 FERRO DE PASSAR\n 1 MÁQUINA DE LAVAR\n 1 MÁQUINA DE SECAR\n 1 TORNEIRA ELÉTRICA \n 1 a 3 VENTILADORES \n 1 FORNO ELÉTRICO\n 2 CHUVEIROS ELÉTRICOS\n 1 a 2 AR-CONDICIONADO(S)'
      },
      'TRIFÁSICA': {
        textoTooltip: '1 a 3 TV(S)\n 1 GELADEIRA\n 1 MICROONDAS \n 1 FERRO DE PASSAR\n 1 MÁQUINA DE LAVAR\n 1 MÁQUINA DE SECAR\n 1 TORNEIRA ELÉTRICA \n 1 a 3 VENTILADORES \n 1 FORNO ELÉTRICO\n 3 CHUVEIROS ELÉTRICOS \n 3 a 4 AR-CONDICIONADO(S)'
      }
    }
  }
}


