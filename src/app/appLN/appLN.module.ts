import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { AppLNComponent } from './appLN.component';
import { CadastroComponentModule } from './cadastro/cadastro.module';
import { ConfirmacaoAcessoModule } from './confirmacao-acesso/confirmacao-acesso.module';
import { TokenGuard } from './guards/token.guard';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { SidenavListComponentModule } from './menu-lateral/sidenav-list.module';
import { RecuperarSenhaComponentModule } from './recuperar-senha/recuperar-senha.module';
import { AngularMaterialModule } from './shared/angular-material.module';
import { ValidarSenhasModule } from './shared/components/validar-senhas/validar-senhas.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppLNRoutes } from 'app/core/routes/appLN-route/appLN.routes';

@NgModule({
	declarations: [
		AppLNComponent,
	],
	imports: [
		CommonModule,
		NgbModule,
		RecuperarSenhaComponentModule,
		CadastroComponentModule,
		ValidarSenhasModule,
		NgxMaskModule.forRoot(),
		ConfirmacaoAcessoModule,
		AngularMaterialModule,
		SidenavListComponentModule,
		HttpClientModule,
		MatProgressBarModule,
		LeafletModule.forRoot(),
        RouterModule.forChild(AppLNRoutes)
	],
	providers: [
		HttpClientModule,
		TokenGuard,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	],
	bootstrap: [AppLNComponent],
	exports: [
		NgbModule
	]
})
export class AppLNModule {
	constructor() { }
}
