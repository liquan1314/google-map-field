import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//引入gapi服务
import {GapiService} from './services/gapi.service';
import { AppComponent } from './app.component';
import { DataPanelComponent } from './components/data-panel/data-panel.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { MapPolygonsComponent } from './components/map-polygons/map-polygons.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AsideComponent } from './public/aside/aside.component';
import { UserHeaderComponent } from './public/user-header/user-header.component';


@NgModule({
  declarations: [
    AppComponent,
    DataPanelComponent,
    TooltipComponent,
    MapPolygonsComponent,
    LoginComponent,
    AsideComponent,
    UserHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
