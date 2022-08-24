import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BorrowService } from '../borrow.service';
import { Borrow } from '../model/borrow.model';
import { User } from '../model/user.model';

@Component({
  selector: 'app-borrow-history',
  templateUrl: './borrow-history.component.html',
  styleUrls: ['./borrow-history.component.css']
})
export class BorrowHistoryComponent implements OnInit {

  constructor(private servis: BorrowService,private ruter: Router, private http:HttpClient) { }

  user:User;
  page1:number=1;
  allBorrows:Borrow[]=[];
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user'));
    this.servis.getBorrowsUser(this.user.username).subscribe((data: Borrow[]) => {
      this.allBorrows = data;
      this.sort('dateback');
  })
  }

  
  convert(num:number){
    if(num>0){
    let date=new Date(num).getDate()+'/'+(new Date(num).getMonth()+1)+'/'+new Date(num).getFullYear();
    return date;
    }
    else return "";
  }

  preusmeri(gde:string,id:number){
        this.ruter.navigate([gde,id]);
  }

  sort(x){
    switch(x){
      case 'title':this.allBorrows.sort((a, b) => (a.title > b.title) ? 1 : -1 );break;
      case 'author':this.allBorrows.sort((a, b) => (a.author > b.author) ? 1 : -1 );break;
      case 'datetake':this.allBorrows.sort((a, b) => (a.dateTake < b.dateTake) ? 1 : -1 );break;
      case 'dateback':this.allBorrows.sort((a, b) => (a.dateBack < b.dateBack) ? 1 : -1 );break;
    }
  }
}
