import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FaturaImpressaService } from 'app/core/services/fatura-impressa/fatura-impressa.service';

@Injectable({
  providedIn: 'root'
})
export class TaxaEntregaAlternativaResolver implements Resolve<string> {
  constructor(
    private _faturaImpressaService: FaturaImpressaService
  ) { }

  resolve(): Promise<string> {
    return new Promise((resolve) => {
      this._faturaImpressaService.recebeTaxa().then((valorTaxa) => {
        this._faturaImpressaService.entregaDaFatura.taxa = valorTaxa;
        resolve(valorTaxa);
      })
    })

  }
}