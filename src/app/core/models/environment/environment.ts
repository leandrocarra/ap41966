import { Canal, Distribuidora } from "app/core/enums/distribuidoras"
import { Regiao } from "app/core/enums/regiao"

export class EnvironmentClass {
    constructor(
        public production: boolean,
        public title: Distribuidora,
        public name: string,
        public canal: Canal,
        public regiao: Regiao,
        public endpoints: any,
        public endpointsMultilogin:any,
        public logoLetraBranca: string,
        public logoLetraVerde: string,
        public USUARIO_UE: string,
        public tokenFlexPag: string,
        public apiKeyJWKS: string,
        public apiKeyTokenPix: string,
        public siteKeyRecaptcha: string,
        public protocoloAnl: string,
        public codigoJornada: any
    ) { }
}
