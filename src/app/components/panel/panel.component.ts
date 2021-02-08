import {Component, OnInit, ViewChild} from '@angular/core';
import {ShowHiddenService} from '../../serveces/show-hidden.service';
import {PanelDataService} from '../../services/panel-data.service';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  listArr;
  constructor(
              private showHiddenService:ShowHiddenService,
              private panelDataService:PanelDataService
  ) {}
  getData(){
    this.listArr = this.panelDataService.getData()
    console.log(this.listArr)
  }

  emitData(){
    this.showHiddenService.emit(this.listArr)
  }
  ngOnInit(): void {
    this.getData()
  }
}
