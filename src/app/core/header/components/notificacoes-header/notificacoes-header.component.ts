import { Component, OnInit } from '@angular/core';
import { NotificacoesHeader } from 'app/core/models/header/header';
import { HeaderService } from 'app/core/services/header/header.service';

@Component({
  selector: 'app-notificacoes-header',
  templateUrl: './notificacoes-header.component.html',
  styleUrls: ['./notificacoes-header.component.scss']
})
export class NotificacoesHeaderComponent implements OnInit {
  notificacoesHeader: NotificacoesHeader

  constructor(
    private _headerService: HeaderService
  ) {
    this.notificacoesHeader = this._headerService.notificacoesHeader;
  }

  ngOnInit(): void {
  }

}
