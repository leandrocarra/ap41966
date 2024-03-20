import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FaturaDTO } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { SegundaViaService } from 'app/core/services/segunda-via/segunda-via.service';

@Injectable({
  providedIn: 'root'
})
export class SegundaViaResolver implements Resolve<any> {

  constructor(private _segundaViaService: SegundaViaService) { }

  resolve(): Promise<Array<FaturaDTO>> {
    return new Promise((resolve) => {
      if (this._segundaViaService.getDadosSegundaVia.possuiFaturas) {
        resolve(this._segundaViaService.getFaturas)
      } else {
        resolve([]);
      }
    });
  }

}
