import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  currentUser$ = new ReplaySubject<User>(1);

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlciIsImV4cCI6MTc2ODkzNzgyNX0.H5ELw1tzIEX_RdwZrLmEbkaDiLCukEtQWykp55U3-I0"

  login(model: any){
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

  register(model:any){
    return this.http.post<User>(environment.api +"/Users/", model)
  }

  logout(){
    localStorage.removeItem("user")
    this.currentUser$.next(null!);
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + this.token})
    }
  }

}