import { CpfCnpjMaskDirective } from './cpf-cnpj-mask-directive';

describe(CpfCnpjMaskDirective.name, () => {

    it(`#${CpfCnpjMaskDirective.name} deve validar se a diretiva foi criada`, () => {
        const directive = new CpfCnpjMaskDirective(null, null, null);
        expect(directive).toBeTruthy();
    });
    
    // let component: CpfCnpjMaskDirective;
    // let fixture: ComponentFixture<CpfCnpjMaskDirective>;
    // let inputEl: DebugElement;

    // beforeEach(() => {
    //     TestBed.configureTestingModule({
    //         declarations: [CpfCnpjMaskDirective]
    //     });
    //     fixture = TestBed.createComponent(CpfCnpjMaskDirective);
    //     component = fixture.componentInstance;
    //     inputEl = fixture.debugElement.query(By.css('input'));
    // });

    // it('should validation cpf', () => {
    //     fixture.detectChanges();
    //     inputEl.triggerEventHandler('keyup', '12312312312')
    // inputEl.nativeElement.value = '12312312312';
    // inputEl.nativeElement.dispatchEvent(new Event('input'));
    //     expect(inputEl.nativeElement.value).toBe('123.123.123-12');
    // });

});
