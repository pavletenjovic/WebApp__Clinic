import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit{

  constructor(private service: UserService, private router: Router){}

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((data: User[])=>{
      for(let d of data){
        if(d.type!='manager'){
          this.allUsers.push(d);
        }
      }
    })
    this.tipKorisnika=localStorage.getItem('type');
  }

  tipKorisnika: string;

  allUsers= [];

  deleteUser(username){
    this.service.deleteUser(username).subscribe();
    window.location.reload();
  }

  predjiNaKorisnika(user){
    if(user.type=="pacient"){
      localStorage.setItem('profilUsera', user.username);
      this.router.navigate(['/pacient']);
    }
    else{
      localStorage.setItem('profilUsera', user.username);
      this.router.navigate(['/doctor']);
    }
  }
}
