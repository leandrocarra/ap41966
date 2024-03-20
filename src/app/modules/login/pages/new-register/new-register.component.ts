import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CadastroRequestDTO } from 'app/core/models/CadastroDTO/cadastroRequestDTO.model';
import { LoginRequestDTO } from 'app/core/models/LoginDTO/loginRequestDTO.model';
import { UserTO } from 'app/core/models/userTO.model';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { TokenService } from 'app/core/services/token/token.service';
import { PATHS } from "app/core/services/utils/utils.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): any {
		if (form?.control.controls.email.value && control?.value !== form.control.controls.email.value) {
			return true;
		}
	}
}

@Component({
	selector: 'app-new-register',
	templateUrl: './new-register.component.html',
	styleUrls: ['./new-register.component.scss'],
	providers: [
		{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } },
	]
})

export class NewRegisterComponent implements OnInit {
	@ViewChildren(MatSelect) matSelectList!: QueryList<MatSelect>;

	closeMenu() {
		this.matSelectList.forEach(element => {
			element.close();
		})
	}

	@HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
		this.closeMenu();
	}

	cadastroRequestDTO!: CadastroRequestDTO;

	tipoDocSecundario!: string;

	user!: UserTO;

	aviso: boolean = false;

	identificationFormGroup!: FormGroup;
	personalDataFormGroup!: FormGroup;
	passwordFormGroup!: FormGroup;
	validationFormGroup!: FormGroup;

	indexPage: number = 1;

	siteKey!: string;

	cpfCnpjmask!: string;
	telMask!: string;

	@ViewChild('stepper') stepper!: MatStepper;

	reCaptchaSuccess: boolean = false;

	matcher = new MyErrorStateMatcher();

	email = 'c*************s@gmail.com';
	sms = '(21) 9****-***3';

	cpfCnpjInactive = '10113793407';

	optionConfirmation!: string;

	labelUserId!: string;

	fullName!: string;

	mobile = false;

	nome!: string;

	constructor(
		public token: TokenService,
		private _formBuilder: FormBuilder,
		public cadastroService: CadastroService,
		private dateAdapter: DateAdapter<Date>, private router: Router) {
		this.dateAdapter.setLocale('pt');
		// this.siteKey = '6LdIHbIaAAAAAFhwxHlZ4z55TenDsfEhL2QqEXQr';
	}

	ngOnInit(): void {
		this.user = new UserTO();
		this.validatorsIdentificationFormGroup();
		this.validatorsPersonalDataFormGroup();
		this.validatorsPasswordFormGroup();
		this.validatorsValidationFormGroup();

		if (window.screen.width <= 768) {
			this.mobile = true;
		}
	}

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.configureMenuByWindowSize(event.target.innerWidth);
	}

	configureMenuByWindowSize(width: any) {
		this.mobile = width <= 768 ? true : false;
	}

	validatorsIdentificationFormGroup() {
		this.identificationFormGroup = this._formBuilder.group({
			userId: ['', Validators.required],
			// recaptcha: [''],
			email: ['', Validators.required],
			confirmEmail: ['']
		}, { validator: this.checkEmail });
	}

	validatorsPersonalDataFormGroup() {
		this.personalDataFormGroup = this._formBuilder.group({
			fullName: ['', Validators.required],
			birthDate: ['', Validators.required],
			tipoDocSecundario: ['', Validators.required],
			rg: ['', Validators.required],
			tel: ['', Validators.required],
		}, { validator: this.checkPersonalData });
	}

	validatorsPasswordFormGroup() {
		this.passwordFormGroup = this._formBuilder.group({
			password: ['', Validators.required]
		});
	}

	validatorsValidationFormGroup() {
		this.validationFormGroup = this._formBuilder.group({
			optionConfirmation: ['', Validators.required]
		});
	}

	checkEmail(group: FormGroup) {
		let email = group.controls.email.value;
		let confirmEmail = group.controls.confirmEmail.value;
		// let recaptcha = group.controls.recaptcha.value;

		return email === confirmEmail ? null : { notSame: true }
		// return email === confirmEmail && recaptcha ? null : { notSame: true }
	}

	eventSelection(value: any) {
		this.cadastroRequestDTO.tipoDocSecundario = value;
	}

	checkPersonalData(group: FormGroup) {
		let fullName = group.controls.fullName.value;
		let birthDate = group.controls.birthDate.value;
		let rg = group.controls.rg.value;
		let tel = group.controls.tel.value;

		let fullNameIsValid;

		if (fullName) {
			let firstName = fullName.split(" ", 1)[0];
			let middleName = fullName.split(" ", 2)[1];
			let lastName = fullName.split(" ", 3)[2];

			fullNameIsValid = (firstName.length >= 2 &&
				((middleName != undefined && middleName.length >= 2) || (lastName != undefined && lastName.length >= 2))) ? true : false;
		}

		return (fullName && fullNameIsValid) && birthDate
			&& rg && (tel && (tel.length >= 10 && tel.length <= 11)) ? null : { notSame: true }
	}

	applyMaskCpfCnpj(userId: any) {
		if (userId) {
			if (userId.length > 0 && userId.length <= 11) {
				this.cpfCnpjmask = '000.000.000-009';
				this.labelUserId = 'CPF';
			} else {
				this.cpfCnpjmask = '00.000.000/0000-00';
				this.labelUserId = 'CNPJ';
			}
		}
	}

	applyMaskTel(tel: any, event: any) {
		if (tel) {
			var telStr = tel.toString();
			this.telMask = (telStr.substr(0, 2) === "51" || telStr.substr(0, 2) === "53" || telStr.substr(0, 2) === "54"
				|| telStr.substr(0, 2) === "55") ? '(00) 0000-0000' : '(00) 0 0000-0000';
		}
	}

	flowCPF(index: any) {
		this.indexPage = index;
		this.stepper.selected!.completed = true;
		this.stepper.next();
	}

	flowCNPJ(index: any) {
		if (index == 9 || index == 10) {
			this.indexPage = index;
			document.getElementById('mat-step-horizontal')!.style.visibility = "hidden";
		} else {
			this.indexPage = 8;
			document.getElementById('mat-step-horizontal')!.style.visibility = "hidden";
		}
	}

	continuar(index: number) {
		if (index == 2) {
			this.roteamentoFluxo(2);
		} else {
			this.roteamentoFluxo(index);
			if (this.indexPage == 6) {
				document.getElementById('mat-step-horizontal')!.style.visibility = "hidden";
			}
		}
	}

	// @listen([ACTIVE_USER_SUCCESS])
	// onActiveUserSuccess(r: any) {
	//   this.indexPage = 7;
	//   document.getElementById('mat-step-horizontal')!.style.visibility = "hidden";
	// }

	// @listen([ACTIVE_USER_ERROR])
	// onActiveUserError(r: any) {
	//   this.roteamentoFluxo(2);
	// }

	roteamentoFluxo(index: any) {
		if (this.labelUserId == 'CPF') {
			this.flowCPF(index);
		} else {
			this.flowCNPJ(index);
		}
	}

	tipoDocSelection(tipoDocSelected: any) {
		console.log(tipoDocSelected);
	}

	newRegister() {
		this.cadastroRequestDTO.tipoDocSecundario = this.tipoDocSecundario;
		this.token.clearStorage();
		this.token.requestToken(new LoginRequestDTO('ELEKTRO/age-user', 'welcome1')).subscribe(
			(data) => {
				let token = data.access_token;
				// this.cadastroService.criarUsuario(this.cadastroRequestDTO, token).subscribe(
				// 	(data) => {
				// 		this.indexPage = 5;
				// 		document.getElementById('mat-step-horizontal')!.style.visibility = "hidden";
				// 		this.cadastroService.ativaUsuario(this.cadastroRequestDTO.documento, token);
				// 	}, (error) => {
				// 		this.indexPage = 6;
				// 		document.getElementById('mat-step-horizontal')!.style.visibility = "hidden";
				// 	}
				// )
			}
		)
	}

	voltar(index: number) {
		if (index == 0) {
			this.redirectLogin();
		} else {
			this.indexPage = index;
		}
		if (index >= 5 && index <= 11) {
			document.getElementById('mat-step-horizontal')!.style.visibility = "hidden";
		} else {
			document.getElementById('mat-step-horizontal')!.style.visibility = "visible";
		}
	}

	getPassword(password: string) {
		this.cadastroRequestDTO.senha = password;
	}

	sendOptionConfirmation(optionConfirm: any) {
		this.optionConfirmation = optionConfirm == 'email' ? this.email : this.sms;
		this.user.tipoEnvio = optionConfirm == 'email' ? '1' : '0';
	}

	newRegisterSuccess() {
		this.router.navigate([PATHS.login]);
	}

	redirectLogin() {
		this.router.navigate([PATHS.login]);
	}

	redirectForgetPassword() {
		this.router.navigate([PATHS.recuperarSenha]);
	}

	redirectWhatsapp() {
		// Future implementation of whatsapp communication
	}

}
