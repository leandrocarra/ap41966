import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCelular'
})
export class FormatCelularPipe implements PipeTransform {

  transform(value: string): string {
    if (value == null || value == undefined) {
      return null;
    }

    const celular = value.replace(/\D/g, '');

    if (celular.length > 10) {
      return celular.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3');
    } else if (celular.length > 9) {
      return celular.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3');
    } else if (celular.length > 5) {
      return celular.replace(/^(\d{2})?(\d{4})?(\d{0,4})/, '($1) $2-$3');
    } else if (celular.length > 1) {
      return celular.replace(/^(\d{2})?(\d{0,5})/, '($1) $2');
    } else {
      if (value !== '') { 
        return celular.replace(/^(\d*)/, '($1'); 
      }
    }
    return celular;

  }

}
