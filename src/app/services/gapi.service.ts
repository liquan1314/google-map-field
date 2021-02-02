import {Injectable, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {ObservabService} from "./observab.service";

@Injectable({
  providedIn: 'root'
})
export class GapiService {
  auth2:any;
  constructor(private zone:NgZone,private router:Router,
              private observab: ObservabService) {

  }
  //登陆成功跳转路由
  navigateMap(value) {
    this.router.navigate(['./datapanel']).then(data=>{
      console.log(data)
    }).catch(err=>{
      console.error(err)
    })
  }

  //初始化auth2这个对象，然后进行操作
  initAuth2(btnText?:any){
    gapi.load('auth2',()=>{
       //初始化auth2这个googleLogin
      gapi.auth2.init({
        client_id:'230743352788-70rprt9h848dccqharm10iv934hh1mjk.apps.googleusercontent.com',
      }).then(data => {
        this.auth2 = data
        if(btnText){
          this.attachSignin(btnText.nativeElement)
        }else{
          data.signOut().then(()=>{
            this.zone.run(()=>{
              this.router.navigate(['./login'])
            })
          })
        }
      }).catch(err => {
        console.log(err)
      })
    })
  }
  attachSignin(ele) {
    this.auth2.attachClickHandler(ele, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile(); //这是得到用户的基本信息
      let params:any = {};
      let queryMap:any={};
      //得到我们想得到的对象
      params.personname = profile.getName()
      params.Email = profile.getEmail()
      params.url = profile.getImageUrl()
      //配置参数
      queryMap = {
        queryParams: params
      }

      //触发观察这模式，因为数据变动触发了订阅
      this.observab.emit(params)

      this.zone.run(()=>{
        this.navigateMap(queryMap)
      })
    }, (err) => {
      console.log(err)
    })
  }
}
