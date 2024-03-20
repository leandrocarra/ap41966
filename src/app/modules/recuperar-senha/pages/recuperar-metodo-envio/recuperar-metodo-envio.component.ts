import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

import { take } from 'rxjs';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasRecuperarSenha } from 'app/core/models/RecuperarSenhaDTO/recuperarSenha';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { EsqueciSenhaDTORequest } from 'app/core/models/cadastro/request/cadastro-dto';
import { EsqueciSenhaDTOResponse } from 'app/core/models/cadastro/responses/cadastro-dto';
import { EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';

@Component({
    selector: 'app-recuperar-metodo-envio',
    templateUrl: './recuperar-metodo-envio.component.html',
    styleUrls: ['./recuperar-metodo-envio.component.scss']
})
export class RecuperarMetodoEnvioComponent {
formRecuperarSenha: FormGroup;
opcoesEnvio: Array<string>;
esqueciSenhaRequestDTO: EsqueciSenhaDTORequest;
esqueciSenhaResponseDTO: EsqueciSenhaDTOResponse;

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _cadastroService: CadastroService,
        private _loadingService: LoadingService
    ) {
        this.formRecuperarSenha = this.criarFormulario();
        this.opcoesEnvio = [
            this._cadastroService.fluxoRecuperarSenha.email,
            this._cadastroService.fluxoRecuperarSenha.emailCadastro,
            this._cadastroService.fluxoRecuperarSenha.numero,
            this._cadastroService.fluxoRecuperarSenha.telefoneContato
        ];
        this.esqueciSenhaRequestDTO = new EsqueciSenhaDTORequest();
        this.esqueciSenhaResponseDTO = new EsqueciSenhaDTOResponse();
    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group({
            opcaoEnvio: [this.opcoesEnvio]
        });
    }

    voltar(): void{
        this._router.navigate([
            PathCompleto.recuperarSenha,
            SubRotasRecuperarSenha.identificacao
        ]);
    }

    continuar(): void {
        this._cadastroService.fluxoRecuperarSenha.opcaoEnvio = this.formRecuperarSenha.value.opcaoEnvio;
        this.esqueciSenha();
        this._router.navigate([
            PathCompleto.recuperarSenha,
            SubRotasRecuperarSenha.informarCodigoEnviado
        ]);
    }

    esqueciSenha(): void {
        this.preencherRequestCodigoValido().then(() => {
            this._cadastroService.enviarCodigoVerificacao(this.esqueciSenhaRequestDTO).pipe(take(1)).subscribe({
                next: (responseDTO: EsqueciSenhaDTOResponse) => {
                    this._loadingService.stop();
                    this.esqueciSenhaResponseDTO = responseDTO;
                },
                error: () => {
                    this._loadingService.stop();
                    this.servicoIndisponivel();
                }
            });
        });
    }

    preencherRequestCodigoValido(): Promise<void> {
        this._loadingService.start();
        return this._cadastroService.obterRecaptcha().then((token) => {
            const documento = this._cadastroService.fluxoRecuperarSenha.documento;
            this.esqueciSenhaRequestDTO.distribuidora = environment.name;
            this.esqueciSenhaRequestDTO.regiao = environment.regiao;
            this.esqueciSenhaRequestDTO.tipoEnvio = "1";
            this.esqueciSenhaRequestDTO.userName =`${environment.name}/${documento}`;
            this.esqueciSenhaRequestDTO.canalSolicitante = environment.canal;
            this.esqueciSenhaRequestDTO.usuario = environment.USUARIO_UE;
            this.esqueciSenhaRequestDTO.recaptcha = token;
        })
    }

    servicoIndisponivel(): void {
        this._router.navigate(
            [SubRotasRecuperarSenha.pathAviso, SubRotasRecuperarSenha.aviso],
            { queryParams: { titulo: EnumTitulosPadroes.ServicoIndisponivel }}
        );
    }
}
