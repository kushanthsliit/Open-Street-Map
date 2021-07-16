import { Component, OnInit, ViewChild  } from '@angular/core';
import {Maps, Zoom, Marker, NavigationLine, MarkerSettings, MapsComponent } from '@syncfusion/ej2-angular-maps';
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

  // public dataSource : Array<Ivehicle> = []
  vehicleData : Array<Ivehicle> = [];

  public temp: {
      latitude: number;
      longitude: number;
      VehicleNumber: string;
  }

  // @ViewChild('drilldown')
  // public maps : MapsComponent;

  isLoaded : boolean = false;

  public vehiclePoints: Array<Ivehicle> = 
  [
    {
      "VehicleNumber": "CP BJE-5182",
      "latitude": "7.229086667",
      "longitude": "79.971435"
  },
  {
    "VehicleNumber": "SS AFX-1987",
      "latitude": "7.211626667",
      "longitude": "79.943595"
  },
  {
      "VehicleNumber": "FB XAF-1244",
      "latitude": "7.24194",
      "longitude": "80.02712667"
  }
  ]
  
  ngOnInit(){
    this.getVehiclePoints();
    // for (var i = 0; i < this.vehicleData.length; i++) {
    //   this.vehiclePoints.push(this.vehicleData[i])
    // }
  }

  getVehiclePoints(){
    return this.Lservice.getVehicleLocations().subscribe(
      data => this.vehicleData = data
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

  loadData(){
    console.log("Marker Settings : ",this.markerSettings);
    console.log("Vehicle Data : ",this.vehicleData);
    console.log("Vehicle Points : ", this.vehiclePoints);
    this.maps.refresh();
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
       dataSource: this.vehicleData
      //  [
      //   {
      //     "latitude": "7.229086667",
      //     "VehicleNumber": "CP BJE-5182",
      //     "longitude": "79.971435"
      // },
      // {
      //     "latitude": "7.211626667",
      //     "VehicleNumber": "SS AFX-1987",
      //     "longitude": "79.943595"
      // },
      // {
      //     "latitude": "7.24194",
      //     "VehicleNumber": "FB XAF-1244",
      //     "longitude": "80.02712667"
      // }
      // ]
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
