import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { UserService } from 'app/core/services/user/user.service';
import { BuscarUc } from '../cadastrar-faturas/cadastrar-faturas.component'

@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.scss']
})
export class EditarGrupoComponent implements OnInit {
  addedGroup: any = []; //Trocar pela interface quando for fazer a integracaO
  finalGroup: any = []; //Trocar pela interface quando for fazer a integracaO
  excludedGroup: any = []; //Trocar pela interface quando for fazer a integracaO

  changed: boolean;
  ativarDados: any; //Trocar pela interface quando for fazer a integracaO
  pageSize = 3;
  problemaRegistrado = false;
  faturasMultiplasRegistro: any;

  constructor(private router: Router,
    public user: UserService,
    public dialog: MatDialog,
    private alert: CustomSweetAlertService,
    private _location: Location) {
    // this.finalGroup = this.router.getCurrentNavigation().extras.state;
    this.changed = false;
  }

  ngOnInit() {
    this.excludedGroup = [];
    this.addedGroup = [];
    this.finalGroup =
    {
      grupo: '1',
      email: 'kelly@gmail.com',
      vencimento: '09',
      ucs: [
        {
          cnpj: '86.973.170/0001-78',
          uc: '408456',
          endereco: 'Rua João José, 1110 - Centro, Limeira',
          cep: '13480-002'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '309544',
          endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
          cep: '13855-040'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '208454',
          endereco: 'Rua João José, 1110 - Centro, Limeira',
          cep: '13480-002'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '109549',
          endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
          cep: '13855-040'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '408456',
          endereco: 'Rua João José, 1110 - Centro, Limeira',
          cep: '13480-002'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '309544',
          endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
          cep: '13855-040'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '208454',
          endereco: 'Rua João José, 1110 - Centro, Limeira',
          cep: '13480-002'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '109549',
          endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
          cep: '13855-040'
        }
        , {
          cnpj: '86.973.170/0001-78',
          uc: '408456',
          endereco: 'Rua João José, 1110 - Centro, Limeira',
          cep: '13480-002'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '309544',
          endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
          cep: '13855-040'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '208454',
          endereco: 'Rua João José, 1110 - Centro, Limeira',
          cep: '13480-002'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '109549',
          endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
          cep: '13855-040'
        }
        , {
          cnpj: '86.973.170/0001-78',
          uc: '408456',
          endereco: 'Rua João José, 1110 - Centro, Limeira',
          cep: '13480-002'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '309544',
          endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
          cep: '13855-040'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '208454',
          endereco: 'Rua João José, 1110 - Centro, Limeira',
          cep: '13480-002'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '109549',
          endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
          cep: '13855-040'
        }
        , {
          cnpj: '86.973.170/0001-78',
          uc: '408456',
          endereco: 'Rua João José, 1110 - Centro, Limeira',
          cep: '13480-002'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '309544',
          endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
          cep: '13855-040'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '208454',
          endereco: 'Rua João José, 1110 - Centro, Limeira',
          cep: '13480-002'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '109549',
          endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
          cep: '13855-040'
        }
        , {
          cnpj: '86.973.170/0001-78',
          uc: '408456',
          endereco: 'Rua João José, 1110 - Centro, Limeira',
          cep: '13480-002'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '309544',
          endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
          cep: '13855-040'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '208454',
          endereco: 'Rua João José, 1110 - Centro, Limeira',
          cep: '13480-002'
        },
        {
          cnpj: '86.973.170/0001-78',
          uc: '109549',
          endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
          cep: '13855-040'
        }
      ]
    }


    this.mostrarDadosPorPagina(this.finalGroup.ucs);
  }

  mostrarDadosPorPagina(data: any) {
    this.ativarDados = data.slice(0, this.pageSize);
  }

  eventPagination(event: any, index: any) {
    this.ativarDados = event;
  }

  voltar(): void {
    this._location.back();
  }

  confirmar(): void {
    this.problemaRegistrado = true;
    this.faturasMultiplasRegistro = [
      {
        "label": "UNIDADES CONSUMIDORAS",
        "data": ""
      },
      {
        "label": "UC1",
        "data": "0067171982"
      },
      {
        "label": "UC2",
        "data": "0067171983"
      },
      {
        "label": "UC3",
        "data": "0067171984"
      },
      {
        "label": "E-MAIL CADASTRADO",
        "data": "joaovicente@gmail.com"
      },
      {
        "label": "DATA DE VENCIMENTO",
        "data": "08/2021"
      },

    ];
  }

  revert(excluded: any): void {
    this.finalGroup.ucs.push(excluded);
    this.mostrarDadosPorPagina(this.finalGroup.ucs);

    this.excludedGroup.forEach((element: any, index: any) => {
      if (element === excluded) {
        this.excludedGroup.splice(index, 1);
      }
    });

  }

  adicionarUnidade() {
    let dialogRef = this.dialog.open(BuscarUc, {
      maxHeight: '90vh',
      data: { nomeGrupo: 'GRUPO 1' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        result.forEach((element: any) => {
          this.addedGroup.push(element);
        });
        this.changed = true;
      }
    });
  }

  removerSelecinado(unidade: any, grupo: any) {
    this.alert.alertRemoverUc(unidade.uc).then((r) => {
      if (r.dismiss) {
        this.alert.ucRemovida();
        if (grupo === 'original') {
          this.excludedGroup.push(unidade);
          this.ativarDados.forEach((element: any, index: any) => {
            if (element === unidade) {
              this.finalGroup.ucs.splice(index, 1);
            }
          });
        } else {
          this.addedGroup.forEach((element: any, index: any) => {
            if (element === unidade) {
              this.addedGroup.splice(index, 1);
            }
          });
        }
        this.mostrarDadosPorPagina(this.finalGroup.ucs);
        this.changed = true;
      }
    });
  }

  excluirGrupo() {
    this.alert.alertExcluirGrupo().then((r) => {
      if (r.dismiss) {
        this.alert.grupoExcluido();
      }
    });
  }

}
