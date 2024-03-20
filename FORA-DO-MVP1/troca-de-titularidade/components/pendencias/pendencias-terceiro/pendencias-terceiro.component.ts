import { Component, OnInit } from '@angular/core';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';

@Component({
  selector: 'app-pendencias-terceiro',
  templateUrl: './pendencias-terceiro.component.html',
  styleUrls: ['./pendencias-terceiro.component.scss']
})
export class PendenciasTerceiroComponent implements OnInit {

  constructor(
    public alert: CustomSweetAlertService
  ) { }

  ngOnInit(): void {
    this.alert.alertTrocaTitularidade('O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.');
  }

}
