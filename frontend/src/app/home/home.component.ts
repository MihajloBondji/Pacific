import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.preusmeri('home-main');
  }

  
  preusmeri(gde:string){
    this.router.navigate([gde], {relativeTo: this.route});
  }
}


