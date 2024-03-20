// import { Component, Inject, OnInit } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatPaginatorIntl } from '@angular/material/paginator';

// export interface DialogData {
//   classes: any;
// }

// class REMOVED_LABELS extends MatPaginatorIntl {
//   nextPageLabel: string = '';
//   previousPageLabel: string = '';
//   itemsPerPageLabel: string = 'Itens por Página:';
// TODO: Overwrite de getRangeLabel do MatPaginatorIntl. Verificar utilidade. Potencialmente inútil.
//   getRangeLabel = function (page, pageSize, length) {
//     const of = this.translate ? this.translate.instant('paginator.of') : 'de';
//     if (length === 0 || pageSize === 0) {
//       return '0 ' + of + ' ' + length;
//     }
//     length = Math.max(length, 0);
//     const startIndex = page * pageSize;
//     const endIndex = startIndex < length ?
//       Math.min(startIndex + pageSize, length) :
//       startIndex + pageSize;
//     return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
//   };
// }

// @Component({
//   selector: 'neo-classe-principal-dialog',
//   templateUrl: './classe-principal-dialog.component.html',
//   styleUrls: ['./classe-principal-dialog.component.scss'],
//   providers: [{ provide: MatPaginatorIntl, useValue: new REMOVED_LABELS() }]
// })
// export class ClassePrincipalDialogComponent implements OnInit {

//   classes: any;
//   classeEscolhida: any;
//   pageSize = 5;
//   activePageDataChunk: any = [];
//   mobile = false;
//   classFilter: any;
//   classesFiltradas: any;

//   constructor(
//     public dialogRef: MatDialogRef<ClassePrincipalDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData
//   ) { }

//   ngOnInit() {
//     this.classes = this.data.classes;

//     this.activePageDataChunk = this.classes?.slice(0, this.pageSize);
//     if (window.screen.width < 768) {
//       this.mobile = true;
//     }
//   }

//   onPageChanged(e) {
//     let firstCut = e.pageIndex * e.pageSize;
//     let secondCut = firstCut + e.pageSize;
//     this.activePageDataChunk = this.classes?.slice(firstCut, secondCut);
//   }

//   selectClass(classeSelecionada) {
//     this.classeEscolhida = classeSelecionada;
//     this.dialogRef.close(this.classeEscolhida);
//   }

//   search() {
//     if (this.classFilter === '') {
//       this.ngOnInit();
//     } else {
//       this.classesFiltradas = this.data.classes.filter(res => {
//         if(res.atividadeCNAE.toLocaleLowerCase().match(this.classFilter.toLocaleLowerCase())) {
//           return res.atividadeCNAE.toLocaleLowerCase().match(this.classFilter.toLocaleLowerCase());
//         }
//       });

//       this.classes = this.classesFiltradas;
//       this.activePageDataChunk = this.classesFiltradas;
//       this.activePageDataChunk = this.classes?.slice(0, this.pageSize);
//     }
//   }

//   classeNaoEncontrada() {
//     this.dialogRef.close([]);
//   }
// }
