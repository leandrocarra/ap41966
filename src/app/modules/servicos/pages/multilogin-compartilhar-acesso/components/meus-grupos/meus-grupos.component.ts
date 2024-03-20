import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GrupoVinculos } from 'app/core/models/multilogin/multilogin-acesso';
import { PerfilAtivo } from 'app/core/models/multilogin/response/multilogin-dto';



@Component({
  selector: 'app-meus-grupos',
  templateUrl: './meus-grupos.component.html',
  styleUrls: ['./meus-grupos.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MeusGruposComponent implements OnInit {

  @Input() grupos!: Array<GrupoVinculos>;
  @Output() removerUsuario: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit(): void { }

  validarAcao(event: PerfilAtivo, grupoIndice: number, usuarioIndice: number): void {
    this.removerUsuario.emit({event, grupoIndice, usuarioIndice});
  } 

}
