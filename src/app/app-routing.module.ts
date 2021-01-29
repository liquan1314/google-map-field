import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
/*
  生成一个路由模块，在cli中运行指令
   ng g module app-routing --flat --module=app
 */
//--flat 把这个文件放进了 src/app 中，而不是单独的目录中。
//--module=app 告诉 CLI 把它注册到 AppModule 的 imports 数组中。

import {DataPanelComponent} from './components/data-panel/data-panel.component';
import {LoginComponent} from './components/login/login.component';

let routes: Routes=[
  {path:'login',component:LoginComponent},
  {path:'datapanel',component:DataPanelComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'/login',pathMatch:'full'} //redirect login
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
