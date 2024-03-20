import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/core/services/user/user.service';

@Component({
    selector: 'app-dialog-pre-requisitos',
    templateUrl: './dialog-pre-requisitos.component.html',
    styleUrls: ['./dialog-pre-requisitos.component.scss']
})
export class DialogPreRequisitosComponent {
    checkDeclaracao: boolean;
    isDisabled: boolean;
    preRequisitos: Array<string>;
    grupoA: boolean;

    constructor(
        private _matDialogRef: MatDialogRef<DialogPreRequisitosComponent>,
        private _userService: UserService
    ) {
        this.isDisabled = true;
        this.checkDeclaracao = false;
        this.grupoA = (this._userService.group === 'A');
        this.preRequisitos = this.setPreRequisitos();
    }

    setPreRequisitos(): Array<string> {
        // return [
        // `O cadastramento de Débito Automático estará <span class="${this.definirCorDoTexto()}"> sujeito a validação do seu banco.</span> Você poderá confirmar a efetivação do cadastro <span class="${this.definirCorDoTexto()}">após 2 (dois) dias </span>da solicitação através dos Canais de Autoatendimento ou Internet Banking;`,
        // `Você poderá solicitar, <span class="${this.definirCorDoTexto()}">a qualquer momento</span>, a alteração dos dados bancários cadastrados ou o cancelamento do serviço;`,
        // `<span class="${this.definirCorDoTexto()}">Não será permitido solicitar/cadastrar o Débito Automático em nome de terceiros</span> (contas com CPF diferente do titular associado à Neoenergia). Para cadastrar o serviço em nome de um terceiro, orientamos procurar a sua agência bancária;`, `O cancelamento do serviço poderá ser realizado em <span class="${this.definirCorDoTexto()}"> até 3 (três) dias </span>antes da data de débito nos <span class="${this.definirCorDoTexto()}"> Canais de Atendimento da Neoenergia </span>ou em até <span class="${this.definirCorDoTexto()}"> 1 (um)</span> dia nos <span class="${this.definirCorDoTexto()}">Canais de Atendimento do seu banco</span>;`,
        // `<span class="destaque">Não será permitido solicitar/cadastrar o Débito Automático em nome de terceiros</span> (contas com CPF diferente do titular associado à Neoenergia). Para cadastrar o serviço em nome de um terceiro, orientamos procurar a sua agência bancária;`,
        // `Enquanto a mensagem: "Conta em Débito Automático" não constar em sua conta de energia como forma de pagamento, <span class="${this.definirCorDoTexto()}">a quitação da sua conta deverá ser realizada nas instituições e correspondentes bancários;</span>`
        // ]

        return [
            `
        O cadastramento do Débito Automático estará
        <span class="${this.definirCorDoTexto()}">sujeito a validação do seu banco.</span>
        Você poderá confirmar a efetivação do cadastro
        <span class="${this.definirCorDoTexto()}">após 2 (dois) dias</span>
        da solicitação através dos Canais de Autoatendimento ou pelo Internet
        Banking;`,
            `
        Você poderá solicitar,
        <span class="${this.definirCorDoTexto()}">a qualquer momento</span>
        , a alteração dos dados bancários cadastrados ou o cancelamento do
        serviço;`,
            `
                <span class="${this.definirCorDoTexto()}">
        Não será permitido solicitar/cadastrar o Débito Automático em nome
          de terceiros
        </span>
        (contas com CPF diferente do titular associado à Neoenergia). Para
        cadastrar o serviço em nome de um terceiro, orientamos procurar a sua
        agência bancária;
        `,
            `
        Enquanto a mensagem: “Conta em Débito Automático” não constar em sua
        conta de energia como forma de pagamento,
        <span class="${this.definirCorDoTexto()}">
          a quitação da sua conta deverá ser realizada nas instituições e
          correspondentes bancários;
        </span>`,
            `
        Caso o banco retorne informando que os dados cadastrados são
        <span class="${this.definirCorDoTexto()}">inconsistentes</span>
        ou houve
        <span class="${this.definirCorDoTexto()}">falha no serviço,</span>
        o cadastro do Débito Automático
        <span class="${this.definirCorDoTexto()}">não será efetivado;</span>`,
            `
        O cancelamento do serviço poderá ser realizado em até
        <span class="${this.definirCorDoTexto()}">3 (três) dias</span>
        antes da data de débito nos
        <span class="${this.definirCorDoTexto()}">Canais de Atendimento da Neoenergia</span>
        ou em até
        <span class="${this.definirCorDoTexto()}">1 (um) dia</span>
        nos
        <span class="${this.definirCorDoTexto()}">Canais de Atendimento do seu banco.</span>
            `
        ]
    }

    definirCorDoTexto(): string {
        return this.grupoA ? 'text-dark-green' : 'text-light-green';
    }

    prosseguir(termo: boolean): void {
        this._matDialogRef.close(termo);
    }

    desbloquearBotao(): void {
        this.isDisabled = !this.checkDeclaracao;
    }
}
