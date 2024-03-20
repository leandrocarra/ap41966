import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { Canal } from 'app/core/enums/distribuidoras';

@Injectable({
    providedIn: 'root',
})
export class TrocaTitularidadeService {
    public getLinkTrocaTitularidade(): string {
        const hyperlinkMap: Record<Canal, string> = {
            [Canal.AGE]: 'https://www.neoenergiaelektro.com.br/servicos-para-voce/troca-de-titularidade',
            [Canal.AGR]: 'https://servicos.neoenergiacosern.com.br/Pages/troca-de--titularidade-.aspx',
            [Canal.AGC]: 'https://servicos.neoenergiacoelba.com.br/area-logada/Paginas/login.aspx?ref=https://servicos.neoenergiacoelba.com.br/servicos-ao-cliente/Pages/RenovaTrocaTitularidade.aspx',
            [Canal.AGP]: 'https://servicos.neoenergiapernambuco.com.br/area-logada/Paginas/login.aspx?ref=https://servicos.neoenergiapernambuco.com.br/servicos-ao-cliente/Pages/RenovaTrocaTitularidade.aspx'
        };
        return hyperlinkMap[environment.canal];
    }
}
