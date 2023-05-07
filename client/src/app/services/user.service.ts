import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string, name: string, address: string) {
    const body = {
      username: username,
      email: email,
      password: password,
      name: name,
      address: address
    };

    console.log( environment.baseServerUrl + '/register'  );
    return this.http.post(environment.baseServerUrl + '/register', body, {responseType: 'text'});
  }

  login(username: any, password: any) {

    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(environment.baseServerUrl + '/login', body.toString(), {headers: headers, withCredentials: true});
  }

  getUserDetails() {
    return this.http.get<any>(environment.baseServerUrl + '/personal-details');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>( environment.baseServerUrl + '/users' );
  }

  deleteUser(u: any ): Observable<void> {
    const body = {
      username: u.username,
      email: u.email,
      password: u.password,
      name: u.name,
      address: u.address
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: body
    };

    const url = environment.baseServerUrl + '/users' ;
    return this.http.delete<void>(url, options);
  }


  logout() {
    let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.set('Accept', '*/*');

    return this.http.post(environment.baseServerUrl + '/logout', {}, {headers: headers, responseType: 'text', withCredentials: true});
  }

}
