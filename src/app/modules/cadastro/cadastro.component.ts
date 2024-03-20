import { Component } from '@angular/core';
import { SubRotasCadastro } from 'app/core/models/cadastro/cadastro';
import { Etapa } from 'app/shared/interfaces/etapas';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
    etapas: Array<Etapa>;

    constructor() {
        this.etapas = [
            {
                nomeEtapa: "Identificação",
                numeroEtapa: 1,
                atual: true,
                concluida: true,
                linha: false,
                rota: SubRotasCadastro.identificacao
            },
            {
                nomeEtapa: "Dados Pessoais",
                numeroEtapa: 2,
                atual: true,
                concluida: false,
                linha: false,
                rota: SubRotasCadastro.dadosPessoaisPessoaFisica
            },
            {
                nomeEtapa: "Senha",
                numeroEtapa: 3,
                atual: true,
                concluida: false,
                linha: false,
                rota: SubRotasCadastro.senha
            },
            {
                nomeEtapa: "Validação",
                numeroEtapa: 4,
                atual: true,
                concluida: false,
                linha: false,
                rota: SubRotasCadastro.avisoComStepper
            }
        ]
    }
}
