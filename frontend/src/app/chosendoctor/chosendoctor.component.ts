import { Component,OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Appointment } from '../models/appointment';
import { User } from '../models/user';
import { Pregled } from '../models/pregled';

@Component({
  selector: 'app-chosendoctor',
  templateUrl: './chosendoctor.component.html',
  styleUrls: ['./chosendoctor.component.css']
})
export class ChosendoctorComponent implements OnInit{

  constructor(private service: UserService, private router: Router){}

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    this.doctor = localStorage.getItem('chosenDoctor');
    this.service.getUserByUsername(this.doctor).subscribe((data: User)=>{
      this.allApp = data.appointments;
      this.branch = data.branch;
      this.pregled = this.allApp[0];
      this.chosen = data;
    })
    this.service.getAllPregledi().subscribe((data: Pregled[])=>{
      this.allPregledi = data;
    })
    this.tipKorisnika=localStorage.getItem('type');
  }

  tipKorisnika: string;

  chosen :User;
  username: string;
  allApp: Array<Appointment>;
  doctor: string;
  pregled: Appointment;
  datum: string;
  date: Date;
  branch: string;
  allPregledi: Array<Pregled>;
  @ViewChild('datetimeInput') datetimeInput: any;

  zakaziPregled(){
    this.datum = this.datetimeInput.nativeElement.value;
    this.date = new Date(this.datum);
    let moze: boolean = true;
    if(!this.datum){
      moze =false;
    }
    let start1: Date, start2: Date, end1: Date, end2: Date;
    start1 = this.date;
    end1= new Date(start1);
    end1.setMinutes(start1.getMinutes()+this.pregled.trajanje);
    for(let a of this.allPregledi){
      // alert(a.datum);
      start2 = new Date(a.datum);
      end2 = new Date(start2);
      end2.setMinutes(end2.getMinutes() + a.trajanje);
      if((start1 >= start2 && start1 < end2) 
        ||
        (end1 > start2 && end1 <= end2)){
        moze = false;
      }
    }
    if(moze){
      alert("USPESNO ZAKAZANO!");
      this.service.addPregled(this.username, this.doctor,this.pregled.name, this.pregled.cena, this.pregled.trajanje, this.date , this.branch).subscribe();
      window.location.reload();
    }
    else{
      alert("NE MOZE!");
    }
    
  }

}
