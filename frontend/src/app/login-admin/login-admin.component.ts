import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private userServise: UserService, private ruter: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message:string;
  login(){
    this.userServise.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
        if(user.type==10) 
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.ruter.navigate(['/administrator/pocetna-admin']);
        }
        else{
          this.message="Not admin"
        }
      }
      else{
        this.message="Wrong username or password"
      }
    })
  }

}
