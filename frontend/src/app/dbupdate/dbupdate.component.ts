import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Appointment } from '../models/appointment';
import { User } from '../models/user';

@Component({
  selector: 'app-dbupdate',
  templateUrl: './dbupdate.component.html',
  styleUrls: ['./dbupdate.component.css']
})
export class DbupdateComponent implements OnInit{

  constructor(private service: UserService, private router: Router){}

  ngOnInit(): void {
    this.newSpecialization = '';
    this.service.getAllPendingAppointments().subscribe((data: Appointment[])=>{
      this.pendingAppointments = data;
    })
    this.service.getAllAppointments().subscribe((data: Appointment[])=>{
      this.allAppointments = data;
    })
    this.service.getAllDoctors().subscribe((data: User[])=>{
      this.allDoctors = data;
    })
    this.tipKorisnika=localStorage.getItem('type');
  }

  tipKorisnika: string;

  pendingAppointments = [];
  allDoctors = [];
  allAppointments = [];
  newSpecialization: string;
  cena: number;
  trajanje: number;

  dodajSpec(){
    this.service.addSpecialization(this.newSpecialization).subscribe();
    window.location.reload();
  }

  acceptPA(a){
    let spec = a.specialization;
    let name = a.name;
    let price = a.cena;
    let time = a.trajanje;
    this.service.acceptPA(spec, name, price,time).subscribe();
    window.location.reload();
  }

  declinePA(a){
    let spec = a.specialization;
    let name = a.name;
    let price = a.cena;
    let time = a.trajanje;
    this.service.declinePA(spec, name, price,time).subscribe();
    window.location.reload();
  }

  updatePA(a: Appointment){
    if(this.trajanje==undefined){
      this.trajanje = 30;
    }
    let spec = a.specialization;
    let name = a.name;
    this.service.updatePA(spec,name, this.cena, this.trajanje).subscribe();
    window.location.reload();
  }
  deletePA(a: Appointment){
    let spec = a.specialization;
    let name = a.name;
    this.service.deletePA(spec, name).subscribe();
    for(let s of this.allDoctors){
      if(s.specialization==spec){
        let arr: [] = s.appointments;
        let arr2= arr.filter(obj => obj['name'] !== name);
        this.service.getAppointmentsByName(spec, arr2, s.username).subscribe();
      }
      
    }
    window.location.reload();
  }
  
}
