import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BorrowService } from '../borrow.service';
import { Borrow } from '../model/borrow.model';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-uredi-korisnike',
  templateUrl: './uredi-korisnike.component.html',
  styleUrls: ['./uredi-korisnike.component.css']
})
export class UrediKorisnikeComponent implements OnInit {

  constructor(private servis: UserService,private ruter: Router, private http:HttpClient, private servis2:BorrowService) { }

  allUsers:User[]=[];

  ngOnInit(): void {
    this.servis.getAllUsers().subscribe((data: User[]) => {
      this.allUsers = data;
  })
  }

page1 = 1;

update(str){
  let inp=document.getElementById(str) as HTMLInputElement;
  let type=inp.value;
  this.servis.update(str,type).subscribe(ob=>{
      if(ob['message']!='ok')
       alert(ob['message'])
    });

}

delete(str){
  this.servis2.getBorrowsUserTake(str).subscribe((data: Borrow[]) => {
    let allBorrows = data;
    if(allBorrows.length==0)
    {
      this.servis.delete(str).subscribe(ob=>{
        if(ob['message']=='ok')
        {
          this.ruter.navigate(['/administrator/uredi-korisnike'])
            .then(() => {
              window.location.reload();
            });
        }
        else alert(ob['message'])
      });
    }
    else alert("User has borrowed books.")
})
}

uredi(u:User){
  localStorage.setItem('usertoedit',JSON.stringify(u));
  this.ruter.navigate(['/administrator/uredi-korisnika']);
}
}
