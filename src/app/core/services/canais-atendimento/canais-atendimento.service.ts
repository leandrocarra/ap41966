import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { Canal } from 'app/core/enums/distribuidoras';

@Injectable({
    providedIn: 'root',
})
export class CanaisAtendimentoService {
    public getLinkCanaisAtendimento(): string {
        const hyperlinkMap: Record<Canal, string> = {
            [Canal.AGE]: 'https://www.neoenergiaelektro.com.br/fale-com-a-gente/canais-de-atendimento',
            [Canal.AGR]: 'https://servicos.neoenergiacosern.com.br/residencial-rural/Pages/canais-de-atendimento-cosern.aspx',
            [Canal.AGC]: 'https://servicos.neoenergiacoelba.com.br/residencial-rural/Pages/canais-de-atendimento-coelba.aspx',
            [Canal.AGP]: 'https://servicos.neoenergiapernambuco.com.br/residencial-rural/Pages/canais-de-atendimento-celpe.aspx'
        };
        return hyperlinkMap[environment.canal];
    }
}
