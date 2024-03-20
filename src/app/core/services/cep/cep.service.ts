import { EventEmitter, Injectable, Output } from "@angular/core";
import { DadosDeEndereco } from "app/core/models/entrega-de-fatura/entrega-da-fatura";


@Injectable({
    providedIn: 'root'
})
export class CepService {
    @Output() endereco: EventEmitter<DadosDeEndereco> = new EventEmitter();

    private _buscaCEP: BuscaCEPDTO;

    private _cep: number;
    private _storage: Storage;
    private _enderecoObject: DadosDeEndereco;

    constructor() {

        this._buscaCEP = new BuscaCEPDTO();

        this.setBuscaCEP = this.dadosMockadosCEP();
        this._enderecoObject = new DadosDeEndereco();
        this._cep = NaN;
        this._storage = sessionStorage;
    }

    private dadosMockadosCEP(): BuscaCEPDTO {
        return {
            cep: 12345678,
            endereco: 'Rua Vicente Carlos',
            bairro: 'Pitangueiras',
            cidade: 'Guarujá',
            UF: 'SP'
        }
    }

    public atualizarCEP() {
        // TODO: [GET]/BUSCA-CEP (RN_FF_009) pendente para integração. 03/08/2022 -> previsto para liberação 19/08/2022
        if (this._cep.toString().length == 8) {
            this._enderecoObject.cep = this._cep.toString();
            this._enderecoObject.logradouro = this.getBuscaCEP.endereco; // [GET]/BUSCA-CEP.endereco;
            this._enderecoObject.numero = '25';
            this._enderecoObject.complemento = '';
            this._enderecoObject.caixaPostal = '08499';
            this._enderecoObject.bairro = this.getBuscaCEP.bairro; // [GET]/BUSCA-CEP.bairro;
            this._enderecoObject.cidade = this.getBuscaCEP.cidade; // [GET]/BUSCA-CEP.cidade;
            this._enderecoObject.estado = this.getBuscaCEP.UF; // [GET]/BUSCA-CEP.UF;
            this.endereco.emit(this._enderecoObject);
        }
    }

    // TODO: Fazer integração deste com o endpoint BuscaCEP.
    set setCEP(value: number) {
        this._cep = value;
    }

    get getEndereco(): DadosDeEndereco {
        return this._enderecoObject;
    }

    set setBuscaCEP(value: BuscaCEPDTO) {
        // this._storage.buscaCEP = JSON.stringify(value);
        this._buscaCEP = value;
    }

    get getBuscaCEP(): BuscaCEPDTO {
        // return JSON.parse(this._storage.buscaCEP);
        return this._buscaCEP;
    }
}

export class BuscaCEPDTO {
    public cep: number;
    public endereco: string;
    public bairro: string;
    public cidade: string;
    public UF: string;
    constructor() {
        this.cep = 0;
        this.endereco = '';
        this.bairro = '';
        this.cidade = '';
        this.UF = '';
    }
}