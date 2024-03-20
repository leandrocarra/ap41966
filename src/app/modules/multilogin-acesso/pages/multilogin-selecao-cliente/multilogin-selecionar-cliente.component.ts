import { Location } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasHome } from 'app/core/models/home/sub-rotas-home';
import { Relacao } from 'app/core/models/multilogin/response/multilogin-dto';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
    selector: 'app-selecionar-cliente',
    templateUrl: './multilogin-selecionar-cliente.component.html',
    styleUrls: ['./multilogin-selecionar-cliente.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MultiloginSelecionarClienteComponent {
    dadoClientesFiltrados: Array<Relacao>;
    dadosClientesPesquisados: Array<Relacao>;
    campoPesquisar: any;

    constructor(
        private _multiloginAcessoService: MultiloginAcessoService,
        private _userService: UserService,
        private _location: Location,
        private _router: Router,
    ) {
        this.dadosClientesPesquisados = this._multiloginAcessoService.getDadosValidaRelacao.relacoes;
        this.dadoClientesFiltrados = this.dadosClientesPesquisados;
    }

    pesquisarCliente(pesquisa: string): Array<Relacao> {
        return this.dadosClientesPesquisados.filter((relacaoCliente: Relacao) => {
            let resultado = relacaoCliente.documentoCliente.toString().includes(pesquisa);
            if (resultado) return true;
            else {
                const nomeCliente = Object.values(relacaoCliente.nomeCliente);
                for (let dado of nomeCliente) {
                    if (dado) {
                        resultado = dado.toString().toLocaleLowerCase().includes(pesquisa.toLowerCase());
                        if (resultado) return true;
                    } else {
                        return false;
                    }
                }
            } return false;
        });
    }

    filtrarArray(pesquisa: string): void {
        this.dadoClientesFiltrados = this.pesquisarCliente(pesquisa)
    }

    limparFiltro(): void {
        if (this.campoPesquisar === '') {
            this.filtrarArray(this.campoPesquisar);
        }
    }

    voltar(): void {
        this._location.back();
    }

    clienteSelecionado(event: any): void {
        this._userService.storage.removeItem("protocolo");
        this._multiloginAcessoService.multiloginAcesso.documentoCliente = event.documentoCliente;
        this._multiloginAcessoService.setMultiloginAcesso = this._multiloginAcessoService.multiloginAcesso;
        this._router.navigate([PathCompleto.home, SubRotasHome.MinhasUnidadesConsumidoras]);
    }
}
