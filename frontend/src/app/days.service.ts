import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DaysService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';

  
  get(){
    return this.http.get(`${this.uri}/days/get`);
  }


  update(num){
    const data={
      days:num,
    }
    return this.http.post(`${this.uri}/days/update`, data);
  }
}
  