import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';

@Component({
  selector: 'app-documento-com-foto-terceiro',
  templateUrl: './documento-com-foto-terceiro.component.html',
  styleUrls: ['./documento-com-foto-terceiro.component.scss']
})
export class DocumentoComFotoTerceiroComponent implements OnInit {

  anexoInvalid: boolean = true;
  mobile: boolean = false;
  subtitulo!: string;
 myFiles!: Array<any>;
  documento: any;
  fluxoDocVolta: boolean = false;
  navExtra!: NavigationExtras;

  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _trocaTitularidadeService: TrocaDeTitularidadeService
  ) { 

    this._activatedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {        
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
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
    this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'documento-procuracao'], this.navExtra);
  }

  continuar(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'informar-novo-titular'], this.navExtra);
  }

  recebeAnexos(file: any): void {
    if (file !== undefined) {
      if (!this.fluxoDocVolta) {
        this.navExtra.state!.docsAnexados.push(file);
      }
      this.myFiles.push(file);
      this.anexoInvalid = false;
      this._trocaTitularidadeService.documentoFoto = true;
    }
  }

  removeAnexo(file: any): void {
    // Array de doc com foto terceiro
    let indice = this.myFiles.indexOf(file);
    this.myFiles.splice(indice, 1);

    // Array do navExtra
    indice = this.navExtra.state!.docsAnexados.indexOf(file);
    this.navExtra.state!.docsAnexados.splice(indice, 1);

    this.anexoInvalid = true;
  }

}
