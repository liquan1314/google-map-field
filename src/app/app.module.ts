import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataPanelComponent } from './components/data-panel/data-panel.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { MapPolygonsComponent } from './components/map-polygons/map-polygons.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DataPanelComponent,
    TooltipComponent,
    MapPolygonsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
