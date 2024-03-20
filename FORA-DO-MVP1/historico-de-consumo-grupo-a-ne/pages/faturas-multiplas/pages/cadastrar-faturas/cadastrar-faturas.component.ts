import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from "@angular/router";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";

export interface DialogData {
    nomeGrupo: string;
}

@Component({
    selector: "app-cadastrar-faturas",
    templateUrl: "./cadastrar-faturas.component.html",
    styleUrls: ["./cadastrar-faturas.component.scss"],
})

export class CadastrarFaturasComponent implements OnInit {
    
    cnpj: string = '41.953.597/0001-76';
    nomeGrupo: string = '';
    data!: string;
    emailRecebimento: string = 'kelly@email.com';
    uc: string = '';
    ucEscolhida: string = '';
    problemaRegistrado = false;
    faturasMultiplasRegistro!: Array<any>;

    constructor(
      public dialog: MatDialog,
      private activatedRoute: ActivatedRoute,
      public router: Router
      ) {
        this.activatedRoute.queryParams.subscribe((params) => {
          if (this.router.getCurrentNavigation()!.extras.state) {
            const dados = this.router.getCurrentNavigation()!.extras?.state;
            this.emailRecebimento = dados?.email;
          }
        });
      }
    
    ngOnInit(): void {
     }

    voltar() {
      this.router.navigate(['home/meus-imoveis']);
    }

    continuar() {
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
        }
      ];
    }

    alterarEmail() {
      this.router.navigateByUrl('faturas-multiplas/alterar-email');
    }

    buscarUC() {
        let dialogRef = this.dialog.open(BuscarUc, {
            width: '900px',
            height: '600px',
            maxWidth: '100vw',
            data: {nomeGrupo: this.nomeGrupo}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            let ucAdicionadas: Array<any> = [];
            result.map((objeto: any) => ucAdicionadas.push(objeto.uc));
            this.ucEscolhida = ucAdicionadas.join(', ');
        });
    }
}

@Component({
    selector: 'buscar-uc',
    templateUrl: 'buscar-uc.component.html',
    styleUrls: ["./buscar-uc.component.scss"],
  })
  export class BuscarUc {
    pageSize = 4;
    ativarDados: any = [];
    imoveisFiltrados: any;
    imovelFilter: any;
    imoveisA: any = [];
    selectItem: boolean = false;

    imovelEscolhido: Array<any> = [];

    @ViewChild(PaginationComponent, { static: false })
    pagination!: PaginationComponent;

    constructor(
      public dialogRef: MatDialogRef<BuscarUc>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) 
    {
      this.ngOngInit();
    }

    imoveis = [
      {
        UnidadeConsumidora: "0067171981",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        
        TipoEmpresa: "Matriz",
        CNPJ: "41.953.597/0001-76",
        Endereco: "R. Sen. Vergueiro, 1110 - Centro, Limeira - SP, 13480-002",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171982",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Matriz",
        CNPJ: "41.953.597/0001-76",
        Endereco: "R. Sen. Vergueiro, 1110 - Centro, Limeira - SP, 13480-002",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171983",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Matriz",
        CNPJ: "41.953.597/0001-76",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171984",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171985",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171986",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171987",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171988",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171989",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171990",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171991",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171992",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171993",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171994",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171994",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
      {
        UnidadeConsumidora: "0067171994",
        uc: '00674189',
        cnpj: '41.953.597/0001-76',
        cep: '13480-003',        TipoEmpresa: "Filial",
        CNPJ: "41.952.593/0001-73",
        Endereco: "R. Paraná, 427 - Vila Rocha, Limeira - SP, 13480-650",
        endereco: 'R. Sen. Vergueiro, 1110 - Centro, Limeira - SP,',
      },
    ];

    ngOngInit() {
      this.ativarDados = this.imoveis.slice(0, this.pageSize);
    }

    search(event: any) {
      this.imoveisFiltrados = this.imoveis.filter((res) => {
        if (
          res.UnidadeConsumidora.toLocaleLowerCase().match(
            this.imovelFilter.toLocaleLowerCase()
          )
        ) {
          return res.UnidadeConsumidora.toLocaleLowerCase().match(
            this.imovelFilter.toLocaleLowerCase()
          );
        } else if (
          res.TipoEmpresa.toLocaleLowerCase().match(
            this.imovelFilter.toLocaleLowerCase()
          )
        ) {
          return res.TipoEmpresa.toLocaleLowerCase().match(
            this.imovelFilter.toLocaleLowerCase()
          );
        } else if (
          res.CNPJ.toLocaleLowerCase().match(
            this.imovelFilter.toLocaleLowerCase()
          )
        ) {
          return res.CNPJ.toLocaleLowerCase().match(
            this.imovelFilter.toLocaleLowerCase()
          );
        } else if (
          res.Endereco.toLocaleLowerCase().match(
            this.imovelFilter.toLocaleLowerCase()
          )
        ) {
          return res.Endereco.toLocaleLowerCase().match(
            this.imovelFilter.toLocaleLowerCase()
          );
        }
      });
  
      this.imoveisA = this.imoveisFiltrados;
      this.ativarDados = this.imoveisFiltrados;
      this.ativarDados = this.imoveisA.slice(0, this.pageSize);
  
      this.pagination.numberPagination(this.imoveisA);
    }

    onSelectAll(event: any) {
      if (this.selectItem == false) {
        this.selectItem = true;
        this.imovelEscolhido.push(this.imoveis);
      } else {
        this.selectItem = false;
      }
    }

    eventPagination(event: any) {
      this.ativarDados = event;
    }

    escolhaUC(imovelEscolhido: any) {
      if (this.imovelEscolhido) {
        let hasAdded = this.imovelEscolhido.includes(imovelEscolhido);
        if (hasAdded) {
          let index = this.imovelEscolhido.indexOf(imovelEscolhido);
          this.imovelEscolhido.splice(index, 1);
          this.selectItem == false;
        } else {
          this.imovelEscolhido.push(imovelEscolhido);
          if (this.imovelEscolhido.length === this.ativarDados.length) {
            this.selectItem == true;
          }
        }
      }
    }

    cadastrarGrupo() {
      this.dialogRef.close(this.imovelEscolhido);
    }
  
    close(): void {
      this.dialogRef.close();
    }
  
}