import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { OnlyNumberDirective } from "./only-number-directive";

@Component({
    template: `<input type="text" onlyNumber>`
})
class TestOnlyNumbersComponent {
}

describe(OnlyNumberDirective.name, () => {

    it(`#${OnlyNumberDirective.name} deve validar se a diretiva foi criada`, () => {
        const directive = new OnlyNumberDirective(null);
        expect(directive).toBeTruthy();
    });

    // let component: TestOnlyNumbersComponent;
    // let fixture: ComponentFixture<TestOnlyNumbersComponent>;
    // let inputEl: DebugElement;

    // beforeEach(() => {
    //     TestBed.configureTestingModule({
    //         declarations: [OnlyNumberDirective, TestOnlyNumbersComponent],
    //         schemas: [CUSTOM_ELEMENTS_SCHEMA]
    //     });
    //     fixture = TestBed.createComponent(OnlyNumberDirective);
    //     component = fixture.componentInstance;
    //     inputEl = fixture.debugElement.query(By.css('input'));
    // });

    // it(`Deve exibir somente numeros quando chamado`, () => {
    //     inputEl
    //     expect(inputEl).toBe('1234')
    // })

})