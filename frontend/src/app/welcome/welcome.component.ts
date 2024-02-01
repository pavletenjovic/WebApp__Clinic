import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{

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
          this.losiPodaci = "Bad username or password";
        }
        else if(user.type=='doctor'){
          localStorage.setItem('firstname', user.firstname);
          localStorage.setItem('lastname', user.lastname);
          localStorage.setItem('email', user.email);
          localStorage.setItem('telephone', user.telephone);
          localStorage.setItem('adress', user.adress);
          localStorage.setItem('password', user.password);
          localStorage.setItem('url', user.url);
          localStorage.setItem('licence', JSON.stringify(user.licence));
          localStorage.setItem('branch', user.branch);
          localStorage.setItem('specialization', user.specialization);
          this.router.navigate(['/doctor']);
        }
        else{
          localStorage.setItem('firstname', user.firstname);
          localStorage.setItem('lastname', user.lastname);
          localStorage.setItem('email', user.email);
          localStorage.setItem('telephone', user.telephone);
          localStorage.setItem('adress', user.adress);
          localStorage.setItem('password', user.password);
          localStorage.setItem('url', user.url);
          this.router.navigate(['/pacient']);
        }
      }
      else{
        this.losiPodaci = "Bad username or password";
      }
    })
  }
}
