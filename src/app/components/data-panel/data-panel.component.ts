import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GapiService} from "../../services/gapi.service";

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.scss']
})
export class DataPanelComponent implements OnInit {
  @ViewChild(('map')) map;
  googleMap: any; //地图
  marker: any; //坐标
  loginName:any; //登录的名字
  loginEmail:any; //登录的Email
  flag: boolean = true;  //这是布尔表达式，确定图标的旋转开关
  constructor(private route: ActivatedRoute,
              private gapiService:GapiService) {
  }

  ngOnInit(): void {
    this.getValue()
  }

  ngAfterViewInit() {
    this.initMap()
  }

  //初始化地图的函数
  initMap() {
    //实例化地图对象
    this.googleMap = new google.maps.Map(this.map.nativeElement, {
      center: {lat: 40.5058, lng: -98.4456},
      zoom: 12,
      disableDefaultUI: true,
    })
  }
  //点击图标事件
  onTransForm(e){
    if(this.flag == true){
      this.flag = false;
    }else{
      this.flag = true;
    }
  }
  getValue(){
    this.route.queryParamMap.subscribe(data=>{
      this.loginName = data.get('name');
      this.loginEmail = data.get('Email')
    })
  }
  signOut(){
    this.gapiService.initAuth2()
  }

}
