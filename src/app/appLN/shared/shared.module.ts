import { NgModule } from '@angular/core';
import { FocusDirective } from './directives/focus-directive';
import { WithoutNumberDirective } from './directives/without-number-directive';
import { SpecialCharactersDirective } from './directives/special-characters-directive';
import { UpperCaseDirective } from './directives/upper-case-directive';
import { OnlyNumberDirective } from './directives/only-number-directive';
import { CpfCnpjMaskDirective } from './directives/cpf-cnpj-mask-directive';
import { MatVerticalStepperScrollerDirective } from './directives/stepper-scroll-directive';

@NgModule({
    declarations: [
        FocusDirective,
        WithoutNumberDirective,
        FocusDirective,
        SpecialCharactersDirective,
        UpperCaseDirective,
        OnlyNumberDirective,
        CpfCnpjMaskDirective,
        MatVerticalStepperScrollerDirective
    ],
    imports: [ ],
    exports: [
        FocusDirective,
        WithoutNumberDirective,
        FocusDirective,
        SpecialCharactersDirective,
        UpperCaseDirective,
        OnlyNumberDirective,
        CpfCnpjMaskDirective,
        MatVerticalStepperScrollerDirective
    ]
})
export class NeoSharedModule { }
