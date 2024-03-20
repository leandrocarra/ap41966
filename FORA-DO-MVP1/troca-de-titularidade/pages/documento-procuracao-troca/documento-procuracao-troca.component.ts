import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-documento-procuracao-troca',
  templateUrl: './documento-procuracao-troca.component.html',
  styleUrls: ['./documento-procuracao-troca.component.scss']
})
export class DocumentoProcuracaoTrocaComponent implements OnInit {

  
  /* TODO: Nessa etapa com o serviço de OCR na leitura do documento 
   * deverá ser informado  a data de entrada caso não seja encontrado 
   * a data de entrada deverá ser o dia da solicitação do serviço
   */

  anexoInvalid: boolean = true;
  mobile: boolean = false;
  subtitulo!: string;
 myFiles!: Array<any>;
  documento: any;
  fluxoDocVolta: boolean = false;
  navExtra!: NavigationExtras;

  constructor(
    public user: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _trocaTitularidadeService: TrocaDeTitularidadeService
  ) { 

    this._activatedRoute.queryParams.subscribe(params => {
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
    window.scrollTo(0, 0);
    this.mobile = (window.screen.width <= 768) ? true : false;
    this.subtitulo = (this.mobile) ? "Você pode tirar uma foto ou carregar um documento. Se optar pelo carregamento, " : "Ao carregar "
  }

  setDados() {
    if (this.navExtra.state!.docsAnexados) {
      for (let doc of this.navExtra.state!.docsAnexados) {
        if (doc.fileName === 'DOCUMENTO DE PROCURAÇÃO') {
          this.documento = doc;
          this.fluxoDocVolta = true;
        }
      }
    }
  }

  continuar(): void {
    console.log(this.navExtra.state!.docsAnexados);
    this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'documento-com-foto-terceiro'], this.navExtra);
  }

  voltar(): void {
    if (this.navExtra.state!.fluxoPendencia === 'pendencia-antigo-uc') {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'pendencias-em-aberto'], this.navExtra);
    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'imovel-endereco'], this.navExtra);
    }
   
  }

  recebeAnexos(file: any): void {
    if (file !== undefined) {
      if (!this.fluxoDocVolta) {
        this.navExtra.state!.docsAnexados.push(file);
      }
      this.myFiles.push(file);
      this.anexoInvalid = false;
      this._trocaTitularidadeService.documentoProcuracao = 'Documento de Procuração';
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
