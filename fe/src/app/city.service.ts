import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordinates } from './model/model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http: HttpClient
  ) { }

  buildHeader() {
    let headers = new HttpHeaders();
    headers = headers.set('access-control-allow-origin', '*');
    headers = headers.set('cache-control', 'no-store');
    headers = headers.set('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept');
    headers = headers.set('connection', 'keep-alive');
    headers = headers.set('content-encoding', 'gzip');
    headers = headers.set('content-type', 'application/json');
    headers = headers.set('pragma', 'no-cache');
    headers = headers.set('transfer-encoding', 'chunked');
    headers = headers.set('vary', 'Accept-Encoding');
    return headers
  }

  APIKey = 'b85ee5dd-6329-47dc-a93b-dcd40ca362f1'

  getNearstCity(coor: Coordinates) {
    let url = 'http://api.airvisual.com/v2/nearest_city'+"?key="+this.APIKey+"&lat="+coor.lat+"&lon="+coor.lon
    return this.http.get(url, {headers: this.buildHeader()})
  }

  getCountries() {
    let url = 'http://api.airvisual.com/v2/countries'+"?key="+this.APIKey
    return this.http.get(url, {headers: this.buildHeader()})
  }

  getState(country: string) {
    let url = 'http://api.airvisual.com/v2/states'+"?country="+country+"&key="+this.APIKey
    return this.http.get(url, {headers: this.buildHeader()})
  }

  getCities(country: string, state: string) {
    let url = 'http://api.airvisual.com/v2/cities'+"?country="+country+"&state="+state+"&key="+this.APIKey
    return this.http.get(url, {headers: this.buildHeader()})
  }


}
