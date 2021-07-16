import { Component, OnInit, ViewChild  } from '@angular/core';
import {Maps, Zoom, Marker, NavigationLine, MarkerSettings, MapsComponent } from '@syncfusion/ej2-angular-maps';
import { LocationService } from '../service/location.service';
import { Ivehicle } from 'src/app/vehiclePoints';
import { vehiclePath } from 'src/app/vehiclePath';

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

  vehiclePath : Array<vehiclePath> = [];

  latitudeList : Array<number> = []
  
  ngOnInit(){
    this.getVehiclePoints();
    this.getVehiclePath();
  }

  getVehiclePoints(){
    this.Lservice.getVehicleLocations().subscribe(
      (data) =>  {
        this.vehicleData = data;
        localStorage.setItem('dataSource', JSON.stringify(this.vehicleData));
    });
  }

  getVehiclePath(){
    this.Lservice.getVehiclePath().subscribe(
      data => {
        this.vehiclePath = data;
        console.log('vehicle path ',this.vehiclePath);

        const latitudeFilter = ['latitude'];
        const longitudeFilter = ['longitude'];

        var latitudeList : Array<number> = []
        var longitudeList : Array<number> = []

        this.vehiclePath.forEach((data)=> {
          latitudeList.push(
            Object.keys(data)
          .filter(key => latitudeFilter.includes(key))
          .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
          }, {}).latitude
          )
         });
         console.log('LatitudeList :', latitudeList.map(i=>Number(i)))

         this.vehiclePath.forEach((data)=> {
          longitudeList.push(
            Object.keys(data)
          .filter(key => longitudeFilter.includes(key))
          .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
          }, {}).longitude
          )
         });
         console.log('LongitudeList :', longitudeList.map(i=>Number(i)))

         localStorage.setItem('latitudeList', JSON.stringify(latitudeList.map(i=>Number(i))));
         localStorage.setItem('longitudeList', JSON.stringify(longitudeList.map(i=>Number(i))));
      }
    );
  }

  // getLatitudeList(){
  //   console.log('Vehicle path inside the method ',this.vehiclePath);
  //   // for(var i = 0; i<this.vehiclePath.length; i++){
  //   //   this.latitudeList.push(this.vehiclePath[i].latitude);
  //   //   // localStorage.setItem('latitudeList', JSON.stringify(this.vehiclePath[i].latitude));
  //   //   console.log(this.vehiclePath[i]);
  //   // }
  //   var result = this.vehiclePath.filter(
  //     (data) => {data.latitude});

  //     console.log('result ', result);
  // }

  loadData(){
    console.log("Marker Settings : ",this.markerSettings);
    console.log("Vehicle Data : ",this.vehicleData);
    console.log("Vehicle Path : " , this.vehiclePath)
    console.log("Latitude List : " , this.latitudeList);
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
      visible: false,
      height: 35,
      width: 25,
      dataSource: JSON.parse(localStorage.getItem('dataSource'))
  }];

  public navigationLineSettings: object = [{
      visible: true,
      color: "blue",
      width: 4,
      angle: 0.1,
      // latitude: [7.21984, 8.34427, 9.08550],
      // longitude: [ 79.84537, 80.41080, 79.82343],
      latitude: JSON.parse(localStorage.getItem('latitudeList')),
      longitude: JSON.parse(localStorage.getItem('longitudeList'))
  }];
}
