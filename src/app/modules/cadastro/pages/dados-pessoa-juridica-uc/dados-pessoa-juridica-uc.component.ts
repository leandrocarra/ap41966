import { Location } from '@angular/common';
import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasCadastro } from 'app/core/models/cadastro/cadastro';
import { ValidaUsuarioDTORequest } from 'app/core/models/cadastro/request/cadastro-dto';
import { ValidaUsuarioDTOResponse } from 'app/core/models/cadastro/responses/cadastro-dto';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';
import { EnumAvisosPadroes } from "../../../../core/models/exibir-aviso/exibir-aviso";

@Component({
    selector: 'app-dados-pessoa-juridica-uc',
    templateUrl: './dados-pessoa-juridica-uc.component.html',
    styleUrls: ['./dados-pessoa-juridica-uc.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
export class DadosPessoaJuridicaUcComponent {
	formEmpresa: FormGroup;
    grupoDoUsuario: string;
    mobile: boolean;
    validaUsuarioRequestDTO: ValidaUsuarioDTORequest;
    validaUsuarioResponseDTO: ValidaUsuarioDTOResponse;
	constructor(
		private _formBuilder: FormBuilder,
		private _location: Location,
        private _user: UserService,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _cadastroService: CadastroService,
        private _loadingService: LoadingService
	) {
		this.formEmpresa = this.criarFormulario();
        this.grupoDoUsuario = this._user.group;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.validaUsuarioRequestDTO = new ValidaUsuarioDTORequest();
        this.validaUsuarioResponseDTO = new ValidaUsuarioDTOResponse();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

	criarFormulario(): FormGroup {
        return this._formBuilder.group(
            {
                codigo: [
                    '',
                    [
                        Validators.required,
                        Validators.maxLength(12)
                    ]
                ]
            }
        );
    }

	voltar(): void {
		this._location.back();
	}

    continuar(): void {
        if (this.formEmpresa.valid) {
            this.consultarValidaUsuario();
            this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.dadosPessoaJuridicaEmpresa]);
        } else {
            this._alert.alertError("Preencha todos os campos corretamente.")
        }
    }

    consultarValidaUsuario(): void {
        this.preencherValidaUsuarioRequestDTO().then(() => {
            if (this.validaUsuarioRequestDTO.recaptcha) {
                this._cadastroService.consultarValidaUsuario(this.validaUsuarioRequestDTO).subscribe({
                    next: (responseDTO) => {
                        this.validaUsuarioResponseDTO = responseDTO;
                        this.verificarPossiveisStatus(responseDTO);
                        this._loadingService.stop();
                    },
                    error: () => {
                        this._loadingService.stop();
                    }
                });
            }
        });
    }

    preencherValidaUsuarioRequestDTO(): Promise<void> {
        this._loadingService.start();
		return this._cadastroService.obterRecaptcha().then((token) => {
            const documento: string = this._cadastroService.fluxoCadastro.documento;
            this.validaUsuarioRequestDTO.userName = environment.name + '/' + documento;
            this.validaUsuarioRequestDTO.distribuidora = environment.name;
            this.validaUsuarioRequestDTO.regiao = environment.regiao;
            this.validaUsuarioRequestDTO.recaptcha = token;
            this.validaUsuarioRequestDTO.tipoCliente = 'J';
            this.validaUsuarioRequestDTO.documento = documento;
            this.validaUsuarioRequestDTO.codigo = this.formEmpresa.controls['codigo'].value.padStart(12, '0');
            this.validaUsuarioRequestDTO.tipoAtribuicao = 'Acesso Comum'; // FIXME: Atribuir de acordo com o tipo de cadastro no Multilogin? O endpoint parece ter uso em mais de um fluxo.
            this.validaUsuarioRequestDTO.canalSolicitante = environment.canal;
            this.validaUsuarioRequestDTO.usuario = environment.USUARIO_UE;
            this._cadastroService.fluxoCadastro.tipoCliente = 'J';
        }).catch((error) => {
            this._loadingService.stop();
        });
	}

    verificarPossiveisStatus(responseDTO: ValidaUsuarioDTOResponse): void {
        if (!responseDTO.acessoValido && responseDTO.validaCadastro) {
            this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.dadosPessoaJuridicaEmpresa]);
        }
        if (!responseDTO.acessoValido && !responseDTO.validaCadastro) {
            this.exibirTelaDeDadosNaoConferem();
        }
        // Segundo tabela da Kelly, os mapeamentos para as demais combinações não são necessários no App nem na AV.
    }

    exibirTelaDeDadosNaoConferem(): void {
        this._router.navigate(
            [PathCompleto.cadastro, SubRotasCadastro.aviso],
            { queryParams: { codigoAviso: EnumAvisosPadroes.DadosNaoConferem } }
        );
    }

    naoPossuoUC(): void {
        this._cadastroService.fluxoCadastro.tipoCliente = 'J';
        this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.dadosPessoaJuridicaEmpresa]);
    }
}
