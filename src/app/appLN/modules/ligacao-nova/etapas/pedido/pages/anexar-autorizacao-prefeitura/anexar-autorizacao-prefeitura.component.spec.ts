import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { NeoUtilsService } from '../../../../../../core/services/utils/neo-utils.service';
import { AnexarAutorizacaoPrefeituraComponent } from './anexar-autorizacao-prefeitura.component';


describe(AnexarAutorizacaoPrefeituraComponent.name, () => {
  let component: AnexarAutorizacaoPrefeituraComponent;
  let fixture: ComponentFixture<AnexarAutorizacaoPrefeituraComponent>;

  let arquivoAutorizacao: Anexo = new Anexo('.pdf', 'AUTORIZAÇÃO DA PREFEITURA', 322408, 'JVBERi0xLjMNCiXi48');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnexarAutorizacaoPrefeituraComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        UserServiceLN,
        NeoUtilsService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnexarAutorizacaoPrefeituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`#${AnexarAutorizacaoPrefeituraComponent.name}
  deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${AnexarAutorizacaoPrefeituraComponent.prototype.onResize.name}
  deve setar variável mobile como verdadeiro quando o resize da
   tela for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });


  it(`#${AnexarAutorizacaoPrefeituraComponent.prototype.recebeAnexos.name}
  deve receber arquivo e anexar quando não houver documento anexado`, () => {
    fixture.detectChanges();
    component.recebeAnexos(arquivoAutorizacao);
    expect(component.anexo.arquivos.length).toBe(1);
  });

  it(`#${AnexarAutorizacaoPrefeituraComponent.prototype.recebeAnexos.name}
  deve chamar #alertSuccess `, () => {
    let alertSpy = spyOn(component['_alert'], 'alertSuccess');
    fixture.detectChanges();
    component.recebeAnexos(arquivoAutorizacao);
    component.recebeAnexos(arquivoAutorizacao);
    expect(alertSpy).toHaveBeenCalledWith("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo");
  });

  it(`#${AnexarAutorizacaoPrefeituraComponent.prototype.continuar.name}
  deve redirecionar para selecao-perfil quando documento estiver anexado`, () => {
    let routerSpy = spyOn(component['_router'], 'navigate');
    fixture.detectChanges();
    component.recebeAnexos(arquivoAutorizacao);
    component.continuar();
    expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "pedido", 'selecao-perfil']);
  });

  it(`#${AnexarAutorizacaoPrefeituraComponent.prototype.remove.name}
  deve remover arquivo e anexar quando houver documento anexado`, () => {
    fixture.detectChanges();
    component.recebeAnexos(arquivoAutorizacao);
    component.remove();
    expect(component.anexo.arquivos.length).toBe(0);
  });

  it(`#${AnexarAutorizacaoPrefeituraComponent.prototype.voltar.name}
  deve voltar a página quando chamado`, () => {
    let locationSpy = spyOn(component['_location'], 'back');
    fixture.detectChanges();
    component.voltar();
    expect(locationSpy).toHaveBeenCalled();
  });


});
