import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PathCompleto } from 'app/core/enums/servicos';
import { AvisoFatura } from 'app/core/models/segunda-via/segunda-via.model';
import { SegundaViaService } from 'app/core/services/segunda-via/segunda-via.service';
import { DialogPixComponent } from '../../alerts/dialog-pix/dialog-pix.component';
import { EnviarEmailComponent } from '../../alerts/enviar-email/enviar-email.component';
import { InternetBankingComponent } from '../../alerts/internet-banking/internet-banking.component';
import { CodigoDeBarrasComponent } from '../../cards/codigo-de-barras/codigo-de-barras.component';
import { BaixarSegundaVia } from '../../faturas/baixar-segunda-via.component';
import { ContentAccordionComponent } from './content-accordion.component';

describe(ContentAccordionComponent.name, () => {
    let component: ContentAccordionComponent;
    let fixture: ComponentFixture<ContentAccordionComponent>;
    let segundaViaService: jasmine.SpyObj<SegundaViaService>;
    let router: Router;

    const dialogMock = {
        open: () => { },
        close: () => { },
        afterClosed: () => { }
    };

    let mockFaturas = require("../../../mock/responses/response-api-faturas.json");


    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ContentAccordionComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [
                RouterTestingModule.withRoutes([]),
                MatDialogModule,
                HttpClientTestingModule
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: dialogMock },
            ]
        })
            .compileComponents();
        router = TestBed.inject(Router);
        segundaViaService = TestBed.inject(SegundaViaService) as jasmine.SpyObj<SegundaViaService>;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentAccordionComponent);
        component = fixture.componentInstance;
    });

    it(`Deve instanciar ${ContentAccordionComponent.name} quando chamado`, () => {
        expect(component).toBeTruthy();
    });

    it(`Deve settar o aviso da fatura ${ContentAccordionComponent.prototype.settarAvisoFatura.name} 
    quando o status for Em Processamento`, () => {
        mockFaturas.faturas[0].statusFatura = "EmProcessamento";
        fixture.detectChanges();
        expect(component.settarAvisoFatura(mockFaturas.faturas[0].statusFatura)).toEqual(AvisoFatura.EmProcessamento);
    });

    // it(`Deve settar o mês da fatura ${ContentAccordionComponent.prototype.mesReferencia} quando não houver nada`, () => {
    //     mockFaturas.faturas[0].dataCompetencia = "2021-01-04";
    //     component.fatura = mockFaturas.faturas[0];
    //     fixture.detectChanges();
    //     expect(component['mesReferencia']).toEqual("Error");
    // });

    it(`Deve settar o aviso da fatura ${ContentAccordionComponent.prototype.settarAvisoFatura.name} 
    quando o status for Vinculada`, () => {
        mockFaturas.faturas[0].statusFatura = "Vinculada";
        fixture.detectChanges();
        expect(component.settarAvisoFatura(mockFaturas.faturas[0].statusFatura)).toEqual(AvisoFatura.Vinculada);
    });

    it(`Deve settar o aviso da fatura ${ContentAccordionComponent.prototype.settarAvisoFatura.name} 
    quando status diferente de Vinculada e Em Processamento`, () => {
        mockFaturas.faturas[0].statusFatura = "Vencida";
        fixture.detectChanges();
        expect(component.settarAvisoFatura(mockFaturas.faturas[0].statusFatura)).toEqual(AvisoFatura.DemaisStatus);
    });


    it(`Deve chamar o alert ${ContentAccordionComponent.prototype.chamarFlexPag.name} para pagamento com cartão de crédito`, () => {
        let alertSpy = spyOn(component['_alert'], 'alertCartaoCredito');
        fixture.detectChanges();
        component.chamarFlexPag()
        expect(alertSpy).toHaveBeenCalled();
    });

    it(`Deve chamar o dialog ${ContentAccordionComponent.prototype.chamarInternetBanking.name}`, () => {
        let dialogSpy = spyOn(component['_dialog'], 'open');
        component.fatura = mockFaturas.faturas[2];
        component.chamarInternetBanking();
        fixture.detectChanges();
        expect(dialogSpy).toHaveBeenCalledWith(
            InternetBankingComponent, {
            disableClose: true,
            hasBackdrop: true,
            maxWidth: '90vw',
            maxHeight: '90vh',
            data: { fatura: mockFaturas.faturas[2] }
        });
    });

    it(`Deve chamar o dialog ${ContentAccordionComponent.prototype.chamarAlertCodigoDeBarra.name}`, () => {
        let dialogSpy = spyOn(component['_dialog'], 'open');
        component.fatura = mockFaturas.faturas[2];
        component.chamarAlertCodigoDeBarra();
        fixture.detectChanges();
        expect(dialogSpy).toHaveBeenCalledWith(
            CodigoDeBarrasComponent, {
            disableClose: false,
            hasBackdrop: true,
            width: '50vw',
            maxWidth: '900px',
            minWidth: '310px',
            maxHeight: '100vh',
            data: { fatura: mockFaturas.faturas[2] }
        });
    });

    it(`Deve chamar o dialog ${ContentAccordionComponent.prototype.chamarDialogPix.name}`, () => {
        let dialogSpy = spyOn(component['_dialog'], 'open');
        component.chamarDialogPix();
        fixture.detectChanges();
        expect(dialogSpy).toHaveBeenCalledWith(
            DialogPixComponent, {
            width: '50vw',
            maxWidth: '900px',
            maxHeight: '100vh',
            minWidth: '310px'
        });
    });

    it(`Deve chamar redirecionar para tela Entenda sua conta`, () => {
        let routerSpy = spyOn(router, 'navigate');
        component.redirecionarEntendaSuaConta();
        fixture.detectChanges();
        expect(routerSpy).toHaveBeenCalledWith([PathCompleto.entendaSuaConta]);
    });

    it(`Deve chamar o dialog ${ContentAccordionComponent.prototype.abrirDialogDownloadFatura.name}`, () => {
        let dialogSpy = spyOn(component['_dialog'], 'open');
        component.fatura = mockFaturas.faturas[2];
        component.abrirDialogDownloadFatura();
        fixture.detectChanges();
        expect(dialogSpy).toHaveBeenCalledWith(
            BaixarSegundaVia, {
            disableClose: true,
            hasBackdrop: true,
            width: 'auto',
            height: 'auto',
            data: { numSeqOper: mockFaturas.faturas[2].numeroFatura }
        });
    });

    it(`Deve chamar o dialog ${ContentAccordionComponent.prototype.faturaPorEmail.name}`, () => {
        let dialogSpy = spyOn(component['_dialog'], 'open');
        component.faturaPorEmail();
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

});
