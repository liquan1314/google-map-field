import {Component, OnInit, ViewChild,NgZone} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('Rectangle') btnText;
  auth2: any;
  constructor(private  router: Router,
              private zone: NgZone) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.startApp()
  }

  navigateMap(value) {
      this.router.navigate(['./mappolygon'],value).then(data=>{
        console.log(data)
      }).catch(err=>{
        console.log(err)
      })
  }

  //开始初始化，得到google Client的APi操作方法，用gapi去操做它们
  startApp() {
    gapi.load('auth2', () => {
      //初始化
      gapi.auth2.init({
        client_id: '230743352788-70rprt9h848dccqharm10iv934hh1mjk.apps.googleusercontent.com',
      }).then(data => {
        this.auth2 = data
        this.attachSignin(this.btnText.nativeElement)
      }).catch(err => {
        console.error(err)
      })
    })
  }

  attachSignin(ele) {
    this.auth2.attachClickHandler(ele, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile(); //这是得到用户的基本信息
      let params:any = {};
      let queryMap:any={};
      //得到我们想得到的对象
      params.name = profile.getName()
      params.Email = profile.getEmail()
      //配置参数
      queryMap = {
        queryParams: params
      }
      this.zone.run(()=>{
        this.navigateMap(queryMap)
      })
    }, (err) => {
      console.log(err)
    })
  }

}
