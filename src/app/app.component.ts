import { Component, OnInit } from '@angular/core';
import {Maps, Zoom, Marker, NavigationLine, MarkerSettings } from '@syncfusion/ej2-angular-maps';
import { LocationService } from '../service/location.service';

import { Ivehicle } from 'src/app/vehiclePoints';
import { importType } from '@angular/compiler/src/output/output_ast';


Maps.Inject(Zoom, Marker, NavigationLine);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public constructor(private Lservice:LocationService){
    
  }

  public layerType: string = 'OSM';

  public vehicleList : Array<Ivehicle> = []

  isLoaded : boolean = false;

  public vehiclePoints: Array<Ivehicle> = 
  [
    {
        "latitude": "7.252588333",
        "VehicleNumber": "AU NME-9238",
        "longitude": "80.04134833"
    },
    {
        "latitude": "7.209031667",
        "VehicleNumber": "SG VUT-9526",
        "longitude": "79.93958"
    },
    {
        "latitude": "7.240268333",
        "VehicleNumber": "EL NIN-7320",
        "longitude": "80.02631667"
    }
]
  
  ngOnInit(){
    this.getVehiclePoints();
    console.log("vehicle points " , this.vehiclePoints)
  }

  getVehiclePoints(){
    this.Lservice.getVehicleLocations().subscribe(
      (data : any[] )=> {
        this.vehicleList = data;
        this.isLoaded = true;
        console.log("api call",data)
      }
    );
  }

  // loadMarker : Object = () => {
  //   markerSettings1 : [] = [{
  //     visible: true,
  //     height: 35,
  //     width: 25,
  //     dataSource: this.vehiclePoints
  // }];
  // }

  popVehicles(){
    this.getVehiclePoints();
    // console.log("pop vehicles : " , this.vehicleList);
    // window.location.reload();
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
       dataSource: this.vehicleList
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
