import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GapiService} from "../../services/gapi.service";
import {JsonService} from '../../services/json.service';
import {ObservabService} from "../../services/observab.service";

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.scss']
})
export class DataPanelComponent implements OnInit {
  @ViewChild(('map')) map;
  @ViewChild(('infowindow')) infowindow;
  googleMap: any; //地图
  marker: any; //坐标
  loginName: any; //登录的名字
  loginEmail: any; //登录的Email
  flag: boolean = true;  //这是布尔表达式，确定图标的旋转开关
  imgUrl: any; //路径的位置
  showHidden: boolean = false; //资料卡片显示或隐藏
  infoWindow: any;

  constructor(private route: ActivatedRoute,
              private gapiService: GapiService,
              private jsonService: JsonService,
              private observa: ObservabService,
              private zone: NgZone) {
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

  //生成infoWindow
  initInfoWindow(value) {
    let content = `
       <div #infoWindow style="font-size: 20px">id:${value}<div>
    `
    this.infoWindow = new google.maps.InfoWindow({
      content: content
    })
  }

  //点击图标事件
  onTransForm(e) {
    if (this.flag == true) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }

  getValue() {
    let data = this.observa.getData();
    this.loginEmail = data.personname;
    this.loginName = data.Email;
    this.imgUrl = data.url;
  }

  //得到子组件的数据
  getChild(e) {
    this.showHidden = e;
  }

  //登出功能
  signOut() {
    this.gapiService.initAuth2()
  }

  //给地图绘制图形
  paintMap(json) {
    json.forEach(item => {
      //得到是polygon和multiplePolygon的数组点
      let arr = item.data[0].payload['geo_data']['geometry'][0]['polygon'][0]['loop']
      let type = item.properties['crop_type'][0]['value'];
      let time = item.data[0]['time_range']['start']['seconds']
      // console.log(item.data[0]['time_range'])
      //进行判断是是polygon和multiplePolygon
      if (arr.length !== 1) {
        //这里是multiplePolygon
        this.paintMultiPlePolygon(arr, type, time)
      } else {
        /*单个polygon*/
        this.paintPolygon(arr, type, time)
      }
    })
  }

  //绘制multiplePolygon
  paintMultiPlePolygon(data, type, time) {
    time = this.transformTime(time)
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
      strokeWeight: 0
    })
    multilyPolygon.addListener('mouseover', (e) => {
            if(!this.infoWindow){
              //判断infowindow是否存在，不在就添加，在的话先取消当前的infowindow在添加
              this.initInfoWindow(time)
              this.infoWindow.setPosition(e.latLng)
              this.infoWindow.open(this.googleMap)
            }
    })
    //当离开当前的polygon的时候
    multilyPolygon.addListener('mouseout',(e)=>{
          this.infoWindow.close()
    })
    multilyPolygon.setMap(this.googleMap)
  }


  //绘制简单的polygon
  paintPolygon(data, type, time) {
    time = this.transformTime(time); //得到时间
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
      strokeWeight: 0
    })
    polygon.setMap(this.googleMap)
    polygon.addListener('mouseover', (e) => {
      //判断infowindow是否存在，不在就添加，在的话先取消当前的infowindow在添加
      this.initInfoWindow(time)
      this.infoWindow.setPosition(e.latLng)
      this.infoWindow.open(this.googleMap)
    })
    polygon.addListener('mouseout',(e)=>{
        this.infoWindow.close()
    })

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

  //转换时间的格式的函数,得到时间戳
  transformTime(time) {
    time = parseInt(time) * 1000
    //如果使用js自带的内置对象Date转换时间戳的时候，是毫秒数，不是秒数
    let data = new Date(time)
    let year = data.getFullYear()
    return year
  }
}
