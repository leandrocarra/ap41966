export type NomeDistribuidora = 'COELBA' | 'COSERN' | 'ELEKTRO' | 'PERNAMBUCO';

export enum Distribuidora {
    ELEKTRO = "NEOENERGIA ELEKTRO",
    COELBA = "NEOENERGIA COELBA",
    CELPE = "NEOENERGIA PERNAMBUCO",
    COSERN = "NEOENERGIA COSERN"
}

export type DistribuidorasProtocoloType = DistribuidorasProtocolo.ELEKTRO | DistribuidorasProtocolo.COELBA | DistribuidorasProtocolo.COSERN | DistribuidorasProtocolo.CELPE;

export enum DistribuidorasProtocolo {
    ELEKTRO = 'ELEKTRO',
    COELBA = 'COEL',
    COSERN = 'COSE',
    CELPE = 'CELP'
}

export type CanalType = '' | Canal.AGE | Canal.AGR | Canal.AGC | Canal.AGP;

export enum Canal {
    AGE = 'AGE', // Elektro
    AGR = 'AGR', // Cosern
    AGC = 'AGC', // Coelba
    AGP = 'AGP' // Celpe
}

export enum DistribuidorasProtocoloANL {
    ELEKTRO = 'ELEK',
    COELBA = 'COEL',
    COSERN = 'COSE',
    CELPE = 'PERN'
}
