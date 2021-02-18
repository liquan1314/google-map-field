import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//引入gapi服务
import {GapiService} from './services/gapi.service';
//引入服务
import {JsonService} from './services/json.service';
import {ObservabService} from './services/observab.service';
import {HttpService}from './services/http.service';
//引入angular的客户端请求的包
import {HttpClientModule} from '@angular/common/http';
//引入路由
import {AppComponent } from './app.component';
//引入组件
import { DataPanelComponent } from './components/data-panel/data-panel.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AsideComponent } from './public/aside/aside.component';
import { UserHeaderComponent } from './public/user-header/user-header.component';


@NgModule({
  declarations: [
    AppComponent,
    DataPanelComponent,
    LoginComponent,
    AsideComponent,
    UserHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [GapiService,JsonService,ObservabService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
