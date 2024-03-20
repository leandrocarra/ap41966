import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { Canal } from 'app/core/enums/distribuidoras';

@Injectable({
    providedIn: 'root',
})
export class AtendimentoPresencialAgendadoService {
    public getLinkAtendimentoPresencialAgendado(): string {
        const hyperlinkMap: Record<Canal, string> = {
            [Canal.AGE]: '',
            [Canal.AGR]: '',
            [Canal.AGC]: '',
            [Canal.AGP]: ''
        };
        return hyperlinkMap[environment.canal];
    }
}
