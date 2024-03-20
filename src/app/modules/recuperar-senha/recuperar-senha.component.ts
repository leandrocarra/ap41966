import { Etapa } from 'app/shared/interfaces/etapas';
import { Component } from '@angular/core';
import { SubRotasRecuperarSenha } from 'app/core/models/RecuperarSenhaDTO/recuperarSenha';

@Component({
    selector: 'app-recuperar-senha',
    templateUrl: './recuperar-senha.component.html',
    styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent {

  etapas: Array<Etapa>
    constructor() {
        this.etapas = [
            {
                nomeEtapa: "Identificação",
                numeroEtapa: 1,
                atual: true,
                concluida: true,
                linha: false,
                rota: SubRotasRecuperarSenha.identificacao
            },
            {
                nomeEtapa: "Validação",
                numeroEtapa: 2,
                atual: true,
                concluida: false,
                linha: false,
                rota: SubRotasRecuperarSenha.linkConfirmacao
            },
            {
                nomeEtapa: "Senha nova",
                numeroEtapa: 3,
                atual: true,
                concluida: false,
                linha: false,
                rota: SubRotasRecuperarSenha.novaSenha
            }
        ]
    }
}
