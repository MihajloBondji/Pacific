import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { BorrowService } from '../borrow.service';
import { Book } from '../model/book.model';
import { Borrow } from '../model/borrow.model';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  constructor(private servis:BookService,private router:Router, private route:ActivatedRoute,private servis2:BorrowService) { }

  ngOnInit(): void {
    this.findMax();
  }

  
  currentSlide:number=0;
  bestsellers:Book[]=[];
  
  slideshow(x:number){
    let pick0=document.getElementById("pick0") as HTMLSpanElement;
    if(pick0!=null)
    pick0.innerHTML="&#9675;";
    let pick1=document.getElementById("pick1") as HTMLSpanElement;
    if(pick1!=null)
    pick1.innerHTML="&#9675;";
    let pick2=document.getElementById("pick2") as HTMLSpanElement;
    if(pick2!=null)
    pick2.innerHTML="&#9675;";
    let pickx=document.getElementById("pick"+x) as HTMLSpanElement;
    if(pickx!=null)
    pickx.innerHTML="&#9679;";
    let slider=document.getElementById("sliderImage") as HTMLImageElement;
    if(slider!=null)
    slider.src=`assets/books/${this.bestsellers[x].cover}`;

    let title=document.getElementById("title") as HTMLSpanElement;
    if(title!=null)
    title.innerHTML=this.bestsellers[x].title;
    let author=document.getElementById("author") as HTMLSpanElement;
    if(author!=null)
    author.innerHTML=this.bestsellers[x].author.toString();
    let year=document.getElementById("year") as HTMLSpanElement;
    if(year!=null)
    year.innerHTML=this.bestsellers[x].year.toString();
    this.currentSlide=(x+1)%3;
}


preusmeri(gde:string){
  this.router.navigate([gde]);
  }

  
  allBorrows:Array<Borrow>;
  top3:Number[]=[];

  findMax(){
    this.servis2.getAllBorrows().subscribe((data: Borrow[]) => {
      this.allBorrows = data;
      let nizBID=new Array<number>;
      for(let b of this.allBorrows)
        nizBID.push(b.bookId);
      let setBID=new Set(nizBID);
      let matrix=[];
      let j=0
      for(let b of setBID)
      {
        matrix[j]=[]
        matrix[j][0]=b;
        matrix[j][1]=0;
        for(let i=0;i<nizBID.length;i++)
          if(nizBID[i]==b)
          matrix[j][1]++;
        j++;
      }
      matrix.sort(sortFunction);

function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}
      this.top3[0]=matrix[0][0];
      this.top3[1]=matrix[1][0];
      this.top3[2]=matrix[2][0];
      this.setBestsellers();
  })

  }

  setBestsellers(){
    this.servis.getBook(this.top3[0]).subscribe((data: Book) => {
      if(data)this.bestsellers[0]=data;
      this.servis.getBook(this.top3[1]).subscribe((data: Book) => {
        if(data)this.bestsellers[1]=data;
        this.servis.getBook(this.top3[2]).subscribe((data: Book) => {
          if(data) this.bestsellers[2]=data;
          this.slideshow(0);
        });
      });
    });
    
  }

}
