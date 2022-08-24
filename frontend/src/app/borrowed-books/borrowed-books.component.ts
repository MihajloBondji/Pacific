import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { BorrowService } from '../borrow.service';
import { DaysService } from '../days.service';
import { Book } from '../model/book.model';
import { Borrow } from '../model/borrow.model';
import { Days } from '../model/days.model';
import { User } from '../model/user.model';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {

  constructor(private servisd:DaysService,private servis2:BookService,private servis: BorrowService,private ruter: Router, private http:HttpClient,private route:ActivatedRoute) { }

  user:User;
  allBorrows:Borrow[]=[];
  ngOnInit(): void {
    this.servisd.get().subscribe((data:Days)=>{
      this.days=data.days;
    });
    this.user=JSON.parse(localStorage.getItem('user'));
    this.servis.getBorrowsUserTake(this.user.username).subscribe((data: Borrow[]) => {
      this.allBorrows = data;
  })
  }

  extend(id){
    this.servis.extend(id).subscribe(ob=>{
        if(ob['message']!='ok')
         alert(ob['You can\'t extend time for this book.'])
         else this.ruter.navigate(['/user/borrowed-books'])
         .then(() => {
           window.location.reload();
         });
      });
  }
days:number=14;
  
  calc(num:number,ext:number){
    let days=Date.now()-num;
    days/= (1000 * 3600 * 24);
    return this.days*ext + this.days - Math.floor(days);
  }

  preusmeri(gde:string,id:number){
    this.ruter.navigate([gde,id]);
}
  
  preusmeri2(gde:string){
    this.ruter.navigateByUrl('/', {skipLocationChange: true}).then(()=>this.ruter.navigate([gde]));
    }

  
  return(id,bookId){
  this.servis.return(id).subscribe(ob=>{
      if(ob['message']!='ok')
       alert(ob['message'])
       else this.servis2.returnIt(bookId).subscribe(ob=>{
        if(ob['message']!='ok')
           alert(ob['message'])
        else
        {
        this.servis2.getBook(bookId).subscribe((book: Book)=>{
          if(book){
              if(this.reserved==0){
                let niz=book.reservations
                this.getit(niz,book)
              }
            }
        })
        }
       })
       
    });
}
reserved:number=0;
getit(niz:string[],book:Book){
  if(niz.length!=0)
  {
  let username=niz[0];
  this.servis.getBorrowsUserTake(username).subscribe((data: Borrow[]) => {
  if(data.length<3){
    let cantake=1;
    for(let b of data){
      if(this.calc(b.dateTake,b.extend)<0)
        cantake=0;
    }
    if(cantake){
        this.servis.add(Date.now(),book.id,username,book.cover,book.title,book.author,book.genre,0,0,0).subscribe(ob=>{
          if(ob['message']=='ok'){
            this.servis2.getIt(book.id).subscribe(ob=>{
              if(ob['message']!='ok')
                 alert(ob['message'])
              else
              this.servis2.updateRes(book.id,username).subscribe(ob=>{
                if(ob['message']!='ok')
                   alert(ob['message'])
                else{
                  this.reserved=1;
                  this.getit([],book);
                }
                
              });
            });
          }
          else alert(ob['message'])
        });
    }
    else {
      niz.shift();
      this.getit(niz,book);
    }
  }
  else {
    niz.shift();
    this.getit(niz,book);
  }
});
}
else
this.ruter.navigate(['/user/borrowed-books'])
  .then(() => {
    window.location.reload();
  });
}
}
