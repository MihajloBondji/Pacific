import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';

  login(username, password){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  register(username:string, password:string, fullname:string, address:string, phone:string, mail:string, photo:string, type:number){
    const data={
      username: username,
      password: password,
      fullname: fullname,
      address: address,
      phone: phone,
      mail: mail,
      photo:photo,
      type: type
    }

    return this.http.post(`${this.uri}/users/register`, data);
  }

  findUsername(username:string){
    const data={
      username: username
    }

    return this.http.post(`${this.uri}/users/findUsername`, data);
  }
  
  findMail(mail:string){
    const data={
      mail: mail
    }

    return this.http.post(`${this.uri}/users/findMail`, data);
  }

  update(str,type){
    const data={
      username:str,
      type:type
    }
    return this.http.post(`${this.uri}/users/update`, data);
  }

  
  updateInfo(oldusername,username,fullname,address,phone,mail,photo){
    const data={
      oldusername:oldusername,
      username:username,
      fullname:fullname,
      address:address,
      phone:phone,
      mail:mail,
      photo:photo
    }
    return this.http.post(`${this.uri}/users/updateInfo`, data);
  }

  delete(str){
    const data={
      username:str
    }
    return this.http.post(`${this.uri}/users/delete`, data);
  }

  getAllUsers(){
    return this.http.get(`${this.uri}/users/getAllUsers`);
  }
  
  changePass(username,password){
    const data={
      username:username,
      password:password
    }
    return this.http.post(`${this.uri}/users/changePass`, data);
  }
}



