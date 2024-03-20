import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumAvisosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { SubRotasMultiloginCadastro } from 'app/core/models/multilogin/multilogin-cadastro';
import { ProtocoloDTORequest } from 'app/core/models/protocolo/request/protocolo-dto';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { MarketingAutomationService } from 'app/core/services/marketing-automation/marketing-automation.service';
import { MultiloginCadastroService } from 'app/core/services/multilogin-cadastro/multilogin-cadastro.service';
import { UserService } from 'app/core/services/user/user.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { ESTADOS_BRASILEIROS } from 'app/core/services/utils/neo-utils.service';
import { validarDataDeNascimento } from 'app/shared/Validators/validar-idade.validator';
import { Estado } from 'app/shared/models/utils/agencia-virtual-utils';
import { EnumTitulosPadroes } from "../../core/models/exibir-aviso/exibir-aviso";

@Component({
    selector: 'app-multilogin-cadastro-imobiliario',
    templateUrl: './multilogin-cadastro-imobiliario.component.html',
    styleUrls: ['./multilogin-cadastro-imobiliario.component.scss']
})
export class MultiloginCadastroImobiliarioComponent implements OnInit {
    representanteImobiliaria: FormGroup;
    tipoDocumentoSelecionado!: Array<string>;
    linkCep: string;
    estados: Array<Estado>;
    areaNaoLogada: boolean;
    obterProtocoloRequestDTO: ProtocoloDTORequest;

    constructor(
        private _multiloginCadastroService: MultiloginCadastroService,
        private _marketingAutomationService: MarketingAutomationService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _userService: UserService,
        private _cadastroService: CadastroService,
        private _loadingService: LoadingService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _router: Router,
    ) {
        this.tipoDocumentoSelecionado = this._cadastroService.definirDocumentosPorRegiao();
        this.representanteImobiliaria = this.criarformImobiliaria();
        this.linkCep = "https://buscacepinter.correios.com.br/app/endereco/index.php";
        this.estados = ESTADOS_BRASILEIROS;
        this.areaNaoLogada = this._userService.dadosUser.nome ? false : true;
        this.obterProtocoloRequestDTO = new ProtocoloDTORequest();
    }

    ngOnInit(): void {
        let pathCompleto = (this.areaNaoLogada) ? PathCompleto.multiloginCadastro : PathCompleto.paginaInicial

        this._router.navigate(
            [pathCompleto, SubRotasMultiloginCadastro.Avisos],
            { queryParams: { codigoAviso: EnumAvisosPadroes.FormularioEnviado } }
        );
    }

    voltar(): void {
        this._location.back();
    }

    enviar(): void {
        (this.areaNaoLogada) ? this.obterProtocolo() : this.enviarEmail();
    }

    preencherObterProtocoloRequestDTO(): Promise<void> {
        this._loadingService.start();
        return this._cadastroService.obterRecaptcha().then((token)=>{
            this.obterProtocoloRequestDTO.documento = this.representanteImobiliaria.controls['documentoRepresentanteLegal'].value;
            this.obterProtocoloRequestDTO.regiao = environment.regiao;
            this.obterProtocoloRequestDTO.recaptcha = token;
        })
    }

    obterProtocolo() {
        this.preencherObterProtocoloRequestDTO().then(()=>{
            this._agenciaVirtualService.obterProtocoloAreaNaoLogada(this.obterProtocoloRequestDTO).subscribe({
                next: (responseDTO) => {
                    this._loadingService.stop();
                    this._agenciaVirtualService.protocoloANL.next(responseDTO);
                    this.enviarEmail(responseDTO.protocoloSalesforceStr);
                },
                error: () => {
                    this._loadingService.stop();
                    this.redirecionar({ titulo: EnumTitulosPadroes.Inesperado });
                }
            })
        })
    }

    enviarEmail(protocolo: string = ''): void {
        this._loadingService.start();
        this._marketingAutomationService.envioDeMensagem(this._multiloginCadastroService.requestCadastrarImobiliaria(this.representanteImobiliaria, this.areaNaoLogada, protocolo)).subscribe({
            next: () => {
                this._loadingService.stop();
                this.continuar();
            },
            error: () => {
                this._loadingService.stop();
                this.redirecionar({ titulo: EnumTitulosPadroes.Inesperado });
            }
        });
    }

    habilitarEnvio(): boolean {
        return this.representanteImobiliaria.invalid;
    }

    criarformImobiliaria(): FormGroup {
        return this._formBuilder.group(
            {
                nome: ["",
                    [
                        Validators.required,
                        Validators.maxLength(200)
                    ]
                ],
                documentoRepresentanteLegal: ["",
                    [
                        Validators.required,
                        Validators.maxLength(11)
                    ]
                ],
                emailRepresentante: ["",
                    [
                        Validators.required,
                        Validators.maxLength(50),
                        Validators.email,
                    ]
                ],
                tipo: ["",
                    [
                        Validators.maxLength(8)
                    ]
                ],
                numeroDocSecundario: ["",
                    [
                        Validators.maxLength(14)
                    ]
                ],
                dataNascimento: ["",
                    [
                        Validators.required,
                        validarDataDeNascimento({ idade: true })
                    ]
                ],
                celular: ["",
                    [
                        Validators.required,
                        Validators.maxLength(11)
                    ]
                ],
                documentoEmpresa: ["",
                    [
                        Validators.required,
                        Validators.maxLength(14)
                    ]
                ],
                nomeFantasia: ["",
                    [
                        Validators.required,
                        Validators.maxLength(30)
                    ]
                ],
                numeroCreci: ["",
                    [
                        Validators.required,
                        Validators.maxLength(6)
                    ]
                ],
                emailEmpresa: ["",
                    [
                        Validators.required,
                        Validators.maxLength(30),
                        Validators.email,
                    ]
                ],
                telefone: ["",
                    [
                        Validators.required,
                        Validators.maxLength(10)
                    ]
                ],
                CEP: ["",
                    [
                        Validators.required,
                    ]
                ],
                logradouro: ["",
                    [
                        Validators.required,
                        Validators.maxLength(30)
                    ]
                ],
                numeroEndereco: ["",
                    [
                        Validators.required,
                        Validators.maxLength(10)
                    ]
                ],
                complemento: ["",
                    [
                        Validators.maxLength(20)
                    ]
                ],
                bairro: ["",
                    [
                        Validators.required,
                        Validators.maxLength(15)
                    ]
                ],
                cidade: ["",
                    [
                        Validators.required,
                        Validators.maxLength(20)
                    ]
                ],
                estado: ["",
                    [
                        Validators.required,
                    ]
                ],
            }
        )
    }

    continuar(): void {
        this.redirecionar({ codigoAviso: EnumAvisosPadroes.FormularioEnviado });
    }

    redirecionar(queryParams: Object): void {
        let pathCompleto = (this.areaNaoLogada) ? PathCompleto.multiloginCadastroImobiliario: PathCompleto.multiloginCadastro

        this._router.navigate(
            [pathCompleto, SubRotasMultiloginCadastro.Avisos],
            { queryParams: queryParams }
        );
    }
}
