import {AfterViewInit, Component, DoCheck, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GapiService} from "../../services/gapi.service";
import {MockJsonService} from '../../services/mockJson.service';
import {ObservaberUserLoginService} from "../../services/observaberUserLogin.service";
import {HttpService} from '../../services/http.service';
import {ShowHiddenService} from '../../serveces/show-hidden.service';
import {PanelDataService} from '../../services/panel-data.service';

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.scss']
})
export class DataPanelComponent implements OnInit, AfterViewInit, OnDestroy, DoCheck {
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
  US: any;
  NE: any;
  OE: any;
  filed: any;
  multilyPolygon: any;
  polygon: any;
  wetherData: any;
  mulityPolygonArr: any[] = [];
  polygonArr: any[] = [];
  filterData: any;
  distanceObjArr: any[] = [];//这是多边形的属性数组
  panelArr: any[] = [];
  constructor(private route: ActivatedRoute,
              private gapiService: GapiService,
              private jsonService: MockJsonService,
              private observa: ObservaberUserLoginService,
              private zone: NgZone,
              private http: HttpService,
              private showHiddenService: ShowHiddenService,
              private panelDataService: PanelDataService) {
  }

  ngOnInit(): void {
    this.getValue()
    this.getServiceData()
    this.getWeahterData()
    this.getFilterData()
  }

  ngDoCheck() {

  }

  ngAfterViewInit() {
    this.initMap()
    // this.removeColor()
  }

  ngOnDestroy() {
    //清除资源
    this.polygonArr.forEach(item => {
      google.maps.event.clearInstanceListeners(item)
    })
    this.mulityPolygonArr.forEach(item => {
      google.maps.event.clearInstanceListeners(item)
    })
  }

  //得到属性每个值的区间
  getSection() {
    let arr = [];
    for (let i = 0; i < this.distanceObjArr.length; i++) {
      let item = this.distanceObjArr[i].data;
      //求最大值和最小值的区间
      arr.push(item)
    }
    //求到我们需要求的key值
    let arr1 = []
    for (let i = 0; i < arr[0].length; i++) {
      let key = Object.keys(arr[0][i])
      arr1.push(key[0])
    }
    //求到每个值的最小和最大区间，并分别给他们命名
    let arr2 = []; //这是得到distance_to_water_in_meters值的数组
    let arr3 = []; //这是得到distance_to_town_in_meters的值的数组
    let arr4 = []; //这是得到distance_to_road_in_meters的值的数组
    arr1.forEach(item => {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          let key = Object.keys(arr[i][j])
          let value = Object.values(arr[i][j])
          if (key[0] === 'distance_to_water_in_meters') {
            // @ts-ignore
            if (!isNaN(value[0])) {
              arr2.push(value[0])
            }
          }
          if (key[0] === 'distance_to_town_in_meters') {
            //因为我已经明确知道这个值的数据类型，所以用了类型断言
            if (!isNaN(<number>value[0])) {
              arr3.push(value[0])
            }
          }
          if (key[0] === 'distance_to_road_in_meters') {
            if (!isNaN(<number>value[0])) {
              arr4.push(value[0])
            }
          }
        }
      }
    })
    //max2 min2 分别是distance_to_water_in_meters的最大值和最小值
    let max2 = parseInt(Math.max.apply(Math, arr2))
    let min2 = parseInt(Math.min.apply(Math, arr2))
    //max3和min3分别是distance_to_town_in_meters的最大值和最小值
    let max3 = Math.floor((Math.max.apply(Math, arr3)))
    let min3 = parseInt(Math.min.apply(Math, arr3))
    //max4和min4分别是distance_to_road_in_meters的最大值和最小值
    let max4 = parseInt(Math.max.apply(Math, arr4))
    let min4 = parseInt(Math.min.apply(Math, arr4))
    //arr5是为了让我更好的取得最大值和最小值的值
    let arr5 = [[max2, min2], [max3, min3], [max4, min4]]
    let index = 0

    //得到传递给二级路由panel的数据
    arr1.forEach(item => {
      let max = arr5[index][0];
      let min = arr5[index][1]
      let obj = {
        name: item,
        slider: {
          max: max,
          min: min,
          values: min
        }
      }
      this.panelArr.push(obj)
      index++
    })
    //使用服务让子路由得到我们发设的值
    this.panelDataService.emitData(this.panelArr)
  }

  filtShap() {
    this.filterData = Array.from(this.filterData)
    let arr = []
    for (let i = 0; i < this.filterData.length; i++) {
      let obj = {
        values: this.filterData[i].slider.value,
        max: this.filterData[i].slider.max
      }
      arr.push(obj)
    }
    for (let i = 0; i < this.distanceObjArr.length; i++) {
      let item = this.distanceObjArr[i];
      let value0 = item.data[0]['distance_to_water_in_meters'];
      let value1 = item.data[1]['distance_to_town_in_meters'];
      let value2 = item.data[2]['distance_to_road_in_meters'];
      if (value0 < arr[0].values || value0 > arr[0].max ||
        value1 < arr[1].values || value1 > arr[1].max ||
        value2 < arr[2].values || value2 > arr[2].max
      ) {
        item.name.setOptions({
          fillOpacity: 0
        })
      } else {
        item.name.setOptions({
          fillOpacity: .3
        })
      }
    }
  }


  getFilterData() {
    this.showHiddenService.listen.subscribe(data => {
      this.filterData = data;  //得到改变后的数据
      this.filtShap()
    })
  }

  //得到服务中的地图数据
  getServiceData() {
    this.jsonService.getData().subscribe(data => {
      this.paintMap(data)
      //运行区间
      this.getSection()
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
  //得到用户的登录信息
  getValue() {
    const data = this.observa.getData();
    this.loginEmail = data.personname;
    this.loginName = data.Email;
    this.imgUrl = data.url;
  }

  //得到天气的数据
  getWeather(lat, lng) {
    this.http.getWeatherData(lat, lng)
  }

  getWeahterData() {
    this.http.listen.subscribe(data => {
      console.log(data)
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
      const distanceWater = item.properties['distance_to_water_in_meters']['value'] * 1000
      const distanceTown = item.properties['distance_to_town_in_meters']['value'] * 1000
      const distanceRoad = item.properties['distance_to_road_in_meters']['value'] * 1000
      const distanceObj = [
        {'distance_to_water_in_meters': distanceWater},
        {'distance_to_town_in_meters': distanceTown},
        {'distance_to_road_in_meters': distanceRoad}
      ]
      //进行判断是是polygon和multiplePolygon
      if (arr.length !== 1) {
        //这里是multiplePolygon
        this.paintMultiPlePolygon(arr, type, time, dataLevel, distanceObj)
      } else {
        /*单个polygon*/
        this.paintPolygon(arr, type, time, dataLevel, distanceObj)
      }
    })
  }

  //绘制multiplePolygon
  paintMultiPlePolygon(data, type, time, dataLevel, distanceObj) {

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
    let obj = {
      name: multilyPolygon,
      data: distanceObj
    }
    this.distanceObjArr.push(obj)

    this.mulityPolygonArr.push(multilyPolygon);

    multilyPolygon.setMap(this.googleMap)
    multilyPolygon.addListener('mouseover', (e) => {
      if (!this.infoWindow) {
        this.infoWindowSet(time, e)
      }
      multilyPolygon.setOptions({
        strokeWeight: 2,
        strokeColor: '#e6e6e6',
        fillOpacity: 1
      })
    })
    //当离开当前的polygon的时候
    multilyPolygon.addListener('mouseout', (e) => {
      this.infoWindow.close()
      multilyPolygon.setOptions({
        strokeWeight: 2,
        strokeColor: '#e6e6e6',
        fillOpacity: .3
      })
    })
    //点击事件
    multilyPolygon.addListener('click', (e) => {
      this.paintValue(dataLevel)
      this.getWeather(e.latLng.lat(), e.latLng.lng())
    })
  }


  //绘制简单的polygon
  paintPolygon(data, type, time, dataLevel, distanceObj) {
    //distanceObj 是过滤面板的数据
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
    let obj = {
      name: polygon,
      data: distanceObj
    }
    this.distanceObjArr.push(obj)
    this.polygonArr.push(polygon)
    polygon.setMap(this.googleMap)
    polygon.addListener('mouseover', (e) => {
      this.infoWindowSet(time, e)
      polygon.setOptions({
        strokeWeight: 2,
        strokeColor: '#e6e6e6',
        fillOpacity: 1
      })
    })
    polygon.addListener('mouseout', (e) => {
      this.infoWindow.close()
      polygon.setOptions({
        strokeWeight: 2,
        strokeColor: '#e6e6e6',
        fillOpacity: .3
      })
    })
    polygon.addListener('click', (e) => {
      this.paintValue(dataLevel)
      this.getWeather(e.latLng.lat(), e.latLng.lng())
    })
  }

  infoWindowSet(time, e) {
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
  paintValue(dataLevel) {
    this.US = dataLevel[0];
    this.NE = dataLevel[1]
    this.OE = dataLevel[2]
    this.filed = dataLevel[3]
  }

  removeColor() {
    google.maps.event.addDomListener(this.googleMap, 'click', () => {
      this.mulityPolygonArr.forEach(item => {
        item.setOptions({
          strokeWeight: 0,
          strokeColor: '#e6e6e6',
          fillOpacity: 0.3
        })
      })
      this.polygonArr.forEach(item => {
        item.setOptions({
          strokeWeight: 0,
          strokeColor: '#e6e6e6',
          fillOpacity: 0.3
        })
      })
    })
  }

}
