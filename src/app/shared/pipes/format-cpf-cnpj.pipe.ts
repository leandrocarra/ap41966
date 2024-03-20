import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCpfCnpj'
})
export class FormatCpfCnpjPipe implements PipeTransform {

  transform(value: string): string | null {
    if (value == null || value == undefined) {
      return "";
    } 

    const documento = value.replace(/[^0-9]/g,'');

    if (documento.length === 11) {
      return documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (documento.length === 14) {
      return documento.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }

    return value;

  }

}
