import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Pregled } from '../models/pregled';
import { Report } from '../models/report';

@Component({
  selector: 'app-pacientappointment',
  templateUrl: './pacientappointment.component.html',
  styleUrls: ['./pacientappointment.component.css']
})
export class PacientappointmentComponent implements OnInit{
  
  constructor(private service: UserService, private router: Router){}

  ngOnInit(): void {
    this.service.getAllPreglediPacient(localStorage.getItem('user')).subscribe((data: Pregled[])=>{
      for(let d of data){
        
        let date = new Date(d.datum);
        d.datum = date;
        this.allAppointment.push(d);
      }
      
      this.allAppointment.sort((a, b) => a.datum.getTime() - b.datum.getTime());
    });
    this.service.getReportPacient(localStorage.getItem('user')).subscribe((data: Report[])=>{
      for(let d of data){
        
        let date = new Date(d.datum);
        d.datum = date;
        date = new Date(d.datumKontrole);
        d.datumKontrole = date;
        this.allReport.push(d);
      }
      
      this.allAppointment.sort((a, b) => b.datum.getTime() - a.datum.getTime());
    })
    this.tipKorisnika=localStorage.getItem('type');
  }

  tipKorisnika: string;
  allAppointment = [];
  allReport = [];

  cancel(a){
    let pacient = a.pacient;
    let doctor = a.doctor;
    let datum = a.datum;
    let name = a.name;
    this.service.cancelPregled(pacient, doctor, datum,name).subscribe();
    window.location.reload();
  }
}
