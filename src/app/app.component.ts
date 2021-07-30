import { Component, OnInit, ViewChild  } from '@angular/core';
import {Maps, Zoom, Marker, NavigationLine, MarkerSettings, MapsComponent } from '@syncfusion/ej2-angular-maps';
import { LocationService } from '../service/location.service';
import { Ivehicle } from 'src/models/vehiclePoints';
import { vehiclePath } from 'src/models/vehiclePath';
import { station } from 'src/models/station';

Maps.Inject(Zoom, Marker, NavigationLine);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public constructor(private Lservice: LocationService) {}

  public layerType = 'OSM';

  vehicleData: Array<Ivehicle> = [];

  vehiclePath: Array<vehiclePath> = [];

  latitudeList: Array<number> = [];

  stationList : station[] = [];

  public zoomSettings: object = {
      enable : true,
      zoomFactor: 7,
      maxZoom: 25,
      doubleClickZoom:true,
      mouseWheelZoom:true
  };

  public centerPosition: object = {
      latitude: 8.233,
       longitude: 80.354,
  };


  public markerSettings: object = [
    {
      visible: true,
      fill: null,
      height: 35,
      width: 25,
      dataSource: [{
        "latitude": 8.2367,
        "longitude": 79.14341166666667,
        "vehicleNumber": "GQ-8686",
        "deviceId": 3
        }]
      // JSON.parse(localStorage.getItem('dataSource'))
    },
    {
      visible: true,
      fill: '#0000FF',
      // template: '<div> <img src="../assets/car1.png" alt="Girl in a jacket" width="20" height="30" ></div>',
      tooltipSettings: {
          visible: true,
          valuePath: 'name',
      },
      // template: '<div><i class="fas fa-truck marker" style="color: darkred"></i></div>',
      // tooltipSettings: {
      //     visible: true,
      //     valuePath: 'name',
      // },
      height: 35,
      width: 25,
      dataSource: JSON.parse(localStorage.getItem('stationList'))
    }
  ];  

  public navigationLineSettings: object = [{
      visible: false,
      color: 'blue',
      width: 4,
      angle: 0.1,
      latitude: JSON.parse(localStorage.getItem('latitudeList')),
      longitude: JSON.parse(localStorage.getItem('longitudeList'))
  }];

  ngOnInit() {
    // this.getVehiclePoints();
    // this.getVehiclePath();
    this.getStations();
  }

  getVehiclePoints() {
    this.Lservice.getVehicleLocations().subscribe(
      (data) =>  {
        this.vehicleData = data;
        localStorage.setItem('dataSource', JSON.stringify(this.vehicleData));
    });
  }

  getStations(){
    this.Lservice.getStations().subscribe(
      (data) => {
        this.stationList = data;
        console.log(data);
        localStorage.setItem('stationList', JSON.stringify(this.stationList));
      }
    );
  }

  // getVehiclePath() {
  //   this.Lservice.getVehiclePath().subscribe(
  //     data => {
  //       this.vehiclePath = data;
  //       console.log('vehicle path ', this.vehiclePath);

  //       const latitudeFilter = ['latitude'];
  //       const longitudeFilter = ['longitude'];

  //       let latitudeList: Array<number> = [];
  //       let longitudeList: Array<number> = [];

  //       this.vehiclePath.forEach((data) => {
  //         latitudeList.push(
  //           Object.keys(data)
  //         .filter(key => latitudeFilter.includes(key))
  //         .reduce((obj, key) => {
  //           obj[key] = data[key];
  //           return obj;
  //         }, {}).latitude
  //         );
  //        });
  //       console.log('LatitudeList :', latitudeList.map(i => Number(i)));

  //       this.vehiclePath.forEach((data) => {
  //         longitudeList.push(
  //           Object.keys(data)
  //         .filter(key => longitudeFilter.includes(key))
  //         .reduce((obj, key) => {
  //           obj[key] = data[key];
  //           return obj;
  //         }, {}).longitude
  //         );
  //        });
  //       console.log('LongitudeList :', longitudeList.map(i => Number(i)));

  //       localStorage.setItem('latitudeList', JSON.stringify(latitudeList.map(i => Number(i))));
  //       localStorage.setItem('longitudeList', JSON.stringify(longitudeList.map(i => Number(i))));
  //     }
  //   );
  // }

  loadData() {
    // console.log('Marker Settings : ', this.markerSettings);
    // console.log('Vehicle Data : ', this.vehicleData);
    // console.log('Vehicle Path : ' , this.vehiclePath);
    // console.log('Latitude List : ' , this.latitudeList);
  }
}
