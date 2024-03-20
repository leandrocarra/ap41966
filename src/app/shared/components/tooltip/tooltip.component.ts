import { Component, Input } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { TooltipPosition } from "@angular/material/tooltip";
import { DomSanitizer } from "@angular/platform-browser";
import { Grupo } from "app/core/enums/grupos";
import { CustomSweetAlertService } from "app/core/services/customsweetalert/custom-sweet-alert.service";
import { UserService } from "app/core/services/user/user.service";

@Component({
  selector: "app-tooltip",
  templateUrl: "./tooltip.component.html",
  styleUrls: ["./tooltip.component.scss"],
})

/*Componente de tooltip do sistema.*/
export class TooltipComponent {
  @Input() explicacao!: string;
  @Input() positionValue!: TooltipPosition;
  @Input() filtro!: boolean;

  constructor(
    private _alert: CustomSweetAlertService,
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _userService: UserService,
  ) {
    this.filtro = !this.filtro ? false : this.filtro;
    this.positionValue = !this.positionValue ? "right" : this.positionValue;
    this._matIconRegistry.addSvgIcon(
      "info",
      this._domSanitizer.bypassSecurityTrustResourceUrl(this.adicionarIcone())
    );
  }

  showMessage(): void {
    this._alert.alertInfo(this.explicacao.replace(/\n/g, "<br/>"));
  }

  adicionarIcone(): string {
    if (this.filtro) {
      return "assets/images/icons/info_white.svg";
    } else {
      return (this._userService.group == Grupo.A) ? "assets/images/icons/info_light.svg" : "assets/images/icons/info.svg";
    }
  }
}
