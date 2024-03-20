import { registerLocaleData, TitleCasePipe } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import localept from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from "@environments/environment";
import { EncrDecrService } from "app/core/services/encrdecr/encr-decr.service";
import { NotificationService } from "app/core/services/messaging/notification/notification.service";
import { TokenService } from "app/core/services/token/token.service";
import { UserService } from "app/core/services/user/user.service";
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { NgxMaskModule } from "ngx-mask";
import { AppComponent } from "./app.component";
import { FooterModule } from "./core/footer/footer.module";
import { AuthGuard } from "./core/guards/auth.guard";
import { AutoleituraGuard } from "./core/guards/autoleitura-guard/autoleitura.guard";
import { ReligacaoGuard } from "./core/guards/religacao-guard/religacao.guard";
import { HeaderModule } from "./core/header/header.module";
import { JwtInterceptor } from "./core/interceptor/jwt.interceptor";
import { AppRoutes } from "./core/routes/app.routes";
import { FaturaDigitalService } from "./core/services/fatura-digital/fatura-digital.service";
import { LoginService } from "./core/services/login/login.service";
import { SpinnerModule } from "./shared/components/spinner/spinner.module";

registerLocaleData(localept, 'pt');



export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    HeaderModule,
    FooterModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' }),
    SpinnerModule,
    RecaptchaV3Module
  ],
  providers: [
    AuthGuard,
    ReligacaoGuard,
    AutoleituraGuard,
    NotificationService,
    TokenService,
    LoginService,
    FaturaDigitalService,
    UserService,
    EncrDecrService,
    TitleCasePipe,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true,
    },
    {   provide: LOCALE_ID,
        useValue: 'pt'
    },
    {
        provide: RECAPTCHA_V3_SITE_KEY,
        useValue: environment.siteKeyRecaptcha
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
