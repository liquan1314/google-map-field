import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import {Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {
  }
  sub = new Subject() //创建一个观察对象

  listen = this.sub.asObservable(); //创建观察者

  emit(value){
    return this.sub.next(value)
  }

  getWeatherData(lats, lng) {
    const url = 'https://community-open-weather-map.p.rapidapi.com/weather'
    const headerOption = new HttpHeaders({
      'x-rapidapi-key': '60fe49497fmsh4d053c3d005f9d7p1e296bjsn9a130deb9250',
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'useQueryString': 'true'
    })
    const params = {
      lat: lats,
      lon: lng,
      units: 'metric'
    }
    this.http.get(url, {
      headers: headerOption,
      params: params,
    }).pipe(
      catchError(this.handleError)
    ).subscribe(data => {
      this.emit(data)
    }, (err) => {
      console.log(err)
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
