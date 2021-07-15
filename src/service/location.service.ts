import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ivehicle } from 'src/app/vehiclePoints';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  // getVehicleLocations(): Observable<IvehiclePoints[]>{
  //   return this.http.get<IvehiclePoints[]>("http://localhost:8080/gps/getPoints");
  // }

  getVehicleLocations(){
    return this.http.get("http://localhost:8080/gps/getPoints").pipe(
      map((data: Ivehicle[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      })
   )
;
  }
}
