import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';

  add(id:number, bookId:number,score:number,text:string,user:string,date:number){
    const data={
      id: id,
      bookId: bookId,
      score: score,
      text: text,
      user: user,
      date: date
    }

    return this.http.post(`${this.uri}/review/add`, data);
  }

  update(id:number, bookId:number,score:number,text:string,user:string,date:number){
    const data={
      id: id,
      bookId: bookId,
      score: score,
      text: text,
      user: user,
      date: date
    }

    return this.http.post(`${this.uri}/review/update`, data);
  }
  
  getReviewsBook(bookId){
    const data = {
      bookId: bookId
    }
    return this.http.post(`${this.uri}/review/getReviewsBook`, data);
  }

}
  