import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

    preusmeri(gde:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this.router.navigate([gde], {relativeTo: this.route}));
    }
    preusmeri2(event,gde:string){
      if(event.keyCode == 13)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this.router.navigate([gde], {relativeTo: this.route}));
      }
  
}


