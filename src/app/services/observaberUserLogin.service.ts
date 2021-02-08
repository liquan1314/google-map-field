import { Injectable } from '@angular/core';
//subject 主题 可以多播
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ObservaberUserLoginService {

  constructor() { }
  data:any;
  // subj = new Subject() ;//创建订阅发布模式
  // newListener = this.subj.asObservable(); //创建监听者
  getData(){
    return this.data
  }
  //发布模式
  emit(value:any){
    this.data =value;
    // return this.subj.next(value)
  }
}
