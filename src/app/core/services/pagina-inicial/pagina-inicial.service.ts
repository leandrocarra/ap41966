import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { CardAcessoRapido, CardDestaques } from 'app/core/models/pagina-inicial/pagina-inicial';
import { LigacaoNovaService } from '../ligacao-nova/ligacao-nova.service';
import { DialogLoginService } from '../dialog-login/dialog-login.service';

@Injectable({
    providedIn: 'root'
})
export class PaginaInicialService {
	banner: string;
	tituloSectionDois: string;
	tituloSectionTres: string;
	cardsDestaques: Array<CardDestaques>;
	cardsAcessoRapido: Array<CardAcessoRapido>;
	constructor(
		private _ligacaoNovaService: LigacaoNovaService,
        private _dialogLoginService: DialogLoginService
	) {
		this.banner = "assets/images/banner-inicial.png";
		this.tituloSectionDois = "Acesso rápido aos principais serviços";
		this.tituloSectionTres = "Destaques";
		this.cardsAcessoRapido = new Array<CardAcessoRapido>();
		 this.cardsDestaques = this.criarCardDestaques();
	}

    criarCardDestaques(): Array<CardDestaques> {
        return [
            new CardDestaques(
                "assets/images/destaques_1.png",
                "Como se cadastrar na Agência Virtual?",
                `Cadastro no conforto da sua casa
				Cadastre-se e tenha acesso a todos os serviços da Agência Virtual de maneira simples, pelo site ou aplicativo. Veja como essa novidade pode facilitar seus pagamentos e controle de seu consumo mensal...`,
                "Atualizado a 3 minutos atrás"
            ),
            new CardDestaques(
                "assets/images/destaques_2.png",
                "Notícias",
                `Neoenergia Elektro é destaque no prêmio Abradee 2021.
				A distribuidora de energia foi reconhecida pela performance na qualidade da gestão. A empresa também se consagrou como a segunda melhor da Região Sudeste. ler mais...`,
                "06 de Julho de 2022"
            ),
            new CardDestaques(
                "assets/images/destaques_3.png",
                "Notícias",
                `Neoenergia Elektro é destaque no prêmio Abradee 2021.
				A distribuidora de energia foi reconhecida pela performance na qualidade da gestão. A empresa também se consagrou como a segunda melhor da Região Sudeste. ler mais...`,
                "06 de Julho de 2022"
            )
        ];
    }

    criarCardsAcessoRapido(rota: string): Array<CardAcessoRapido> {
        this.cardsAcessoRapido = [];
        if (!rota.includes(PathCompleto.segundaViaLogin.toString())) {
            this.cardsAcessoRapido.push(new CardAcessoRapido(
                "assets/images/icons/icone_fatura_facil.svg",
                "2ª Via de Pagamento",
                "Pague sua conta de forma rápida, fácil e segura.",
                "ROTA",
				[PathCompleto.segundaViaLogin],
				"#FF9C1A",
				"#FFFFFF"
			));
		}
        if (environment.regiao === Regiao.NE) {
            this.cardsAcessoRapido.push(
                new CardAcessoRapido(
                    "assets/images/icons/icone_ligacao_nova.svg",
                    "Ligação Nova",
                    "Faça sua solicitação sem precisar sair de casa.",
                    "LINK",
                    undefined,
                    "#ffffff",
                    "#707070",
                    this._ligacaoNovaService.selecionarHyperlinkPorCanal()
                )
            );
        } else {
            this.cardsAcessoRapido.push(
                new CardAcessoRapido(
                    "assets/images/icons/icone_ligacao_nova.svg",
                    "Ligação Nova",
                    "Faça sua solicitação sem precisar sair de casa.",
                    "FUNCAO",
                    [],
                    "#ffffff",
                    "#707070",
                    '',
                    () => {
                        this._dialogLoginService.exibirDialogLogin();
                    }
                )
            );
        }
		this.cardsAcessoRapido.push(
            new CardAcessoRapido("assets/images/icons/formulario_cadastro.svg",
                "Cadastro Imobiliário",
                "Cadastre uma imobiliária e conceda acesso aos corretores.",
                "ROTA",
                [PathCompleto.multiloginCadastroImobiliario]
            ),

            new CardAcessoRapido("assets/images/icons/formulario_cadastro.svg",
                "Cadastro de Credenciados",
                "Cadastre uma loja e conceda acesso aos seus atendentes.",
                "ROTA",
                [PathCompleto.multiloginCadastroCredenciado]
            ),
		)
		return this.cardsAcessoRapido;
	}
}
