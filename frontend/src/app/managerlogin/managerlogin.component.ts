import { Component,OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-managerlogin',
  templateUrl: './managerlogin.component.html',
  styleUrls: ['./managerlogin.component.css']
})
export class ManagerloginComponent implements OnInit{
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void{
    this.losiPodaci = '';
    localStorage.clear();
  }
  username: string;
  password: string;
  losiPodaci: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
        localStorage.setItem('user', user.username);
        localStorage.setItem('type', user.type);
        if(user.type=='manager'){
          this.router.navigate(['/manager']);
        }
      }
    });
  }
}
