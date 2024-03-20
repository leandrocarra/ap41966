import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumStatusUC } from 'app/core/enums/unidade-consumidora';
import { SubRotasMultiloginAcesso } from 'app/core/models/multilogin/multilogin-acesso';
import { UCResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto';
import { UserResponseDTO } from 'app/core/models/UserDTO/userResponseDTO.model';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
    selector: 'app-infos-usuario',
    templateUrl: './infos-usuario.component.html',
    styleUrls: ['./infos-usuario.component.scss']
})
export class InfosUsuarioComponent implements OnInit, OnDestroy {
    distribuidora: string;
    dadosUser: UserResponseDTO;
    ucSelecionada: UCResponseDTO | null;
    enderecoCompleto: string;
    minhaContaRedirect;
    alterarPerfilDeAcessoRedirect;
    podeAlterarPerfilDeAcesso: boolean;
    contaColetiva: boolean;

    constructor(
        private _userService: UserService,
        private _selecaoImovelService: SelecaoImovelService,
        private _multiloginAcessoService: MultiloginAcessoService

    ) {
        this.distribuidora = environment.name;
        this.dadosUser = this._userService.dadosUser;
        this.ucSelecionada = this._selecaoImovelService.ucSelecionada;
        this.enderecoCompleto = this._selecaoImovelService.getEnderecoCompleto;
        this.minhaContaRedirect = PathCompleto.minhaConta;
        this.alterarPerfilDeAcessoRedirect = `${PathCompleto.multiloginAcesso}/${SubRotasMultiloginAcesso.SelecaoDePerfil}`;
        this.podeAlterarPerfilDeAcesso = false;
        this.contaColetiva = this.ucSelecionada?.status === EnumStatusUC.Coletiva;
    }

    ngOnInit(): void {
        this._userService.dadosUser.subscribe((dadosUser: UserResponseDTO) => this.dadosUser = dadosUser);
        this._selecaoImovelService.ucSelecionada.subscribe((ucSelecionada: UCResponseDTO | null) => {
            this.ucSelecionada = ucSelecionada;
            this.enderecoCompleto = `${this.ucSelecionada?.local?.endereco}, ${this.ucSelecionada?.local?.bairro}, ${this.ucSelecionada?.local?.municipio}, ${this.ucSelecionada?.local?.uf}, ${this.ucSelecionada?.local?.cep}`
            this.contaColetiva = this.ucSelecionada?.status === EnumStatusUC.Coletiva;
        });
        this._multiloginAcessoService.podeAlterarPerfilDeAcesso.subscribe((podeAlterarPerfil) => {
            this.podeAlterarPerfilDeAcesso = podeAlterarPerfil;
        });
    }

    ngOnDestroy(): void {
        this._multiloginAcessoService.podeAlterarPerfilDeAcesso.unsubscribe();
    }
}


