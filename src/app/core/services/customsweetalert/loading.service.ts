import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loaders: boolean[] = [];
  private text!: string;
  
  constructor() {}

  start(): void {
    this.loaders.push(true);
    if (this.loaders.length === 1) {
      this.text = 'Aguarde um instante...';
    }
  }

  stop() {
    this.loaders.pop();
  }

  get loading() {
    return this.loaders.length > 0;
  }

  get textLabel() {
    return this.text;
  }
}