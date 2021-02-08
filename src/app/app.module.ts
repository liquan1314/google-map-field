import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSliderModule} from '@angular/material/slider';
//引入gapi服务
import {GapiService} from './services/gapi.service';
//引入服务
import {ShowHiddenService} from './serveces/show-hidden.service';
import {PanelDataService}from './services/panel-data.service';
import {MockJsonService} from './services/mockJson.service';
import {ObservaberUserLoginService} from './services/observaberUserLogin.service';
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
import { PanelComponent } from './components/panel/panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DataPanelComponent,
    LoginComponent,
    AsideComponent,
    UserHeaderComponent,
    PanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatSliderModule,
    FormsModule
  ],
  providers: [PanelDataService,GapiService,MockJsonService,ObservaberUserLoginService,HttpService,ShowHiddenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
