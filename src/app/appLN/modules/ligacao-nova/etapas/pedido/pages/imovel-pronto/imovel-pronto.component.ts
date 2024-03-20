import { Component, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { configureMenuByWindowSize } from 'app/appLN/core/services/utils/neo-utils.service';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { LoginService } from '../../../../../../core/services/login/login.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';

@Component({
	selector: 'neo-imovel-pronto',
	templateUrl: './imovel-pronto.component.html',
	styleUrls: ['./imovel-pronto.component.scss']
})
export class ImovelProntoComponent {
	public mobile: boolean;
	public mobileXS: boolean;
	public imovelPreparado!: boolean | undefined;
	public tooltipBeneficiario: string;


	constructor(
		private _router: Router,
		private _loginService: LoginService,
		private _userServiceLN: UserServiceLN,
		private _alert: CustomSweetAlertService,
		private _dadosImovelService: DadosDoImovelService,
		private _ligacaoNovaService: LigacaoNovaService,
		private _dialog: MatDialog,
        private _loadingService: LoadingService
	) {

		this.mobile = configureMenuByWindowSize(window.screen.width)
		this.mobileXS = configureMenuByWindowSize(window.screen.width, 576)

		this.imovelPreparado = this._dadosImovelService.getPadraoPronto;
		this.tooltipBeneficiario = `Para solicitar a instalação gratuita do padrão de  entrada você deve se enquadrar nos seguintes requisitos:

		Pertencer a uma família inscrita no Cadastro Único, com data da última atualização cadastral não superior a 2 anos e renda familiar mensal de até 3 salários mínimos.

		Estar localizado em uma área rural e possuir uma ligação configurada como monofásica ou bifásica.`;
	}

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
		this.mobileXS = configureMenuByWindowSize(event.target.innerWidth,  576);
	}

	solicitarLigacao(): void {
		this.checkPendencias();
	}

	termoLocal(): void {
		this._alert.alertAreaPreparada().then((r => { }));
	}

    // TODO: Considerar implementação que verifique quanto à disponobilidade de uma câmera no dispositivo do usuário e que o notifique no caso de erro.

	private checkPendencias(): void {
		this._ligacaoNovaService.idAcompanhamentoJornada(this._userServiceLN.sessionUser.documento).subscribe(result => {
			this._userServiceLN.setIdAtendimento = result;
			this._dadosImovelService.setPadraoPronto = this.imovelPreparado;
		});
		this._loadingService.start();
		this._ligacaoNovaService.checkCamera().then(result => {
			this.erroCameraIndisponivel(result);
		});
	}

	private erroCameraIndisponivel(erro?: any) {
		if (erro !== null) {
			if (erro.message === ('Permission denied') || erro.message === ('Could not start video source') || erro.message === ('DOMException')) {
				this._alert.alertCamera("Para continuar com a solicitação é necessário o acesso à uma webcam. Acesse o portal utilizando um computador ou dispositivo móvel com uma câmera habilitada.").then((r) => {
					if (r.value) {
						this._alert.alertCameraBloqueada();
					} else if (r.dismiss) {
						this._loginService.logout();
					}
				});
			}
		} else {
			this._loadingService.stop();
			this.continuar();
		}
	}

	continuar(): void {
		this._ligacaoNovaService.stopStreamedVideo();
		this._router.navigate(["ligacao-nova", "pedido", "dados-do-imovel"]);
	}

    openDialog(): void {
		this._dialog.open(PadraoEntradaDialogComponent, {
			hasBackdrop: true,
			width: 'auto',
			height: 'auto',
			maxWidth: '80vw'
		});
	}
}

@Component({
	selector: 'neo-padrao-entrada-dialog',
	templateUrl: './padrao-entrada-dialog.component.html',
	styleUrls: ['./imovel-pronto.component.scss']
})
export class PadraoEntradaDialogComponent {
	mobile: boolean;
	constructor(
		private _dialogRef: MatDialogRef<PadraoEntradaDialogComponent>
	) {
        this.mobile = configureMenuByWindowSize(window.screen.width);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    fechar(): void {
        this._dialogRef.close();
    }
}
