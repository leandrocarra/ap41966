import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { environment } from "@environments/environment";
import { MinhaContaDTORequest } from "app/core/models/minha-conta/request/minha-conta-dto";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { FaturaDigitalService } from "app/core/services/fatura-digital/fatura-digital.service";
import { MinhaContaService } from "app/core/services/minha-conta/minha-conta.service";
import { UserService } from "app/core/services/user/user.service";

@Injectable({ providedIn: "root" })
export class FaturaDigitalResolver implements Resolve<void> {
	constructor(
		private _faturaDigitalService: FaturaDigitalService,
		private _minhaContaService: MinhaContaService,
		private _loadingService: LoadingService,
		private _userService: UserService
	) { }

	async resolve(): Promise<void> {
		this._loadingService.start();
        await new Promise((resolve, reject) => {
            const requestDTO = this.preencherMinhaContaDTORequest();
            this._minhaContaService.consultarMinhaConta(requestDTO).subscribe({
                next: (responseDTO) => {
					this._faturaDigitalService.minhaContaResponseDTO = responseDTO;
					this._loadingService.stop();
					resolve(responseDTO);
                },
                error: (error) => {
					this._loadingService.stop();
					reject(error);
                }
            });
        });
	}

    preencherMinhaContaDTORequest(): MinhaContaDTORequest {
        let requestDTO = new MinhaContaDTORequest();
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.userName = this._userService.dadosUser.sub;
        requestDTO.documento = this._userService.dadosUser.documento;
        return requestDTO;
    }
}
