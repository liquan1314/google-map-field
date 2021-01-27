import { Component, OnInit,NgZone } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-map-polygons',
  templateUrl: './map-polygons.component.html',
  styleUrls: ['./map-polygons.component.scss']
})
export class MapPolygonsComponent implements OnInit {
  loginName:string;
  loginEmail:string;
  constructor(private route: ActivatedRoute,private router: Router,private zone:NgZone) { }

  ngOnInit(): void {
    this.getValue()
  }
  getValue(){
    this.route.queryParamMap.subscribe(data=>{
      this.loginName = data.get('name');
      this.loginEmail = data.get('Email')
    })
  }
  signOut(){
    gapi.load('auth2', ()=>{
      gapi.auth2.init({
        client_id:'230743352788-70rprt9h848dccqharm10iv934hh1mjk.apps.googleusercontent.com'
      }).then(data=>{
        data.signOut().then(()=>{
          this.zone.run(()=>{
            this.router.navigate(['./login'])
          })
        })
      })
    })

  }

}
