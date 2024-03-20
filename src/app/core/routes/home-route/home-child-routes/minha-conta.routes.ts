import { Routes } from "@angular/router";
import { SubRotasMinhaConta } from "app/core/models/minha-conta/minha-conta";
import { MinhaContaResolver } from "app/core/resolvers/minha-conta/minha-conta.resolver";
import { AlterarSenhaComponent } from "app/modules/minha-conta/pages/alterar-senha/alterar-senha.component";
import { EditarDadosComponent } from "app/modules/minha-conta/pages/editar-dados/editar-dados.component";
import { MinhaContaComponent } from "app/modules/minha-conta/pages/minha-conta/minha-conta.component";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";

export const MinhaContaRoutes: Routes = [
    {
        path: "",
        component: MinhaContaComponent,
        data: { breadcrumb: { label: "Minha Conta" } },
        resolve: { minhaContaResolver: MinhaContaResolver },
        children: [
            {
                path: SubRotasMinhaConta.editarDados,
                component: EditarDadosComponent
            },
            {
                path: SubRotasMinhaConta.alterarSenha,
                component: AlterarSenhaComponent
            },
            {
                path: SubRotasMinhaConta.avisos,
                component: ExibirAvisoComponent,
            },
        ]
    }
];
