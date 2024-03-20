import { Component } from '@angular/core';
import { Aviso, EnumTipoDeErro } from 'app/core/models/fatura-digital/fatura-digital';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-erro-fatura-digital',
  templateUrl: './erro-fatura-digital.component.html',
  styleUrls: ['./erro-fatura-digital.component.scss']
})
export class ErroFaturaDigitalComponent {

  tipoAlerta: EnumTipoDeErro
  aviso: Aviso;

  constructor(
    private _user: UserService,

  ) {

    this._user.breadcrumb = false;
    this._user.isFluxo = false;
    this.tipoAlerta = EnumTipoDeErro.EnergiaCortada
    this.aviso = this.mensagensDeErro(this.tipoAlerta);

  }

  mensagensDeErro(tipoAlerta: string): Aviso {
    switch (tipoAlerta) {
      case EnumTipoDeErro.Servico:
        return new Aviso(
          "erro-servico",
          "Não conseguimos carregar suas informações no momento!\nPor favor, tente novamente mais tarde.",
          "",
          "laranja"
        );

      case EnumTipoDeErro.Inesperado:
        return new Aviso(
          "erro-inesperado",
          "Serviço indisponível no momento. Por favor, tente novamente mais tarde",
          "",
          "laranja"
        );

      case EnumTipoDeErro.EnergiaCortada:
        return new Aviso(
          "energia-cortada",
          "A unidade consumidora está com a energia cortada.",
          "",
          "laranja"
        )

      case EnumTipoDeErro.ServicoFatura:
        return new Aviso(
          "servico-fatura",
          "Serviço não disponível para fatura vinculadas a conta contrato coletiva.",
          "",
          "laranja"
        )

      case EnumTipoDeErro.ContaColetiva:
        return new Aviso(
          "conta-coletiva",
          "Serviço não disponível para conta contrato coletiva.",
          "",
          "laranja"
        );

      default:
        return new Aviso("", "", "", "")
    }
  }
}
