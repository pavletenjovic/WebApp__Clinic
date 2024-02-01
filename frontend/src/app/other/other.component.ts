import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit{

  constructor(private service: UserService, private router: Router){}

  ngOnInit(): void {
    this.username = localStorage.getItem('user')
    this.service.getUserByUsername(this.username).subscribe((data: User)=>{
      this.spec = data.specialization
    })
    this.name1 = '';
    this.tipKorisnika=localStorage.getItem('type');
  }

  tipKorisnika: string;

  username: string;
  name1: string;
  price1: number;
  time1: number;
  spec: string;

  addRequest(){
    if(this.time1==0){
      this.time1=30;
    }
    this.service.addRequest(this.spec, this.name1, this.price1, this.time1).subscribe((data: string)=>{
      window.location.reload();
    });
  }
}
