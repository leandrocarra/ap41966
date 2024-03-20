import { Location } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { Anexo } from 'app/core/models/anexo/anexo';
import { BoxAnexo } from 'app/core/models/documentos/box-anexo/box-anexo';
import { AnexarArquivosDTORequest, AnexoSSOS, RegistroAtendimentoDTORequest } from 'app/core/models/geral/request/geral-dto';
import { GrupoVinculos, PerfisDeAcesso, TipoAcesso } from 'app/core/models/multilogin/multilogin-acesso';
import { SubRotasMultiloginCadastro } from 'app/core/models/multilogin/multilogin-cadastro';
import { BuscaTipoClienteDTORequest, ObterVinculosDTORequest, VinculosDTORequest } from 'app/core/models/multilogin/request/multilogin-dto';
import { PerfilAtivo } from 'app/core/models/multilogin/response/multilogin-dto';
import { UCResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto';
import { GrupoTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { CustomSweetAlertService } from "app/core/services/customsweetalert/custom-sweet-alert.service";
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { MarketingAutomationService } from 'app/core/services/marketing-automation/marketing-automation.service';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';
import { MultiloginCadastroService } from 'app/core/services/multilogin-cadastro/multilogin-cadastro.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from 'app/core/services/user/user.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { take } from 'rxjs';
import { EnumTitulosPadroes } from "../../../../core/models/exibir-aviso/exibir-aviso";


const CONST_MB: number = 1000000;

@Component({
    selector: 'app-multilogin-compartilhar-acesso',
    templateUrl: './multilogin-compartilhar-acesso.component.html',
    styleUrls: ['./multilogin-compartilhar-acesso.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MultiloginCompartilharAcessoComponent {
    grupoTensao: GrupoTensao;
    ucSelecionada: UCResponseDTO | null;
    pesquisaConcluida: boolean;
    dadosUsuarioFilho!: PerfilAtivo
    userIdMask: string;
    formIdentificacao: FormGroup;
    perfilEscolhido: string;
    perfis: string[] = [];
    exibirAnexo: boolean;
    gruposAlterado: boolean;

    //Termo - Padronista e Projetista
    exibirTermo: boolean;

    //Anexo - Representante Legal e Cônjuge
    dadosBoxAnexo: BoxAnexo;
    arrayAnexos: Array<Anexo>;
    formatosParaAnexar: string;
    tamanhoMaximoArquivo: number;
    docInfo: string;

    meusGrupos: Array<GrupoVinculos>;

    constructor(
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _multiloginCadastroService: MultiloginCadastroService,
        private _multiloginAcessoService: MultiloginAcessoService,
        private _selecaoImovelService: SelecaoImovelService,
        private _marketingAutomationService: MarketingAutomationService,
        private _loadingService: LoadingService,
        private _alertService: CustomSweetAlertService,
        private _userService: UserService,
        private _router: Router,

    ) {
        this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao);
        this.ucSelecionada = this._selecaoImovelService.ucSelecionada;
        this.userIdMask = '000.000.000-009';
        this.formIdentificacao = this.criarFormulario();

        this.pesquisaConcluida = false;
        this.gruposAlterado = false;
        this.exibirAnexo = false;
        this.perfilEscolhido = '';
        this.validarPerfis();



        //Termo
        this.exibirTermo = false;

        //Anexo
        this.dadosBoxAnexo = this._multiloginCadastroService.multiloginCompartilharAcesso.boxAnexo ?? new BoxAnexo('DOCUMENTO DE COMPROVAÇÃO', false, 'DOCUMENTO DE COMPROVAÇÃO');
        this.arrayAnexos = this._multiloginCadastroService.multiloginCompartilharAcesso.comprovantes ?? [];
        this.formatosParaAnexar = environment.regiao === Regiao.NE ? '.pdf' : '.png, .jpg, .jpeg, .pdf';
        this.tamanhoMaximoArquivo = environment.regiao === Regiao.NE ? 1000000 : 2500000;
        this.docInfo = `- Documentos aceitos: Ata de condomínio, Contrato CNPJ, Ofício, Procuração, entre outros.\n
        - Tamanho máximmo para anexo é de ${this.tamanhoMaximoArquivo / CONST_MB}MB.\n
        - Aceito apenas anexos nos formatos ${this.formatosParaAnexar}.`;

        this._selecaoImovelService.ucSelecionada.subscribe((ucSelecionada: UCResponseDTO | null) => {
            this.ucSelecionada = ucSelecionada;
        });

        this.meusGrupos = this._multiloginAcessoService.getMultiloginAcesso.grupos;
        this.dadosUsuarioFilho = new PerfilAtivo('', '', '', '', '', [], '', false);

    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group(
            {
                documento: ['',
                    [
                        Validators.minLength(11),
                        Validators.maxLength(14),
                        Validators.required
                    ]
                ],
                checkTermoPadronista: [false]
            }
        );
    }

    aplicarMaskCpfCnpj(): void {
        this.pesquisaConcluida = false;
        this.userIdMask = this.formIdentificacao.value.documento.length > 11 ? "00.000.000/0000-00" : "000.000.000-009";
    }

    validarPerfis(): void {
        if (this._multiloginAcessoService.multiloginAcesso.tipoPerfil === TipoAcesso.credenciado) {
            this.perfis = ['Atendente Credenciado'];
            this.perfilEscolhido = this.perfis[0];
        } else if (this._multiloginAcessoService.multiloginAcesso.tipoPerfil === TipoAcesso.imobiliaria) {
            this.perfis = ['Corretor'];
            this.perfilEscolhido = this.perfis[0];
        } else {
            this.perfis = this.definirUsuarioCNPJ() ? ["Representante Legal", "Perfil de Acesso", "Imobiliária"] : ["Representante Legal", "Cônjuge", "Perfil de Acesso", "Imobiliária"]
            if (environment.regiao === Regiao.SE) {
                this.perfis.push('Padronista');
            }
        }
    }

    definirUsuarioCNPJ(): boolean {
        let documento = this._multiloginAcessoService.definirDocumento();
        return (documento.length > 11);
    }

    atualizarForms(): void {
        (this.perfilEscolhido === PerfisDeAcesso.padronista) ? this.formIdentificacao.controls.checkTermoPadronista.setValidators([Validators.required]) : this.formIdentificacao.controls.checkTermoPadronista.clearValidators();
    }

    receberAnexo(arquivo: Anexo) {
        if (this.arrayAnexos.length > 1) {
            this._alertService.alertInfo("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo.");
        } else {
            this.arrayAnexos.push(arquivo);
        }
    }

    removerAnexo(indexArquivo: number): void {
        this.arrayAnexos.splice(indexArquivo, 1);
    }

    voltar(): void {
        this._location.back();
    }

    finalizarPesquisa(): void {
        this._loadingService.stop();
        this.pesquisaConcluida = true;
    }

    definirPerfil(perfil: any): void {
        this.exibirAnexo = (this._multiloginCadastroService.validarRelacaoLegado(perfil.toString(), false));
        this.exibirTermo = (!this.exibirAnexo) ? (perfil === PerfisDeAcesso.padronista) : false;
    }

    validarAcao(): void {
        (this._multiloginCadastroService.definirRelacoesBO(this.perfilEscolhido as PerfisDeAcesso)) ? this.definirEmailBO() : this.compartilharAcessoMultilogin()
    }

    removerUsuario(dadosUser: any): void {
        this._alertService.alertExcluirVinculo().then((result => {
            if (result.value) {
                this.removerCompartilharAcesso(dadosUser);
            }
        }));
    }

    desabilitarBtnAcao(): boolean {
        if (this.exibirAnexo) {
            return (this.arrayAnexos.length === 0);
        } else if (this.perfilEscolhido === PerfisDeAcesso.padronista) {
            return !this.formIdentificacao.value.checkTermoPadronista;
        }
        return false;
    }

    salvar(): void {
        if (this.gruposAlterado) {
            this._alertService.alertAlteradoSucesso('Alteração realizado com sucesso!', 'IR PARA PÁGINA INICIAL').then(() => {
                this._multiloginAcessoService.getMultiloginAcesso.tipoPerfil === TipoAcesso.acessoComum ? this._router.navigate([PathCompleto.home]) : this._router.navigate([PathCompleto.compartilharAcesso]);
            });
        } else {
            this._multiloginAcessoService.getMultiloginAcesso.tipoPerfil === TipoAcesso.acessoComum ? this._router.navigate([PathCompleto.home]) : this._router.navigate([PathCompleto.compartilharAcesso]);
        }
    }

    pesquisar(): void {
        this._loadingService.start();
        this._agenciaVirtualService.preencherAtivoRequestDTO(this.formIdentificacao.value.documento).then((dadosRequest) => {
            this.validarUsuarioAtivo(dadosRequest);
        }).catch(() => {
            this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado });
        });
    }

    validarUsuarioAtivo(dadosRequest: any): void {
        this._agenciaVirtualService.consultarUsuarioAtivo(dadosRequest).subscribe({
            next: (data) => {
                this.finalizarPesquisa();
                if (data.ativo) {
                    this.dadosUsuarioFilho.isValid = true;
                    this.dadosUsuarioFilho.button = 'adicionar';
                    this.dadosUsuarioFilho.docTitular = this.formIdentificacao.value.documento;
                    this.atualizarForms();
                }
            },
            error: (error) => {
                this.finalizarPesquisa();
                if (error.error.retorno.numero === '404_Not_Found') {
                    this.dadosUsuarioFilho.isValid = false;
                    this.dadosUsuarioFilho.docTitular = this.formIdentificacao.value.documento;
                } else {
                    this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado });
                }
            }
        });
    }

    // NE: Ordem das chamadas: busca tipo cliente -> enviar anexo ->  enviar email B.O
    definirEmailBO(): void {
        let request = new BuscaTipoClienteDTORequest(
            `${environment.name}/${this._userService.dadosUser.documento}`,
            environment.canal,
            environment.USUARIO_UE,
            this._userService.dadosUser.documento
        )
        if (environment.regiao === Regiao.NE) {
            this._multiloginCadastroService.buscaTipoCliente(request).subscribe({
                next: (data) => {
                    this._multiloginCadastroService.multiloginCompartilharAcesso.tipoEmailBO = data.tipoCliente;
                    if (this._multiloginCadastroService.validarRelacaoLegado(this.perfilEscolhido as PerfisDeAcesso, false)) {
                        this.enviarAnexoNE();
                    } else {
                        this.enviarEmailBO();
                    }
                },
                error: () => {
                    this._loadingService.stop();
                    this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado });
                }
            });
        } else {
            this.registroAtendimento();
        }
    }

    enviarAnexoNE(): void {
        this._loadingService.start();
        this._marketingAutomationService.uplodaArquivo(this._multiloginCadastroService.requestAnexo(this.arrayAnexos[0])).subscribe({
            next: (data) => {
                this._multiloginCadastroService.multiloginCompartilharAcesso.customerKey = data.customerKey;
                this.enviarEmailBO();
            },
            error: () => {
                this._loadingService.stop();
                this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado });
            }
        });
    }


    enviarEmailBO(): void {
        let perfilComUc = this.perfilEscolhido !== PerfisDeAcesso.atendenteCredenciado;
        this._marketingAutomationService.envioDeMensagem(this._multiloginCadastroService.requestVinculoLegado(this.dadosUsuarioFilho, perfilComUc)).subscribe({
            next: () => {
                this._loadingService.stop();
                this.gruposAlterado = true;
                this.setarValoresUsuarioFilho();
                this._alertService.documentacaoEnviadaComSucesso();
            },
            error: () => {
                this._loadingService.stop();
                this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado });
            }
        })
    }

    // SE: Ordem das chamadas: chamar registro atendimento -> enviar anexo
    registroAtendimento(): void {
        let request: RegistroAtendimentoDTORequest = new RegistroAtendimentoDTORequest(
            environment.canal,
            environment.USUARIO_UE,
            `CADASTRAR COMPARTILHAR ACESSO COM ${this.perfilEscolhido.toUpperCase()}`,
        )

        this._agenciaVirtualService.registroAtendimentoSE(request).subscribe({
            next: (data) => {
                this.enviarAnexoSE();
            },
            error: () => {
                this._loadingService.stop();
                this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado });
            }
        })
    }

    enviarAnexoSE(): void {
        let request: AnexarArquivosDTORequest = new AnexarArquivosDTORequest(
            environment.USUARIO_UE,
            environment.canal,
            "",
            "",
            "",
            new AnexoSSOS(this.arrayAnexos[0].fileExtension, this.arrayAnexos[0].fileName, this.arrayAnexos[0].fileSize.toString())
        )
        this._agenciaVirtualService.enviarAnexoSE(request).subscribe({
            next: (data) => {
                this.enviarEmailBO();
            },
            error: () => {

            }
        });
    }

    compartilharAcessoMultilogin(): void {
        this._loadingService.start();
        this._multiloginCadastroService.criarVinculo(this.preencherRequest()).subscribe({
            next: (data) => {
                if (data.mensagem === 'OK') {
                    if (this.ucSelecionada && this._multiloginAcessoService.multiloginAcesso.tipoPerfil === TipoAcesso.acessoComum) {
                        this.compartilharAcessoMultiloginUC();
                    }else{
                        this.atualizarInformacoes();
                    }
                }
                this._loadingService.stop();
            },
            error: (error) => {
                this._loadingService.stop();
                if (error.error.retorno.mensagem === 'Não foi possível fazer o vínculo, pois esse vínculo já existe') {
                    if (this.ucSelecionada && this._multiloginAcessoService.multiloginAcesso.tipoPerfil === TipoAcesso.acessoComum) {
                        this.compartilharAcessoMultiloginUC();
                    }
                } else {
                    this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado })
                }
            }
        });
    }

    compartilharAcessoMultiloginUC(): void {
        let request = this.preencherRequest();
        request.uc = this.ucSelecionada?.uc;
        this._multiloginCadastroService.criarVinculoUC(request).subscribe({
            next: (data) => {
                if (data.mensagem === 'UC vinculada') {
                    this.atualizarInformacoes();
                }
            },
            error: (error) => {
                console.log(error);
                this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado })
            }
        })
    }

    atualizarInformacoes(): void {
        this.gruposAlterado = true;
        this.setarValoresUsuarioFilho();
        this.atualizarVinculos();
      }

    atualizarVinculos(): void {
        let requestDTO = new ObterVinculosDTORequest(
            `${environment.name}/${this._userService.dadosUser.documento}`,
            this._multiloginAcessoService.definirDocumento()
        )
        this._multiloginAcessoService.getObterVinculoConcedido(requestDTO).then((vinculosConcedidos) => {
            this._multiloginAcessoService.definirGrupos(vinculosConcedidos);
            this.meusGrupos = this._multiloginAcessoService.getMultiloginAcesso.grupos;
        }).catch(() => {
            this._alertService.alertInfo("Não conseguimos atualizar os dados do compartilhamento no momento. Por favor, tente mais tarde.");
        })
    }

    removerCompartilharAcesso(dadosUser: any): void {
        this._multiloginCadastroService.removerVinculoUC(this.preencherRequest(dadosUser.event)).subscribe({
            next: () => {
                //Remover vínculo
                this.meusGrupos[dadosUser.grupoIndice].vinculos.splice(dadosUser.usuarioIndice, 1);

                //Remover grupo se vazio
                if (this.meusGrupos[dadosUser.grupoIndice].vinculos.length === 0) {
                    this.meusGrupos.splice(dadosUser.grupoIndice, 1);
                }

                this._multiloginAcessoService.multiloginAcesso.grupos = this.meusGrupos;
                this.gruposAlterado = true;
            },
            error: (error) => {
                console.log(error);
                this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado });
            }
        })
    }

    preencherRequest(dadosUsuarioFilho?: PerfilAtivo): VinculosDTORequest {
        let tipoPerfil = this._multiloginAcessoService.multiloginAcesso.tipoPerfil;
        let perfilDeAcesso = this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso;
        let excluir = (dadosUsuarioFilho?.button === 'excluir') ? true : false;
        let request = new VinculosDTORequest(
            `${environment.name}/${this._multiloginAcessoService.definirDocumento()}`,
            this._userService.dadosUser.documento,
            excluir ? dadosUsuarioFilho?.docTitular ?? '' : this.formIdentificacao.value.documento,
            excluir ? this._multiloginCadastroService.definirTipoAtribuicao(perfilDeAcesso, tipoPerfil, dadosUsuarioFilho?.nomePerfil ?? '') : this._multiloginCadastroService.definirTipoAtribuicao(perfilDeAcesso, tipoPerfil, this.perfilEscolhido),
            environment.canal,
            this.ucSelecionada?.uc,
        );

        if (excluir) {
            request.dataVigenciaCadastro = dadosUsuarioFilho?.dataVigencia ?? "";
        }

        return request;
    }

    redirecionarParaTelaAviso(queryParams: Object) {
        this._loadingService.stop();
        this._router.navigate([PathCompleto.multiloginCadastro, SubRotasMultiloginCadastro.Avisos],
            { queryParams: queryParams });
    }

    setarValoresUsuarioFilho(): void {
        this.dadosUsuarioFilho = new PerfilAtivo('', '', '', '', '', [], '', false);
        this.formIdentificacao.controls['documento'].setValue('');
        this.perfilEscolhido = '';
        this.pesquisaConcluida = false;
    }
}
