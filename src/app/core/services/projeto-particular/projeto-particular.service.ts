import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjetoParticularService {

  fluxoIniciado: boolean;

  constructor() {
    this.fluxoIniciado = false;
   }
}
