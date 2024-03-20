import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Canal } from 'app/core/enums/distribuidoras';
import { PathCompleto } from 'app/core/enums/servicos';
import { LigacaoNovaSEService } from '../ligacao-nova-se/ligacao-nova-se.service';

@Injectable({
    providedIn: 'root'
})
export class LigacaoNovaService {
    constructor(
        private _router: Router,
        private _ligacaoNovaSEService: LigacaoNovaSEService
    ) { }

    public redirecionarParaLigacaoNova(recaptcha:string): void {
        if (environment.canal === Canal.AGE) {
            // TODO: Inserir chamada de limpeza de cache estritamente para o LN. Como?
            this._ligacaoNovaSEService.obterProtocolo(recaptcha);
            this._router.navigate([PathCompleto.ligacaoNova]); // Chamará a rota, acionando o Guard, que executará as verificações necessárias antes de iniciar o fluxo de LN.
        } else {
            if (window.open(this.selecionarHyperlinkPorCanal(), '_blank')) {
                window.open(this.selecionarHyperlinkPorCanal(), '_blank')!.opener = null;
            }
        }
    }

    public selecionarHyperlinkPorCanal(): string {
        switch (environment.canal) {
            case Canal.AGR: return 'https://servicos.neoenergiacosern.com.br/area-logada/Paginas/login.aspx?ref=https://servicos.neoenergiacosern.com.br/servicos-ao-cliente/Pages/verificar-debito-ligacao-nova-Renova.aspx';
            case Canal.AGC: return 'https://servicos.neoenergiacoelba.com.br/area-logada/Paginas/login.aspx?ref=https://servicos.neoenergiacoelba.com.br/servicos-ao-cliente/Pages/verificar-debito-ligacao-nova-Renova.aspx';
            case Canal.AGP: return 'https://servicos.neoenergiapernambuco.com.br/area-logada/Paginas/login.aspx?ref=https://servicos.neoenergiacosern.com.br/servicos-ao-cliente/Pages/verificar-debito-ligacao-nova-Renova.aspx';
            default: return '';
        }
    }
}
