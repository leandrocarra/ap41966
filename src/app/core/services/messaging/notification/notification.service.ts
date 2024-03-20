import { Injectable, Injector } from "@angular/core";
import { Observable, Subject, ReplaySubject, Subscription } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class NotificationService {
	listeners: Listener[] = new Array<Listener>();

	static start$: ReplaySubject<any> = new ReplaySubject(1);

	constructor(public injector: Injector) { }

	start() {
		NotificationService.start$.next(this.injector);
	}

	registerNotification<T>(notification: string): Observable<T> | undefined {
		if (notification) {
			const listener: Listener[] = this.listeners.filter(item => {
				return item.notification === notification;
			});
			if (listener && listener.length !== 0) {
				listener[0].observerCount += 1;
				return listener[0].observable;
			} else {
				const sub: Subject<T> = new Subject();
				const newListner: Listener = <Listener>{
					notification: notification,
					subject: sub,
					observable: sub.asObservable(),
					observerCount: 1
				};
				console.log('Notification Register', notification);
				this.listeners.push(newListner);
				return newListner.observable;
			}
		}
	}

	deregisterNotification(notification: string) {
		if (notification) {
			const listener: Listener[] = this.listeners.filter(item => {
				return item.notification === notification;
			});
			if (listener && listener.length !== 0) {
				listener[0].observerCount -= 1;

				if (listener[0].observerCount === 0) {
					this.listeners.forEach((data, _index, _arr) => {
						if (data.notification === notification) {
							// data.observable.
							data.subject.unsubscribe();
							// arr.s
						}
					});
				}
			}
		}
	}

	sendNotification(notification: Notification) {
		console.log("sendNotification", notification);

		const listener: Listener[] = this.listeners.filter(item => {
			return item.notification === notification.name;
		});
		console.log(listener);
		if (listener && listener.length !== 0) {
			console.log('Send Notification', notification);
			listener[0].subject.next(notification.body);
		}
	}
}

export function listen(notification: Array<string>): any {
	return function (
		target: any,
		propertyKey: string,
	) {
		NotificationService.start$.subscribe((injector: Injector) => {
			let notificationService: NotificationService = injector.get(
				NotificationService
			);

			let instance = injector.get(target.constructor, null);

			if (!instance) {
				let ngOnInit: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(
					target,
					"ngOnInit"
				);
				let ngOnDestroy: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(
					target,
					"ngOnDestroy"
				);

				let subs: { sub: Subscription; notification: string }[] = [];
				//auto subscribing
				Object.defineProperty(target, "ngOnInit", {
					value: function (...args: any) {
						let ctx = this;

						notification.forEach(element => {
							console.info(
								`@listen(${element}) ${ctx.constructor.name}.${propertyKey}`
							);
							subs.push({
								sub: notificationService.registerNotification(element)?.subscribe((data: any) => {
										ctx[propertyKey](data);
									})!,
								notification: element
							});
						});

						if (ngOnInit) {
							ngOnInit.value.apply(this, ...args);
						}
					}
				});
				//auto unsubscribing
				Object.defineProperty(target, "ngOnDestroy", {
					value: function (...args: any) {
						subs.forEach(element => {
							element.sub.unsubscribe();
							console.info(
								`@unlisten(${element.notification}) ${this.constructor.name
								}.${propertyKey}`
							);
						});
						subs = [];
						if (ngOnDestroy) {
							ngOnDestroy.value.apply(this, ...args);
						}
					}
				});
			} else {
				notification.forEach(element => {
					console.info(
						`@listen(${element}) ${instance.constructor.name}.${propertyKey}`
					);
					notificationService.registerNotification(element)?.subscribe(data => {
						instance[propertyKey](data);
					});
				});
			}
		});
	};
}

export class Notification {
	constructor(public name: string, public body?: any) { }
}

export interface Listener {
	notification: string;
	subject: Subject<any>;
	observable: Observable<any>;
	observerCount: number;
}
