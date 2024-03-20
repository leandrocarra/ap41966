import { Component, OnInit } from '@angular/core';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';

@Component({
  selector: 'app-pendencias-uc',
  templateUrl: './pendencias-uc.component.html',
  styleUrls: ['./pendencias-uc.component.scss']
})
export class PendenciasUcComponent implements OnInit {

  constructor(
    public alert: CustomSweetAlertService
  ) { }

  ngOnInit(): void {
    this.alert.alertTrocaTitularidade('Para prosseguir é necessário realizar o pagamento das faturas em aberto.');
  }

}
