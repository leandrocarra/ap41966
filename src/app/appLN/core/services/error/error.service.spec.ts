import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from './error.service';


describe(ErrorService.name, () => {
    let service: ErrorService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ErrorService],
            imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
        });
        service = TestBed.inject(ErrorService);
        router = TestBed.inject(Router);
    });

    it(`Deve criar instancia de ${ErrorService.name} quando chamado`, () => {
        expect(service).toBeTruthy();
    });

    it(`Deve fazer logout quando chamar o #${ErrorService.prototype.logout.name}`, () => {
        let spy = spyOn(router, 'navigate');
        service.logout();
        expect(spy).toHaveBeenCalledWith(['/']);
    });
});
