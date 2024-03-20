import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';

@Component({
  selector: 'app-documento-com-foto-troca',
  templateUrl: './documento-com-foto-troca.component.html',
  styleUrls: ['./documento-com-foto-troca.component.scss']
})
export class DocumentoComFotoTrocaComponent implements OnInit {

  anexoInvalid: boolean = true;
  mobile: boolean = false;
  subtitulo!: string;
  myFiles!: Array<any>;
  documento: any;
  fluxoDocVolta: boolean = false;
  navExtra!: NavigationExtras;

  constructor(
    private _location: Location,
    private _router: Router,
    private _activedRouter: ActivatedRoute,
  ) {

    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state);
      }
    });

    this.setDados();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.configureMenuByWindowSize(event.target.innerWidth);
  }

  configureMenuByWindowSize(width: any): void {
    this.mobile = (width <= 768) ? true : false;
    this.subtitulo = (this.mobile) ? "Você pode tirar uma foto ou carregar um documento. Se optar pelo carregamento, " : "Ao carregar "
  }

  ngOnInit(): void {
    this.mobile = (window.screen.width <= 768) ? true : false;
    this.subtitulo = (this.mobile) ? "Você pode tirar uma foto ou carregar um documento. Se optar pelo carregamento, " : "Ao carregar "
  }

  setDados() {
    if (this.navExtra.state!.docsAnexados) {
      for (let doc of this.navExtra.state!.docsAnexados) {
        if (doc.fileName === 'DOCUMENTO COM FOTO VÁLIDO (FRENTE E VERSO)') {
          this.documento = doc;
          this.fluxoDocVolta = true;
        }
      }
    }
  }

  voltar(): void {
    if (this.navExtra.state!.fluxoPendencia === 'pendencia-novo-uc') {
      if (this.navExtra.state!.docsAnexados.length > 0) {
        for (let doc of this.navExtra.state!.docsAnexados) {
          if (doc.fileName === 'DOCUMENTO DE PROPRIEDADE' || doc.fileName === 'DOCUMENTO DE COMPROVANTE DE POSSE') {
            this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'motivo-troca'], this.navExtra)
          }
        }
        // NOTE: Fluxo de voltar docs anexado anteriormente não relacionados com motivo troca (doc de propriedade e comprovante de posse)
        this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'pendencias-em-aberto'], this.navExtra);
      } else {
        this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'pendencias-em-aberto'], this.navExtra);
      }
    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'informar-imovel'], this.navExtra)
    }
  }

  continuar(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'informativo-selfie'], this.navExtra)
  }

  recebeAnexos(file: any): void {
    if (file !== undefined) {
      if (!this.fluxoDocVolta) {
        this.navExtra.state!.docsAnexados.push(file);
      }
      this.myFiles.push(file);
      this.anexoInvalid = false;
    }
  }

  removeAnexo(file: any): void {
    // Array de doc Procuracao
    let indice = this.myFiles.indexOf(file);
    this.myFiles.splice(indice, 1);

    // Array do navExtra
    indice = this.navExtra.state!.docsAnexados.indexOf(file);
    this.navExtra.state!.docsAnexados.splice(indice, 1);

    this.anexoInvalid = true;
  }

}
