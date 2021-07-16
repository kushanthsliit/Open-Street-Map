import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ivehicle } from 'src/app/vehiclePoints';
import { vehiclePath } from 'src/app/vehiclePath';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  getVehicleLocations() : Observable<Ivehicle[]>{
    return this.http.get<Ivehicle[]>("http://localhost:8080/gps/getPoints");
  }

  getVehiclePath() : Observable<vehiclePath[]>{
    return this.http.get<vehiclePath[]>("http://localhost:8080/gps/path");
  }
}
