import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';

@Component({
  selector: 'app-informativo-selfie',
  templateUrl: './informativo-selfie.component.html',
  styleUrls: ['./informativo-selfie.component.scss']
})
export class InformativoSelfieComponent implements OnInit {

  @Output() callFunction = new EventEmitter();

  navExtra!: NavigationExtras;

  constructor(
    private _router: Router,
    private _activedRouter: ActivatedRoute
  ) {

    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });
  }

  ngOnInit(): void { }

  callEvent() {
    this.callFunction.emit();
  }

  concluir(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'tirar-selfie'], this.navExtra);
  }

  voltar(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'documento-com-foto'], this.navExtra);
  }

}
