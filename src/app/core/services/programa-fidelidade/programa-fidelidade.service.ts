import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { Canal } from 'app/core/enums/distribuidoras';

@Injectable({
    providedIn: 'root',
})
export class ProgramaFidelidadeService {
    public getLinkProgramaFidelidade(): string {
        const hyperlinkMap: Record<Canal, string> = {
            [Canal.AGE]: 'https://www.energiapararecomecar.com.br/neoenergia_elektro-hotsite/',
            [Canal.AGR]: 'https://www.energiapararecomecar.com.br/neoenergia_cosern-hotsite/',
            [Canal.AGC]: 'https://www.energiapararecomecar.com.br/neoenergia_coelba-hotsite/',
            [Canal.AGP]: 'https://www.energiapararecomecar.com.br/neoenergia_pernambuco-hotsite/'
        };
        return hyperlinkMap[environment.canal];
    }
}
