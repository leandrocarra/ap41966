import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {environment} from '@environments/environment';
import {PathCompleto} from 'app/core/enums/servicos';
import {SubRotasFaturaImpressa} from 'app/core/models/entrega-de-fatura/sub-rotas-falta-de-energia';
import {EnderecoAlternativoValidaDTORequest} from 'app/core/models/fatura-impressa/request/fatura-impressa-dto';
import {FaturaImpressaService} from 'app/core/services/fatura-impressa/fatura-impressa.service';
import {SelecaoImovelService} from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import {UserService} from 'app/core/services/user/user.service';
import {ucSomenteDeZeros, validarUC} from '../../../../../../shared/Validators/validar-endereco-alternativo';
import {EntregaDaFatura} from 'app/core/models/entrega-de-fatura/entrega-da-fatura';
import {take} from 'rxjs';
import {LoadingService} from 'app/core/services/customsweetalert/loading.service';
import {ExibirAvisoService} from 'app/shared/pages/exibir-aviso/exibir-aviso.service';
import { EnderecoAlternativoValidaDTOResponse } from 'app/core/models/fatura-impressa/response/fatura-impressa-dto';
import { EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';


@Component({
    selector: 'app-conta-contrato',
    templateUrl: './conta-contrato.component.html',
    styleUrls: ['./conta-contrato.component.scss'],
})
export class ContaContratoComponent {
    grupoDoUsuario: string;
    msgAvisoPadrao: string [];
    msgAviso: string;
    contaContratoForm: FormGroup;
    enderecoAlternativo : EnderecoAlternativoValidaDTOResponse;

    constructor(
        private _userService: UserService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _router: Router,
        private _faturaImpressaService: FaturaImpressaService,
        private _loading: LoadingService,
        private _exibirAvisoService: ExibirAvisoService,
        private _selecaoImoveisService: SelecaoImovelService
    ) {
        this.grupoDoUsuario = this._userService.group;
        this.contaContratoForm = this.criaFormulario();
        this.msgAvisoPadrao = ['Digite o número da sua Conta Contrato.', 
        'Por favor, verifique o código da unidade consumidora fornecido e tente novamente.', 
        'Por favor, digite o código da Unidade Consumidora.', 
        'O Código do cliente deve ter mais de 3 dígitos.'];
        this.enderecoAlternativo = new EnderecoAlternativoValidaDTOResponse();
        this.msgAviso = '';
    }

    criaFormulario(): FormGroup {
        return this._formBuilder.group({
            contaContrato: [
                "", {
                    validators: [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(12),
                        validarUC({ conta: true }),
                        ucSomenteDeZeros],
                }
            ],
        });}
    
    voltar(): void {
        this._location.back();
    }

    continuar(): void {
        this._loading.start();
        const enderecoAlternativoValidaDTO = this.passarDadosRequisicao();
        this._faturaImpressaService
            .enderecoAlternativoValida(enderecoAlternativoValidaDTO)
            .pipe(take(1))
            .subscribe({
                next: (responseDTO) => {
                    this.enderecoAlternativo = responseDTO;
                    let entregaDaFatura: EntregaDaFatura = new EntregaDaFatura();
                    entregaDaFatura.dadosEndereco = {
                        cep: this.enderecoAlternativo.enderecoAlternativo.endereco.cep,
                        logradouro: this.enderecoAlternativo.enderecoAlternativo.endereco.endereco,
                        numero: this.enderecoAlternativo.enderecoAlternativo.endereco.numero,
                        bairro: this.enderecoAlternativo.enderecoAlternativo.endereco.bairro,
                        cidade: this.enderecoAlternativo.enderecoAlternativo.endereco.municipio,
                        estado: this.enderecoAlternativo.enderecoAlternativo.endereco.uf,
                        complemento: this.enderecoAlternativo.enderecoAlternativo.endereco.complemento,
                        caixaPostal: this.enderecoAlternativo.enderecoAlternativo.endereco.caixaPostal
                    }
                    entregaDaFatura.taxa = this.formatarTaxa(responseDTO.taxa);
                    entregaDaFatura.contaContrato = this.contaContratoForm.value.contaContrato;
                    this._faturaImpressaService.entregaDaFatura = entregaDaFatura;
                    this.redirecionar();
                    this._faturaImpressaService.entregaDaFaturaSubject.next(entregaDaFatura);
                    this._loading.stop();

                },
                error: (erro) => {
                    if (erro.error.retorno.numero == 400) {
                        this.msgAviso = 'Preencha um código válido';
                    }
                    if (erro.error.retorno.numero == "013") {
                        this._router.navigate([PathCompleto.aviso], {queryParams: { titulo: "Serviço indisponível para conta contrato vinculada a uma coletiva." }});
                    }
                    else {
                        const titulo = erro?.error?.retorno?.mensagem || EnumTitulosPadroes.Inesperado;
                        this._router.navigate([PathCompleto.aviso], {queryParams: { titulo: titulo }});
                    }
                    this._loading.stop();
                },
            });
    }

    formatarTaxa(taxa: string): string {
        return parseFloat(taxa.replace(',', '.'))
            .toFixed(2)
            .replace('.', ',')
            .toString();
    }

    passarDadosRequisicao(): EnderecoAlternativoValidaDTORequest {
        const request = new EnderecoAlternativoValidaDTORequest();
        request.canalSolicitante = environment.canal;
        request.codigoAlternativo = this.contaContratoForm.value.contaContrato;
        request.codigoSolicitante =
            this._selecaoImoveisService.getInformacoesUCSelecionada.codigo;
        request.usuario = environment.USUARIO_UE;
        return request;
    }

    redirecionar(): void {
        this._router.navigate([
            PathCompleto.faturaImpressa,
            SubRotasFaturaImpressa.ConfirmarDados,
        ]);
        this._loading.stop();
    }
}
