import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Distribuidora } from 'app/core/enums/distribuidoras';

@Injectable({
    providedIn: 'root'
})
export class LgpdService {

    getLinkLGPD(link: 'LGPD' | 'PRIVACIDADE'): string {
        switch (environment.title) {
            case Distribuidora.COELBA:
                if (link === 'LGPD') {
                    return "https://servicos.neoenergiacoelba.com.br/Pages/lgpd-clientes.aspx"
                } else {
                    return "https://servicos.neoenergiacoelba.com.br/Pages/privacidade-clientes.aspx"
                }


            case Distribuidora.COSERN:
                if (link === 'LGPD') {
                    return "https://servicos.neoenergiacosern.com.br/Pages/lgpd-clientes.aspx"
                } else {
                    return "https://servicos.neoenergiacosern.com.br/Pages/privacidade-clientes.aspx"
                }

            case Distribuidora.ELEKTRO:
                if (link === 'LGPD') {
                    return "https://www.neoenergiaelektro.com.br/sobre-a-elektro/lgpd-clientes"
                } else {
                    return "https://www.neoenergiaelektro.com.br/sobre-a-elektro/aviso-de-privacidade-clientes"
                }

            case Distribuidora.CELPE:
                if (link === 'LGPD') {
                    return "https://servicos.neoenergiapernambuco.com.br/Pages/lgpd-clientes.aspx"
                } else {
                    return "https://servicos.neoenergiapernambuco.com.br/Pages/privacidade-clientes.aspx"
                }

            default:
                return "";
        }
    }
} 