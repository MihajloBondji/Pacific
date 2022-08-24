import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private ruter: Router, private route:ActivatedRoute) { }

  user:User;

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      
      if(this.user.type==1||this.user.type==2||this.user.type==3){
        
        let photo=document.getElementById('userProfile') as HTMLImageElement;
        if(this.user.photo!=""&&this.user.photo!=undefined&&this.user.photo!=null)
        photo.src=`../../assets/profilePhotos/${this.user.photo}`;
        else photo.src="../../assets/profilepic.png";
      }
      else{
        this.ruter.navigate(['']);
      }
    }
    else this.ruter.navigate(['']);
    
  }

  preusmeri(gde:string){
    this.ruter.navigate([gde], {relativeTo: this.route});
  }

}
