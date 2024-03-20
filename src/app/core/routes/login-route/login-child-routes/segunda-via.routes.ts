import { Routes } from "@angular/router";
import { Servicos } from "app/core/enums/servicos";
import { SegundaViaPagamentoGuard } from 'app/core/guards/segunda-via-pagamento-guard/segunda-via-pagamento.guard';
import { SubRotaSegundaViaLogin } from "app/core/models/segunda-via/sub-rotas-segunda-via-login";
import { AcessoFaturasSegundaViaComponent } from "app/modules/servicos/pages/segunda-via-login/pages/acesso-faturas-segunda-via/acesso-faturas-segunda-via.component";
import { AcessoUcsSegundaViaComponent } from "app/modules/servicos/pages/segunda-via-login/pages/acesso-ucs-segunda-via/acesso-ucs-segunda-via.component";
import { InformarUcCpfSegundaViaComponent } from "app/modules/servicos/pages/segunda-via-login/pages/informar-uc-cpf-segunda-via/informar-uc-cpf-segunda-via.component";
import { TipoAcessoSegundaViaComponent } from "app/modules/servicos/pages/segunda-via-login/pages/tipo-acesso-segunda-via/tipo-acesso-segunda-via.component";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";

export const SegundaViaDePagamentoRoutes: Routes = [
    {
        path: Servicos.segundaViaLogin,
        component: TipoAcessoSegundaViaComponent,
    },
    {
        path: SubRotaSegundaViaLogin.AcessarFaturas,
        component: AcessoFaturasSegundaViaComponent,
        canActivate: [SegundaViaPagamentoGuard]
    },
    {
        path: SubRotaSegundaViaLogin.AcessarUCs,
        component: AcessoUcsSegundaViaComponent,
        canActivate: [SegundaViaPagamentoGuard]
    },
    {
        path: SubRotaSegundaViaLogin.InformarUC,
        component: InformarUcCpfSegundaViaComponent,
        canActivate: [SegundaViaPagamentoGuard]
    },
    {
        path: "avisos",
        component: ExibirAvisoComponent
    }
];
