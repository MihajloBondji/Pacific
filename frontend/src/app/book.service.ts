import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './model/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';

  
  delete(num){
    const data={
      id:num
    }
    return this.http.post(`${this.uri}/books/delete`, data);
  }

  getAllBooks(){
    return this.http.get(`${this.uri}/books/getAllBooks`);
  }

  getBook(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/books/getBook`, data);
  }

  getIt(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/books/getIt`, data);
  }

  returnIt(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/books/returnIt`, data);
  }

  add(id:number, title:string, author:string[], genre:string[], publisher:string, year:number, language:string, cover:string){
    const data={
      id: id,
      title: title,
      author: author,
      genre: genre,
      publisher: publisher,
      year: year,
      language:language,
      cover: cover
    }

    return this.http.post(`${this.uri}/books/add`, data);
  }

  add2(id:number, title:string, author:string[], genre:string[], publisher:string, year:number, language:string, cover:string,username:string){
    const data={
      id: id,
      title: title,
      author: author,
      genre: genre,
      publisher: publisher,
      year: year,
      language:language,
      cover: cover,
      username:username
    }

    return this.http.post(`${this.uri}/books/add2`, data);
  }

  update(id,title,genre,author,year,publisher,language,cover,available){
    const data={
      id:id,
      title:title,
      genre:genre,
      author:author,
      year:year,
      publisher:publisher,
      language:language,
      cover:cover,
      available:available
    }
    return this.http.post(`${this.uri}/books/update`, data);
  }

  reserve(id,username){
    const data={
      id:id,
      username:username
    }
    return this.http.post(`${this.uri}/books/reserve`, data);
  }

  updateId(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/books/updateId`, data);
  }

  updateRes(id,username){
    const data={
      id:id,
      username:username
    }
    return this.http.post(`${this.uri}/books/updateRes`, data);
  }

  updateScore(id,score){
    const data={
      id:id,
      score:score
    }
    return this.http.post(`${this.uri}/books/updateScore`, data);
  }
}
