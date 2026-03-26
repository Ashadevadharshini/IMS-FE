import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) {}

login(data:any){
  return this.http.post(`${this.baseUrl}/auth/login`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
createUser(data: any) {
  return this.http.post(`${this.baseUrl}/users/register`, data);
}
saveUser(res: any) {
  localStorage.setItem('token', res.token);
  localStorage.setItem('role', res.role);
}
getUser(){
  return this.http.get(`${this.baseUrl}/auth/me`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });
}
  getRole(){
    return localStorage.getItem('role');
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.clear();
  }

}