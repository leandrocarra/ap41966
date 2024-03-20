import { Component, EventEmitter, HostListener, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DadosPagamento } from "../../../../../../core/models/dados-pagamento/dados-pagamento";
import { DadosPagamentoService } from "../../../../../../core/services/dados-pagamento/dados-pagamento.service";
import { configureMenuByWindowSize, NeoUtilsService } from "../../../../../../core/services/utils/neo-utils.service";

@Component({
    selector: 'neo-recebimento-caixa-postal',
    templateUrl: './recebimento-caixa-postal.component.html',
    styleUrls: ['./recebimento-caixa-postal.component.scss']
})
export class RecebimentoCaixaPostalComponent implements OnInit {

    estados: any;
    mobile: boolean = false;
    dadosPagamento: DadosPagamento;
    formaRecebimentoFormGroup!: FormGroup;
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

    controleFormulario() {
        this.formaRecebimentoFormGroup = this._formBuilder.group({
            caixaPostal: [this.dadosPagamento.receberCaixaPostal.caixaPostal,
            [
                Validators.required,
                Validators.minLength(1)
            ]
            ],
            cidade: [this.dadosPagamento.receberCaixaPostal.cidade,
            [
                Validators.required,
                Validators.minLength(1)
            ]
            ],
            estado: [this.dadosPagamento.receberCaixaPostal.estado,
            [
                Validators.required
            ]
            ],
            cep: [this.dadosPagamento.receberCaixaPostal.cep,
            [
                Validators.required,
                Validators.minLength(1)
            ]
            ]
        });
    }

    formToModel(): void {
        this.atualizarDados();
        this.validaFormulario();
    }

    atualizarDados(): void {
        this.dadosPagamento.receberCaixaPostal.caixaPostal = this.formaRecebimentoFormGroup.value.caixaPostal;
        this.dadosPagamento.receberCaixaPostal.cep = this.formaRecebimentoFormGroup.value.cep;
        this.dadosPagamento.receberCaixaPostal.cidade = this.formaRecebimentoFormGroup.value.cidade;
        this.dadosPagamento.receberCaixaPostal.estado = this.formaRecebimentoFormGroup.value.estado;
        this._etapaService.setRecebimentoCaixaPostal = this.dadosPagamento.receberCaixaPostal;
    }

    validaFormulario(): void {
        if (this.formaRecebimentoFormGroup.status == 'VALID' || this.formaRecebimentoFormGroup.valid) {
            this.enviarDados.emit(true);
        } else {
            this.enviarDados.emit(false);
        }
    }
}
