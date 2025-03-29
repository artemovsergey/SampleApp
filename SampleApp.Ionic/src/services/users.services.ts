import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';
import { environment } from 'src/environments/environment';
import { UserRepository } from 'src/interfaces/user.repository';


@Injectable({
  providedIn: 'root'
})
export class UsersService implements UserRepository {

  http = inject(HttpClient)

  getAll(): Observable<User[]> {
      return this.http.get<User[]>(`${environment.api}/Users`)
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(`${environment.api}/Users/${id}`)
  }

  create(u: User): Observable<User> {
    return this.http.post<User>(`${environment.api}/Users`, u, this.generateHeaders())
  }

  del(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.api}/Users/${id}`)
  }

  update(u: User): Observable<User> {
    return this.http.put<User>(`${environment.api}/Users`, u, this.generateHeaders())
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

}