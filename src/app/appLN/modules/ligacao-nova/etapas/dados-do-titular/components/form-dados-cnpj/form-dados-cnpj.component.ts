import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentosService } from '../../../../../../core/services/documentos/documentos.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { configureMenuByWindowSize } from '../../../../../../core/services/utils/neo-utils.service';
import { DialogClassePrincipalService } from '../dialog-classe-principal/dialog-classe-principal-service/dialog-classe-principal.service';

@Component({
  selector: 'neo-form-dados-cnpj',
  templateUrl: './form-dados-cnpj.component.html',
  styleUrls: ['./form-dados-cnpj.component.scss']
})
export class FormDadosCnpjComponent implements OnInit {
  @Input() dialogClassePrincipal: boolean;
  @Output() formCNPJValidado: EventEmitter<any> = new EventEmitter<any>()
  formDadosCNPJ!: FormGroup;
  classeEscolhida: string;
  allClasses: any;
  mobile: boolean;
  possuiClasse: boolean;
  constructor(
    private _formBuilder: FormBuilder,
    private _userServiceLN: UserServiceLN,
    private _etapaService: DocumentosService,
    private _dialogClassePrincipalService: DialogClassePrincipalService
  ) {
    this.dialogClassePrincipal = false;
    this.mobile = configureMenuByWindowSize(window.screen.width);
    this.possuiClasse = false;
    this.classeEscolhida = '';
  }

  ngOnInit(): void {
    this.formDadosCNPJ = this.formCNPJ();
    this.editarClassePrincipal();
    document.body.scrollTop = 0;
    this.validarForms()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  //Dialog da classe principal
  editarClassePrincipal() {
    this._userServiceLN.buscarClassePrincipal(this._userServiceLN.cnae.replace(/[.-]/g, "")).subscribe(classes => {
      this.allClasses = classes;
      if (classes.length === 0) {
        this.formDadosCNPJ.controls['classePrincipal'].enable();
        this.possuiClasse = false;
      } else if (classes.length == 1) {
        this.formDadosCNPJ.controls['classePrincipal'].setValue(classes[0].atividadeCNAE);
        this.formDadosCNPJ.controls['classePrincipal'].disable();
        this._etapaService.dadosCNPJ.codigoConsumo = classes[0].codigoConsumo;
        this.possuiClasse = true;
      } else {
        document.getElementById('link-classe')!.style.display = 'block';
        this._dialogClassePrincipalService.open(classes, this.mobile);
        this._dialogClassePrincipalService.classePrincipal().subscribe(classe => {
          if (classe.length === 0) {
            this.formDadosCNPJ.controls['classePrincipal'].enable();
            this.possuiClasse = false;
          } else {
            this.formDadosCNPJ.controls['classePrincipal'].setValue(classe.atividadeCNAE);
            this.formDadosCNPJ.controls['classePrincipal'].disable();
            this._etapaService.dadosCNPJ.codigoConsumo = classe.codigoConsumo;
            this.possuiClasse = true;
          }
        })
      }
    })
  }

  formCNPJ(): FormGroup {
    return this._formBuilder.group({
      cnpj: [
        {
          value: this._userServiceLN.sessionUser.documento,
          disabled: true
        },
        [
          Validators.required
        ]
      ],
      razaoSocial: [
        {
          value: this._userServiceLN.sessionUser.nome.toUpperCase(),
          disabled: true
        },
        [
          Validators.required
        ]
      ],
      atividadeFiscal: [
        {
          value: this._userServiceLN.cnae.replace(/[.-]/g, ""),
          disabled: true
        },
        [
          Validators.required
        ]
      ],
      classePrincipal: [
        {
          value: this._etapaService.getDadosCNPJ.classePrincipal,
          disabled: this.possuiClasse
        },
        [
          Validators.required
        ]
      ],
      inscricaoMunicipal: [
        {
          value: this._etapaService.getDadosCNPJ.inscricaoMunicipal,
          disabled: false
        },
        [
          Validators.required
        ]
      ],
      inscricaoEstadual: [
        {
          value: this._etapaService.getDadosCNPJ.inscricaoEstadual,
          disabled: false
        }
      ],
    })
  }

  deParaDadosCNPJ() {
    this._etapaService.dadosCNPJ.atividadeFiscal = this.formDadosCNPJ.controls.atividadeFiscal.value;
    this._etapaService.dadosCNPJ.classePrincipal = this.formDadosCNPJ.controls.classePrincipal.value;
    this._etapaService.dadosCNPJ.inscricaoMunicipal = this.formDadosCNPJ.controls.inscricaoMunicipal.value;
    this._etapaService.dadosCNPJ.inscricaoEstadual = this.formDadosCNPJ.controls.inscricaoEstadual.value;
    this._etapaService.dadosCNPJ.razaoSocial = this._userServiceLN.sessionUser.nome;
    this._etapaService.dadosCNPJ.cnpj = this._userServiceLN.sessionUser.documento;
  }

  validarForms() {
    this.touchForm();
    if (this.formDadosCNPJ.invalid) {
      this.formCNPJValidado.emit(false);
    } else {
      this.deParaDadosCNPJ();
      this.formCNPJValidado.emit(true);
    }
  }

  touchForm(): void {
    this.formDadosCNPJ.controls['cnpj'].markAsTouched();
    this.formDadosCNPJ.controls['razaoSocial'].markAsTouched();
    this.formDadosCNPJ.controls['atividadeFiscal'].markAsTouched();
    this.formDadosCNPJ.controls['classePrincipal'].markAsTouched();
    this.formDadosCNPJ.controls['inscricaoMunicipal'].markAsTouched();
    this.formDadosCNPJ.controls['inscricaoEstadual'].markAsTouched();
  }

}
