import {AfterViewInit, Component, DoCheck, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GapiService} from "../../services/gapi.service";
import {JsonService} from '../../services/json.service';
import {ObservabService} from "../../services/observab.service";
import {HttpService} from '../../services/http.service';
@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.scss']
})
export class DataPanelComponent implements OnInit,AfterViewInit,OnDestroy,DoCheck{
  @ViewChild(('map')) map;
  @ViewChild(('infowindow')) infowindow;
  googleMap: any; //地图
  marker: any; //坐标
  loginName: any; //登录的名字
  loginEmail: any; //登录的Email
  iconFlag: boolean = true;  //这是布尔表达式，确定图标的旋转开关
  imgUrl: any; //路径的位置
  showHidden: boolean = false; //资料卡片显示或隐藏
  infoWindow: any;
  US:any;
  NE:any;
  OE:any;
  filed:any;
  multilyPolygon:any;
  polygon: any;
  wetherData:any;
  constructor(private route: ActivatedRoute,
              private gapiService: GapiService,
              private jsonService: JsonService,
              private observa: ObservabService,
              private zone: NgZone,
              private http:HttpService) {
  }

  ngOnInit(): void {
    this.getValue()
    this.getServiceData()
    this.getWeahterData()
  }
  ngDoCheck() {
  }

  ngAfterViewInit() {
    this.initMap()
  }
  ngOnDestroy() {
    //清除资源
    google.maps.event.clearInstanceListeners(this.googleMap)
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
      this.iconFlag = !this.iconFlag;
  }

  getValue() {
    const data = this.observa.getData();
    this.loginEmail = data.personname;
    this.loginName = data.Email;
    this.imgUrl = data.url;
  }
  //得到天气的数据
  getWeather(lat,lng){
     this.http.getWeatherData(lat,lng)
  }
  getWeahterData(){
    this.http.listen.subscribe(data=>{
      this.wetherData = data['main'];
    })
  }
  //得到子组件的数据
  getChild(b) {
    this.showHidden = b;
  }

  //登出功能
  signOut() {
    this.gapiService.signOut()
  }

  //给地图绘制图形
  paintMap(json) {
    json.forEach(item => {
      //得到是polygon和multiplePolygon的数组点
      const arr = item.data[0].payload['geo_data']['geometry'][0]['polygon'][0]['loop']
      const type = item.properties['crop_type'][0]['value'];
      const time = item.data[0]['time_range']['start']['seconds']
      const dataLevel = item.data[0]['administration_level']
      // console.log(item.data[0]['time_range'])
      //进行判断是是polygon和multiplePolygon
      if (arr.length !== 1) {
        //这里是multiplePolygon
        this.paintMultiPlePolygon(arr, type, time,dataLevel)
      } else {
        /*单个polygon*/
        this.paintPolygon(arr, type, time,dataLevel)
      }
    })
  }

  //绘制multiplePolygon
  paintMultiPlePolygon(data, type, time,dataLevel) {
    time = this.transformTime(time)
    dataLevel = this.getDataLevel(dataLevel)
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
    multilyPolygon.setMap(this.googleMap)
    multilyPolygon.addListener('mouseover', (e) => {
            if(!this.infoWindow){
              this.infoWindowSet(time,e)
            }
    })
    //当离开当前的polygon的时候
    multilyPolygon.addListener('mouseout',(e)=>{
          this.infoWindow.close()
    })
    //点击事件
    multilyPolygon.addListener('click',(e)=>{
      this.paintValue(dataLevel)
      this.getWeather(e.latLng.lat(),e.latLng.lng())
      multilyPolygon.setOptions({
        strokeOpacity:0.2,
        fillOpacity:1
      })
    })
  }


  //绘制简单的polygon
  paintPolygon(data, type, time,dataLevel) {
    dataLevel = this.getDataLevel(dataLevel)
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
        this.infoWindowSet(time,e)
    })
    polygon.addListener('mouseout',(e)=>{
      this.infoWindow.close()
    })
    polygon.addListener('click',(e)=>{
      this.paintValue(dataLevel)
      this.getWeather(e.latLng.lat(),e.latLng.lng())
      polygon.setOptions({
        strokeOpacity:0.2,
        fillOpacity:1
      })
    })
  }

  infoWindowSet(time,e){
    //判断infowindow是否存在，不在就添加，在的话先取消当前的infowindow在添加
    this.initInfoWindow(time)
    this.infoWindow.setPosition(e.latLng)
    this.infoWindow.open(this.googleMap)
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

  //得到data——level中的数值，将它分割开来
  getDataLevel(datalevel) {
    const arrDataLevel = datalevel.split('/')
    return arrDataLevel;
  }
  //给导航栏上添加数据
  paintValue(dataLevel){
    this.US = dataLevel[0];
    this.NE = dataLevel[1]
    this.OE = dataLevel[2]
    this.filed = dataLevel[3]
  }

}
