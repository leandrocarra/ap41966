import { Component, Input } from '@angular/core';
import { EnumLeiturasNaMedia } from 'app/core/models/autoleitura/autoleitura';
import { AutoleituraService } from 'app/core/services/autoleitura/autoleitura.service';

@Component({
  selector: 'app-aviso-media-autoleitura',
  templateUrl: './aviso-media-autoleitura.component.html',
  styleUrls: ['./aviso-media-autoleitura.component.scss']
})
export class AvisoMediaAutoleituraComponent {
  @Input() leituraDentroDaMedia: string | undefined;
  statusMediaDasLeituras: string;
  opcaoNaMedia: string;
  opcaoSemDadosSuficientes: string;
  opcaoForaDaMedia: string;


  constructor(
    private _autoleituraService: AutoleituraService
  ) {
    this.statusMediaDasLeituras = this._autoleituraService.autoleitura.statusMediaDasLeituras;
    this.opcaoNaMedia = EnumLeiturasNaMedia.NaMedia;
    this.opcaoSemDadosSuficientes = EnumLeiturasNaMedia.SemDadosSuficientes;
    this.opcaoForaDaMedia = EnumLeiturasNaMedia.ForaDaMedia;
  }
}
