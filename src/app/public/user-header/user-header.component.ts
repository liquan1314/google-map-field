import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  constructor() { }
  @Input() imgUrl;
  @Output() showHidden = new EventEmitter<any> ();
  bool:boolean=true;
  ngOnInit(): void {
  }
  //子组件向父组件传值
  onEmit(){
    this.showHidden.emit(this.bool)
    this.bool = !this.bool
  }

}
