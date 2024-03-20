import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccordionComponent } from './accordion.component';
import { SegundaViaService } from 'app/core/services/segunda-via/segunda-via.service';
import { RouterTestingModule } from '@angular/router/testing';
import { event } from 'jquery';

describe(AccordionComponent.name, () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  let mockFaturas = require("../../mock/responses/response-api-faturas.json");

  let mockClassList = {
    "0": "d-block",
    "1": "uppercase",
    "2": "bold",
    "3": "color-primary"
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        SegundaViaService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Deve instanciar ${AccordionComponent.name} quando chamado`, () => {
    expect(component).toBeTruthy();
  });

  // it(`Deve setar os checkbox da lista de faturas como false no método 
  // ${AccordionComponent.prototype.checkedAll.name}`, () => {
  //   component.itens = mockFaturas.faturas;
  //   component.checkedAll(true);
  //   fixture.detectChanges();
  //   expect(component.selectItem).toBeTrue();
  // });

  // it(`Deve chamar o ${AccordionComponent.prototype.expandPanel.name} e expandir o panel`, () => {
  //   const event = new Event('click');
  //   component.expandPanel({}, event);
  //   let eventSpy = spyOn(event, 'stopPropagation')
  //   expect(eventSpy).toHaveBeenCalled();
  // });


});
