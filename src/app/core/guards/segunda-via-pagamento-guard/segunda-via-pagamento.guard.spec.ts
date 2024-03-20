import { TestBed } from '@angular/core/testing';
import { SegundaViaPagamentoGuard } from './segunda-via-pagamento.guard';

describe('CadastroGuardGuard', () => {
    let guard: SegundaViaPagamentoGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(SegundaViaPagamentoGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
