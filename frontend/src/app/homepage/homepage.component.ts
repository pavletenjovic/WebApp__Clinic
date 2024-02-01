import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  constructor(private service: UserService){}

  ngOnInit(): void {
    this.searchLastname='';
    this.searchName = '';
    this.searchSpecialization = '';
    localStorage.clear();
    this.service.getAllDoctors().subscribe((doctors: User[])=>{
      this.allDoctors = doctors;
      this.filteredDoctors = this.allDoctors;
      this.search();
    })
  }

  allDoctors = [];
  selectedOption: string;
  searchName: string;
  searchLastname: string;
  searchSpecialization: string;
  filteredDoctors = [];



  sortChange(){
    if(this.selectedOption=='na'){
      this.allDoctors.sort((a, b) => a.firstname < b.firstname ? -1 : a.firstname > b.firstname ? 1 : 0);
      alert('na')
    }
    else if(this.selectedOption=='nd'){
      this.allDoctors.sort((a, b) => a.firstname > b.firstname ? -1 : a.firstname < b.firstname ? 1 : 0);
      alert('nd')
    }
    else if(this.selectedOption=='la'){
      this.allDoctors.sort((a, b) => a.lastname < b.lastname ? -1 : a.lastname > b.lastname ? 1 : 0);
      alert('la')
    }
    else if(this.selectedOption=='ld'){
      this.allDoctors.sort((a, b) => a.lastname > b.lastname ? -1 : a.lastname < b.lastname ? 1 : 0);
      alert('ld')
    }
    else if(this.selectedOption=='sa'){
      this.allDoctors.sort((a, b) => a.specialization < b.specialization ? -1 : a.specialization > b.specialization ? 1 : 0);
      alert('sa')
    }
    else if(this.selectedOption=='sd'){
      this.allDoctors.sort((a, b) => a.specialization > b.specialization ? -1 : a.specialization < b.specialization ? 1 : 0);
      alert('sd')
    }
  }

  search() {
    this.filteredDoctors = this.allDoctors.filter(doctor => {
      const nameMatch = this.searchName === '' || doctor.firstname.toLowerCase().includes(this.searchName.toLowerCase());
      const lastnameMatch = this.searchLastname === '' || doctor.lastname.toLowerCase().includes(this.searchLastname.toLowerCase());
      const specializationMatch = this.searchSpecialization === '' || doctor.specialization.toLowerCase().includes(this.searchSpecialization.toLowerCase());
  
      return nameMatch && lastnameMatch && specializationMatch;
    });
  }

}
