import { Component } from '@angular/core';
import { LoadingService } from './core/services/customsweetalert/loading.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute, RouterState } from '@angular/router';
import {filter} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';

declare var gtag: Function;
interface StateProps extends RouterState {
    firstChild? : any
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    loadingDataImg: boolean = false;

    constructor(
        private router: Router,
        public loading: LoadingService,
        private activatedRoute: ActivatedRoute,
        private titleService: Title
    ) {
        this.activatedRoute = this.activatedRoute;
        this.titleService = this.titleService;

        if (environment.name === "COSERN") {
            this.router.events.pipe( filter(event => event instanceof NavigationEnd) ).subscribe((event: any) => {
                gtag('event', 'page_view', {
                    page_path: event.urlAfterRedirects
                });
            });

            // router.events.subscribe(event => {
            //     if(event instanceof NavigationEnd) {
            //         var title = this.getTitle(router.routerState, router.routerState.root).join(' > ');
            //         titleService.setTitle(title);
            //     }
            // });
        }
    }


    getTitle(state: StateProps, parent: ActivatedRoute ): any {
        var data = [];
        if(parent && parent.snapshot.data && parent.snapshot.data.title) {
            data.push(parent.snapshot.data.title);
        }

        if(state && parent) {
            data.push(... this.getTitle(state, state.firstChild(parent)));
        }
        return data;
    }


    navigationInterceptor(event: any): void {
        if (event instanceof NavigationStart) {
            this.loadingDataImg = true;
        }
        if (event instanceof NavigationEnd) {
            this.loadingDataImg = false;
        }
        if (event instanceof NavigationCancel) {
            this.loadingDataImg = false;
        }
        if (event instanceof NavigationError) {
            this.loadingDataImg = false;
        }
    }

  title = 'Agência Virtual';
}
