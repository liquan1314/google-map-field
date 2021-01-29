import {Component, OnInit, ViewChild,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {GapiService} from '../../services/gapi.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('Rectangle') btnText;
  auth2: any;
  constructor(private  router: Router,
              private zone: NgZone,
              public gapiService:GapiService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.startApp()
  }

  //开始初始化，得到google Client的APi操作方法，用gapi去操做它们
  startApp() {
    this.gapiService.initAuth2(this.btnText)
  }

}
