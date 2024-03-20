import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';

class RemovedLabels extends MatPaginatorIntl {
  nextPageLabel: string = "";
  previousPageLabel: string = "";
  itemsPerPageLabel: string = "Itens por Página:";

// TODO: Override de getRangeLabel do MatPaginatorIntl. Verificar utilidade.
//   getRangeLabel = (page: number, pageSize: number, length: number): string => {
//     const de = this.translate ? this.translate.instant('paginator.of') : 'de';
//     if (length === 0 || pageSize === 0 ) {
//       return '0 ' + de + ' ' + length;
//     }

//     length = Math.max(length, 0);
//     const startIndex = page * pageSize;
//     const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
//     return startIndex + 1 + ' - ' + endIndex + ' ' + de + ' ' + length;
//   };
}

@Component({
  selector: 'neo-dialog-classe-principal',
  templateUrl: './dialog-classe-principal.component.html',
  styleUrls: ['./dialog-classe-principal.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: new RemovedLabels }]
})
export class DialogClassePrincipalComponent {
  classes: any;
  classeEscolhida: any;
  classeFiltro: any;
  classesFiltradas: any;
  activePageDataChunk: any = [];
  pageSize: number = 5;
  mobile: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      atividadeCnae: any;
      classes: any;
      mobile: boolean;
    },
    private _matDialogRef: MatDialogRef<DialogClassePrincipalComponent>
  ) {
      this.mobile = this.data.mobile;
      this.aoInicializar();
  }

  aoInicializar(): void {
      this.classes = this.data.classes;
      this.activePageDataChunk = this.classes.slice(0, this.pageSize);
  }

  onPageChanged(e: any): void {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.classes.slice(firstCut, secondCut);
  }

  classePrincipal(classeSelecionada: any): void {
    if (!classeSelecionada) {
      this._matDialogRef.close([]);
    } else {
      this.classeEscolhida = classeSelecionada;
      this._matDialogRef.close(this.classeEscolhida);
    }
  }

  search(): void {
    if (this.classeFiltro === '') {
      this.aoInicializar();
    } else {
      this.classesFiltradas = this.data.classes.filter((res: any) => {
        if(res.atividadeCNAE.toLocaleLowerCase().match(this.classeFiltro.toLocaleLowerCase())) {
          return res.atividadeCNAE.toLocaleLowerCase().match(this.classeFiltro.toLocaleLowerCase());
        }
      });

      this.classes = this.classesFiltradas;
      this.activePageDataChunk = this.classesFiltradas;
      this.activePageDataChunk = this.classes.slice(0, this.pageSize);
    }
  }

  public close(): void {
    this._matDialogRef.close(this.data.atividadeCnae);
  }

}
