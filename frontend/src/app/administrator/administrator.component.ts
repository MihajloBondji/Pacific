import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  preusmeri(gde:string){
    this.router.navigate([gde], {relativeTo: this.route});
  }

  odjava(){
    localStorage.clear();
    this.router.navigate(['app-home']);
  }

}
