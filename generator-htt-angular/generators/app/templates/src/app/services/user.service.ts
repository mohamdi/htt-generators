import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from "../models/user";

@Injectable({providedIn: 'root'})
export class UserService {

  private url = `${environment.backendPrefix}/api/v1/user`;

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<User[]>(this.url);
  }

  getById(id: number){
    return this.http.get<User>(`${this.url}/${id}`);
  }

  save(data: User){
    return data?.id ? this.http.put(this.url, data) : this.http.post(this.url, data);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getConnectedUser(){
    return this.http.get<User>(`${this.url}/connected-user`);
  }

}
