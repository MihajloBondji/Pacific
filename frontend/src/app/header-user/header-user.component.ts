import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let user:User=JSON.parse(localStorage.getItem('user'));
    this.userType=user.type;
  }

  userType:number=0;
  odjava(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  preusmeri(gde:string){
  this.router.navigateByUrl('/user', {skipLocationChange: true}).then(()=>this.router.navigate([gde], {relativeTo: this.route}));
  }
  
  preusmeri2(event,gde:string){
    if(event.keyCode == 13)
    this.router.navigateByUrl('/user', {skipLocationChange: true}).then(()=>this.router.navigate([gde], {relativeTo: this.route}));
    }
}
