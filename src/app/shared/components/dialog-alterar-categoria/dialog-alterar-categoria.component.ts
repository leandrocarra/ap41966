import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'neo-dialog-alterar-categoria',
  templateUrl: './dialog-alterar-categoria.component.html',
  styleUrls: ['./dialog-alterar-categoria.component.scss']
})
export class DialogAlterarCategoriaComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      categoria: string
    },
    private matDialogRef: MatDialogRef <DialogAlterarCategoriaComponent>,
  ) { }

  ngOnInit(): void {
  }

  public close(): void{
		this.matDialogRef.close(this.data.categoria);
	}

  alterarCategoria(categoria: any):void{
    this.matDialogRef.close(categoria);
  }
}