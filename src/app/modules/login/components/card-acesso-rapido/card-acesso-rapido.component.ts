import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardAcessoRapido } from 'app/core/models/pagina-inicial/pagina-inicial';

@Component({
	selector: 'app-card-acesso-rapido',
	template: `
        <mat-card class="card-acesso-rapido" [ngStyle]="{'background-color': card.cor}" (click)="navigateTo();">
            <div class="me-2">
                <img class="icone-acesso-rapido" [src]="card.icone" alt="{{ card.titulo }}"/>
            </div>
            <div>
                <h6 [innerHTML]="card.titulo" [ngStyle]="{'color': card.corTitulo}"></h6>
                <p [innerHTML]="card.descricao" [ngStyle]="{'color': card.corTitulo}"></p>
            </div>
        </mat-card>

    `,
	styleUrls: ['./card-acesso-rapido.component.scss']
})
export class CardAcessoRapidoComponent {
	@Input() card!: CardAcessoRapido;

	constructor(private _router: Router) {
	}

    onClick(): void {
        if (this.card.tipo === 'FUNCAO') {
            this.card.funcao();
        } else {
            this.navigateTo();
        }
    }

	navigateTo(): void {
        if (this.card.tipo === 'LINK') {
            if (this.card.link) this.openLink(this.card.link);
        } else {
            if (this.card.route) this._router.navigate(this.card.route);
        }
	}

    openLink(link: string): void {
        let otherWindow = window.open(link, '_blank');
        if (otherWindow) { otherWindow.opener = null }
    }
}
