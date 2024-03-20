import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { PathCompleto } from 'app/core/enums/servicos';
import { UserResponseDTO } from 'app/core/models/UserDTO/userResponseDTO.model';
import { SubRotasMinhaConta } from 'app/core/models/minha-conta/minha-conta';
import { AtualizarMinhaContaDTORequest } from 'app/core/models/minha-conta/request/minha-conta-dto';
import { MinhaContaDTOResponse, MinhaContaLegadoDTOResponse } from 'app/core/models/minha-conta/response/minha-conta-dto';
import { TipoPessoa } from 'app/core/models/user.model';
import { HeaderService } from 'app/core/services/header/header.service';
import { LgpdService } from 'app/core/services/lgpd/lgpd.service';
import { MinhaContaService } from 'app/core/services/minha-conta/minha-conta.service';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';
import { aplicarMascaraTelefoneCelular, configureMenuByWindowSize, converterData } from "app/core/services/utils/neo-utils.service";
import { validarFormatoTelefone } from 'app/shared/Validators/validar-formato-telefone';
import { validarDataDeNascimento } from 'app/shared/Validators/validar-idade.validator';

@Component({
    selector: 'app-editar-dados',
    templateUrl: './editar-dados.component.html',
    styleUrls: ['./editar-dados.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EditarDadosComponent implements OnInit {
    minhaContaLegadoResponse: MinhaContaLegadoDTOResponse;
    minhaContaResponse: MinhaContaDTOResponse;
    tipoPessoa: TipoPessoa;
    mobile: boolean;
    contaFormGroup: FormGroup;
    dataUltimaAtualizacao: string;
    linkDePrivacidade: string;
    maskTelefoneContato: string;
    maskTelefoneAcesso: string;
    fluxoDeAlterarDados: boolean;
    dadosVemDoLegado: boolean;
    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _router: Router,
        private _minhaContaService: MinhaContaService,
        private _headerService: HeaderService,
        private _tokenService: TokenService,
        private _lgpdService: LgpdService
    ) {
        this._userService.isFluxo = false;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.linkDePrivacidade = this._lgpdService.getLinkLGPD('PRIVACIDADE');
        this.fluxoDeAlterarDados = false;
        this.minhaContaLegadoResponse = new MinhaContaLegadoDTOResponse();
        this.minhaContaResponse = new MinhaContaDTOResponse();
        this.tipoPessoa = this._userService.dadosUser.documento.length === 11 ? "FISICA" : "JURIDICA";
        this.contaFormGroup = this._formBuilder.group({});
        this.dataUltimaAtualizacao = '';
        this.maskTelefoneContato = '';
        this.maskTelefoneAcesso = '';
        this.dadosVemDoLegado = false;
        this.minhaContaResponse = this._minhaContaService.getMinhaConta;
        this.contaFormGroup = this.criarFormulario();
        this.selecionarValidadorPorTipoPessoa(this.tipoPessoa);
        this.dadosVemDoLegado = (this.minhaContaLegadoResponse.retorno.numero === '029');
    }

    ngOnInit(): void { // Manter essas chamadas no ngOnInit, pois a boa execução do código depende disso.
        this.dataUltimaAtualizacao = this.preencherDataUltimaAtualizacao();
        this.maskTelefoneContato = aplicarMascaraTelefoneCelular(String(this.contaFormGroup.controls.telefone));
        this.maskTelefoneAcesso = aplicarMascaraTelefoneCelular(String(this.contaFormGroup.controls.telefone));
    }


    getTelMask(): void {
        this.maskTelefoneAcesso = aplicarMascaraTelefoneCelular(String(this.contaFormGroup.controls.telefone));
    }

    preencherDataUltimaAtualizacao(): string {
        if (this.minhaContaResponse.dtUltimaAtualizacao) {
            return converterData(this.minhaContaResponse.dtUltimaAtualizacao);
        } else {
            return '';
        }
    }

    definirMaskInicial(campoDoForm: AbstractControl): string {
        if (campoDoForm) {
            return (campoDoForm.value.length === 10) ? '(00) 0000-00009' : '(00) 0 0000-0000';
        } else {
            return '';
        }
    }

    selecionarValidadorPorTipoPessoa(tipo: string): void {
        if (tipo === 'FISICA') {
            this.contaFormGroup.controls.nomeTitular.setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
            this.contaFormGroup.controls.documentoSecundario.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(15)]);
            this.contaFormGroup.controls.dtNascimento.setValidators([Validators.required, validarDataDeNascimento({ idade: true })]);
            this.contaFormGroup.controls.razaoSocial.clearValidators();
        }
        if (tipo === 'JURIDICA') {
            this.contaFormGroup.controls.razaoSocial.setValidators([Validators.required,Validators.minLength(2), Validators.maxLength(100)]);
            this.contaFormGroup.controls.nomeTitular.clearValidators();
            this.contaFormGroup.controls.documentoSecundario.clearValidators();
            this.contaFormGroup.controls.dtNascimento.clearValidators();
        }
    }

    editarDados(): void {
        this._userService.isFluxo = true
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.fluxoDeAlterarDados = true;
        this.alternarEdicaoDoFormulario();
    }

    alterarSenha(): void {
        this.fluxoDeAlterarDados = true;
        this._router.navigate([PathCompleto.minhaConta, SubRotasMinhaConta.alterarSenha]);
    }

    voltar(): void {
        this.fluxoDeAlterarDados = false;
        this.alternarEdicaoDoFormulario();
        window.location.reload();
    }

    salvarAlteracoes(): void {
        const requestDTO = this.preencherDadosParaRequest(this.tipoPessoa);
        this._minhaContaService.getAtualizarMinhaConta(requestDTO).then(() => {
            this._userService.isFluxo = false;
            this.fluxoDeAlterarDados = false;
            this.alternarEdicaoDoFormulario();
        });
        this.atualizarHeader();
    }
    atualizarHeader(): void {
        let dados : UserResponseDTO = new UserResponseDTO;
        dados = this._userService.dadosUser;
        dados.usuarioAcesso = this.contaFormGroup.get('usuarioAcesso')?.value;
        this._userService.updateDadosUser(dados as UserResponseDTO);
        console.log(this._userService.dadosUser);
    }

    preencherDadosParaRequest(tipoPessoa: string): AtualizarMinhaContaDTORequest {
        const requestDTO = new AtualizarMinhaContaDTORequest();
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.userName = this._userService.dadosUser.sub;
        requestDTO.documento = this._userService.dadosUser.documento;
        requestDTO.telefone = this.inserirDDI(this.contaFormGroup.value.telefone);
        requestDTO.usuarioAcesso = this.contaFormGroup.value.usuarioAcesso;
        requestDTO.emailAcesso = this.contaFormGroup.value.emailAcesso;
        requestDTO.termosUso = true;
        if (!this.dadosVemDoLegado) {
            requestDTO.emailCadastro = this.contaFormGroup.value.emailCadastro;
            requestDTO.telefoneContato = this.inserirDDI(this.contaFormGroup.value.telefoneContato);
            if (tipoPessoa === 'JURIDICA') {
                requestDTO.razaoSocial = this.contaFormGroup.value.razaoSocial;
            } else {
                requestDTO.nomeTitular = this.contaFormGroup.value.nomeTitular;
                requestDTO.dtNascimento = this.formatarDataParaEnvio(this.contaFormGroup.value.dtNascimento);
                requestDTO.tipoDocumentoSecundario = 'RG';
                requestDTO.documentoSecundario = this.contaFormGroup.value.documentoSecundario;
            }
        }
        return requestDTO;
    }

    formatarDataParaEnvio(data: string): string {
        const dia = data.substring(0, 2);
        const mes = data.substring(2, 4);
        const ano = data.substring(4).replace('/','');
        return (`${ano}-${mes}-${dia}`);
    }

    criarFormulario(): FormGroup {
        const responseDTO = this._minhaContaService.getMinhaConta;
        return this._formBuilder.group(
            {
                documentoSecundario: [
                    { value: responseDTO.documentoSecundario, disabled: true },
                    [Validators.required, Validators.minLength(5), Validators.maxLength(15)]
                ],
                documento: [
                    { value: responseDTO.documento, disabled: true }
                ],
                dtNascimento: [
                    { value: this.formatarDataParaExibicao(responseDTO.dtNascimento), disabled: true },
                    [Validators.required, validarDataDeNascimento({ idade: true })]
                ],
                nomeTitular: [
                    { value: responseDTO.nomeTitular, disabled: true },
                    [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
                ],
                razaoSocial: [
                    { value: responseDTO.razaoSocial, disabled: true },
                    [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
                ],
                emailCadastro: [
                    { value: responseDTO.emailCadastro, disabled: true },
                    [Validators.required, Validators.email, Validators.maxLength(50)]
                ],
                emailAcesso: [
                    { value: responseDTO.emailAcesso, disabled: true },
                    [Validators.required, Validators.email, Validators.maxLength(50)]
                ],
                telefoneContato: [
                    { value: this.removerDDI(responseDTO.telefoneContato), disabled: true }
                ],
                telefone: [
                    { value: this.removerDDI(responseDTO.telefone), disabled: true },
                    [Validators.required, validarFormatoTelefone()]
                ],
                usuarioAcesso: [
                    { value: responseDTO.usuarioAcesso, disabled: true },
                    [Validators.required, Validators.maxLength(100)]
                ],
                termosUso: new FormControl(false, Validators.requiredTrue)
            }
        );
    }

    formatarDataParaExibicao(data: string | Date): string {
        if (typeof data === 'string' && data.includes('/')) {
            let dateParts: string[]
                dateParts = data.split('/');
                data = new Date(+dateParts[2], parseInt(dateParts[1]) - 1, +dateParts[0]);
        } else {
            data = new Date(data);
        }

        return data.toLocaleDateString('pt-br', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            timeZone: 'UTC'
        }).replace('/', '');
    }

    alternarEdicaoDoFormulario(): void {
        if (!this.fluxoDeAlterarDados) {
            this.contaFormGroup.disable();
        } else {
            if (this.dadosVemDoLegado) {
                this.contaFormGroup.controls.emailAcesso.enable();
                this.contaFormGroup.controls.telefone.enable();
                this.contaFormGroup.controls.usuarioAcesso.enable();
            } else {
                this.contaFormGroup.enable();
                this.contaFormGroup.controls.documento.disable();
                this.contaFormGroup.controls.telefoneContato.disable();
            }
        }
    }

    aoModificarTelefone(tipo: string): void {
        if (tipo === 'Contato') {
            this.maskTelefoneContato = this.definirMask(this.contaFormGroup.controls.telefoneContato.value);
        }
        if (tipo === 'Acesso') {
            this.maskTelefoneAcesso = this.definirMask(this.contaFormGroup.controls.telefone.value);
        }
    }

    definirMask(numero: string): string {
        return aplicarMascaraTelefoneCelular(numero);
    }

    removerDDI(numero: string): string {
        if (numero){
            //Remover +
            numero = numero[0] == "+" ? numero.substring(1, numero.length) : numero;
            //Remover 55
            return numero.substring(0,2)=== '55' ? numero.substring(2,numero.length) : numero
        }
        else{
            return numero
        }
    }

    inserirDDI(numero: string): string {
        return numero ? ('55' + numero) : '';
    }

    removerCaracterEspecial(event: { charCode: number; })
    {
       let k : number;
       k = event.charCode;  //         k = event.keyCode;  (Both can be used)
       return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }
}
