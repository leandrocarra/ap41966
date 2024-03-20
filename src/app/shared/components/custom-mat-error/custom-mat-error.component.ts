import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-custom-mat-error',
    templateUrl: './custom-mat-error.component.html',
    styleUrls: ['./custom-mat-error.component.scss']
})
export class CustomMatErrorComponent {
    @Input() mensagem: string;

    constructor() {
        this.mensagem = ""
    }
}
