import { Component } from '@angular/core';
import {Maps, Zoom, Marker, NavigationLine } from '@syncfusion/ej2-angular-maps';

Maps.Inject(Zoom, Marker, NavigationLine);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public layerType: string = 'OSM';
  

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
       dataSource: [
           {
               latitude: 7.21984,
               longitude: 79.84537,
               name: "Negombo"
           },
           {
            latitude: 8.34427,
            longitude: 80.41080,
            name: "Anurathapura"
           },
           {
               latitude: 9.08550,
               longitude: 79.82343,
               name: "Mannar"
           },
       ]
   }];
   public navigationLineSettings: object = [{
       visible: true,
       color: "blue",
       width: 2,
       angle: 0.1,
       latitude: [7.21984, 8.34427, 9.08550],
       longitude: [ 79.84537, 80.41080, 79.82343]
   }];
}
