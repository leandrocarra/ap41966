import { RecuperarSenhaGuard } from './../../../guards/recuperar-senha/recuperar-senha.guard';
import { Routes } from "@angular/router";
import { InformarCodigoEnviadoComponent } from "app/modules/recuperar-senha/pages/informar-codigo-enviado/informar-codigo-enviado.component";
import { NovaSenhaComponent } from "app/modules/recuperar-senha/pages/nova-senha/nova-senha.component";
import { RecuperarDadosCadastroComponent } from "app/modules/recuperar-senha/pages/recuperar-dados-cadastro/recuperar-dados-cadastro.component";
import { RecuperarMetodoEnvioComponent } from "app/modules/recuperar-senha/pages/recuperar-metodo-envio/recuperar-metodo-envio.component";
import { RecuperarSenhaComponent } from "app/modules/recuperar-senha/recuperar-senha.component";
import { SubRotasRecuperarSenha } from 'app/core/models/RecuperarSenhaDTO/recuperarSenha';
import { ExibirAvisoComponent } from 'app/shared/pages/exibir-aviso/exibir-aviso.component';

export const RecuperarSenhaRoutes: Routes = [
    {
        path: "",
        component: RecuperarSenhaComponent,
        children: [
            {
                path: "",
                redirectTo: SubRotasRecuperarSenha.identificacao
            },
            {
                path: SubRotasRecuperarSenha.identificacao,
                component: RecuperarDadosCadastroComponent
            },
            {
                path: SubRotasRecuperarSenha.linkConfirmacao,
                component: RecuperarMetodoEnvioComponent,
                canActivate: [RecuperarSenhaGuard]
            },
            {
                path: SubRotasRecuperarSenha.informarCodigoEnviado,
                component: InformarCodigoEnviadoComponent,
                canActivate: [RecuperarSenhaGuard]
            },
            {
                path: SubRotasRecuperarSenha.novaSenha,
                component: NovaSenhaComponent,
                canActivate: [RecuperarSenhaGuard]
            },
            {
                path: SubRotasRecuperarSenha.avisoComStepper,
                component: ExibirAvisoComponent,
                canActivate: [RecuperarSenhaGuard]
            },

        ]
    },
    {
        path: SubRotasRecuperarSenha.aviso,
        component: ExibirAvisoComponent,
        canActivate: [RecuperarSenhaGuard]
    }
];
