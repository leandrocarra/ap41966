import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationService } from "../messaging/notification/notification.service";
import { TokenService } from "../token/token.service";

@Injectable({
  providedIn: "root",
})

export class ListenersService {
  constructor(
    private http: HttpClient,
    private token: TokenService,
    private notification: NotificationService
  ) { }


}