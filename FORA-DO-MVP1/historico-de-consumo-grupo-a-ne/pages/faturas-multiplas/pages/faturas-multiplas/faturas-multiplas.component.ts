import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from "@angular/router";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";

@Component({
  selector: "app-faturas-multiplas",
  templateUrl: "./faturas-multiplas.component.html",
  styleUrls: ["./faturas-multiplas.component.scss"],
})

export class FaturasMultiplasComponent implements OnInit, OnDestroy {

  constructor(
    public loading: LoadingService,
    private router: Router
  ) {
    router.events.subscribe((event: any) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit(): void { }

  // Mostra e oculta o carregamento durante as alterações de RouterEvent
  navigationInterceptor(event: RouterEvent): void {
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

  ngOnDestroy(): void { }
}