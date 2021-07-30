import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ivehicle } from 'src/models/vehiclePoints';
import { vehiclePath } from 'src/models/vehiclePath';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { station } from 'src/models/station';

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

  getStations() : Observable<station[]>{
    return this.http.get<station[]>("http://localhost:8080/api/tms/stations");
  }
}
