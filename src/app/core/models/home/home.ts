import { Servicos } from "../servicos/servicos";

export class CarouselItem {
    constructor(
        public icon: string,
        public servico: Servicos,
        public routeNavigate: Array<string>
    ) {
        this.icon = icon;
        this.servico = servico;
        this.routeNavigate = routeNavigate;
    }
}

export type EstiloAlerta = "text-dark-blue" | "text-danger" | "text-light-blue";

export class Alerta {
    constructor(
    public icone_esquerda: string,
    public icone_fechar: boolean,
    public rota: any,
    public nomeBtn: string,
    public titulo: string,
    public descricao: string,
    public estilo: EstiloAlerta,
    ) {
        this.icone_esquerda = icone_esquerda;
        this.rota = rota;
        this.nomeBtn = nomeBtn;
        this.titulo = titulo;
        this.descricao = descricao;
        this.estilo = estilo;
    }
}

