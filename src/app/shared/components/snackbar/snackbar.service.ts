import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {
    private _message: string;
    private _action: string | undefined;
    private _seconds: number;
  constructor(
    private _snackBar: MatSnackBar
  ) {
    this._message = 'mensagem';
    this._action = undefined;
    this._seconds = 3;
  }

  exibirSnackbar(mensagem: string, textoDoBotao?: string, duracaoEmSegundos: number = this._seconds) {
    this.abrirSnackbar(mensagem, textoDoBotao);
    this.fecharSnackbarEmSegundos(duracaoEmSegundos);
  }

  abrirSnackbar(mensagem: string = this._message, textoDoBotao: string | undefined = this._action) {
    this._snackBar.open(mensagem, textoDoBotao);
  }

  fecharSnackbarEmSegundos(segundos: number = this._seconds) {
    setTimeout(
        () => {
            this._snackBar.dismiss();
        },
        segundos * 1000
    );
  }
}