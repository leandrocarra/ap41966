// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { Component, DebugElement } from "@angular/core";
// import { UpperCaseDirective } from './upper-case-directive';

import { FormGroup } from "@angular/forms";
import { UpperCaseDirective } from "./upper-case-directive";



// @Component({
//     template: `<input type="text"[$event]>`
// })
// class UpperCaseDirectiveComponent {
// }


describe(UpperCaseDirective.name, () => {

    it(`#${UpperCaseDirective.name} deve validar se a diretiva foi criada`, () => {
        const directive = new UpperCaseDirective(null);
        expect(directive).toBeTruthy();
    });

//     let component: UpperCaseDirective;
//     let fixture: ComponentFixture<UpperCaseDirective>;
    

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             declarations: [UpperCaseDirectiveComponent]
//         });
//         fixture = TestBed.createComponent(UpperCaseDirective);
//         component = fixture.componentInstance;
        
//     });

//     it('hovering over input', () => {
//         inputEl.triggerEventHandler('mouseover', null);
//         fixture.detectChanges();
//         expect(inputEl.nativeElement.value.keyup).toBe('true');

//         inputEl.triggerEventHandler('mouseout', null);
//         fixture.detectChanges();
//         expect(inputEl.nativeElement.style.backgroundColor).toBe('inherit');
//     });
})
