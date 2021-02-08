import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import {ObservaberUserLoginService} from "../services/observaberUserLogin.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,public observa :ObservaberUserLoginService) {
  }
  //即将进入一个路由的路由守卫
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.observa.getData()){
      return true
    }else{
      this.router.navigate(['./login'])
      return false
    }
    return true;
  }
}
