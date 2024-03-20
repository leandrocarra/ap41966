import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent implements OnInit {
  navExtra!: NavigationExtras;
  
  myFiles: Array<any> = [];
  validarAnexo: boolean = true;
  documento: any;

  constructor(
    private _router: Router,
    private _activedRouter: ActivatedRoute,
    private _trocaTitularidadeService: TrocaDeTitularidadeService,
  ) {
    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state);
      }
    });
   }

  ngOnInit(): void {
  }

  continuar(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }

  voltar(){
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }

  setDados() {
    if (this.navExtra.state!.docsAnexados) {
      for (let doc of this.navExtra.state!.docsAnexados) {
        if (doc.fileName === 'DOCUMENTO COM FOTO VÁLIDO (FRENTE E VERSO)') {
          this.documento = doc;
        }
      }
    }
  }

  recebeAnexos(file: any): void {
    if (file !== undefined) {
      this.myFiles.push(file);
      this._trocaTitularidadeService.documentoFoto = true;
    }
  }

  removeAnexo(file: any): void {
    let indice = this.myFiles.indexOf(file);
    this.myFiles.splice(indice, 1);

    this.removeAnexoNavExtra(file);
  }

  removeAnexoNavExtra(file: any): void {
    let indice = this.navExtra.state!.docsAnexados.indexOf(file);
    this.navExtra.state!.docsAnexados.splice(indice, 1);
  }

  hasAnexo(): boolean{
     return this.myFiles.length > 0;
  }
}
