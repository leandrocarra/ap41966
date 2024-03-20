import { Location } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

import { PathCompleto } from 'app/core/enums/servicos';
import { converterStringParaDate, converterStringParaRequestValida, SubRotasCadastro } from 'app/core/models/cadastro/cadastro';
import { ValidaUsuarioDTORequest } from 'app/core/models/cadastro/request/cadastro-dto';
import { ValidaUsuarioDTOResponse } from 'app/core/models/cadastro/responses/cadastro-dto';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { MatErrorMensagens } from 'app/core/services/error/error.service';
import { UserService } from 'app/core/services/user/user.service';
import { ESTADOS_BRASILEIROS, ORGAOS_EMISSORES } from 'app/core/services/utils/neo-utils.service';
import { Estado, OrgaoEmissor } from 'app/shared/models/utils/agencia-virtual-utils';
import { ExibirAvisoService } from 'app/shared/pages/exibir-aviso/exibir-aviso.service';
import { validarDataDeNascimento } from 'app/shared/Validators/validar-idade.validator';
import { EnumAvisosPadroes } from "../../../../core/models/exibir-aviso/exibir-aviso";

@Component({
    selector: 'app-identificacao-dados-cadastro.component',
    templateUrl: './identificacao-dados-cadastro.component.html',
    styleUrls: ['./identificacao-dados-cadastro.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IdentificacaoDadosCadastroComponent {
    formDadosIdentificacaoDocumentos: FormGroup;
    mask: string;
    matErrorData: string;
    matErrorSelecaoDocumentoSecundario: string;
    matErrorDocumentoSecundario: string;
    matErrorOrgaoEmissor: string;
    matErrorEstadoEmissor: string;
    maskInputDocumento: string;
    grupoDoUsuario: string;
    estados: Array<Estado>;
    orgaosEmissores: Array<OrgaoEmissor>;
    tipoDocumentoSelecionado!: Array<string>;
    validaUsuarioRequestDTO: ValidaUsuarioDTORequest;
    validaUsuarioResponseDTO: ValidaUsuarioDTOResponse;
    constructor(
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _user: UserService,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _cadastroService: CadastroService,
        private _loadingService: LoadingService,
        private _exibirAvisoService: ExibirAvisoService
        ) {
        this.formDadosIdentificacaoDocumentos = this.criarFormulario();
        this.mask = '999.999.99-A';
        this.matErrorData = MatErrorMensagens.DataNascimentoInvalida;
        this.matErrorSelecaoDocumentoSecundario = MatErrorMensagens.SelecaoDocumentoSecundario;
        this.matErrorDocumentoSecundario = MatErrorMensagens.DocumentoSecundario;
        this.matErrorOrgaoEmissor = MatErrorMensagens.OrgaoEmissor;
        this.matErrorEstadoEmissor = MatErrorMensagens.EstadoEmissor;
        this.maskInputDocumento = '';
        this.grupoDoUsuario = this._user.group;
        this.estados = ESTADOS_BRASILEIROS;
        this.orgaosEmissores = ORGAOS_EMISSORES;
        this.tipoDocumentoSelecionado = this._cadastroService.definirDocumentosPorRegiao();
        this.validaUsuarioRequestDTO = new ValidaUsuarioDTORequest();
        this.validaUsuarioResponseDTO = new ValidaUsuarioDTOResponse();
    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group(
            {
                dataNascimento: [this._cadastroService.fluxoCadastro.clienteF.dataNascimento,
                    [
                        Validators.required,
                        validarDataDeNascimento({ idade: true })
                    ]
                ],
                tipoDocSecundario: [this._cadastroService.fluxoCadastro.clienteF.tipoDocSecundario,
                    [
                        Validators.required
                    ]
                ],
                docSecundario: [this._cadastroService.fluxoCadastro.clienteF.docSecundario,
                    [
                        Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(15)
                    ]
                ],
                orgao: [this._cadastroService.fluxoCadastro.clienteF.orgao,
                    [
                        Validators.required
                    ]
                ],
                estado: [this._cadastroService.fluxoCadastro.clienteF.estado,
                    [
                        Validators.required,
                        Validators.minLength(2)
                    ]
                ],
            }
        );
    }

    voltar(): void {
		this._location.back();
	}

    continuar(): void {
        if (this.formDadosIdentificacaoDocumentos.valid) {
            this.consultarValidaUsuario();
        } else {
            this._alert.alertError("Preencha todos os campos corretamente.");
        }
    }

    passarDadosParaOService(): void {
        Object.assign(this._cadastroService.fluxoCadastro.clienteF, this.formDadosIdentificacaoDocumentos.value);
        this._cadastroService.fluxoCadastro.clienteF.dataNascimento = converterStringParaDate(this.formDadosIdentificacaoDocumentos.controls['dataNascimento'].value);
    }

    definirMascaraDocumento(opcao: string): void {
        switch (opcao){
            case 'passaporte':
                this.maskInputDocumento = 'SS000000';
                break;
            case 'carteiraDeTrabalho':
                this.maskInputDocumento = '0000000 000-0';
                break;
            default:
                this.maskInputDocumento = '';
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
            const dataNascElektro = converterStringParaRequestValida(this.formDadosIdentificacaoDocumentos.value.dataNascimento);
            const dataNascDemaisDistribuidoras = converterStringParaDate(this.formDadosIdentificacaoDocumentos.value.dataNascimento);
            const documento: string = this._cadastroService.fluxoCadastro.documento;
            this.validaUsuarioRequestDTO.userName = environment.name + '/' + documento;
            this.validaUsuarioRequestDTO.distribuidora = environment.name;
            this.validaUsuarioRequestDTO.regiao = environment.regiao;
            this.validaUsuarioRequestDTO.recaptcha = token;
            this.validaUsuarioRequestDTO.tipoCliente = 'F';
            this.validaUsuarioRequestDTO.documento = documento;
            this.validaUsuarioRequestDTO.tipoAtribuicao = 'Acesso Comum';
            this.validaUsuarioRequestDTO.dataNascimento = environment.name === 'ELEKTRO' ? dataNascElektro : dataNascDemaisDistribuidoras;
            this.validaUsuarioRequestDTO.tipoDocSecundario = this.formDadosIdentificacaoDocumentos.controls['tipoDocSecundario'].value;
            this.validaUsuarioRequestDTO.docSecundario = this.formDadosIdentificacaoDocumentos.controls['docSecundario'].value;
            this.validaUsuarioRequestDTO.canalSolicitante = environment.canal;
            this.validaUsuarioRequestDTO.usuario = environment.USUARIO_UE;
            this._cadastroService.fluxoCadastro.tipoCliente = 'F';
        }).catch(() => {
            this._loadingService.stop();
        });
	}

    verificarPossiveisStatus(responseDTO: ValidaUsuarioDTOResponse): void {
        if (!responseDTO.acessoValido && responseDTO.validaCadastro) {
            this.passarDadosParaOService();
            this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.dadosPessoaisPessoaFisica]);
        }
        if (!responseDTO.acessoValido && !responseDTO.validaCadastro) {
            this.exibirTelaDeDadosNaoConferem();
        }
    }

    exibirTelaDeDadosNaoConferem(): void {
        this._router.navigate(
            [SubRotasCadastro.pathAviso, SubRotasCadastro.aviso],
            { queryParams: { codigoAviso: EnumAvisosPadroes.DadosNaoConferem } }
        );
    }
}
