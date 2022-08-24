import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-dodaj-knjigu',
  templateUrl: './dodaj-knjigu.component.html',
  styleUrls: ['./dodaj-knjigu.component.css']
})
export class DodajKnjiguComponent implements OnInit {

  constructor(private servis: BookService,private ruter: Router, private http:HttpClient) { }

  @ViewChild('fileInput',{static:false}) fileInput:ElementRef;

  onFileUpload2(){
    const image=this.fileInput.nativeElement.files[0];
    const file=new FormData();
    file.set('file',image);
    const photoName=Date.now();
    this.http.post('http://localhost:3000/books/',file).subscribe(res=>{
      let profilePhoto=document.getElementById('profilePhoto') as HTMLImageElement;
      setTimeout(() => {
        profilePhoto.src=`/assets/books/${res['photo']}`;
        this.photo=res['photo'];
      }, 2000);
    })
  }
  
  photo:string="template.jpg";

  registerForm=new FormGroup({
    title:new FormControl('',[Validators.required]),
    author:new FormControl('',[Validators.required]),
    genre:new FormControl('',[Validators.required]),
    publisher:new FormControl('',[Validators.required]),
    year:new FormControl('',[Validators.required]),
    language:new FormControl('',[Validators.required])
  })
  user:User;
  ngOnInit(): void {
    if(localStorage.getItem('user'))
      this.user = JSON.parse(localStorage.getItem('user'));
  }

  get title(){return this.registerForm.get('title')}
  get author(){return this.registerForm.get('author')}
  get genre(){return this.registerForm.get('genre')}
  get publisher(){return this.registerForm.get('publisher')}
  get year(){return this.registerForm.get('year')}
  get language(){return this.registerForm.get('address')}
  
  add(){
    this.servis.add(Date.now(),this.registerForm.get('title').value, this.registerForm.get('author').value.split(','), this.registerForm.get('genre').value.split(','), this.registerForm.get('publisher').value, parseInt(this.registerForm.get('year').value), this.registerForm.get('language').value,this.photo).subscribe(ob=>{
        if(ob['message']=='ok'){
          alert("Book added!")
          
        if(this.user.type==10){
          this.ruter.navigate(['/administrator/dodaj-knjigu'])
          .then(() => {
            window.location.reload();
          });}
          else this.ruter.navigate(['/user/dodaj-knjigu'])
          .then(() => {
            window.location.reload();
          });
        }
        else alert(ob['message'])
      });

  }
}
