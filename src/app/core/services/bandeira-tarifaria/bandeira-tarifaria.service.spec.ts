import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BandeiraTarifariaService } from './bandeira-tarifaria.service';

describe(BandeiraTarifariaService.name, () => {
    let service: BandeiraTarifariaService;
    let httpMock: HttpTestingController;

    let mockValToken = {
        "codigo": '1234',
        "senha": "Desenvolvimento10"
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [BandeiraTarifariaService],
        imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule]
        });
        service = TestBed.inject(BandeiraTarifariaService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it(`#${BandeiraTarifariaService.name}
    Deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
        expect(service).toBeTruthy();
    });
});
