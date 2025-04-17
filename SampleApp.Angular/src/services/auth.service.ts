import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { environment } from '../environments/environment.development';
import User from '../models/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  http = inject(HttpClient)
  currentUser$ = new ReplaySubject<User>(1);

  // token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlciIsImV4cCI6MTc2ODkzNzgyNX0.H5ELw1tzIEX_RdwZrLmEbkaDiLCukEtQWykp55U3-I0"

  constructor() {
    console.log("initialized singleton service AuthService...") 
    this.initializeUser()
  }

  private initializeUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      this.currentUser$.next(user);
      console.log("Отправили данные пользователя из localStorage")
    } else {
      this.currentUser$.next(null!);
      console.log("localStorage не содержит данных о пользователе")
    }
  }

  loginwithtoken(model: any){
    return this.http.post<User>(`${environment.api}/Users/Login`, model, this.generateHeaders()).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          localStorage.setItem("user",JSON.stringify(user))
          this.currentUser$.next(user)
          console.log(user)
        }
        else{
          console.log(response)
        }
      })
    )
  }

  // login(model: any){
  //   return this.http.post<User>(`${environment.api}/Users/Login`, model).pipe(
  //     map((response: User) => {
  //       const user = response;
  //       if(user){
  //         localStorage.setItem("user",JSON.stringify(user))
  //         this.currentUser$.next(user)
  //         console.log(user)
  //       }
  //       else{
  //         console.log(response)
  //       }
  //     })
  //   )
  // }

  register(model:any){
    return this.http.post<User>(environment.api +"/Users/", model)
  }

  logout(){
    localStorage.removeItem("user")
    this.currentUser$.next(null!);
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

}
