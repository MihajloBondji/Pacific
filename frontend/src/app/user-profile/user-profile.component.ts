import { getLocaleMonthNames } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BorrowService } from '../borrow.service';
import { Borrow } from '../model/borrow.model';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userServise: UserService,private ruter: Router, private http:HttpClient,private servis:BorrowService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      
      if(this.user.type!=1&&this.user.type!=2&&this.user.type!=3){
        this.ruter.navigate(['']);
      }
    }
    else this.ruter.navigate(['']);
    
    if(this.user.photo!=""&&this.user.photo!=null)
    this.photo=this.user.photo;
    this.ufullname=this.user.fullname;
    this.uusername=this.user.username;
    this.uaddress=this.user.address;
    this.uphone=this.user.phone;
    this.umail=this.user.mail;

    this.changeinfoForm.get('username').setValue(this.uusername);
    this.changeinfoForm.get('fullname').setValue(this.ufullname);
    this.changeinfoForm.get('address').setValue(this.uaddress);
    this.changeinfoForm.get('phone').setValue(this.uphone);
    this.changeinfoForm.get('mail').setValue(this.umail);

    this.getMonths();
  }

  user:User;  
  
  photo:string="profilepic.png";
  ufullname:string="";
  uusername:string="";
  uaddress:string="";
  uphone:string="";
  umail:string="";

  changeinfoForm=new FormGroup({
    mail:new FormControl('',[Validators.required,Validators.email]),
    username:new FormControl('',[Validators.required]),
    fullname:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required,Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$")])
  })

  changepassForm=new FormGroup({
    password:new FormControl('',[Validators.required,Validators.pattern("^([A-Z](?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7,11})|([a-z](?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7,11})$")]),
    confirmPassword:new FormControl('',[Validators.required,Validators.pattern("^([A-Z](?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7,11})|([a-z](?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7,11})$")]),
    oldPassword:new FormControl('',[Validators.required,Validators.pattern("^([A-Z](?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7,11})|([a-z](?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7,11})$")])
  })

  message:string;
  messageUser:string="";
  messageMail:string="";

  get mail(){return this.changeinfoForm.get('mail')}
  get username(){return this.changeinfoForm.get('username')}
  get fullname(){return this.changeinfoForm.get('fullname')}
  get address(){return this.changeinfoForm.get('address')}
  get phone(){return this.changeinfoForm.get('phone')}

  get password(){return this.changepassForm.get('password')}
  get confirmPassword(){return this.changepassForm.get('confirmPassword')}
  get oldPassword(){return this.changepassForm.get('oldPassword')}

  changePass(){
    this.userServise.login(this.user.username, this.changepassForm.get('oldPassword').value).subscribe((user: User)=>{
    if(user){
        this.userServise.changePass(this.user.username,this.changepassForm.get('password').value).subscribe(ob=>{
          if(ob['message']=='ok'){
            alert('Password changed');
            this.odjava();
          }
          else alert(ob['message'])
        });
      }
      else this.message="Wrong old password"
    });
  }

  passcheck(){
    if(this.changepassForm.get('password').value==this.changepassForm.get('confirmPassword').value)
    this.message="";
    else this.message="Password and confirm password does not match";
  }

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['/login']);
  }

  
  findUsername(){
    if(this.changeinfoForm.get('username').value!=this.user.username)
    this.userServise.findUsername(this.changeinfoForm.get('username').value).subscribe(ob=>{
        if(ob['message']!='ok'){
          this.messageUser=ob['message'];
        }
        else 
        this.messageUser="";
      });
      else 
        this.messageUser="";
  }
  
  findMail(){
    if(this.changeinfoForm.get('mail').value!=this.user.mail)
    this.userServise.findMail(this.changeinfoForm.get('mail').value).subscribe(ob=>{
        if(ob['message']!='ok'){
          this.messageMail=ob['message'];
        }
        else 
        this.messageMail="";
      });
      else 
        this.messageMail="";
  }
  
  @ViewChild('fileInput',{static:false}) fileInput:ElementRef;

  onFileUpload(){
    this.fileuploading=1;
    const image=this.fileInput.nativeElement.files[0];
    const file=new FormData();
    file.set('file',image);
    const photoName=Date.now();
    this.http.post('http://localhost:3000/',file).subscribe(res=>{
      setTimeout(() => {
        this.photo=res['photo'];
        this.fileuploading=0;
      }, 2000);
    })
  }
  fileuploading:number=0;
  changeInfo(){
    this.userServise.updateInfo(this.user.username,this.changeinfoForm.get('username').value,this.changeinfoForm.get('fullname').value,this.changeinfoForm.get('address').value,this.changeinfoForm.get('phone').value,this.changeinfoForm.get('mail').value,this.photo).subscribe(ob=>{
      if(ob['message']=='ok'){
        alert('Info updated');
        this.odjava();
      }
      else alert(ob['message'])
    });
  }

  months:number[]=[0,0,0,0,0,0,0,0,0,0,0,0];
  genres:Set<string>=new Set();
  arrayGenres:Array<string>=[];

  calc(num){
    if(Math.max(...this.months)>0)
    return (num/Math.max(...this.months))*11+4+'vw';
    else return "4vw";
  }
  
  calc2(gen){
    let broj=0;
    for(let g of this.arrayGenres)
      if(gen==g)
        broj++;
    return broj;
  }

  calc3(num){
    return ((num/this.arrayGenres.length)*13+2)+'vw';
  }

  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  calcMonth(num){
    let n=((new Date(Date.now())).getMonth()+11-num)%11;
    return this.monthNames[n];
  }

  allBorrows:Borrow[]=[];
  getMonths(){
    this.servis.getBorrowsUser(this.user.username).subscribe((data: Borrow[]) => {
      this.allBorrows = data;
      for(let b of this.allBorrows)
      {
        let i=Math.round((Date.now()-b.dateTake)/1000/60/60/24/30);
        if(i<=11)
          this.months[i]++;
        for(let g of b.genre)
          this.arrayGenres.push(g);
      }
      this.genres=new Set(this.arrayGenres);
  })
  }
}
