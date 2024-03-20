import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassePrincipalDialogComponent } from './classe-principal-dialog.component';


describe(ClassePrincipalDialogComponent.name, () => {
	let component: ClassePrincipalDialogComponent;
	let fixture: ComponentFixture<ClassePrincipalDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClassePrincipalDialogComponent],
			imports: [MatDialogModule],
			providers: [
				{ provide: MAT_DIALOG_DATA, useValue: {} },
				{ provide: MatDialogRef, useValue: {} },
			]
		})
			.compileComponents();
		fixture = TestBed.createComponent(ClassePrincipalDialogComponent);
		component = fixture.componentInstance;
	});

	it(`Deve criar o componente quando iniciado o ciclo de vida do Angular com construtor vazio`, () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

});
