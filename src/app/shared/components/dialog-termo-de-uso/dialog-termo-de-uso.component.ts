import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/core/services/user/user.service';
@Component({
  selector: 'app-dialog-termo-de-uso',
  templateUrl: './dialog-termo-de-uso.component.html',
  styleUrls: ['./dialog-termo-de-uso.component.scss']
})
export class DialogTermoDeUsoComponent implements OnInit {
  grupoDoUsuario: string;
  constructor(
    public dialogRef: MatDialogRef<DialogTermoDeUsoComponent>,
    private _user: UserService,
    ) { 
    this.grupoDoUsuario = this._user.group
  }

  ngOnInit(): void {
  }

  fechar() {
    this.dialogRef.close();
  }

}
