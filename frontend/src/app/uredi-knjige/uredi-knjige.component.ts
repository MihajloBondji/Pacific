import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book.model';
import { BookService } from '../book.service';
import { BorrowService } from '../borrow.service';
import { Borrow } from '../model/borrow.model';
import { DaysService } from '../days.service';
import { Days } from '../model/days.model';
@Component({
  selector: 'app-uredi-knjige',
  templateUrl: './uredi-knjige.component.html',
  styleUrls: ['./uredi-knjige.component.css']
})
export class UrediKnjigeComponent implements OnInit {

  constructor(private servisd:DaysService,private servis: BookService,private ruter: Router, private http:HttpClient,private servis2:BorrowService) { }

  allBooks:Book[]=[];

  ngOnInit(): void {
    
    this.servisd.get().subscribe((data:Days)=>{
      this.days=data.days;
    });

    this.servis.getAllBooks().subscribe((data: Book[]) => {
      this.allBooks = data;
  })
  }

  page1 = 1;
/*
update(str){
  let inp=document.getElementById(str) as HTMLInputElement;
  let type=inp.value;
  this.servis.update(str,type).subscribe(ob=>{
      if(ob['message']!='ok')
       alert(ob['message'])
    });

}*/

delete(id){
  this.servis2.getBorrowsBookTaken(id).subscribe((data: Borrow[]) => {
    let allBorrows = data;
    if(allBorrows.length==0)
    {
      this.servis.delete(id).subscribe(ob=>{
          if(ob['message']=='ok')
          {
            this.ruter.navigate(['/administrator/uredi-knjige'])
              .then(() => {
                window.location.reload();
              });
          }
          else alert(ob['message'])
    });
  }
  else alert("Someone has borrowed this book.")
});

}

days:number=14;

saveThis(){
  this.servisd.update(this.days).subscribe(ob=>{
    if(ob['message']=='ok')
    {
      this.ruter.navigate(['/administrator/uredi-knjige'])
        .then(() => {
          window.location.reload();
        });
    }
    else alert(ob['message'])
});
}

uredi(u:number){
  this.ruter.navigate(['/administrator/book-page',u]);
}

}
