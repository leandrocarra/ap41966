import { Component } from '@angular/core';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { LigacaoNovaService } from 'app/core/services/ligacao-nova/ligacao-nova.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-nao-possui-imovel',
  templateUrl: './nao-possui-imovel.component.html',
  styleUrls: ['./nao-possui-imovel.component.scss']
})
export class NaoPossuiImovelComponent {
  userGroup: string;
  constructor(
    private _user: UserService,
    private _ligacaoNovaService: LigacaoNovaService,
    private _cadastroService: CadastroService
  ) {
      this.userGroup = this._user.group;
    this._user.breadcrumb = false;
  }

  solicitarLigacaoNova() {
    this._cadastroService.obterRecaptcha().then((token)=>{
        this._ligacaoNovaService.redirecionarParaLigacaoNova(token);
    })

  }
}
