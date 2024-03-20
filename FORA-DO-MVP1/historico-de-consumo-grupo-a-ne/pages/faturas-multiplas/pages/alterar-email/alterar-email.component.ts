import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-alterar-email',
  templateUrl: './alterar-email.component.html',
  styleUrls: ['./alterar-email.component.scss']
})
export class AlterarEmailComponent implements OnInit, OnDestroy {

    navExtra: NavigationExtras = {
      queryParams: null,
      state: {
          email: null
      }
    };

    constructor(public router: Router) {

    }

    ngOnInit() {

    }

    eventoEmail(event: any) {
      if (event && event != 'voltar') {
        this.navExtra.state!.email = event;
        this.router.navigate(['faturas-multiplas/cadastrar-faturas'], this.navExtra);
      } else {
        this.router.navigate(['faturas-multiplas/cadastrar-faturas']);
      }
    }

    ngOnDestroy() {
        
    }
}