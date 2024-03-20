import { HttpErrorResponse } from "@angular/common/http";

export interface BusinessError {
  msg: string;
  type?: string;
  codigo?: string;
  link?: LinkRedirect;
}

export interface LinkRedirect {
  label: string;
  action: Function;
  class?: string;
}

export class HttpErrorResponseHandler {
  public errors: BusinessError[] = [];
  constructor(error: any) {
    if (error instanceof HttpErrorResponse && error.error) {
      let errors: any = null;
      if (typeof error.error === "string") {
        errors = JSON.parse(error.error);
      } else if (typeof error.error === "object") {
        errors = error.error;
      }
      if (errors.erros && errors.erros.length) {
        errors.erros.forEach(e => {
          this.errors.push({ msg: e.mensagem, codigo: e.codigoResposta });
        });
      } else {
        this.errors.push({
          msg: "The request could not be completed. Please, try again."
        });
      }
    }
  }
}
