import { Component,OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Pregled } from '../models/pregled';
import { Report } from '../models/report';
import { User } from '../models/user';

@Component({
  selector: 'app-karton',
  templateUrl: './karton.component.html',
  styleUrls: ['./karton.component.css']
})
export class KartonComponent implements OnInit{

  constructor(private service: UserService, private router: Router){}

  ngOnInit(): void {
    this.service.getUserByUsername(localStorage.getItem('user')).subscribe((data: User)=>{
      this.username = data.username;
      this.specialization = data.specialization;
      this.branch = data.branch;
    })
    this.service.getAllPreglediPacient(localStorage.getItem('karton')).subscribe((data: Pregled[])=>{
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
        
        this.prvaTriPregleda.push(this.neodradjeniPregledi[i]);
      }
    });
    this.service.getReportPacient(localStorage.getItem('karton')).subscribe((data: Report[])=>{
      for(let d of data){
        let datum = new Date(d.datum);
        let datum2 = new Date(d.datumKontrole);
        d.datum = datum;
        d.datumKontrole = datum2;

        this.reports.push(d);
      }
    })
    this.tipKorisnika=localStorage.getItem('type');
  }

  tipKorisnika: string;

  username: string;
  specialization: string;
  branch: string;
  allPregledi = [];
  odradjeniPregledi = [];
  neodradjeniPregledi =[];
  prvaTriPregleda = [];
  reports = [];
  razlog: string;
  dijagnoza: string;
  terapija: string;
  datumKontrole: Date;
  @ViewChild('datetimeInput') datetimeInput: any;

  addReport(name, datum){
    let date = new Date(this.datumKontrole);
    let date2 = new Date(datum);
    this.service.addReport(localStorage.getItem('karton'), this.username, this.specialization, date, date2, 
    this.branch ,this.razlog,this.dijagnoza ,this.terapija , name).subscribe();
    window.location.reload();
  }
}
