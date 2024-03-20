import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'app/core/services/user/user.service';
import { DialogProtocoloService } from 'app/shared/components/dialog-protocolo/dialog-protocolo.service';

@Component({
	selector: 'app-detalhes-solicitacao-ne',
	templateUrl: './detalhes-solicitacao-ne.component.html',
	styleUrls: ['./detalhes-solicitacao-ne.component.scss']
})
export class DetalhesSolicitacaoNeComponent implements OnInit {
	@Input() solicitacao: any;
	@Input() etapas: any;

	constructor(
		private user: UserService,
		private dialogService: DialogProtocoloService
	) { }

	ngOnInit(): void {
		
	}

	openProtocolDialog(protocolo: string) {
		const options = {
			protocolo: protocolo,
			email: "user@email.com"
		};

		this.dialogService.open(options);

		this.dialogService.confirmed().subscribe(data => {

		});
	}
}
