import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginBody, loginInterface, photoInterface, signUpBody } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor( private http:HttpClient ) { }
  
  _url:string = "http://localhost:3001"

  GetData(path: string):Observable<photoInterface[]> {
    return this.http.get<photoInterface[]>(`${path}`)
  }


  Login(path: string, body: loginBody, options: Object):Observable<loginInterface> {
    return this.http.post<loginInterface>(`${this._url}${path}`, body, options)
  }

  Signup(path: string, body: signUpBody, options: Object): Observable<loginInterface> {
    return this.http.post<loginInterface>(`${this._url}${path}`, body, options)
  }
}