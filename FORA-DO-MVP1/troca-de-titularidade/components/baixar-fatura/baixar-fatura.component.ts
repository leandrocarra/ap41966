import { Component, OnInit } from '@angular/core';
import { Clipboard } from "@angular/cdk/clipboard";
import { UserService } from 'app/core/services/user/user.service';

@Component({
    selector: 'app-baixar-fatura',
    templateUrl: './baixar-fatura.component.html',
    styleUrls: ['./baixar-fatura.component.scss']
})

export class BaixarFaturaComponent implements OnInit {

    codigoBarras = '12345556778899000000098763211345677880000000000000';

    constructor(
        private clipboard: Clipboard,
        public user: UserService
    ) { }

    copiarCodigoBarras() {
        this.clipboard.copy(this.codigoBarras);
    }

    baixar() { }

    ngOnInit() { }
}