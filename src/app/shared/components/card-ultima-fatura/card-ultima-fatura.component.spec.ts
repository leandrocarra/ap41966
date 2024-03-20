import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { SegundaViaService } from 'app/core/services/segunda-via/segunda-via.service';
import { TokenService } from 'app/core/services/token/token.service';
import { CardUltimaFaturaComponent } from './card-ultima-fatura.component';
import { MatMenuModule } from '@angular/material/menu';
import { of } from 'rxjs';
import { DialogPixComponent } from '../alerts/dialog-pix/dialog-pix.component';
import { CodigoDeBarrasComponent } from '../cards/codigo-de-barras/codigo-de-barras.component';
import { InternetBankingComponent } from '../alerts/internet-banking/internet-banking.component';
import { BaixarSegundaVia } from '../faturas/baixar-segunda-via.component';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnviarEmailComponent } from '../alerts/enviar-email/enviar-email.component';

describe(CardUltimaFaturaComponent.name, () => {
    let component: CardUltimaFaturaComponent;
    let fixture: ComponentFixture<CardUltimaFaturaComponent>;
    let segundaViaService: jasmine.SpyObj<SegundaViaService>;
    let router: Router;

    const dialogMock = {
        open: () => { },
        close: () => { },
        afterClosed:() => { }
    };

    let mockFaturas = require("../../mock/responses/response-api-faturas.json");


    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [CardUltimaFaturaComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([]),
                MatDialogModule,
                MatMenuModule
            ],
            providers: [
                TokenService,
                SegundaViaService,
                { provide: MAT_DIALOG_DATA, useValue: dialogMock },
            ],
        })
            .compileComponents();
            router = TestBed.inject(Router);
            segundaViaService = TestBed.inject(SegundaViaService) as jasmine.SpyObj<SegundaViaService>;
    });

    it(`Deve instanciar ${CardUltimaFaturaComponent.name} quando chamado`, () => {
        segundaViaService.setFaturas = mockFaturas.faturas;
        fixture = TestBed.createComponent(CardUltimaFaturaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    // it(`Deve instanciar ${CardUltimaFaturaComponent.name} quando chamado quando não há faturas`, () => {
    //     segundaViaService.setFaturas = mockFaturas.entregaFaturas;
    //     fixture = TestBed.createComponent(CardUltimaFaturaComponent);
    //     component = fixture.componentInstance;

    //     let componentSpy = spyOn(component, 'informativoStatusFatura');
    //     fixture.detectChanges();
    //     expect(componentSpy).toHaveBeenCalledWith('');
    // });

    it(`Deve chamar o dialog #DialogPixComponent`, () => {
        segundaViaService.setFaturas = mockFaturas.faturas
        fixture = TestBed.createComponent(CardUltimaFaturaComponent);
        component = fixture.componentInstance;

        let dialogSpy = spyOn(component['_dialog'], 'open');
        component.chamarDialogPix();
        fixture.detectChanges();
        expect(dialogSpy).toHaveBeenCalledWith(
            DialogPixComponent, {
            width: '50vw',
            maxWidth: '900px',
            minWidth: '310px',
            maxHeight: '100vh',
        });
    });

    it(`Deve chamar o dialog ${CardUltimaFaturaComponent.prototype.redirecionar} com parâmetro Código de Barra`, () => {
        segundaViaService.setFaturas = mockFaturas.faturas
        fixture = TestBed.createComponent(CardUltimaFaturaComponent);
        component = fixture.componentInstance;

        let dialogSpy = spyOn(component['_dialog'], 'open');
        component.redirecionar('Código de Barras');
        fixture.detectChanges();
        expect(dialogSpy).toHaveBeenCalledWith(
            CodigoDeBarrasComponent, {
                disableClose: false,
                hasBackdrop: true,
                width: '50vw',
                maxWidth: '900px',
                minWidth: '310px',
                maxHeight: '100vh',
                data: { fatura: mockFaturas.faturas[0] }
        });
    });

    it(`Deve chamar o dialog ${CardUltimaFaturaComponent.prototype.redirecionar} com parâmetro Cartão de crédito`, () => {
        segundaViaService.setFaturas = mockFaturas.faturas
        fixture = TestBed.createComponent(CardUltimaFaturaComponent);
        component = fixture.componentInstance;

        let alertSpy = spyOn(component['_alert'], 'alertCartaoCredito');
        component.redirecionar('Cartão de crédito');
        fixture.detectChanges();
        expect(alertSpy).toHaveBeenCalled();
    });

    it(`Deve chamar o dialog ${CardUltimaFaturaComponent.prototype.redirecionar} com parâmetro Internet Banking`, () => {
        segundaViaService.setFaturas = mockFaturas.faturas
        fixture = TestBed.createComponent(CardUltimaFaturaComponent);
        component = fixture.componentInstance;

        let dialogSpy = spyOn(component['_dialog'], 'open');
        component.redirecionar('Internet Banking');
        fixture.detectChanges();
        expect(dialogSpy).toHaveBeenCalledWith(
            InternetBankingComponent, {
                disableClose: true,
                hasBackdrop: true,
                maxWidth: '90vw',
                maxHeight: '90vh',
                data: { fatura: mockFaturas.faturas[0] }
        });
    });

    it(`Deve chamar o dialog ${CardUltimaFaturaComponent.prototype.redirecionar} com parâmetro Download`, () => {
        segundaViaService.setFaturas = mockFaturas.faturas
        fixture = TestBed.createComponent(CardUltimaFaturaComponent);
        component = fixture.componentInstance;

        let dialogSpy = spyOn(component['_dialog'], 'open');
        component.redirecionar('Download');
        fixture.detectChanges();
        expect(dialogSpy).toHaveBeenCalledWith(
            BaixarSegundaVia, {
                disableClose: true,
                hasBackdrop: true,
                width: 'auto',
                height: 'auto',
                data: { numSeqOper: mockFaturas.faturas[0].numeroFatura }
        });
    });

    it(`Deve chamar o dialog ${CardUltimaFaturaComponent.prototype.redirecionar} com parâmetro Enviar por e-mail`, () => {
        segundaViaService.setFaturas = mockFaturas.faturas
        fixture = TestBed.createComponent(CardUltimaFaturaComponent);
        component = fixture.componentInstance;

        let dialogSpy = spyOn(component['_dialog'], 'open');
        component.redirecionar('Enviar por e-mail');
        fixture.detectChanges();
        expect(dialogSpy).toHaveBeenCalledWith(
            EnviarEmailComponent, {
                disableClose: true,
                hasBackdrop: true,
                width: '50vw',
                maxWidth: '900px',
                maxHeight: '100vh',
                minWidth: '310px'
            });
        });

    it(`Deve chamar o dialog ${CardUltimaFaturaComponent.prototype.redirecionar} com parâmetro Entenda sua conta`, () => {
        segundaViaService.setFaturas = mockFaturas.faturas
        fixture = TestBed.createComponent(CardUltimaFaturaComponent);
        component = fixture.componentInstance;

        let routerSpy = spyOn(router, 'navigate');
        component.redirecionar('Entenda sua conta');
        fixture.detectChanges();
        expect(routerSpy).toHaveBeenCalledWith([PathCompleto.entendaSuaConta]);
    });

});
