import { CadastroGuard } from './../../../guards/cadastro-guard/cadastro.guard';
import { Routes } from "@angular/router";
import { SubRotasCadastro } from "app/core/models/cadastro/cadastro";
import { CadastroComponent } from "app/modules/cadastro/cadastro.component";
import { DadosPessoaJuridicaEmpresaComponent } from "app/modules/cadastro/pages/dados-pessoa-juridica-empresa/dados-pessoa-juridica-empresa.component";
import { DadosPessoaJuridicaRepresentanteContatoComponent } from "app/modules/cadastro/pages/dados-pessoa-juridica-representante-contato/dados-pessoa-juridica-representante-contato.component";
import { DadosPessoaJuridicaRepresentanteEmailComponent } from "app/modules/cadastro/pages/dados-pessoa-juridica-representante-email/dados-pessoa-juridica-representante-email.component";
import { DadosPessoaJuridicaRepresentanteComponent } from "app/modules/cadastro/pages/dados-pessoa-juridica-representante/dados-pessoa-juridica-representante.component";
import { DadosPessoaJuridicaUcComponent } from "app/modules/cadastro/pages/dados-pessoa-juridica-uc/dados-pessoa-juridica-uc.component";
import { DadosPessoaisPessoaFisicaEmailComponent } from "app/modules/cadastro/pages/dados-pessoais-pessoa-fisica-email/dados-pessoais-pessoa-fisica-email.component";
import { DadosPessoaisPessoaFisicaComponent } from "app/modules/cadastro/pages/dados-pessoais-pessoa-fisica/dados-pessoais-pessoa-fisica.component";
import { IdentificacaoCadastroComponent } from "app/modules/cadastro/pages/identificacao-cadastro/identificacao-cadastro.component";
import { IdentificacaoDadosCadastroComponent } from "app/modules/cadastro/pages/identificacao-dados-cadastro/identificacao-dados-cadastro.component";
import { SenhaCadastroComponent } from "app/modules/cadastro/pages/senha-cadastro/senha-cadastro.component";
import { ValidarCodigoDeAtivacaoComponent } from "app/modules/cadastro/pages/validar-codigo-de-ativacao/validar-codigo-de-ativacao.component";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";

export const CadastroRoutes: Routes = [
    {
        path: "",
        component: CadastroComponent,
        children: [
            {
                path: "",
                redirectTo: SubRotasCadastro.identificacao
            },
            {
                path: SubRotasCadastro.identificacao,
                component: IdentificacaoCadastroComponent,
            },
            {
                path: SubRotasCadastro.identificacaoDadosCadastro,
                component: IdentificacaoDadosCadastroComponent,
                canActivate: [CadastroGuard]
            },
            {
                path: SubRotasCadastro.dadosPessoaisPessoaFisica,
                component: DadosPessoaisPessoaFisicaComponent,
                canActivate: [CadastroGuard]
            },
            {
                path: SubRotasCadastro.dadosPessoaisPessoaFisicaEmail,
                component: DadosPessoaisPessoaFisicaEmailComponent,
                canActivate: [CadastroGuard]
            },
            {
                path: SubRotasCadastro.dadosPessoaJuridicaUC,
                component: DadosPessoaJuridicaUcComponent,
                canActivate: [CadastroGuard]
            },
            {
                path: SubRotasCadastro.dadosPessoaJuridicaEmpresa,
                component: DadosPessoaJuridicaEmpresaComponent,
                canActivate: [CadastroGuard]
            },
            {
                path: SubRotasCadastro.dadosPessoaJuridicaRepresentante,
                component: DadosPessoaJuridicaRepresentanteComponent,
                canActivate: [CadastroGuard]
            },
            {
                path: SubRotasCadastro.dadosPessoaJuridicaRepresentanteContato,
                component: DadosPessoaJuridicaRepresentanteContatoComponent,
                canActivate: [CadastroGuard]
            },
            {
                path: SubRotasCadastro.dadosPessoaJuridicaRepresentanteEmail,
                component: DadosPessoaJuridicaRepresentanteEmailComponent,
                canActivate: [CadastroGuard]
            },
            {
                path: SubRotasCadastro.senha,
                component: SenhaCadastroComponent,
                canActivate: [CadastroGuard]
            },
            {
                path: SubRotasCadastro.validarCodigoDeAtivacao,
                component: ValidarCodigoDeAtivacaoComponent,
                canActivate: [CadastroGuard]
            },
            {
                path: SubRotasCadastro.avisoComStepper,
                component: ExibirAvisoComponent,
                canActivate: [CadastroGuard]
            }
        ]
    },
    {
        path: SubRotasCadastro.aviso,
        component: ExibirAvisoComponent,
        canActivate: [CadastroGuard]
    }
];
