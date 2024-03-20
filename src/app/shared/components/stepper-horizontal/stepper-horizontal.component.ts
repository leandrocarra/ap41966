import { Component, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { Etapa } from '../../interfaces/etapas';
import { SubRotasCadastro } from 'app/core/models/cadastro/cadastro';
import { SubRotasRecuperarSenha } from 'app/core/models/RecuperarSenhaDTO/recuperarSenha';

@Component({
    selector: 'app-stepper-horizontal',
    templateUrl: './stepper-horizontal.component.html',
    styleUrls: ['./stepper-horizontal.component.scss']
})

export class StepperHorizontalComponent implements OnInit, OnDestroy {
	@Input() etapas!: Array<Etapa>;
	url!: string;
	mobile: boolean;
	mobileXS: boolean;
    etapaAtual: number;
    subscription!: Subscription;
    mostrarPassos: boolean;

    constructor(
		private _router: Router
	) {
		this.mobile = window.screen.width <= 768 ? true : false;
		this.mobileXS = window.screen.width < 576 ? true : false;
        this.etapaAtual = 1;
        this.mostrarPassos = true
	}

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.configureMenuByWindowSize(event.target.innerWidth);
	}

	configureMenuByWindowSize(width: any) {
		this.mobile = width <= 768 ? true : false;
		this.mobileXS = width < 576 ? true : false;
	}

    ngOnInit(): void {
        this.subscription = this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
			this.url = event.url;
			this.etapaAtual = this.definirEtapa(event.url);
			this.setStep(this.etapaAtual);
		});
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

	definirEtapa(rota: string): number {
		let trechoDaRota: string = <string>rota.split('/').pop()
		switch (trechoDaRota) {
			case SubRotasCadastro.identificacao: return 1;
			case SubRotasCadastro.identificacaoDadosCadastro: return 1;
            case SubRotasCadastro.dadosPessoaJuridicaUC: return 1;
            case SubRotasCadastro.dadosPessoaJuridicaEmpresa: return 1;
            case SubRotasCadastro.dadosPessoaJuridicaRepresentante: return 1;
			case SubRotasCadastro.dadosPessoaisPessoaFisica: return 2;
			case SubRotasCadastro.dadosPessoaisPessoaFisicaEmail: return 2;
            case SubRotasCadastro.dadosPessoaJuridicaRepresentanteContato: return 2;
            case SubRotasCadastro.dadosPessoaJuridicaRepresentanteEmail: return 2;
			case SubRotasCadastro.senha: return 3;
			case SubRotasCadastro.validarCodigoDeAtivacao: return 3;

            case SubRotasRecuperarSenha.identificacao: return 1;
            case SubRotasRecuperarSenha.linkConfirmacao: return 2;
            case SubRotasRecuperarSenha.informarCodigoEnviado: return 2;
            case SubRotasRecuperarSenha.novaSenha: return 3;
            default:
                this.mostrarPassos = false;
                return 4;
		}
	}

	setStep(etapa: number): void {
        const identificacao = this.url.includes(SubRotasCadastro.identificacao);
        const dadosPessoaisPessoaFisica = this.url.includes(SubRotasCadastro.dadosPessoaisPessoaFisica);
        const juridicaUC = this.url.includes(SubRotasCadastro.dadosPessoaJuridicaUC);
        const juridicaEmpresa = this.url.includes(SubRotasCadastro.dadosPessoaJuridicaEmpresa);
        const juridicaRepresentante = this.url.includes(SubRotasCadastro.dadosPessoaJuridicaRepresentante);
        const juridicaRepresentanteContato = this.url.includes(SubRotasCadastro.dadosPessoaJuridicaRepresentanteContato);
        const juridicaRepresentanteEmail = this.url.includes(SubRotasCadastro.dadosPessoaJuridicaRepresentanteEmail)
        const senha = this.url.includes(SubRotasCadastro.senha);
        const validarCodigo = this.url.includes(SubRotasCadastro.validarCodigoDeAtivacao);
        const avisoComStepper = this.url.includes(SubRotasCadastro.avisoComStepper)

        const identificacaoRecuperar = this.url.includes(SubRotasRecuperarSenha.identificacao);
        const linkConfirmacaoRecuperarSenha = this.url.includes(SubRotasRecuperarSenha.linkConfirmacao);
        const informarCodigorecuperarSenha = this.url.includes(SubRotasRecuperarSenha.informarCodigoEnviado);
        const novaSenhaRecuperar = this.url.includes(SubRotasRecuperarSenha.novaSenha);

        switch (etapa) {
            case 1:
                if (identificacao ||
                    juridicaUC ||
                    juridicaEmpresa ||
                    juridicaRepresentante || identificacaoRecuperar)
                        this.concluirEtapas(false, etapa);
            case 2:
            case 3:
                if (dadosPessoaisPessoaFisica ||
                    senha ||
                    juridicaRepresentanteContato ||
                    juridicaRepresentanteEmail ||
                    validarCodigo || linkConfirmacaoRecuperarSenha ||
                    informarCodigorecuperarSenha ||
                    novaSenhaRecuperar)
                        this.concluirEtapas(true, etapa);
            case 4:
                if(avisoComStepper){
                    this.etapas[3].concluida = true;
                    this.etapas[2].linha = true;
                }
            default:
                break;
        }
    }

    concluirEtapas(preencherLinha: boolean = true, etapa: number) {
        this.etapas[(etapa - 1)].concluida = true;
        this.etapas[(etapa - 2)].linha = preencherLinha;
    }
}
