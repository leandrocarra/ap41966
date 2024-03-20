import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { SubRotasHome } from 'app/core/models/home/sub-rotas-home';
import { PerfisDeAcesso } from 'app/core/models/multilogin/multilogin-acesso';
import { MensagemAviso } from 'app/core/models/segunda-via/segunda-via.model';
import { UCResponseDTO, UserUcsResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from 'app/core/services/user/user.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { cpfCnpj } from 'app/core/services/utils/neo-utils.service';
import { DocumentoValidator } from 'app/shared/Validators/validar-documento.validator';
import { validarUC } from 'app/shared/Validators/validar-uc.validator';

@Component({
    selector: 'app-multilogin-pesquisar-cliente',
    templateUrl: './multilogin-pesquisar-cliente.component.html',
    styleUrls: ['./multilogin-pesquisar-cliente.component.scss']
})
export class MultiloginPesquisarClienteComponent {

    formTipoAcesso: FormGroup;
    mensagemErro: string;
    documentoMask: string;
    atendCredenciado: boolean;

    constructor(
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _router: Router,
        private _multiloginAcessoService: MultiloginAcessoService,
        private _selecaoImovelService: SelecaoImovelService,
        private _loadingService: LoadingService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _userService: UserService,
        private _cadastroService: CadastroService
    ) {
        this.formTipoAcesso = this.createForm();
        this.mensagemErro = MensagemAviso.CNPJInvalido;
        this.documentoMask = '000.000.000-009';
        this.atendCredenciado = this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso === PerfisDeAcesso.atendenteCredenciado;
    }

    applyMask(documento: string, tipoDocumento: string): void {
        if (tipoDocumento === "CPF/CNPJ") {
            if (documento && documento != "") {
                this.documentoMask = cpfCnpj(documento);
            }
        } else {
            this.documentoMask = "000000000000";
        }
    }

    createForm(): FormGroup {
        return this._formBuilder.group({
            tipoDocumento: [
                "",
                [
                    Validators.required
                ]
            ],
            documento: [
                "",
                [
                    Validators.required
                ]
            ]
        });
    }

    atualizarValidadores(event: any): void {
        this.formTipoAcesso.patchValue({
            documento: "",
        });
        if (event.value === "CPF/CNPJ") {
            this.formTipoAcesso.controls['documento'].setValidators([
                Validators.required,
                DocumentoValidator.validar
            ]);
        } else {
            this.formTipoAcesso.controls['documento'].setValidators([
                Validators.required,
                Validators.minLength(12),
                validarUC({ uc: true })
            ]);
        }
    }

    verificarError(): boolean {
        if (this.formTipoAcesso.invalid) {
            if (this.formTipoAcesso.controls['documento'].errors?.uc) {
                if (!this.atendCredenciado) {
                    this.mensagemErro = (this.formTipoAcesso.value.tipoDocumento === 'CPF/CNPJ') ? "Você não tem acesso compartilhado com esse cliente." : "Você não tem acesso a esta unidade consumidora.";
                } else {
                    this.mensagemErro = "Conta Contrato não encontrada.";
                }
            } else {
                this.mensagemErro = (this.formTipoAcesso.value.tipoDocumento === 'CPF/CNPJ') ? MensagemAviso.DocumentoInvalido : MensagemAviso.UnidadeConsumidoraInvalida;
            }
            return true;
        }
        this.mensagemErro = '';
        return false;
    }

    pesquisar(): void {
        if (this.formTipoAcesso.value.tipoDocumento === 'CPF/CNPJ') {
            this.atendCredenciado ? this.pesquisarPorDocumento() : this.pesquisarVinculosRecebidos();
        } else {
            this.atendCredenciado ? this.pesquisarPorUC() : this.pesquisarVinculosRecebidos();
        }
    }

    voltar(): void {
        this._location.back();
    }

    pesquisarVinculosRecebidos(): void {
        let pesquisarDados: boolean = false;
        if (this.formTipoAcesso.value.tipoDocumento !== 'CPF/CNPJ') {
            this._multiloginAcessoService.multiloginAcesso.vinculosRecebidos.forEach(elem => {
                if (elem.listaDeUcs.includes(this.formTipoAcesso.value.documento)) {
                    pesquisarDados = true;
                    this.pesquisarPorUC();
                }
            });
        } else {
            this._multiloginAcessoService.multiloginAcesso.vinculosRecebidos.forEach(elem => {
                if (elem.docTitular === this.formTipoAcesso.value.documento) {
                    pesquisarDados = true;
                    this._multiloginAcessoService.multiloginAcesso.documentoCliente = this.formTipoAcesso.value.documento;
                    this._multiloginAcessoService.setMultiloginAcesso = this._multiloginAcessoService.multiloginAcesso;
                    this._router.navigate([PathCompleto.home, SubRotasHome.MinhasUnidadesConsumidoras]);
                }
            });
        }
        if (!pesquisarDados) {
            this.formTipoAcesso.controls['documento'].setErrors({ uc: true });
            this.verificarError();
        }
    }

    // Fluxo tradicional: listar imóveis e informações do imóvel
    pesquisarPorDocumento(): void {
        this._multiloginAcessoService.multiloginAcesso.documentoCliente = this.formTipoAcesso.value.documento;
        this._multiloginAcessoService.multiloginAcesso.vinculosRecebidos.forEach(elem => {
            if (elem.docTitular === this.formTipoAcesso.value.documento && elem.nomePerfil === this._multiloginAcessoService.getMultiloginAcesso.perfilDeAcesso) {
                this._multiloginAcessoService.multiloginAcesso.vinculoAcessado = elem;
            }
        })
        this._multiloginAcessoService.setMultiloginAcesso = this._multiloginAcessoService.multiloginAcesso;
        this._userService.storage.removeItem("protocolo");
        this._router.navigate([PathCompleto.home, SubRotasHome.MinhasUnidadesConsumidoras]);
    }

    // Novo fluxo: informações do imóvel e listar imóveis
    pesquisarPorUC(): void {
        this._loadingService.start();
        this._selecaoImovelService.temInformacoesUCSelecionada(this.formTipoAcesso.value.documento).then((ucEscolhida: any) => {
            if (ucEscolhida.error) {
                this._loadingService.stop();
                if (ucEscolhida.error.retorno.numero == '002') {
                    this.formTipoAcesso.controls['documento'].setErrors({ uc: true });
                    this.verificarError();
                } else {
                    this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: EnumTitulosPadroes.Inesperado } });
                }
            } else {
                this.listarImoveis();
            }
        });
    }

    listarImoveis(): void {
        this._cadastroService.obterRecaptcha().then((token)=>{
            this._multiloginAcessoService.multiloginAcesso.documentoCliente = this._selecaoImovelService.getInformacoesUCSelecionada.cliente.documento.numero;
            this._selecaoImovelService.getMeusImoveis(this._multiloginAcessoService.multiloginAcesso.documentoCliente).then((listaImoveis: UserUcsResponseDTO) => {
                if (listaImoveis.ucs.length > 0) {
                    listaImoveis.ucs.some((imovel: UCResponseDTO) => {
                        if (imovel.uc === this.formTipoAcesso.value.documento) {
                            this._selecaoImovelService.setUCSelecionada = imovel;
                            this._agenciaVirtualService.getProtocolo(token).then(() => {
                                this._router.navigate([PathCompleto.home]);
                            }).catch(() => {
                                this._loadingService.stop();
                                this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: EnumTitulosPadroes.Inesperado } });
                            });

                        }
                    });
                }
            });
        })

    }

}
