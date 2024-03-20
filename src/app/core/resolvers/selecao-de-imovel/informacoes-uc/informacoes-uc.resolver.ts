import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";
import { PathCompleto } from "app/core/enums/servicos";
import { EnumTitulosPadroes } from "app/core/models/exibir-aviso/exibir-aviso";
import { UcInfosResponseDTO } from "app/core/models/selecao-de-imoveis/DTO/responses/uc-infos-response-dto";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";


@Injectable({
    providedIn: 'root'
})
export class InformacoesUCResolver implements Resolve<UcInfosResponseDTO> {
    constructor(
        private _selecaoImovelService: SelecaoImovelService,
        private _router: Router
    ) { }

    resolve(): Promise<UcInfosResponseDTO> {
        return new Promise((resolve) => {
            this._selecaoImovelService.temInformacoesUCSelecionada(this._selecaoImovelService.getUCSelecionada?.uc!).then((ucEscolhida: UcInfosResponseDTO | any) => {
                if (ucEscolhida.error) {
					if (ucEscolhida.error.retorno.numero == '002') {
						this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: EnumTitulosPadroes.UCNaoEncontrada } });
					} else {
						this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: EnumTitulosPadroes.Inesperado } });
					}
                } else {
                    resolve(ucEscolhida);
                }
            });
        });
    }
}
