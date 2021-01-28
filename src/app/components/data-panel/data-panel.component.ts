
import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GapiService} from "../../services/gapi.service";
import {JsonService} from '../../services/json.service';

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
              private gapiService:GapiService,
              private jsonService: JsonService) {
  }

  ngOnInit(): void {
    this.getValue()
    this.getServiceData()
  }

  ngAfterViewInit() {
    this.initMap()
  }

 //得到服务中的地图数据
  getServiceData() {
    this.jsonService.getData().subscribe(data => {
      this.paintMap(data)
    })
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
  //给地图绘制图形
  paintMap(json) {
    json.forEach(item => {
      //得到是polygon和multiplePolygon的数组点
      let arr = item.data[0].payload['geo_data']['geometry'][0]['polygon'][0]['loop']
      let type = item.properties['crop_type'][0]['value'];
      //进行判断是是polygon和multiplePolygon
      if (arr.length !== 1) {
        //这里是multiplePolygon
        this.paintMultiPlePolygon(arr, type)
      } else {
        /*单个polygon*/
        this.paintPolygon(arr, type)
      }
    })
  }

  //绘制multiplePolygon
  paintMultiPlePolygon(data, type) {
    let arr = []
    let color = ''
    //对颜色的选择
    color = this.selsectColor(color, type)

    //重写绘制多边形的数据
    for (let i = 0; i < data.length; i++) {
      let arr1 = data[i].point;
      arr1 = arr1.map(item => {
        let obj = {lat: 0, lng: 0};
        obj.lat = item.latitude;
        obj.lng = item.longitude;
        return obj
      })
      arr.push(arr1)
    }

    //绘制多边形
    let multilyPolygon = new google.maps.Polygon({
      paths: arr,
      fillColor: color,
    })

    multilyPolygon.setMap(this.googleMap)
  }


  //绘制简单的polygon
  paintPolygon(data, type) {
    let arr = data[0].point;
    let color = ''
    //对颜色选择
    color = this.selsectColor(color, type)
    //重新映射数组
    arr = arr.map(item => {
      let obj = {lat: 0, lng: 0};
      obj.lat = item.latitude;
      obj.lng = item.longitude;
      return obj
    })
    let polygon = new google.maps.Polygon({
      paths: arr,
      fillColor: color,
    })
    polygon.setMap(this.googleMap)
  }


  //选择颜色的函数
  selsectColor(color, type) {
    //转换字符串的格式
    type = this.transformString(type[0])

    //从服务拿到颜色数组的数据
    let colors = this.jsonService.getColor();

    //遍历整个颜色的数据然后拿到合适的颜色，然后填充颜色
    colors.filter(item => {
      if (type == item.type) {
        color = item.color;
        return true
      }
    })
    return color
  }


  /*转换字符串的格式*/
  transformString(str: any) {
    str = str.toLowerCase(); //全部转换为小写
    let arr = str.split('_');
    arr = arr.map(item => {
      item = item.substring(0, 1).toUpperCase() + item.substr(1, item.length - 1);
      return item
    })
    str = arr.join(' ');
    return str;
  }
}
