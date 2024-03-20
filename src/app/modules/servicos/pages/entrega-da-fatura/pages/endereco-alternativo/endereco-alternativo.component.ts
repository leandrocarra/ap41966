import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { DadosDeEndereco, EntregaDaFatura } from "app/core/models/entrega-de-fatura/entrega-da-fatura";
import { SubRotasFaturaImpressa } from 'app/core/models/entrega-de-fatura/sub-rotas-falta-de-energia';
import { FaturaImpressaService } from 'app/core/services/fatura-impressa/fatura-impressa.service';
import { UserService } from 'app/core/services/user/user.service';
import { ESTADOS_BRASILEIROS } from 'app/core/services/utils/neo-utils.service';
import { Estado } from 'app/shared/models/utils/agencia-virtual-utils';
import { TaxaEntregaAlternativaDTORequest } from 'app/core/models/fatura-impressa/request/fatura-impressa-dto';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { ExibirAvisoService } from 'app/shared/pages/exibir-aviso/exibir-aviso.service';
import { take } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: 'app-endereco-alternativo',
	templateUrl: './endereco-alternativo.component.html',
	styleUrls: ['./endereco-alternativo.component.scss']
})

export class EnderecoAlternativoComponent {
	enderecoAlternativoForm: FormGroup;
	textoLogradouro: string;
	grupoDoUsuario: string;
	estados: Array<Estado>;

	constructor(
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _location: Location,
		private _userService: UserService,
		private _loading: LoadingService,
        private _exibirAvisoService: ExibirAvisoService,
		private _selecaoImoveisService: SelecaoImovelService,
		private _faturaImpressaService: FaturaImpressaService,
	) {
		this.enderecoAlternativoForm = this.createForm();
		this.textoLogradouro = environment.regiao === Regiao.NE ? 'LOGRADOURO' : 'ENDEREÇO';
		this.grupoDoUsuario = this._userService.group;
		this.estados = ESTADOS_BRASILEIROS;
	}

	createForm(): FormGroup {
		let enderecoPreenchido: DadosDeEndereco = this._faturaImpressaService.entregaDaFatura.dadosEndereco;
		return this._formBuilder.group({
			cep: [
				enderecoPreenchido.cep,
				[Validators.required, Validators.minLength(8)],
			],
			logradouro: [
				enderecoPreenchido.logradouro,
				[Validators.required, Validators.maxLength(100)],
			],
			numero: [
				enderecoPreenchido.numero,
				[Validators.required, Validators.maxLength(6)],
			],
			complemento: [
				enderecoPreenchido.complemento,
				[Validators.maxLength(20)],
			],
			bairro: [
				enderecoPreenchido.bairro,
				[Validators.required, Validators.maxLength(100)],
			],
			cidade: [
				enderecoPreenchido.cidade,
				[Validators.required, Validators.maxLength(40)],
			],
			estado: [
				enderecoPreenchido.estado,
				[Validators.required, Validators.maxLength(2)],
			]
		});
	}

	voltar(): void {
		this._location.back();
	}

	continuar(): void {
		this._loading.start();
		this._faturaImpressaService.entregaDaFatura.dadosEndereco = this.enderecoAlternativoForm.value;
		this._faturaImpressaService.entregaDaFatura.contaContrato = this._selecaoImoveisService.getInformacoesUCSelecionada.codigo;
		const endrecoAlternativo = this.passarDadosRequisicao();
        this._faturaImpressaService
            .recebeTaxa(endrecoAlternativo)
            .pipe(take(1))
            .subscribe({
                next: (responseDTO) => {
                    //Salvar Endereço
                    this._faturaImpressaService.entregaDaFatura.taxa = this.formatarTaxa(responseDTO.taxa);

                    let entregaDaFatura : EntregaDaFatura = new EntregaDaFatura();
                    entregaDaFatura.taxa = this.formatarTaxa(responseDTO.taxa);
                    entregaDaFatura.dadosEndereco = {
                        cep: this.enderecoAlternativoForm.get('cep')?.value,
                        logradouro: this.enderecoAlternativoForm.get('logradouro') ?.value,
                        numero: this.enderecoAlternativoForm.get('numero') ?.value,
                        complemento: this.enderecoAlternativoForm.get('complemento') ?.value,
                        bairro: this.enderecoAlternativoForm.get('bairro') ?.value,
                        cidade: this.enderecoAlternativoForm.get('cidade') ?.value,
                        estado: this.enderecoAlternativoForm.get('estado') ?.value,
                        caixaPostal: '',
                    };

                    this._faturaImpressaService.entregaDaFaturaSubject.next(
                        entregaDaFatura
                    );
					this.navegarParaSolicitacaoEnviada();
					this._loading.stop();

                },
                error: (httpErrorResponse: HttpErrorResponse) => {
                    const titulo = httpErrorResponse.error?.retorno?.mensagem || EnumTitulosPadroes.Inesperado;
                    this.redirecionarParaTelaAviso({ titulo: titulo });
					this._loading.stop();
                }
            });
	}

	navegarParaSolicitacaoEnviada() {
		this._router.navigate([PathCompleto.faturaImpressa, SubRotasFaturaImpressa.ConfirmarDados]);
	}


	passarDadosRequisicao(): TaxaEntregaAlternativaDTORequest {
        const request = new TaxaEntregaAlternativaDTORequest();
        request.canalSolicitante = environment.canal;
        request.codigo = this._selecaoImoveisService.getInformacoesUCSelecionada.codigo;
        request.usuario = environment.USUARIO_UE;

        return request;
    }

    redirecionarParaTelaAviso(queryParams: Object): void {
        this._loading.stop();
        this._router.navigate([PathCompleto.aviso],
            { queryParams: { codigoAviso: queryParams } });
    }

	formatarTaxa(taxa: string): string {
        let temp : string = taxa ? parseFloat(taxa.replace(',', '.'))
            .toFixed(2)
            .replace('.', ',')
            .toString() : "";
        return temp;
    }
}

