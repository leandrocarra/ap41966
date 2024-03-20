import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-debito-automatico-a',
    templateUrl: './debito-automatico-a.component.html',
    styleUrls: ['./debito-automatico-a.component.scss']
  })
  export class DebitoAutomaticoAComponent {
      constructor(
          private _router: Router
      ) {}

      voltar(): void {
        this._router.navigateByUrl('home');
      }
  }