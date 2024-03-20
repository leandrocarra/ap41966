import { Component, EventEmitter, HostListener, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DadosPagamento } from '../../../../../../core/models/dados-pagamento/dados-pagamento';
import { configureMenuByWindowSize, NeoUtilsService } from "../../../../../../core/services/utils/neo-utils.service";
import { DadosPagamentoService } from '../../../../../../core/services/dados-pagamento/dados-pagamento.service';

@Component({
    selector: 'neo-recebimento-alternativo',
    templateUrl: './recebimento-alternativo.component.html',
    styleUrls: ['./recebimento-alternativo.component.scss']
})
export class RecebimentoAlternativoComponent implements OnInit {

    mobile: boolean;
    estados: any;
    formaRecebimentoFormGroup!: FormGroup;
    dadosPagamento: DadosPagamento;
    @Output() enviarDados = new EventEmitter();

    constructor(
        private _formBuilder: FormBuilder,
        private _utilsService: NeoUtilsService,
        private _etapaService: DadosPagamentoService
    ) {
        this.dadosPagamento = this._etapaService.getDadosPagamento;
        this.estados = this._utilsService.ESTADOS;
        this.mobile = configureMenuByWindowSize(window.screen.width);
    }

    ngOnInit(): void {
        this.controleFormulario();
        this.validaFormulario();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    controleFormulario(): void {
        this.formaRecebimentoFormGroup = this._formBuilder.group({
            cep: [this.dadosPagamento.receberEnderecoAlternativo.endereco.cep,
            [
                Validators.required,
                Validators.minLength(1)
            ]
            ],
            endereco: [this.dadosPagamento.receberEnderecoAlternativo.endereco.endereco,
            [
                Validators.required,
                Validators.minLength(1)
            ]
            ],
            numero: [this.dadosPagamento.receberEnderecoAlternativo.endereco.numero,
            [
                Validators.required,
                Validators.minLength(1)
            ]
            ],
            complemento: [this.dadosPagamento.receberEnderecoAlternativo.endereco.complemento],
            bairro: [this.dadosPagamento.receberEnderecoAlternativo.endereco.bairro,
            [
                Validators.required,
                Validators.minLength(1)
            ]
            ],
            cidade: [this.dadosPagamento.receberEnderecoAlternativo.endereco.cidade,
            [
                Validators.required,
                Validators.minLength(1)
            ]
            ],
            estado: [this.dadosPagamento.receberEnderecoAlternativo.endereco.estado,
            [
                Validators.required,
                Validators.minLength(1)
            ]
            ],
        });
    }

    formToModel(): void {
        this.atualizarDados();
        this.validaFormulario();
    }

    atualizarDados(): void {
        this.dadosPagamento.receberEnderecoAlternativo.endereco.cep = this.formaRecebimentoFormGroup.value.cep;
        this.dadosPagamento.receberEnderecoAlternativo.endereco.endereco = this.formaRecebimentoFormGroup.value.endereco;
        this.dadosPagamento.receberEnderecoAlternativo.endereco.numero = this.formaRecebimentoFormGroup.value.numero;
        this.dadosPagamento.receberEnderecoAlternativo.endereco.complemento = this.formaRecebimentoFormGroup.value.complemento;
        this.dadosPagamento.receberEnderecoAlternativo.endereco.bairro = this.formaRecebimentoFormGroup.value.bairro;
        this.dadosPagamento.receberEnderecoAlternativo.endereco.cidade = this.formaRecebimentoFormGroup.value.cidade;
        this.dadosPagamento.receberEnderecoAlternativo.endereco.estado = this.formaRecebimentoFormGroup.value.estado;
        this._etapaService.setRecebimentoAlternativo = this.dadosPagamento.receberEnderecoAlternativo.endereco;
    }

    validaFormulario(): void {
        if (this.formaRecebimentoFormGroup.status == 'VALID' || this.formaRecebimentoFormGroup.valid) {
            this.enviarDados.emit(true);
        } else {
            this.enviarDados.emit(false);
        }
    }
}
