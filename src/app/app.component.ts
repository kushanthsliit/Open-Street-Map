import { Component, OnInit, ViewChild  } from '@angular/core';
import {Maps, Zoom, Marker, NavigationLine, MarkerSettings, MapsComponent } from '@syncfusion/ej2-angular-maps';
import { LocationService } from '../service/location.service';
import { Ivehicle } from 'src/app/vehiclePoints';

Maps.Inject(Zoom, Marker, NavigationLine);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public constructor(private Lservice:LocationService){}

  public layerType: string = 'OSM';

  vehicleData : Array<Ivehicle> = [];
  
  ngOnInit(){
    this.getVehiclePoints();
  }

  getVehiclePoints(){
    return this.Lservice.getVehicleLocations().subscribe(
      (data) =>  {
        this.vehicleData = data;
        localStorage.setItem('dataSource', JSON.stringify(this.vehicleData));
    });
  }

  loadData(){
    console.log("Marker Settings : ",this.markerSettings);
    console.log("Vehicle Data : ",this.vehicleData);
  }

  public zoomSettings: object = {
      zoomFactor: 7,
      enable : true
  };
  
  public centerPosition: object = {
      latitude: 8.233,
       longitude: 80.354,
  };
  
    
  public markerSettings: object = [{
      visible: true,
      height: 35,
      width: 25,
      dataSource: JSON.parse(localStorage.getItem('dataSource'))
  }];

  public navigationLineSettings: object = [{
      visible: false,
      color: "blue",
      width: 2,
      angle: 0.1,
      latitude: [7.21984, 8.34427, 9.08550],
      longitude: [ 79.84537, 80.41080, 79.82343]
  }];
}
