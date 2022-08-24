import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  odjava(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  preusmeri(gde:string){
    this.router.navigate([gde], {relativeTo: this.route});
    }

}
