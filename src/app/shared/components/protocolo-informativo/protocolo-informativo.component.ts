import { Component, OnInit } from "@angular/core";
import { ProtocoloDTOResponse } from "app/core/models/protocolo/response/protocolo-dto";
import { SegundaViaPagamentoService } from "app/core/services/segunda-via-pagamento/segunda-via-pagamento.service";
import { UserService } from "app/core/services/user/user.service";
import { AgenciaVirtualService } from "app/core/services/utils/admin/agencia-virtual.service";

@Component({
  selector: "app-protocolo-informativo",
  templateUrl: "./protocolo-informativo.component.html",
  styleUrls: ["./protocolo-informativo.component.scss"],
})
export class ProtocoloInformativoComponent implements OnInit {
  protocolo!: ProtocoloDTOResponse;
  constructor(
    public user: UserService,
    public _agenciaVirtualService: AgenciaVirtualService,
    public _segundaViaPagamentoService: SegundaViaPagamentoService
    ) {
      this.protocolo = this._agenciaVirtualService.protocolo;
    }

  ngOnInit(): void {
    this._agenciaVirtualService.protocolo.subscribe((protocolo: ProtocoloDTOResponse) => this.protocolo = protocolo);
    this._agenciaVirtualService.protocoloANL.subscribe((protocolo:  ProtocoloDTOResponse) => this.protocolo = protocolo);
  }
}

