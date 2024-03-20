import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-tabela-debito-automatico',
    template: `
        <table class="w-100" id="tabela-debito-automatico">
            <title>Débito Automático</title>
            <tr>
                <th>Débito Automático</th>
            </tr>

            <tr *ngIf="banco">
                <td class="pt-4">BANCO</td>
                <td class="pt-4">{{ banco }}</td>
            </tr>
            <tr *ngIf="agencia">
                <td>AGÊNCIA</td>
                <td>{{ agencia }}</td>
            </tr>
            <tr *ngIf="conta">
                <td>CONTA CORRENTE</td>
                <td>{{ conta }}</td>
            </tr>
        </table>
    `,
    styleUrls: ['./tabela-debito-automatico.component.scss']
})
export class TabelaDebitoAutomaticoComponent {
    @Input() banco!: string;
    @Input() agencia!: string;
    @Input() conta!: string;
}
