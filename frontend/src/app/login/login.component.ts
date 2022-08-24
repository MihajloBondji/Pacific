import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userServise: UserService, private ruter: Router) { }

  ngOnInit(): void { 
  }

  username: string;
  password: string;
  message:string;
  login(){
    this.userServise.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
        if(user.type==0) 
          this.message="Account is not approved yet"
        else if(user.type==1||user.type==2||user.type==3)
        {
          localStorage.setItem('user',JSON.stringify(user));
          this.ruter.navigate(['/user/user-main']);
        }
        else this.message="Bad user type";
      }
      else{
        this.message="Wrong username or password"
      }
    })
  }
}
