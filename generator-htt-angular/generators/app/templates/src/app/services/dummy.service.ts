import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {<%=entity.name%>} from "../models/<%=fileName%>";

@Injectable({providedIn: 'root'})
export class <%=entity.name%>Service{

  private url = `${environment.backendPrefix}/api/v1/<%=fileName%>`;

  constructor(private http: HttpClient) {}

  getAll(){
    const url = `${this.url}`;
    return this.http.get<<%=entity.name%>[]>(url);
  }

  getById(id: number){
    return this.http.get<<%=entity.name%>>(`${this.url}/${id}`);
  }

  save(data: <%=entity.name%>){
    return data?.id ? this.http.put(this.url, data) : this.http.post(this.url, data);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
