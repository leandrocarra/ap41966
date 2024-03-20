import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';

@Component({
  selector: 'app-motivo-troca',
  templateUrl: './motivo-troca.component.html',
  styleUrls: ['./motivo-troca.component.scss']
})
export class MotivoTrocaComponent implements OnInit {

  isDisabled: boolean = true;
  mobile: boolean = false;
  mobileLarge: boolean = false;
  subtitulo!: string;

  motivoTroca!: string;
  infoDoc!: string;
  docPosse!: boolean;
  docPropriedade!: boolean;

  myFiles!: Array<any>;
  navExtra!: NavigationExtras;

  constructor(
    private _router: Router,
    private _activedRouter: ActivatedRoute
  ) {

    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state);
      }
    });

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.configureMenuByWindowSize(event.target.innerWidth);
  }

  configureMenuByWindowSize(width: any): void {
    this.mobile = (width <= 768) ? true : false;
    this.mobileLarge = (width <= 425) ? true : false;
    this.subtitulo = (this.mobile) ? "Você pode tirar uma foto ou carregar um documento. Se optar pelo carregamento, " : "Ao carregar "
  }

  ngOnInit(): void {
    this.mobile = (window.screen.width <= 768) ? true : false;
    this.mobileLarge = (window.screen.width <= 425) ? true : false;
    this.subtitulo = (this.mobile) ? "Você pode tirar uma foto ou carregar um documento. Se optar pelo carregamento, " : "Ao carregar ";

    this.infoDoc = "Os comprovante de posse aceitos são:\n\n- IPTU\n - conta de água\n -conta de internet\n - conta de telefone\n - contrato de compra e venda\n - contrato de aluguel";
  }


  voltar(): void {
    this.navExtra.state!.fluxoPendencia = 'pendencia-novo-uc';
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'pendencias-em-aberto'], this.navExtra);
  }

  continuar(): void {
    this.navExtra.state!.fluxoPendencia = 'pendencia-novo-uc';
    this.myFiles.forEach(elem => {
      this.navExtra.state!.docsAnexados.push(elem);
    })
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'documento-com-foto'], this.navExtra);
  }

  onChange () {
    this.myFiles.forEach(elem => {
      this.removeAnexo(elem)
    })
    console.log(this.myFiles);
  }

  validarContinuar() {
    if ((this.motivoTroca == 'aluguel' && this.myFiles.length == 2) ) {

      this.myFiles.forEach((elem: any) => {
        if (elem?.fileName == 'DOCUMENTO DE COMPROVANTE DE POSSE') {
          this.docPosse = true;
        } else if (elem.fileName == 'DOCUMENTO DE PROPRIEDADE') {
          this.docPropriedade = true;
        }
      })

      this.isDisabled = (this.docPropriedade && this.docPosse) ? false : true;

    } else if (this.motivoTroca == 'compra' && this.myFiles.length == 1) {
        this.isDisabled = (this.myFiles[0]!.fileName === 'DOCUMENTO DE COMPROVANTE DE POSSE') ? false : true;

    } else {
      this.isDisabled = true;
    }
  }

  recebeAnexos(file: any): void {
    if (file !== undefined) {
      this.myFiles.push(file);
      this.validarContinuar();
    }
  }

  removeAnexo(file: any): void {
    let indice;
    if (this.myFiles.length > 0) {
      for (let doc of this.myFiles) {
        if (doc.fileName === file.fileName) {
          indice = this.myFiles.indexOf(file);
          this.myFiles.splice(indice, 1);
        }
      }
    }
    this.validarContinuar();
  }

}
