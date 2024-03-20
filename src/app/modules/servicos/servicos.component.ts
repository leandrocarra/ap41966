import { UserService } from 'app/core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent {

  fluxoAG!: string;

  constructor(
    public user: UserService,
    public loading: LoadingService,
    private _router: Router
  ) {
    this._router.events.subscribe((event: any) => {
      this.navigationInterceptor(event);
    });
  }

  // Mostra e oculta o carregamento durante as alterações de RouterEvent
  navigationInterceptor(event: RouterEvent): void {
    this.fluxoAG = this._router.url.split('/servicos/')[1];

    if (event instanceof NavigationStart) {
      this.loading.start();
    }
    if (event instanceof NavigationEnd) {
      this.loading.stop();
    }

    // Define o estado de carregamento como falso em ambos os eventos abaixo para ocultar o carregamento no caso de uma solicitação falhar
    if (event instanceof NavigationCancel) {
      this.loading.stop();
    }
    if (event instanceof NavigationError) {
      this.loading.stop();
    }
  }

}
