import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('access_token');

        if (token) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });
        } else {
            if (request.url.includes("/esqueci-senha") || request.url.includes("/novo")) {
                request = request.clone({
                    setHeaders: {
                        'Content-Type': 'application/json',
                    }
                });
            } else {
                request = request.clone({
                    setHeaders: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

            }
        }

        return next.handle(request);
    }

}
