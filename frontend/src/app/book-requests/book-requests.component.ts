import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book.model';
import { BookService } from '../book.service';
import { BorrowService } from '../borrow.service';
import { Borrow } from '../model/borrow.model';

@Component({
  selector: 'app-book-requests',
  templateUrl: './book-requests.component.html',
  styleUrls: ['./book-requests.component.css']
})
export class BookRequestsComponent implements OnInit {

  constructor(private servis: BookService,private ruter: Router, private http:HttpClient,private servis2:BorrowService) { }

  allBooks:Book[]=[];

  ngOnInit(): void {
    
    this.servis.getAllBooks().subscribe((data: Book[]) => {
      this.allBooks = data;
      this.allBooks=this.allBooks.filter(book=>book.id<0);
  })
  }

  page1 = 1;

  approve(id){
    this.servis.updateId(id).subscribe(ob=>{
      if(ob['message']!='ok')
         alert(ob['message'])
      else
      this.ruter.navigate(['/user/book-requests'])
     .then(() => {
       window.location.reload();
     });});
  }

  
delete(id){
  this.servis2.getBorrowsBookTaken(id).subscribe((data: Borrow[]) => {
    let allBorrows = data;
      this.servis.delete(id).subscribe(ob=>{
          if(ob['message']=='ok')
          {
            this.ruter.navigate(['/user/book-requests'])
              .then(() => {
                window.location.reload();
              });
          }
          else alert(ob['message'])
    });
});

}

}

