import { Routes } from "@angular/router";
import { TokenGuard } from "app/appLN/guards/token.guard";

export const AppLNRoutes: Routes = [
	{
		path: "",
		loadChildren: () => import('app/appLN/modules/ligacao-nova/ligacao-nova.module').then(m => m.LigacaoNovaModule),
		// canActivate: [TokenGuard]
	}
];
