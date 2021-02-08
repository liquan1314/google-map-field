import {Injectable, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ObservaberUserLoginService} from "./observaberUserLogin.service";

@Injectable({
  providedIn: 'root'
})
export class GapiService {
  auth2:any;
  constructor(private zone:NgZone,private router:Router,
              private observab: ObservaberUserLoginService,
              private route: ActivatedRoute) {
  }
  //登陆成功跳转路由
  navigateMap(value) {
    this.router.navigate(['./datapanel']).then(data=>{
    }).catch(err=>{
      console.error(err)
    })
  }

  //初始化auth2这个对象，然后进行操作
  initAuth2(btnText){
    gapi.load('auth2',()=>{
       //初始化auth2这个googleLogin
      this.auth2 = gapi.auth2.init({
        client_id: '230743352788-70rprt9h848dccqharm10iv934hh1mjk.apps.googleusercontent.com',
      })
      this.attachSignin(btnText.nativeElement)
      this.signInListener()
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
  //登出的功能
  signOut(){
    this.auth2.signOut().then(()=>{
        this.zone.run(()=>{
          this.router.navigate(['login'])
        })
    })
  }
  signInListener(){
    this.auth2.isSignedIn.listen((val)=>{
      if(val === false){
        let params = null;
        this.zone.run(()=>{})
        // this.observab.emit(params)
        this.router.navigate(['login'],{relativeTo:this.route,replaceUrl:true})
      }
    })
  }
}
