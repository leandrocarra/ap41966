import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

import { Aviso, EnumAvisosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { PathCompleto } from "../../../core/enums/servicos";
import { LigacaoNovaService } from "../../../core/services/ligacao-nova/ligacao-nova.service";
import { SubRotasRecuperarSenha } from "../../../core/models/RecuperarSenhaDTO/recuperarSenha";
import { SubRotasCadastro } from "../../../core/models/cadastro/cadastro";
import { AgenciaVirtualService } from "../../../core/services/utils/admin/agencia-virtual.service";
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';


@Injectable({
    providedIn: "root",
})
export class ExibirAvisoService {
    private AVISO_ERRO_LARANJA_PADRAO: Aviso = new Aviso(
        'Aconteceu um erro inesperado em nosso sistema.\\nPor favor, tente novamente mais tarde',
        'laranja',
        '',
        'assets/images/illustracao_erro.svg',
        'Aviso',
        'Finalizar',
        (): void => {
            this._agenciaVirtualService.paginaInicial();
        },
        ``,
    );

    constructor(
        private _router: Router,
        private _ligacaoNovaService: LigacaoNovaService,
        private _location: Location,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _cadastroService: CadastroService
    ) { }

    retornarAvisoSomenteTitulo(titulo: string): Aviso {
        return {
            ...this.AVISO_ERRO_LARANJA_PADRAO,
            titulo: titulo
        };
    }

    retornarAvisoCompleto(codigoAviso: EnumAvisosPadroes, titulo?: string, mensagem?: string): Aviso {

        let srcImgAtencao: string = 'assets/images/atencao.svg';
        let srcImgOtimaNoticia: string = 'assets/images/otima-noticia.svg';
        let srcManSuccess: string = 'assets/images/man_success.svg';

        const hyperlinkMap: Record<EnumAvisosPadroes, Aviso> = {
            [EnumAvisosPadroes.UnidadeSuspensa]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Serviço indisponível para unidades consumidoras suspensas.',
                botaoPrimario: 'SOLICITAR RELIGAÇÃO',
                funcaoPrimaria: (): void => {
                    this._router.navigate([PathCompleto.religacao]);
                }
            },

            [EnumAvisosPadroes.UnidadeDesligada]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Serviço indisponível para unidades consumidoras desligadas.',
                botaoPrimario: 'SOLICITAR LIGAÇÃO NOVA',
                funcaoPrimaria: (): void => {
                    this._cadastroService.obterRecaptcha().then((token)=>{
                        this._ligacaoNovaService.redirecionarParaLigacaoNova(token);
                    })

                }
            },
            [EnumAvisosPadroes.DataDeVencimento]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Ainda não é possivel alterar a data de vencimento.',
                mensagem: mensagem || 'Não é possivel alterar a data de vencimento.',
                imagemSrc: srcImgAtencao
            },
            [EnumAvisosPadroes.DataDeVencimentoColetivaVinculada]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Serviço indisponível para conta contrato coletiva.',
            },
            [EnumAvisosPadroes.Resolvido]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Ótima notícia!\nParece que resolvemos o problema :)',
                tituloColor: 'verde',
                imagemSrc: srcImgOtimaNoticia
            },
            [EnumAvisosPadroes.EnergiaVoltou]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Ótima notícia!\nParece que resolvemos o problema :)',
                tituloColor: 'verde',
                imagemSrc: srcImgOtimaNoticia
            },
            [EnumAvisosPadroes.DisjuntorDanificado]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Consulte um eletricista particular para consertar seu disjuntor!',
                mensagem: 'O jeito mais rápido de resolver o problema com o seu disjuntor é chamando um profissional qualificado (eletricista) de sua confiança.\nDefeitos na instalação elétrica da Unidade Consumidora são de responsabilidade do cliente.',
                imagemSrc: 'assets/images/chamar-eletricista.svg'
            },
            [EnumAvisosPadroes.EmPracaOuJardim]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Entre em contato com a prefeitura.',
                mensagem: 'A manutenção e expansão da iluminação em praças ou jardins públicos de sua cidade é de responsabilidade da prefeitura municipal.',
                imagemSrc: 'assets/images/contato.svg'
            },
            [EnumAvisosPadroes.ParteDaMinhaUC]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Consulte um profissional especializado!',
                mensagem: 'Recomendamos contratar um eletricista particular para averiguação da instalação interna e possível redistribuição/balanceamento das cargas.',
                imagemSrc: 'assets/images/chamar-eletricista.svg'
            },
            [EnumAvisosPadroes.UsuarioNaoCadastrado]: {
                titulo: titulo || 'CPF/CNPJ não cadastrado!\nDados não localizados. Por favor, realize seu\ncadastro e tente novamente.',
                tituloColor: 'laranja',
                imagemSrc: 'assets/images/illustracao_erro.svg',
                botaoPrimario: 'CADASTRE-SE',
                funcaoPrimaria: () => {
                    this._router.navigate([PathCompleto.cadastro]);
                },
            },
            [EnumAvisosPadroes.CadastroExistente]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'CPF/CNPJ já cadastrado!',
                tituloColor: 'verde',
                mensagem: 'Verificamos que o CPF/CNPJ já está cadastrado.\nFaça seu login e, se tiver dificuldades, você pode recuperar sua senha.',
                imagemSrc: 'assets/images/mulher_apontando_atencao.svg',
                botaoPrimario: 'FAZER LOGIN',
                funcaoPrimaria: (): void => {
                    this._router.navigate([''])
                },
                botaoSecundario: 'RECUPERAR SENHA',
                funcaoSecundaria: (): void => {
                    this._router.navigate([PathCompleto.recuperarSenha, SubRotasRecuperarSenha.identificacao])
                }
            },
            [EnumAvisosPadroes.CadastroPendente]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Cadastro pendente de ativação!',
                tituloColor: 'verde',
                imagemSrc: 'assets/images/mulher_apontando_atencao.svg',
                botaoPrimario: 'ENVIAR',
                mensagem: mensagem,
                funcaoPrimaria: (): void => {
                    console.log("Olá! Gostaria de receber novamente o email de ativação.");
                },
                botaoSecundario: 'FECHAR',
                funcaoSecundaria: (): void => {
                    this._router.navigate(['']);
                }
            },
            [EnumAvisosPadroes.CadastroConcluido]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Parabéns!\nO seu cadastro foi concluído com sucesso.',
                tituloColor: 'verde',
                imagemSrc: srcManSuccess,
                botaoPrimario: 'Finalizar',
                funcaoPrimaria: (): void => {
                    this._router.navigate(['']);
                }
            },
            [EnumAvisosPadroes.DadosNaoConferem]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Dados não conferem.',
                mensagem: `Por favor, verifique os dados fornecidos e tente novamente.`,
                imagemSrc: 'assets/images/mulher_apontando_atencao.svg',
                botaoPrimario: 'CORRIGIR',
                funcaoPrimaria: (): void => {
                    this._location.back();
                },
                botaoSecundario: 'CANCELAR',
                funcaoSecundaria: () => {
                    this._router.navigate(['']);
                }
            },
            [EnumAvisosPadroes.CadastroInexistente]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'CPF/CNPJ não cadastrado!',
                tituloColor: 'laranja',
                mensagem: 'Dados não localizados. Por favor, realize seu\n cadastro e tente novamente.',
                imagemSrc: 'assets/images/illustracao_erro.svg',
                botaoPrimario: 'CADASTRE-SE',
                funcaoPrimaria: () => {
                    this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.identificacao]);
                },
                botaoSecundario: 'VOLTAR',
                funcaoSecundaria: () => {
                    this._router.navigate([PathCompleto.recuperarSenha, SubRotasRecuperarSenha.identificacao]);
                }
            },
            [EnumAvisosPadroes.SenhaAlterada]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Sua nova senha foi cadastrada com sucesso!',
                tituloColor: 'verde',
                mensagem: 'Agora você tem acesso à todos os nossos \nserviços digitais.',
                imagemSrc: srcManSuccess,
                botaoPrimario: 'Finalizar',
                funcaoPrimaria: () => {
                    this._router.navigate(['/login']);
                }
            },
            [EnumAvisosPadroes.FormularioEnviado]: {
                ...this.AVISO_ERRO_LARANJA_PADRAO,
                titulo: titulo || 'Formulário enviado para análise.',
                tituloColor: 'verde',
                mensagem: 'Em breve você receberá um retorno\nde sua solicitação no e-mail de contato indicado.',
                imagemSrc: srcManSuccess,
                botaoPrimario: 'Finalizar',
                funcaoPrimaria: () => {
                    this._agenciaVirtualService.paginaInicial();
                }
            }
        }

        return hyperlinkMap[codigoAviso];
    }
}
