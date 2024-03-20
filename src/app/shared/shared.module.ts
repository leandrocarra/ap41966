import { NgModule } from "@angular/core";
import { BlockPasteDirective } from "./directives/block-paste-directive";
import { OnlyNumberDirective } from "./directives/only-number-directive";
import { SpecialCharactersDirective } from "./directives/special-caracteres";
import { UpperCaseDirective } from "./directives/upper-case-directive";
import { WithoutNumberDirective } from "./directives/without-number-directive";
import { FormatCelularPipe } from './pipes/format-celular.pipe';
import { FormatCpfCnpjPipe } from "./pipes/format-cpf-cnpj.pipe";
import { FormatTelefonePipe } from "./pipes/format-telefone.pipe";



@NgModule({
    declarations: [
        OnlyNumberDirective,
        FormatCpfCnpjPipe,
        FormatTelefonePipe,
        FormatCelularPipe,
        BlockPasteDirective,
        WithoutNumberDirective,
        SpecialCharactersDirective,
        UpperCaseDirective
        

    ],
    exports: [
        OnlyNumberDirective,
        FormatCpfCnpjPipe,
        FormatTelefonePipe,
        FormatCelularPipe,
        BlockPasteDirective,
        WithoutNumberDirective,
        SpecialCharactersDirective,
        UpperCaseDirective 
    ],

})

export class SharedModule { }