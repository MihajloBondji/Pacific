import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { BorrowService } from '../borrow.service';
import { DaysService } from '../days.service';
import { Book } from '../model/book.model';
import { Borrow } from '../model/borrow.model';
import { Days } from '../model/days.model';
import { Review } from '../model/review.model';
import { User } from '../model/user.model';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  constructor(private servisd:DaysService,private http:HttpClient,private router:Router,private route:ActivatedRoute, private servis:BookService, private servis2:BorrowService,private servis3:ReviewService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user'));
    this.userType=this.user.type;
    if(this.userType==3)
    this.router.navigate(['/user/user-main'])
    this.servisd.get().subscribe((data:Days)=>{
      this.days=data.days;
    });
    this.id=parseInt(this.route.snapshot.paramMap.get("id"));
    this.getBook();
    this.servis2.getBorrowsUserTake(this.user.username).subscribe((data: Borrow[]) => {
    this.allBorrows = data;
    for(let b of this.allBorrows){
      if(b.bookId==this.id)
      this.already=1;
    }  
    if(this.userType==10)
    {this.edit=1;this.already=1}
    if(this.already==0)
    this.buttonEnable=1;
    this.servis3.getReviewsBook(this.id).subscribe((data2: Review[]) => {
      this.allReviews = data2;
      for(let r of this.allReviews)
        if(r.user==this.user.username)
          {
            this.alreadyReviewed=0;
            this.userReview=r;
            this.lastScore=r.score;
          }
    this.servis2.getBorrowsUser(this.user.username).subscribe((data3: Borrow[]) => {
            let allBorrowsUser = data3;
            for(let b of allBorrowsUser){
              if(b.bookId==this.id)
              this.userTook=1;
            }  
          });
    });
  });
  }

  userReview:Review=null;
  days:number=14;
  userTook:number=0;
  already:number=0;
  alreadyReviewed:number=1;
  buttonEnable:number=0;
  user:User;
  allBorrows:Borrow[]=[];
  allReviews:Review[]=[];
  scoreInput:number=10;
  textInput:string;
  userType:number=1;
  canreserve:number=0;
  lastScore:number=0;
  getBook(){
  this.servis.getBook(this.id).subscribe((book: Book)=>{
    if(book){
      this.knjiga=book;
      this.postavi();
    }
  })
  }

  available:number=0;

  postavi(){
    this.available=this.knjiga.count;
      this.cover=this.knjiga.cover;
      this.title=this.knjiga.title;
      this.author=this.knjiga.author.toString();
      this.genre=this.knjiga.genre.toString();
      this.year=this.knjiga.year;
      this.publisher=this.knjiga.publisher;
      this.language=this.knjiga.language;
      if(this.knjiga.score[0]!=0){
        let score=Math.round(this.knjiga.score[0]/this.knjiga.score[1]);
        this.score="";
        this.score=score+"/10";
        let sco2=document.getElementById('score2') as HTMLSpanElement;
        for(let i=0;i<score;i++)
        sco2.innerHTML+="&#9734;";
      }
      this.canreserve=1;
      for(let r of this.knjiga.reservations)
        if(r==this.user.username)
        this.canreserve=0;

  }
  getit(){
    if(this.allBorrows.length<3){
      let cantake=1;
      for(let b of this.allBorrows){
        if(this.calc(b.dateTake,b.extend)<0)
          cantake=0;
      }
      if(cantake){
          this.servis2.add(Date.now(),this.knjiga.id,this.user.username,this.knjiga.cover,this.knjiga.title,this.knjiga.author,this.knjiga.genre,0,Date.now(),0).subscribe(ob=>{
            if(ob['message']=='ok'){
              this.buttonEnable=0;
              this.servis.getIt(this.id).subscribe(ob=>{
                if(ob['message']!='ok')
                   alert(ob['message'])
                else
                this.router.navigate(['/user/book-page',this.id])
               .then(() => {
                 window.location.reload();
               });
              });
            }
            else alert(ob['message'])
          });
      }
      else alert("You have borrowed books which need to be returned.")
    }
    else alert("You have the maximum amount of borrowed books (3)")
  }
  reserveit(){
    if(this.allBorrows.length<3){
      let cantake=1;
      for(let b of this.allBorrows){
        if(this.calc(b.dateTake,b.extend)<0)
          cantake=0;
      }
      if(cantake){
          this.buttonEnable=0;
          this.servis.reserve(this.id,this.user.username).subscribe(ob=>{
            if(ob['message']!='ok')
                alert(ob['message'])
            else
            {
              this.canreserve=0;
              alert('Reserved!');
            }
          });
      }
      else alert("You have borrowed books which need to be returned.")
    }
    else alert("You have the maximum amount of borrowed books (3)")
  }
  knjiga:Book;
  id:number;
  title:String="";
  year:number=0;
  genre:String="";
  publisher:String="";
  author:String="";
  language:String="";
  score:String="No score";
  score2:String="";
  cover:String="template.jpg";
  
  calc(num:number,ext:number){
    let days=Date.now()-num;
    days/= (1000 * 3600 * 24);
    return this.days*ext + this.days - Math.floor(days);
  }

  addReview(){
    this.servis3.add(Date.now(),this.id,this.scoreInput,this.textInput,this.user.username,Date.now()).subscribe(ob=>{
      if(ob['message']=='ok'){
        this.servis.updateScore(this.id,[(this.knjiga.score[0]+(this.scoreInput-0)),this.knjiga.score[1]+1]).subscribe(ob=>{
          if(ob['message']=='ok'){
      this.servis3.getReviewsBook(this.id).subscribe((data2: Review[]) => {
        this.router.navigate(['/user/book-page',this.id])
        .then(() => {
          window.location.reload();
        });
    })
      }});}
      else alert(ob['message'])
    });

  }

  updateReview(){
    this.servis3.update(this.userReview.id,this.id,this.userReview.score,this.userReview.text,this.user.username,Date.now()).subscribe(ob=>{
      if(ob['message']=='ok'){
        this.servis.updateScore(this.id,[(this.knjiga.score[0]-this.lastScore+(this.userReview.score-0)),this.knjiga.score[1]]).subscribe(ob=>{
          if(ob['message']=='ok'){
      this.servis3.getReviewsBook(this.id).subscribe((data2: Review[]) => {
      this.allReviews = data2;
    })
      }})}
      else alert(ob['message'])
    });

  }

  counter(i: number) {
    return new Array(i);
}

edit:number=0;

convert(num:number){
  if(num>0){
  let date=new Date(num).getDate()+'/'+(new Date(num).getMonth()+1)+'/'+new Date(num).getFullYear();
  return date;
  }
  else return "";
}

convert2(num:number){
  if(num>0){
  let date=new Date(num).getHours()+':'+(new Date(num).getMinutes())+':'+new Date(num).getSeconds();
  return date;
  }
  else return "";
}

editThis(){
  this.edit=1;
}

saveThis(){
  this.edit=0
  let lastavailable=this.knjiga.count;
  this.servis.update(this.knjiga.id,this.title,this.genre.split(','),this.author.split(','),this.year,this.publisher,this.language,this.cover,this.available).subscribe(ob=>{
    if(ob['message']!='ok')
       alert(ob['message'])
    else{
      if(this.reserved==0){
        let niz=this.knjiga.reservations
        this.reserved=this.available-lastavailable;
        this.getit2(niz,this.knjiga)
      }
  };});
}


@ViewChild('fileInput',{static:false}) fileInput:ElementRef;

onFileUpload2(){
  const image=this.fileInput.nativeElement.files[0];
  const file=new FormData();
  file.set('file',image);
  const photoName=Date.now();
  this.http.post('http://localhost:3000/books/',file).subscribe(res=>{
    let profilePhoto=document.getElementById('knjiga') as HTMLImageElement;
    setTimeout(() => {
      profilePhoto.src=`/assets/books/${res['photo']}`;
      this.cover=res['photo'];
    }, 2000);
  })
}

reserved:number=0;

getit2(niz:string[],book:Book){
  if(niz.length!=0&&this.reserved!=0)
  {
  let username=niz[0];
  this.servis2.getBorrowsUserTake(username).subscribe((data: Borrow[]) => {
  if(data.length<3){
    let cantake=1;
    for(let b of data){
      if(this.calc(b.dateTake,b.extend)<0)
        cantake=0;
    }
    if(cantake){
        this.servis2.add(Date.now(),book.id,username,book.cover,book.title,book.author,book.genre,0,0,0).subscribe(ob=>{
          if(ob['message']=='ok'){
            this.servis.getIt(book.id).subscribe(ob=>{
              if(ob['message']!='ok')
                 alert(ob['message'])
              else
              this.servis.updateRes(book.id,username).subscribe(ob=>{
                if(ob['message']!='ok')
                   alert(ob['message'])
                else{
                  this.reserved--;
                  niz.shift();
                  this.getit2(niz,book);
                }
                
              });
            });
          }
          else alert(ob['message'])
        });
    }
    else {
      niz.shift();
      this.getit2(niz,book);
    }
  }
  else {
    niz.shift();
    this.getit2(niz,book);
  }
});
}
else
{
  if(this.userType==2)
  this.router.navigate(['/user/book-page',this.id])
  .then(() => {
    window.location.reload();
  })
  else if(this.userType==10)
  this.router.navigate(['/administrator/book-page',this.id])
  .then(() => {
    window.location.reload();
  })
}
}
}

