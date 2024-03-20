// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { CustomSweetAlertService } from '@services/custom-sweet-alert.service';
// import { finalize } from 'rxjs/operators';
// import { messageOf } from '@services/messaging/messaging.service';
// import { Loading_Message } from '@services/messaging/notification/loading-interceptor.notification';

// @Injectable()
// export class LoadingInterceptor implements HttpInterceptor {

//     msg: string;

//     constructor(
//         private alert: CustomSweetAlertService
//     ) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//         this.alert.showLoadingText(this.msg);
//         return next.handle(request).pipe(
//             finalize(() => { this.alert.closeLoading(); this.msg = null; })
//         );

//     }
    
//     @listen(Loading_Message)
//     onLoadingMessage(r: any) {
//         this.msg = r.msg;
//     }

// }

