import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../model/book.model';
import { User } from '../model/user.model';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private servis: BookService,private ruter: Router, private http:HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.servis.getAllBooks().subscribe((data: Book[]) => {
      this.allBooks = data;
      this.allBooks=this.allBooks.filter(book=>book.id>0)
      this.allBooksToShow=this.allBooks;
      this.setGenres();
      this.setPublishers();
      let search=document.getElementById('search') as HTMLInputElement;
      let searchParam=search.value;
      if(searchParam!="")
      this.allBooksToShow=this.allBooksToShow.filter(book=>book.title.toLowerCase().includes(searchParam.toLowerCase())||JSON.stringify(book.author).toLowerCase().includes(searchParam.toLowerCase()));
  })
  }
  user:User;
  allBooksToShow:Book[]=[];
  preusmeri(gde:string,id:number){
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      
      if(this.user.type==1||this.user.type==2)
        this.ruter.navigate([gde,id]);
      else alert("You are blocked!");
    }
    else alert("Log in to see book details!");
  }

  allBooks:Book[]=[];
  page1:number=1;

  genres:Set<String>=new Set();

  setGenres(){
    for(let b of this.allBooks){
      for(let g of b.genre)
        this.genres.add(g);
    }
  }

  selected:string[]=[];
  changeGanres(){
    if(this.selected.length>0)
    {
      this.allBooksToShow=[];
      for(let s of this.selected)
      this.allBooksToShow=this.allBooksToShow.concat(this.allBooks.filter(book=>JSON.stringify(book.genre).toLowerCase().includes(s.toLowerCase())));
    }
    else this.allBooksToShow=this.allBooks;
  }
  
  publishers:Set<String>=new Set();

  setPublishers(){
    for(let b of this.allBooks){
        this.publishers.add(b.publisher);
    }
  }

  selectedp:string[]=[];
  changePublishers(){
    if(this.selectedp.length>0)
    {
      this.allBooksToShow=[];
      for(let s of this.selectedp)
      this.allBooksToShow=this.allBooksToShow.concat(this.allBooks.filter(book=>JSON.stringify(book.publisher).toLowerCase().includes(s.toLowerCase())));
    }
    else this.allBooksToShow=this.allBooks;
  }

  yearfrom:number=1;
  yearto:number=2100;

  changeYears(){
    if(this.yearfrom>0&&this.yearto>0)
    {
      this.allBooksToShow=[];
      this.allBooksToShow=this.allBooksToShow.concat(this.allBooks.filter(book=>((book.year>=this.yearfrom)&&(book.year<=this.yearto))));
    }
    else {
      this.allBooksToShow=this.allBooks;
      this.yearfrom=1;
      this.yearto=5000;
    };
  }
}
