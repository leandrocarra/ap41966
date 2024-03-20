import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DadosDaLigacaoService } from '../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { SweetAlertResult } from 'sweetalert2';
import { ComboComponent } from './combo.component';


describe(ComboComponent.name, () => {
  let component: ComboComponent;
  let fixture: ComponentFixture<ComboComponent>;
  let router: Router;
  let location: Location;
  let dadosDaLigacaoService: jasmine.SpyObj<DadosDaLigacaoService>;

  let comboZero = {
    combo: "0",
    nome: 'RESIDENCIAL I',
    categoria: 'MONOFÁSICA',
    potencia: 10000,
    equipamentos: [
      {
        "codigoAparelho": "1",
        "codigoSubTipoAparelho": "39",
        "codigoTipoAparelho": "1",
        "descricaoSubTipoAparelho": "CARGA PADRÃO MONOFÁSICA",
        "quantidadeAparelho": "1"
      }
    ]
  }

  let comboUm = {
    combo: "1",
    nome: 'RESIDENCIAL II',
    categoria: 'BIFÁSICA',
    potencia: 18000,
    equipamentos: [
      {
        "codigoAparelho": "1",
        "codigoSubTipoAparelho": "40",
        "codigoTipoAparelho": "1",
        "descricaoSubTipoAparelho": "CARGA PADRÃO BIFASICA",
        "quantidadeAparelho": "1"
      }
    ]
  }


  let dadosDaLigacaoMockado = require('src/app/appLN/shared/mock/preenchimentos/dados-da-ligacao.json');



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComboComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    dadosDaLigacaoService = TestBed.inject(DadosDaLigacaoService) as jasmine.SpyObj<DadosDaLigacaoService>;
  });

  it('should create', () => {
    dadosDaLigacaoService.dadosDaLigacao.dimensionamentoDeRede.possui220 = 'SIM';
    dadosDaLigacaoService.dadosDaLigacao.combo = comboZero;
    fixture = TestBed.createComponent(ComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${ComboComponent.prototype.setCombo.name}
  deve receber index 0 e setar combo quando chamado`, () => {
    fixture = TestBed.createComponent(ComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.setCombo(0);
    expect(component.combo).toEqual(comboZero);
  });

  it(`#${ComboComponent.prototype.setCombo.name}
  deve receber index 0 e setar combo em branco quando chamado`, () => {
    fixture = TestBed.createComponent(ComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.combo = comboZero;
    component.setCombo(0);
    expect(component.combo).toEqual('');
  });

  it(`#${ComboComponent.prototype.setCombo.name}
  deve receber index 1 e trocar de combo quando chamado`, () => {
    fixture = TestBed.createComponent(ComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.combo = comboZero;
    component.setCombo(1);
    expect(component.combo).toEqual(comboUm);
  });

  it(`#${ComboComponent.prototype.voltar.name}
  deve voltar pagina quando chamado`, () => {
    fixture = TestBed.createComponent(ComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`#${ComboComponent.prototype.calculadora.name}
  deve redirecionar para calculadora quando chamado`, () => {
    fixture = TestBed.createComponent(ComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const routerSpy = spyOn(router, 'navigate');
    component.calculadora();
    expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "calculadora"]);
  });

  it(`#${ComboComponent.prototype.disable.name}
  deve retornar false quando tiver combo atribuido`, () => {
    fixture = TestBed.createComponent(ComboComponent);
    component = fixture.componentInstance;
    component['_etapaService'].dadosDaLigacao = dadosDaLigacaoMockado;
    fixture.detectChanges();
    component.setCombo(0);


    expect(component.disable()).toBeFalse();
  });


  it(`#${ComboComponent.prototype.continuar.name} deve aceitar alertCombo e redirecionar para distancia-imovel`, (done) => {
    fixture = TestBed.createComponent(ComboComponent);
    component = fixture.componentInstance;

    spyOn(component['_alert'], 'alertCombo').and.returnValue(Promise.resolve<SweetAlertResult>({
      "value": true
    }));

    let routerSpy = spyOn(router, 'navigate');
    component.combo = comboZero;
    fixture.detectChanges();
    component.continuar();

    setTimeout(() => {
      expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);
      done();
    });

  });

});
