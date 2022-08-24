import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { BorrowService } from '../borrow.service';
import { DaysService } from '../days.service';
import { Book } from '../model/book.model';
import { Borrow } from '../model/borrow.model';
import { Days } from '../model/days.model';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  constructor(private servisd:DaysService,private servis: BookService,private ruter: Router, private http:HttpClient,private servis2: BorrowService) { }
  ngOnInit(): void {
    this.servis.getAllBooks().subscribe((data: Book[]) => {
      let day=new Date(Date.now()).getDay();
      this.allBooks=data;
      day%=data.length;
      this.knjigaDana = data[day];
      this.user=JSON.parse(localStorage.getItem('user'));
      this.servis2.getBorrowsUserTake(this.user.username).subscribe((data: Borrow[]) => {
        this.allBorrows = data;
        this.servisd.get().subscribe((data:Days)=>{
          this.days=data.days;
          this.notifications();
        });
    })

      let knj=document.getElementById('knjiga') as HTMLImageElement;
      knj.src=`../../assets/books/${this.knjigaDana.cover}`;
      let tit=document.getElementById('title') as HTMLSpanElement;
      tit.innerHTML=this.knjigaDana.title;
      let aut=document.getElementById('author') as HTMLSpanElement;
      aut.innerHTML=this.knjigaDana.author.toString();
      let sco=document.getElementById('score') as HTMLSpanElement;
      let sco2=document.getElementById('score2') as HTMLSpanElement;
      if(this.knjigaDana.score[0]!=0){
        let score=Math.round(this.knjigaDana.score[0]/this.knjigaDana.score[1]);
        sco.innerHTML="";
        sco2.innerHTML=score+"/10";
        for(let i=0;i<score;i++)
          sco.innerHTML+="&#9734";
      }
  })
  }
  knjigaDana:Book;

  user:User;
  allBorrows:Borrow[]=[];
  days:number=14;
  allNotifications:string[]=[];
  allBooks:Book[]=[];

  notifications(){
    for(let b of this.allBorrows)
    {
      if(b.dateTake!=0){
      let d=this.calc(b.dateTake,b.extend);
      if(d<=2&&d>=0)
        this.allNotifications.push('You have '+d+' day(s) to return - '+b.title+'.');
      else if(d<0)
        this.allNotifications.push('You are late '+(-d)+' day(s) to return - '+b.title+'.');
      }
      else{ 
      this.allNotifications.push('You got your reserved book - '+b.title);
      this.servis2.takenow(b.id).subscribe(ob=>{
        if(ob['message']!='ok')
        alert(ob['message']);
      })
    }
    }
    if(this.allBorrows.length==3)
      this.allNotifications.push('You have the maximum ammount of borrowed books (3).');
      for(let b of this.allBooks)
      {
        if(b.username==this.user.username&&b.id>0){
          this.allNotifications.push('Your requested book - '+b.title+' has been accepted.');
        }
      }
      if(this.user.type==3)
        this.allNotifications.push('You are blocked!');
  }

  calc(num:number,ext:number){
    let days=Date.now()-num;
    days/= (1000 * 3600 * 24);
    return this.days*ext + this.days - Math.floor(days);
  }
}
