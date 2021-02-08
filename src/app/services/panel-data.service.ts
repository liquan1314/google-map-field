import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanelDataService {
  data;
  constructor() { }
  emitData(value){
    this.data = value

  }
  getData(){
    return this.data
  }
}
