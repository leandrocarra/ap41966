import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { FaturaSimplificadaDTO } from 'app/core/models/segunda-via-pagamento/response/segunda-via-pagamento-dto';
import { UCCondensada } from 'app/core/models/segunda-via-pagamento/segunda-via-pagamento';
import { MensagemAviso } from 'app/core/models/segunda-via/segunda-via.model';
import { SubRotaSegundaViaLogin } from 'app/core/models/segunda-via/sub-rotas-segunda-via-login';
import { SegundaViaPagamentoService } from 'app/core/services/segunda-via-pagamento/segunda-via-pagamento.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';
import { validarUC } from 'app/shared/Validators/validar-uc.validator';

@Component({
  selector: 'app-informar-uc-cpf-segunda-via',
  templateUrl: './informar-uc-cpf-segunda-via.component.html',
  styleUrls: ['./informar-uc-cpf-segunda-via.component.scss']
})
export class InformarUcCpfSegundaViaComponent {
    formUC: FormGroup;
    msgAvisoUC: string;
    mobile: boolean;
    listaDeFaturas: Array<FaturaSimplificadaDTO>;
    constructor(
        private _formBuilder: FormBuilder,
		private _location: Location,
        private _router: Router,
        private _segundaViaPagamentoService: SegundaViaPagamentoService
    ) {
        this.formUC = this.createForm();
        this.msgAvisoUC =  MensagemAviso.UnidadeConsumidoraInvalida;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.listaDeFaturas = this._segundaViaPagamentoService.faturasResponseDTO.faturasAbertas;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    createForm(): FormGroup {
        return this._formBuilder.group({
            uc: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(12),
                    validarUC({ uc: true })
                ]
            ]
        });
    }

    acessarFaturas(): void {
        const ucDoInput: string = this.formUC.controls["uc"].value;
        const listaDeUCs: Array<UCCondensada> = this._segundaViaPagamentoService.condensarListaDeUCs(this.listaDeFaturas);
        const ucFiltrada: UCCondensada = this._segundaViaPagamentoService.filtrarUCs(listaDeUCs, ucDoInput);
        if (this.validarUC(ucFiltrada)) {
            if (ucDoInput !== this._segundaViaPagamentoService.fluxoSegundaViaPagamento.uc) {
                this._segundaViaPagamentoService.fluxoSegundaViaPagamento.uc = ucDoInput;
                this._segundaViaPagamentoService.fluxoSegundaViaPagamento.faturasFiltradas = this._segundaViaPagamentoService.filtrarFaturasPorUCSelecionada(this.listaDeFaturas, ucFiltrada);
            }
            this._router.navigate([PathCompleto.segundaViaLogin, SubRotaSegundaViaLogin.AcessarFaturas]);
        }
    }

    acessarUCs(): void {
        this._router.navigate([PathCompleto.segundaViaLogin, SubRotaSegundaViaLogin.AcessarUCs]);
    }

    voltar(): void {
        this._location.back();
    }

    validarUC(uc: UCCondensada): boolean {
        if (uc.numeroUc === '') {
            this.formUC.controls["uc"].setErrors({ uc: false });
            return false;
        } else {
            return true;
        }
    }
}
