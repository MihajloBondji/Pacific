import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private servis: UserService,private ruter: Router, private http:HttpClient) { }

  @ViewChild('fileInput',{static:false}) fileInput:ElementRef;

  onFileUpload(){
    const image=this.fileInput.nativeElement.files[0];
    const file=new FormData();
    file.set('file',image);
    const photoName=Date.now();
    this.http.post('http://localhost:3000/',file).subscribe(res=>{
      let profilePhoto=document.getElementById('profilePhoto') as HTMLImageElement;
      setTimeout(() => {
        profilePhoto.src=`/assets/profilePhotos/${res['photo']}`;
        this.photo=res['photo'];
        profilePhoto.style.borderRadius="50px";
      }, 2000);
    })
  }
  
  ngOnInit(): void {
  }

  photo:string;
  registerForm=new FormGroup({
    mail:new FormControl('',[Validators.required,Validators.email]),
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.pattern("^([A-Z](?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7,11})|([a-z](?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7,11})$")]),
    confirmPassword:new FormControl('',[Validators.required,Validators.pattern("^([A-Z](?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7,11})|([a-z](?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7,11})$")]),
    fullname:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required,Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$")])
  })

  messageUser:string;
  messageMail:string;
  message:string;

  get mail(){return this.registerForm.get('mail')}
  get username(){return this.registerForm.get('username')}
  get password(){return this.registerForm.get('password')}
  get confirmPassword(){return this.registerForm.get('confirmPassword')}
  get fullname(){return this.registerForm.get('fullname')}
  get address(){return this.registerForm.get('address')}
  get phone(){return this.registerForm.get('phone')}

  register(){
    this.servis.register(this.registerForm.get('username').value, this.registerForm.get('password').value, this.registerForm.get('fullname').value, this.registerForm.get('address').value, this.registerForm.get('phone').value, this.registerForm.get('mail').value,this.photo, 0).subscribe(ob=>{
        if(ob['message']=='ok'){
          this.ruter.navigate(['/login']);
        }
        else alert(ob['message'])
      });

  }

  passcheck(){
    if(this.registerForm.get('password').value==this.registerForm.get('confirmPassword').value)
    this.message="";
    else this.message="Password and confirm password does not match";
  }

  findUsername(){
    this.servis.findUsername(this.registerForm.get('username').value).subscribe(ob=>{
        if(ob['message']!='ok'){
          this.messageUser=ob['message'];
        }
        else 
        this.messageUser="";
      });
  }
  
  findMail(){
    this.servis.findMail(this.registerForm.get('mail').value).subscribe(ob=>{
        if(ob['message']!='ok'){
          this.messageMail=ob['message'];
        }
        else 
        this.messageMail="";
      });
  }
}
