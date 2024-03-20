import { TestBed } from '@angular/core/testing';
import { LigacaoNovaSEGuard } from './ligacao-nova-se.guard';

describe('LigacaoNovaSEGuard', () => {
    let guard: LigacaoNovaSEGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(LigacaoNovaSEGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
