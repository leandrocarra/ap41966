import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DenunciaEticaService {
    getLinkDenunciaEtica(): string {
        return 'https://canaldedenuncia.com.br/neoenergia/';
    }
}
