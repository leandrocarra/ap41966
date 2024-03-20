import { DocComum } from "../documentos/dados-documentos";

export class DocumentoPosse {
    public posseImovel: string;
    public documentoPosseImovel: any;
    public termoAceitoDocPosse: string;
    public checarDocumentoPosse: boolean;
    constructor(dados: any = {}) {
        this.posseImovel = dados.posseImovel ?? '';
        this.termoAceitoDocPosse = dados.termoAceitoDocPosse ?? '';
        this.checarDocumentoPosse = dados.checarDocumentoPosse ?? false;
        this.documentoPosseImovel = {
            'Doc Posse': new DocComum(0)
        }
    }
}

// export class DocumentoPosse {
//     public posseImovel: string;
//     public documentoPosseImovel: any;
//     public termoAceitoDocPosse: string;
//     public checarDocumentoPosse: boolean;

//     constructor(dados: any = {}) {
//         this.posseImovel = dados?.posseImovel ? dados.posseImovel : '';
//         this.termoAceitoDocPosse = dados?.termoAceitoDocPosse ? this.termoAceitoDocPosse : '';
//         this.checarDocumentoPosse = dados?.checarDocumentoPosse ? this.checarDocumentoPosse : false;
//         this.documentoPosseImovel = {
//             'Doc Posse': new DocComum(0)
//         }

//     }
// }
