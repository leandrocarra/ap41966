import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTelefone'
})
export class FormatTelefonePipe implements PipeTransform {

  transform(value: string): string {
    if (value == null || value == undefined) {
      return null;
    }

    const telefone = value.replace(/[^0-9]/g, '');

    if (telefone.length >= 7 && telefone.length <= 10) {
      return telefone.replace(/(\d{2})?(\d{4})?(\d{0,4})/, '($1) $2-$3');
    } else if (telefone.length > 1 && telefone.length <= 6) {
      return telefone.replace(/^(\d{2})?(\d{0,5})/, '($1) $2');
    }
    return value;
  }
}
