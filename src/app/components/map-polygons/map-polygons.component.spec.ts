import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPolygonsComponent } from './map-polygons.component';

describe('MapPolygonsComponent', () => {
  let component: MapPolygonsComponent;
  let fixture: ComponentFixture<MapPolygonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPolygonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPolygonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
