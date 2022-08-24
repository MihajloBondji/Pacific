import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Borrow } from './model/borrow.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';

  
  getAllBorrows(){
    return this.http.get(`${this.uri}/borrow/getAllBorrows`);
  }

  getBorrowsUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/borrow/getBorrowsUser`, data);
  }

  getBorrowsUserTake(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/borrow/getBorrowsUserTake`, data);
  }

  getBorrowsBookTaken(bookId){
    const data = {
      bookId: bookId
    }
    return this.http.post(`${this.uri}/borrow/getBorrowsBookTaken`, data);
  }
  
  return(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/borrow/return`, data);
  }
  
  extend(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/borrow/extend`, data);
  }
  
  takenow(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/borrow/takenow`, data);
  }

  add(id:number, bookId:number,user:string,cover:string,title:string,author:string[],genre:string[],extend:number,dateTake:number,dateBack:number){
    const data={
      id: id,
      bookId: bookId,
      user: user,
      cover: cover,
      title: title,
      author: author,
      genre: genre,
      extend:extend,
      dateTake: dateTake,
      dateBack:dateBack
    }

    return this.http.post(`${this.uri}/borrow/add`, data);
  }
}
