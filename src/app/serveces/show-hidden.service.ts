import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShowHiddenService {
  sub = new Subject();
  listen = this.sub.asObservable()
  constructor() { }
  emit(value){
    return this.sub.next(value)
  }
}
