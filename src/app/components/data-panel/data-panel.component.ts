import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.scss']
})
export class DataPanelComponent implements OnInit {
  @ViewChild(('map')) map;
  googleMap: any; //地图
  marker: any; //坐标
  flag: boolean = true;  //这是布尔表达式，确定图标的旋转开关
  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initMap()
  }

  //初始化地图的函数
  initMap() {
    //实例化地图对象
    this.googleMap = new google.maps.Map(this.map.nativeElement, {
      center: {lat: 40.5058, lng: -98.4456},
      zoom: 12
    })
    this.marker = new google.maps.Marker({
      position: {lat: 40.5058, lng: -98.4456},
      title: 'center Marker'
    })
    this.marker.setMap(this.googleMap)
  }
  //点击图标事件
  onTransForm(e){
    if(this.flag == true){
      e.target.children[0].style.transform= 'rotate(270deg)';
      e.target.parentNode.style.transform = 'translateX(0)'
      this.flag = false;
    }else{
      e.target.children[0].style.transform = 'rotate(90deg)'
      e.target.parentNode.style.transform = 'translateX(-100%)'
      this.flag = true;
    }

  }

}
