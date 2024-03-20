import { Retorno } from "app/shared/models/retorno/retorno";

export class BandeiraTarifariaDTOResponse {
    constructor(
        public bandeiraTarifaria: Array<BandeiraTarifaria> = [],
        public retorno: Retorno = new Retorno()
    ) { }
}

export class BandeiraTarifaria {
    constructor(
        public bandeira: string = '',
        public descricao: string = '',
        public mesReferencia: string = '',
        public dataInclusao: string = '',
        public validoAte: string = '',
        public social: Social = new Social(),
        public e_resultado: string = ''
    ) { }
}

export class Social {
    constructor(
        public tipo: string = '',
        public descricao: string = ''
    ) { }
}
