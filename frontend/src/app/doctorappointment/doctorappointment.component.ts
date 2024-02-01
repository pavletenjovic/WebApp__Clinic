import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Pregled } from '../models/pregled';

@Component({
  selector: 'app-doctorappointment',
  templateUrl: './doctorappointment.component.html',
  styleUrls: ['./doctorappointment.component.css']
})
export class DoctorappointmentComponent implements OnInit{

  constructor(private service: UserService, private router: Router){}

  ngOnInit(): void {
    this.service.getAllPreglediDoctor(localStorage.getItem('user')).subscribe((data: Pregled[])=>{
      for(let d of data){
        
        let date = new Date(d.datum);
        d.datum = date;
        if(!d.report){
          this.neodradjeniPregledi.push(d);
        }
        else{
          this.odradjeniPregledi.push(d);
        }
        this.allPregledi.push(d);
      }
      this.neodradjeniPregledi.sort((a, b) => a.datum.getTime() - b.datum.getTime());
      for(let i=0;i<3;i++){
        if(i==this.neodradjeniPregledi.length)
          break;
        
        this.prvaTriPregleda.push(this.allPregledi[i]);
      }
    })
    this.tipKorisnika=localStorage.getItem('type');
  }

  tipKorisnika: string;

  allPregledi = [];
  odradjeniPregledi = [];
  neodradjeniPregledi =[];
  prvaTriPregleda = [];

  karton(pacient){
    localStorage.setItem('karton', pacient);
    this.router.navigate(['/karton']);
  }
}
