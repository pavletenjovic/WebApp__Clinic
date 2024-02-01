import { Component,OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ParseSourceFile } from '@angular/compiler';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit{

  constructor(private service: UserService){}

  ngOnInit(): void {
    this.service.getAllPendingUsers().subscribe((data: User[])=>{
      this.allUsers = data;
    })
    this.tipKorisnika=localStorage.getItem('type')
  }

  tipKorisnika: string;
  allUsers = [];

  accept(username, password, firstname, lastname, email, telephone, adress, url){
    this.service.acceptUser(username, password, firstname, lastname, email, telephone, adress, url).subscribe();
    window.location.reload();
  }

  decline(username, email){
    this.service.denyUser(username, email).subscribe();
    window.location.reload();
  }
}
